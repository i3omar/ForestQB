/*!
 * Copyright (c) 2024-2025 Omar Mussa
 *
 * rdfPrompt.js is a collection of JavaScript functions designed to extract RDF data and prepare prompts for use with Large Language Models (LLMs).
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */


let templates = [
  // index 0 --> use case 1
  // this is the orginal without aggregate functions
  `You are an entity extractor that uses the following entities to convert the user query into JSON.
    If a specific entity not exist in the list, try to find it is synonym.
    The user query will be delimited with four hashtags, i.e. #### 
    The values can contain the following filters:
    - Bound: Check if it is bound or not bound to a value
    - Match: entity should exactly match this
    - Range: restrict based on arithmetic expression.
    - Contain: value contain this text

    Entities as RDF/Turtle model:
    {RDF}
    
    - Entity names has to be from above RDF. 
    - Use the RDF comment replace the value with numeric value if possible.
    - If not exist in RDF, dont put it in response.
    - Please provide a response in the following JSON format:
    
    {
        "query": {
            "<The first extracted entity/sensor rdf uri>":{
                "<The first extracted observable property uri>": {
                    "value": ["<List of extracted values>"],
                },
                "<The second extracted observable property uri>":{ 
                    "value":["<List of extracted values (check RDF, if value is such as poor or bad, try to interpret it as numeric value using the above RDF comments to be numeric)>.)"]
                }
            }
        }
    }`,

  // index 1 --> use case 1 + aggregate functions
  // same as 0 but with aggregate functions
  `You are an entity extractor that uses the following entities to convert the user query into JSON.
    If a specific entity not exist in the list, try to find it is synonym.
    The user query will be delimited with four hashtags, i.e. #### 
    The values can contain the following filters:
    - Bound: Check if it is bound or not bound to a value
    - Match: entity should exactly match this
    - Range: restrict based on arithmetic expression.
    - Contain: value contain this text
    - Aggregate: apply a supported aggregate function (use as filter "Aggregate" when appropriate, depending on entity datatype):
        1. For numeric datatypes (float, double, decimal, integer): AVG, SUM, MAX, MIN, COUNT, SAMPLE, GROUP_CONCAT
        2. For date/time datatypes (date, time, datetime): YEAR, MONTH, DAY, HOURS, MINUTES, SECONDS, COUNT, SAMPLE, GROUP_CONCAT
        3. For string, literal, or object datatypes: COUNT, SAMPLE, GROUP_CONCAT

    Entities as RDF/Turtle model:
    {RDF}
    
    - Entity names has to be from above RDF. 
    - Use the RDF comment replace the value with numeric value if possible.
    - If not exist in RDF, dont put it in response.
    - Please provide a response in the following JSON format:
    
    {
        "query": {
            "<The first extracted entity/sensor rdf uri>":{
                "<The first extracted observable property uri>": {
                    "value": ["<List of extracted values>"],
                },
                "<The second extracted observable property uri>":{ 
                    "value":["<List of extracted values (check RDF, if value is such as poor or bad, try to interpret it as numeric value using the above RDF comments to be numeric)>.)"]
                }
            }
        }
    }`,
  
  // index 2 --> use case 2
  `Act as a knowledgeable RDF (Resource Description Framework) expert and ecological conservation consultant. Your role is to provide detailed, informed advice and resources to individuals working on conservation efforts. When receiving a query, follow these guidelines:
    - The user query will be delimited with four hashtags, i.e. #### 
    - RDF file:
    {RDF}
    1. If a question involves RDF content, conduct a detailed analysis to determine if it includes specific entities or resources. Cross-check these against the RDF data. Respond based exclusively on the RDF information, and strive to be concise and precise in your explanations.
    2. For general inquiries about wildlife, ecology, or conservation, draw upon your comprehensive expertise to offer concise, expert advice.
    3. Politely refuse to answer questions that are not related to RDF or ecological conservation, maintaining your focus on these specialized subjects. Remember to keep your responses brief and to the point.`,
  
  // index 3 --> use case 3
  `Act as a knowledgeable ecological conservation consultant. Your role is to provide detailed, informed advice and resources to individuals working on conservation efforts. When receiving a query, follow these guidelines:
    - The user query will be delimited with four hashtags, i.e. #### 
    - Draw upon your comprehensive expertise to offer concise, expert advice.
    - Remember to keep your responses brief and to the point.`,
];

