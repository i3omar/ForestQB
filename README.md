# ForestQB - Forest Query Builder

[<img src="https://drive.google.com/uc?id=1G01R6SdQze5EkeYl9gqzCyIxNo73PQ7L" width="60%">](https://youtube.com/watch?v=0tyDlCxKMRk)


## Introduction
ForestQB, or the Forest Query Builder, is a cutting-edge toolkit designed to enhance the exploration and application of observational Linked Data (LD) within the field of wildlife research and conservation. Aimed at non-experts, ForestQB simplifies the process of formulating queries from RDF triplestores by integrating a graphical user interface (GUI) with a conversational user interface (CUI). This makes observational LD accessible to users without expertise in RDF or SPARQL.

Developed from insights gained through ethnographic studies with wildlife researchers, ForestQB improves accessibility to SPARQL endpoints and facilitates the exploration of observational LD, thereby playing a crucial role in wildlife conservation efforts.

1. For more details, please refer to our published paper: [https://doi.org/10.1145/3675759](https://doi.org/10.1145/3675759).

2. For integration with LLMs, please check to our newly published paper: [https://doi.org/10.1007/978-981-96-0573-6_18](https://doi.org/10.1007/978-981-96-0573-6_18)
  
## Key Features
- **User-Friendly Interface:** Combines a GUI with a CUI to simplify the query building process.
- **Accessibility:** Makes observational Linked Data accessible to non-experts.
- **Tailored for Conservation:** Designed specifically for wildlife research and conservation contexts.
- **Validated by Research:** User experiments confirm efficiency and user-friendliness.

## Demo
Explore how ForestQB works through our interactive demo and a detailed walkthrough video:
- **Demo Link:** [Try ForestQB here](https://forestqb.i3omar.com/)
- **Demo Video:** [Watch the demo on YouTube](https://youtube.com/watch?v=0tyDlCxKMRk)

### LLM Integration Demo
This demo shows how to integrate Large Language Models (LLMs) for advanced query capabilities using ForestQB. The video [ForestQB: LLM Integration](https://www.youtube.com/watch?v=SzzjMmkY1Og) covers:

* [0:13](https://www.youtube.com/watch?v=SzzjMmkY1Og&t=13s) **Generating RDF Embeddings:** Step-by-step guide on creating RDF embeddings for your data.
* [2:14](https://www.youtube.com/watch?v=SzzjMmkY1Og&t=134s) **Handling Complex Queries (Without LLM):** See how complex queries are processed without LLM assistance.
* [3:42](https://www.youtube.com/watch?v=SzzjMmkY1Og&t=222s) **Leveraging LLM Integration:** Learn how LLMs can answer complex queries, enhancing your application's intelligence.

### Dataset
To access the dataset used for developing and testing ForestQB, please visit the following link:
- [ForestQB Dataset](https://github.com/i3omar/ForestRDF)

### Rasa Model
For more information about the conversational model used in ForestQB, visit the Rasa model page:
- [ForestBot - Rasa Model](https://github.com/i3omar/ForestBot)

## Getting Started
### Prerequisite: API Setup

Before running the ForestQB app, you **must install and run the ForestQB API** backend.
You can find the API and setup instructions here: [https://github.com/i3omar/ForestQB-API](https://github.com/i3omar/ForestQB-API)

### Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/i3omar/ForestQB.git
cd ForestQB
```

2. Install dependencies:
```bash
npm install
````

3. Compiles and hot-reloads for development:
```bash
npm run serve
```

### Chatbot Setup Instructions

1. **Set Up ForestBot**
   To enable chatbot functionality, use **ForestBot**, the conversational agent for ForestQB.

   * Find the setup instructions and source code here: [ForestBot on GitHub](https://github.com/i3omar/ForestBot)

2. **Set Up a Vector Database**
   For LLM support, you’ll need a vector database. We recommend using [Qdrant](https://github.com/qdrant/qdrant).

   * To install the Qdrant client, run:

     ```bash
     pip install qdrant-client
     ```
   * Then, start the Qdrant container:

     ```bash
     docker run -p 6333:6333 qdrant/qdrant
     ```

3. **Run the Embedding Server**
    * Find the setup instructions and source code here: [EmbeddingServer on GitHub](https://github.com/i3omar/Forest-EmbeddingServer)

4. **Generate the RDF Embedding** — [Watch the demo video](https://www.youtube.com/watch?v=SzzjMmkY1Og&t=13s)

---


### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Settings & Customization

The core configuration for ForestQB is handled inside the Vuex store. The `settings` object controls backend endpoints, query templates, UI toggles, and more.
**You can customize these to match your own SPARQL endpoints or user experience needs.**

### Where to Edit

* All settings are found in the Vuex store file (`src/store.js`) within the `getDefaultState()` function under the `settings` key.

---

### Settings Object

Below are the main settings you’ll find and what each does:
| Key                                   | Description                                                            | How to Customise                                                                              |
| ------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `endpointURL`                         | Main SPARQL endpoint URL for queries.                                  | Set to your desired SPARQL server endpoint. Example: `"https://your-server.com/sparql"`       |
| `getSparqlURL`                        | API URL for retrieving SPARQL query templates or debugging.            | Set to your SPARQL parser endpoint, or leave as is for local/dev.                             |
| `rasaApiURL`                          | RASA chatbot API endpoint (proxy or direct).                           | Point to your RASA bot (local/proxy/remote).                                                  |
| `indexingServerURL`                   | LLM vector index build endpoint.                                       | Change to your own LLM/vector database API endpoint.                                          |
| `similaritySearchURL`                 | LLM vector/semantic search endpoint.                                   | Change to your own LLM/vector database search API endpoint.                                   |
| `collectionName`                      | Name for your vector search/indexing collection.                       | Change to a collection name relevant to your ontology or project.                             |
| `llm`                                 | Boolean: Enable LLM (Large Language Model) support.                    | Set `true` or `false` to enable/disable LLM in the UI.                                        |
| `useLLMVersion`                       | Boolean: Show/hide all LLM-related UI.                                 | Set `true` (show) or `false` (hide) all LLM options.                                          |
| `ontologyRdfTriple`                   | RDF/Turtle string: Default ontology definitions.                       | Paste your own RDF/Turtle content or edit via UI (if supported).                              |
| `timeout`                             | Axios/query timeout (ms).                                              | Change as needed for your network/server reliability (e.g. `60000` for 60s).                  |
| `searchTriplePattern`                 | Default SPARQL triple pattern for search (subject, predicate, object). | Change values if your ontology uses custom triple patterns.                                   |
| `searchTriplePatternTemplate`         | Object: Triple pattern templates per ontology.                         | Add or adjust templates for other ontologies (`"Your Ontology": {...}`)                       |
| `selectedSearchTriplePatternTemplate` | Currently selected triple pattern template (string).                   | Set to ontology key or `null` for auto-detect/custom.                                         |
| `queryTemplate`                       | SPARQL query templates for different tasks.                            | Edit SPARQL snippets, add new ones, or override specific templates via mutations.             |
| `isLoading`                           | Boolean: Application loading state.                                    | Controlled programmatically; no need to customise manually.                                   |
| `errorMsg`                            | Current error message.                                                 | Set/read programmatically on error.                                                           |
| `observableOptions`                   | Array of observable property options for pickers.                      | Populated by UI or custom endpoints; update using `setObservablesOptions` mutation if needed. |
| `displayForestQB`                     | Boolean: Show/hide main ForestQB interface.                            | Toggle UI feature visibility (`true` or `false`).                                             |
| `displayAdvanceView`                  | Boolean: Show/hide advanced view/developer section.                    | Toggle UI feature visibility (`true` or `false`).                                             |
                                        |



## Citation

If you use this code or dataset in your research, please cite our paper:

```bibtex
@article{10.1145/3675759,
author = {Mussa, Omar and Rana, Omer and Goossens, Benoit and Orozco Ter wengel, Pablo and Perera, Charith},
title = {ForestQB: Enhancing Linked Data Exploration through Graphical and Conversational UIs Integration},
year = {2024},
issue_date = {September 2024},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
volume = {2},
number = {3},
url = {https://doi.org/10.1145/3675759},
doi = {10.1145/3675759},
journal = {ACM J. Comput. Sustain. Soc.},
month = sep,
articleno = {32},
numpages = {33},
keywords = {Linked data, SPARQL, RDF, query builder, visual queryin}
}

@InProceedings{10.1007/978-981-96-0573-6_18,
author="Mussa, Omar
and Rana, Omer
and Goossens, Beno{\^i}t
and Orozco-terWengel, Pablo
and Perera, Charith",
editor="Barhamgi, Mahmoud
and Wang, Hua
and Wang, Xin",
title="Towards Enhancing Linked Data Retrieval in Conversational UIs Using Large Language Models",
booktitle="Web Information Systems Engineering -- WISE 2024",
year="2025",
publisher="Springer Nature Singapore",
address="Singapore",
pages="246--261",
isbn="978-981-96-0573-6"
}



```
## Contact
For more information or queries regarding ForestQB, please [contact us](https://orcid.org/0000-0001-8614-6550).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.