let rdfPrefixStore = [];
let rdfTriplesStore = [];
let rdfSubgraphsStore = [];

// let messageJsonTemplate = { "role": "user", "content": "" };

//Now allows 0, NaN, false, null and undefined in output. 
function fillTemplate(template, data) {
  // template("the original text {test} and {word}",{test:"MYTEST",word:"MYWORD"});

  return template.replaceAll(
    /{(\w*)}/g, ///%(\w*)%/g,  or /{(\w*)}/g for "{this} instead of %this%"
    function (m, key) {
      // return data.hasOwnProperty(key) ? data[key] : "";
      return Object.prototype.hasOwnProperty.call(data, key) ? data[key] : "";
    }
  );
}

/**
 * Finds all the indexes in the rdfTriples array where a target entity appears.
 *
 * @param {string} targetEntity - The entity to search for within the RDF triples.
 * @param {string[]} rdfTriples - An array of RDF triples in string format.
 * @param {number} [index=0] - The starting index for the search within rdfTriples.
 * @returns {number[]} An array of indexes where the target entity appears.
 */
function indexesOfEntity(targetEntity, rdfTriples, index = 0) {
  const indexes = []; // Store indexes where targetEntity appears.

  // Loop through rdfTriples starting from the given index.
  for (let i = index; i < rdfTriples.length; i++) {
    // Check if the current RDF triple includes the target entity.
    if (rdfTriples[i].includes(targetEntity)) {
      // If it does, add the current index to the list of found indexes.
      indexes.push(i);
    }
  }

  // Return the array of found indexes.
  return indexes;
}


/**
 * Builds multiple subgraphs from a list of RDF triples. These subgraphs contain
 * related Resource Description Framework (RDF) data for generating embeddings.
 * 
 * @param {string[]} rdfTriples - An array of RDF triples in string format.
 * @returns {string[]} An array of subgraphs as strings, ready for embeddings.
 */
function buildRdfSubgraphs(rdfTriples) {
  let graphs = []; // Store the final subgraphs for embeddings.
  let entitiesDict = {}; // A dictionary to track occurrences of RDF entities.
  let indexesDict = {}; // A dictionary to track occurrences of RDF triple (if it was alraedy used will be ignored to stop redundancy).


  // Step 1: Identify all entities in the given RDF triples.
  rdfTriples.forEach(function (triple, i) {
    entitiesDict = {}; // reset
    indexesDict = {}; // reset
    let subgraph = [];

    subgraph.push(rdfTriples[i])
    indexesDict[i] = 0; // mark its occurrence in the dict


    // Split the triple into its main components: subject, predicate, and object.
    const [initialPart, ...rest] = triple.split(';');
    let [initialSubject, initialPredicate, ...initialObjects] = initialPart.trim().split(' ');

    if (i === 15)
      console.log(i, initialSubject, initialPredicate, ...initialObjects);

    // Increment the occurrence count for the subject.
    entitiesDict[initialSubject] = (entitiesDict[initialSubject] || 0) + 1;

    // Increment the occurrence count for the object if it's not a string literal.
    // if (!initialObject.includes('"')) {
    //   entitiesDict[initialObject] = (entitiesDict[initialObject] || 0) + 1;
    // }

    // Handling multiple objects separated by commas
    initialObjects = initialObjects.join(' ').split(',');
    initialObjects.forEach(obj => {
      // parsedTriples.push([initialSubject, initialPredicate, obj.trim()]);
      if (!obj.includes('"')) {
        entitiesDict[obj.trim()] = (entitiesDict[obj.trim()] || 0) + 1;
      }
    });

    // Process the rest of the triple, looking for extra predicates and objects.
    rest.forEach(extraPart => {
      let [predicate, ...objects] = extraPart.trim().split(' ');

      // Handling multiple objects separated by commas
      objects = objects.join(' ').split(',');
      objects.forEach(obj => {
        // parsedTriples.push([initialSubject, initialPredicate, obj.trim()]);

        if (!obj.includes('"')) {
          entitiesDict[obj.trim()] = (entitiesDict[obj.trim()] || 0) + 1;
        }
      });
      // if (!object.includes('"')) {
      //   entitiesDict[object] = (entitiesDict[object] || 0) + 1;
      // }
    });


    // console.log("entitiesDict", i, entitiesDict);

    // Step 2: Build subgraphs based on the identified entities.
    for (const [entity, count] of Object.entries(entitiesDict)) {

      // Find all indexes of triples that contain this entity.
      const indexes = indexesOfEntity(entity, rdfTriples);

      // Add triples containing this entity to the subgraph.
      indexes.forEach(index => {
        // if (!indexesDict.hasOwnProperty(index)) { // stopping redundancy by checking if we have already added this triple before to subgraph.
        if (!Object.prototype.hasOwnProperty.call(indexesDict, index)) {
          subgraph.push(rdfTriples[index])
          indexesDict[index] = 0; // mark its occurrence in the dict
        }
      });
    }

    // Add non-empty subgraphs to the final result.
    if (subgraph.length > 0) {
      graphs.push(subgraph.join('\n'));
    }
  });



  console.log("graphs", graphs);
  return graphs;
}

/**
 * Tokenizes an RDF (Resource Description Framework) document into its prefix declarations
 * and triples.
 *
 * @param {string} rdfDocument - The raw RDF document as a string.
 * @returns {Object} An object containing two properties: prefix and triples.
 *         prefix: An array of prefix declarations.
 *         triples: An array of RDF triples.
 */
function rdfTripleTokenizer(rdfDocument) {
  let prefix = []; // Store prefix declarations
  let rdfTriples = []; // Store RDF triples

  // console.log("with comments:", rdfDocument);
  // rdfDocument = removeComments(rdfDocument) // remove all comments
  // rdfDocument = removeCommentsFromTTL(rdfDocument) // remove all comments
  // console.log("no comments:", rdfDocument);


  // Remove multiple spaces, tabs, and newlines, replacing them with a single space
  rdfDocument = rdfDocument.trim().split(/[\s\t\n]+/).join(' ');
  // rdfDocument = rdfDocument.trim().replace(/[\s\t\n]+/g, ' ');

  let quoteFlag = false;
  let doubleQuoteFlag = false;
  let prefixFlag = false;
  let lessThanFlag = false;

  for (let i = 0; i < rdfDocument.length; i++) {

    // Skip over characters within quotes or angle brackets
    if (quoteFlag || doubleQuoteFlag || lessThanFlag) {
      if (doubleQuoteFlag && rdfDocument[i] === '"') doubleQuoteFlag = false;
      else if (quoteFlag && rdfDocument[i] === "'") quoteFlag = false;
      else if (lessThanFlag && rdfDocument[i] === ">") lessThanFlag = false;
      continue;
    }

    // Set flags for quotes or angle brackets
    if (rdfDocument[i] === '"') {
      doubleQuoteFlag = true;
      continue;
    } else if (rdfDocument[i] === "'") {
      quoteFlag = true;
      continue;
    } else if (rdfDocument[i] === "<") {
      lessThanFlag = true;
      continue;
    }

    // if (i == 0) {
    //   console.log("prefix check:", rdfDocument.substring(0, 5).trim(), rdfDocument.substring(0, 5).trim().indexOf("@"));
    // }

    // Check for prefix declaration
    if (i === 0 && rdfDocument.substring(0, 5).trim().indexOf("@") == 0) {
      prefixFlag = true;
      continue;
    }

    // Process RDF triple or prefix when a period is encountered (end of triple)
    if (rdfDocument[i] === ".") {
      const statement = rdfDocument.substring(0, i + 1).trim();

      if (prefixFlag) {
        prefix.push(statement);
        prefixFlag = false;
      } else {
        rdfTriples.push(statement);
      }

      // Reset document and loop index
      rdfDocument = rdfDocument.substring(i + 1).trim();
      i = -1;
    }
  }//end loop

  console.log("prefix", prefix);
  console.log("rdfTriples", rdfTriples);

  return { prefix: prefix, triples: rdfTriples }

}

/**
 * Removes comments from a given Turtle (TTL) content string.
 *
 * @param {string} ttlContent - The original TTL content as a string.
 * @returns {string} - The TTL content with all comments removed.
 */
function removeComments(ttlContent) {
  // Split the original content by line breaks to process each line.
  const lines = ttlContent.split("\n");

  // Use map to create a new array where each line is processed to remove comments.
  const newLines = lines.map((line) => {
    // Find the index of the "#" character, which marks the start of a comment.
    const commentIndex = line.indexOf("#");

    // If "#" is not found, return the original line.
    if (commentIndex === -1) {
      return line;
    } else {
      // If "#" is found, return the substring before "#" and trim any trailing white space.
      return line.substring(0, commentIndex).trim();
    }
  });

  // Join the new lines into a single string and return.
  return newLines.join("\n");
}

function removeCommentsFromTTL(ttlString) {
  // This regex matches either:
  // 1) A line that starts with optional whitespace followed by a #, or
  // 2) A # symbol and everything after it until the end of the line
  return ttlString.replace(/^\s*#.*$|(\s*#.*)/gm, '').trim();
}

function getUsedPrefixes(prefixDeclarations, ttlString) {
  let usedPrefixes = '';

  prefixDeclarations.forEach(declaration => {
    // Handle @base and default @prefix :
    if (declaration.trim().startsWith('@base') || declaration.trim().startsWith('@prefix :')) {
      usedPrefixes += declaration.trim() + '\n';
      return;  // skip to the next iteration
    }

    // Extract the prefix name using regex
    const match = declaration.match(/@prefix\s+(\w*):/);
    if (match) {
      const prefix = match[1];
      // Check if the TTL string uses the extracted prefix
      const regex = new RegExp(`\\b${prefix}:`);
      if (regex.test(ttlString)) {
        usedPrefixes += declaration.trim() + '\n';
      }
    }
  });

  return usedPrefixes.trim();
}


/**
 * Extracts the subject of each RDF triple from an array of triples.
 *
 * @param {Array<string>} triplesArray - An array of RDF triples in string format.
 * @returns {Array<string>} - An array of extracted subjects from the provided triples.
 */
function extractSubjects(triplesArray) {
  // Regular expression to match the subject
  const subjectRegex = /^<[^>]+>|^\w+:\w+/;
  // Check if rdfs:comment is present and extract its value inside quotes.
  const commentRegex = /rdfs:comment "(.*?)"/;
  const subjects = [];

  // console.log("triplesArray", triplesArray

  triplesArray.forEach((triple) => {
    const subjectMatch = triple.match(subjectRegex);
    if (subjectMatch) {
      const commentMatch = triple.match(commentRegex);
      subjects.push(subjectMatch[0] + ": " + (commentMatch ? commentMatch[1] : ""));
    }
  });

  return subjects;
}

export default {
  addTemplate(template) {
    const len = templates.push(template);
    return len - 1; //return index
  },

  /**
   * if rdf arrays empty do indexing, else no need.
   * If you want to build new indexing call: buildIndex
   * @param String rdfDocument 
   */
  setRDF(rdfDocument) {
    // RDF = newRDF;
    if (rdfPrefixStore.length == 0 && rdfTriplesStore.length == 0) {
      const indexing = rdfTripleTokenizer(rdfDocument);
      // {prefix: prefix, triples: rdfTriples}
      rdfPrefixStore = indexing.prefix;
      rdfTriplesStore = indexing.triples;

      rdfSubgraphsStore = buildRdfSubgraphs(rdfTriplesStore);
    }
  },

  getMessageTemplate(role = "user", content) {
    return { "role": role, "content": content };
  },

  /**
   * Prepares a full RDF (Resource Description Framework) document from RDF embedding indexes,
   * optionally formatting the output as a list of RDF entities.
   *
   * @param {Array} rdfEmbeddingIndexes - An array of indexes or objects where each item represents an RDF embedding index.
   *                                      If an item is an object, it must have a property corresponding to the `indexKey`.
   * @param {boolean} [showAsEntityList=false] - If set to true, the output will be formatted as a list of RDF entities,
   *                                            otherwise, a formatted RDF document is returned.
   * @param {string} [indexKey='id'] - The key used to identify the index within objects in the `rdfEmbeddingIndexes` array.
   *
   * The function performs several key operations:
   * 1. Iterates through each index in `rdfEmbeddingIndexes`:
   *    - Retrieves the key based on `indexKey` or directly uses the index if it is not an object.
   *    - If the key exists in `rdfSubgraphsStore`, the corresponding RDF subgraph is added to `matchingRdfTriples`.
   * 2. Tokenizes the first RDF subgraph and initializes a Set to store unique RDF triples.
   * 3. Continues to tokenize and add RDF triples from the remaining RDF subgraphs to the Set to ensure uniqueness.
   * 4. Joins all unique triples into a single string to form the full RDF document.
   * 5. Applies RDF prefixes using `getUsedPrefixes` to ensure only relevant prefixes are included.
   * 6. If `showAsEntityList` is true, further processes the RDF document to extract and list all RDF subjects.
   *
   * @returns {string} - The formatted RDF document as a string or a list of RDF subjects, depending on `showAsEntityList`.
   */
  prepareFullRDF({ rdfEmbeddingIndexes, showAsEntityList = false, indexKey = 'id' }) {
    let matchingRdfTriples = [];

    // Loop through each index in the rdfEmbeddingIndexes array
    for (let index of rdfEmbeddingIndexes) {

      // Determine if index is an object and the indexKey is present, otherwise use index directly
      const key = typeof index === 'object' && index[indexKey] ? index[indexKey] : index;

      // Check if the current index's ID exists in rdfSubgraphsStore to avoid errors
      if (Object.prototype.hasOwnProperty.call(rdfSubgraphsStore, key)) {
        // Push the subgraph corresponding to the current index's ID into matchingRdfTriples
        matchingRdfTriples.push(rdfSubgraphsStore[key]);
        // matchingRdfTriples.push(rdfSubgraphsStore[rdfEmbeddingIndexes[0]["id"]]);
      }
    }

    // Initialize a Set to hold the unique graph triples
    let uniqueTriples = new Set(rdfTripleTokenizer(matchingRdfTriples[0]).triples);
    // let accumulatedGraphs = rdfTripleTokenizer(matchingRdfTriples[0]).triples;

    for (let i = 1; i < matchingRdfTriples.length; i++) {
      const currentGraph = rdfTripleTokenizer(matchingRdfTriples[i]).triples;
      // Add each triple from the current graph to the Set, automatically handling duplicates
      currentGraph.forEach(triple => uniqueTriples.add(triple));
    }

    const fullRDF = Array.from(uniqueTriples).join("\n");

    // console.log("rdfPrefixStore", rdfPrefixStore);

    let fullRDFDoc = getUsedPrefixes(rdfPrefixStore, fullRDF); //only includes prefix that matters

    // fullRDFDoc += "\n" + matchingRdfTriples.join("\n", matchingRdfTriples);
    fullRDFDoc += "\n" + fullRDF;
    // console.log("fullRDFDoc", fullRDFDoc)

    if (showAsEntityList) {
      const indexing = rdfTripleTokenizer(fullRDFDoc);
      console.log("indexing", indexing)
      const subjects = extractSubjects(indexing.triples)
      // {prefix: prefix, triples: rdfTriples}

      const entityList = subjects.join("\n");
      // console.log("entityList", entityList);
      return entityList;
    }

    return fullRDFDoc;
  },


  /**
   * Constructs a prompt array to be used with the model based on the given parameters.
   * 
   * @param {string} text - The main text to be used for prompting.
   * @param {Object} llmSetup - Configuration for the LLM (Language Model) setup: 
   *                          -  An array of Dictionary elements, such as:[{"key":"value"},{},{}...etc], should be provided, including:
   *                            - `model`: (optional) Specifies the model version, e.g., "gpt-3.5-turbo".
   *                            - `fewShotData`: (optional) Contextual examples, e.g., [{"user":"test1"}, {"assistant":"test1"}].
   *                            - `delimiter`: (optional) Delimiter for formatting, e.g., "####".
   *                            - `templateIndex`: (optional) template Index, default is 0.
   *                            - `templateData`: (optional), e.g., { RDF: "replace RDF with this", RDF2:"another text" }.
   * @returns {Object} A structured message array.
   */
  promptArray(text, llmSetup) {
    const DEFAULTS = {
      model: "gpt-3.5-turbo",
      temperature: 0,
      fewShotData: [], //[{"user":"test1"}, {"assistant":"test1"}]
      delimiter: "####",
      templateIndex: 0,
      templateData: {}, //{ RDF: "replace RDF with this" }
    };

    const validatedSetup = {
      ...DEFAULTS,
      ...llmSetup
    };


    let msgArray = { model: validatedSetup.model, messages: [], temperature: validatedSetup.temperature };

    // let fullRDFDoc = prepareFullRDF(rdfEmbeddingIndexes)
    // let fullRDFDoc = prepareEntityList(rdfEmbeddingIndexes)

    const filledTemplate = fillTemplate(templates[validatedSetup.templateIndex], validatedSetup.templateData);

    //prepare the system message (instructions, tone, ..etc) which exist in the templates.
    msgArray.messages.push(this.getMessageTemplate("system", filledTemplate));

    //preparing the few shot learning data.
    validatedSetup.fewShotData.forEach(obj => {
      for (let key in obj) {
        switch (key) {
          case 'user':
            // console.log(`User found: ${obj[key]}`);
            msgArray.messages.push(this.getMessageTemplate("user", `${validatedSetup.delimiter}${obj[key]}${validatedSetup.delimiter}`));
            break;
          default: //usually this for assistant, but we made it generic.
            // console.log(`Other key (${key}) found: ${obj[key]}`);
            msgArray.messages.push(this.getMessageTemplate(key, `${obj[key]}`));
            break;
        }//end switch
      }//end for loop
    });
    //user message
    msgArray.messages.push(this.getMessageTemplate("user", `${validatedSetup.delimiter}${text}${validatedSetup.delimiter}`));


    return msgArray;
  },

  parseTextToJson(text, json = {}) {
    console.log('parseTextToJson:', text);

    // Regular expression to match "```json" followed by any number of characters (non-greedy) until "```"
    // and replace it with only the part between "```json" and "```"
    text = String(text).replace(/```json\s*([\s\S]*?)\s*```/g, '$1');

    console.log('parseTextToJson: 2', text)

    //clean up
    text = text.replace(/\n/g, '').replace(/\s+/g, ' ');




    // Split text by known delimiters
    const parts = text.split(/({.*})/).filter(Boolean);

    const sentences = [];
    const jsonObjects = [];

    console.log('parts:', parts);

    parts.forEach((part) => {
      if (part.startsWith('{') && part.endsWith('}')) {
        // Try parsing JSON
        try {
          const jsonObject = JSON.parse(part);
          jsonObjects.push(jsonObject);
        } catch (e) {
          console.log('Invalid JSON:', e);
        }
      } else {
        sentences.push(part.trim());
      }
    });

    console.log('Sentences:', sentences);
    console.log('JSON Objects:', jsonObjects);
    return jsonObjects;
  },

  buildIndex(rdfDocument) {
    const indexing = rdfTripleTokenizer(rdfDocument);
    // {prefix: prefix, triples: rdfTriples}
    //{prefix: prefix, triples: rdfTriples}
    rdfPrefixStore = indexing.prefix;
    rdfTriplesStore = indexing.triples;

    rdfSubgraphsStore = buildRdfSubgraphs(rdfTriplesStore);
  },

  getRdfSubgraphsStore() {
    return rdfSubgraphsStore;
  },

  getRdfTriples() {
    return rdfTriplesStore;
  },

};
