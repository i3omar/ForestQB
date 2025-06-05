/*
==============================================================================
ForestQB-V2 Vuex Store
==============================================================================

Created by: OMAR MUSSA
Copyright © 2023–2025 OMAR MUSSA. All rights reserved.

This file contains the Vuex state management logic for the ForestQB application.
It provides centralized state, mutations, actions, and getters for all 
core functionality, including:
  - Core app state reflecting UI, query, and data results
  - Settings, endpoints, and templates for multiple ontologies (Forest/SOSA)
  - Mutations for user actions and data flow
  - Actions for API (axios) and dynamic endpoint/ontology detection
  - Complex getters for computed state, query preparation, and templates

NOTES:
  - Designed for extensible SPARQL query builder and sensor exploration apps
  - Integrates with all main ForestQB components
  - Utility functions (`parse`, `prepareTripleEntity`, etc) included at bottom
  - Modular with examples, map area data, and deep resets

EXPORTS:
  - Vuex.Store instance

==============================================================================
*/

import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import _ from "lodash";

// import createPersistedState from "vuex-persistedstate";
import { examplesData, sosaExamplesData, mapAreasData, sosaMapAreasData } from "./examples.js";

Vue.use(Vuex);
const thisComponent = this;


const getExamplesState = (key, ontology) => {
  if (ontology == "Forest Ontology") {
    return examplesData[key];
  } else {
    return sosaExamplesData[key];
  }
}

/**
 * Get predefined map areas.
 * 
 * @param {string} ontology - Ontology key
 * @returns {object} Map areas data
 */
const getMapAreasState = (ontology) => {
  if (ontology == "Forest Ontology") {
    return mapAreasData;
  } else {
    return sosaMapAreasData;
  }
}

/**
 * Generate a new default application state.
 * Ensures a clean, immutable starting state for the store.
 * 
 * @returns {object} New default state object.
 */
const getDefaultState = () => {
  return {
    coreStore: { //This represent the exact UI choices.
      mapFilters: {
        nearby: [],   // List of 'nearby' map spatial filters
        within: []    // List of 'within area' spatial filters
      },
      observablesKeys: [],    // URIs of selected observable properties
      observables: [],        // Detailed observable objects (e.g. sensors, properties)
      predicates: {},         // Predicates grouped by observable key
      datePicker: { value: [null, null], filterIds: [null, null] }, // Date range UI state
      sortBy: { expression: "!none", direction: "desc" }, // Sorting config
      limit: 100              // Result limit for queries
    },
    queryJSON: { // This will represent the above data for the API of the SPARQL Query generator.
      observablesKeys: [],
      observables: [],
      filters: {},
      sortBy: { expression: "!none", direction: "desc" },
      limit: 100
    },
    sparqlQuery: String(), // For the generated SPARQL query
    queryResult: String(), // The returned results of the above SPARQL query


    settings: { // contains the main app settings
      endpointURL: "http://localhost:8081/sparql",
      getSparqlURL: "http://localhost:8081/getSparql",

      // rasaApiURL: "http://localhost:5005/webhooks/rest/webhook", //port default 5005
      rasaApiURL: "http://localhost:8081/forestBot/proxy", // RASA Chatbot API endpoint (proxy)


      llmApiURL: "http://localhost:8081/forestBot/llm/proxy", // LLM proxy URL
      modelName: "gpt-3.5-turbo", //The LLM Name
      indexingServerURL: "http://localhost:8081/forestBot/llm/collection/build", // LLM vector indexing server
      similaritySearchURL: "http://localhost:8081/forestBot/llm/collection/search", // LLM semantic search endpoint

      collectionName: "rdf_ontology", //Name of the collection for the vector server
      llm: true, // Enable LLM support - this can be changed from UI settings.
      useLLMVersion: true, // (set to false if using the version without LLM support, and true otherwise). false: The LLM feature will be completely hidden from the user interface.
      ontologyRdfTriple: // RDF definitions: If you have custom definitions, specify them here or use the UI settings to update.
        `
@prefix : <http://api.stardog.com/> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix xsd: <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix sosa: <http://www.w3.org/ns/sosa/> .
@prefix geo: <http://www.w3.org/2003/01/geo/wgs84_pos#> .
@prefix qudt: <http://qudt.org/schema/qudt#> .
@prefix unit: <http://qudt.org/vocab/unit#> .

@base  <http://example.org/> .


<property/temperature> a sosa:ObservableProperty;
   rdfs:label "Temperature"@en ;
   rdfs:comment "The internal temperature of the sensor or the temperature of the environment in which the sensor is placed."@en .

<property/direction> a sosa:ObservableProperty;
   rdfs:label "Direction"@en ;
   rdfs:comment "The sensor's compass bearing or the direction in which a moving sensor is headed."@en .

<property/speed> a sosa:ObservableProperty;
   rdfs:label "Speed"@en ;
   rdfs:comment "The speed at which the sensor platform is moving."@en .

<property/PDOP> a sosa:ObservableProperty;
   rdfs:label "PDOP"@en ;
   rdfs:comment "Position Dilution of Precision, a term used in GPS technology to describe the effect of satellite geometry on positional measurement precision. Ideal value is 1. Values between 1-2 are excellent, 2-5 acceptable, above 5 indicates poor accuracy."@en .

sosa:resultTime a sosa:ObservableProperty;
   rdfs:label "Result Time"@en ;
   rdfs:comment "This property links an instance of sosa:Observation or sosa:Actuation to the time at which the observation result was generated or the actuation was completed, respectively. The time is represented according to the datetime standard in the XML schema, which follows the ISO 8601 standard."@en .

geo:alt a sosa:ObservableProperty;
   rdfs:label "Altitude"@en ;
   rdfs:comment "The sensor's height above a fixed reference point, usually sea level."@en .

geo:lat a sosa:ObservableProperty;
   rdfs:label "Latitude"@en ;
   rdfs:comment "The sensor's north-south position on the Earth's surface."@en .

geo:long a sosa:ObservableProperty;
   rdfs:label "Longitude"@en ;
   rdfs:comment "The sensor's east-west position on the Earth's surface."@en .

<property/HDOP>  a sosa:ObservableProperty;
   rdfs:label "Horizontal Dilution of Precision"@en;
   rdfs:comment "Short for Horizontal Dilution of Precision, a measure used in GPS and GNSS systems to describe the quality of positional data. Values between 1 and 2 are excellent, 2 to 5 are acceptable, and above 5 are considered poor. Lower values represent better data." .

<property/type>  a sosa:ObservableProperty; 
   rdfs:label "Type"@en ;
   rdfs:comment "The type of sensor generating the data, which is typically either GPS or VHF."@en .

<property/extTemp> a sosa:ObservableProperty; 
   rdfs:label "External Temperature"@en;
   rdfs:comment "The temperature of the environment outside of the sensor."@en .

<property/count> a sosa:ObservableProperty;
   rdfs:label "Count"@en ; 
   rdfs:comment "A way of keeping track of how many times a certain event has occurred or how many observations have been recorded."@en .

<property/cov> a sosa:ObservableProperty;
   rdfs:label "Covariance"@en ;
   rdfs:comment "Covariance, a measure of how much two random variables vary together."@en .

<property/activity> a sosa:ObservableProperty;
   rdfs:label "Activity"@en ;
   rdfs:comment "The status or operation the sensor is currently engaging in."@en .

<property/distance> a sosa:ObservableProperty;
   rdfs:label "Distance"@en ;
   rdfs:comment "The distance the sensor has traveled or the distance to a particular object or event that the sensor is measuring."@en .


<elephant/Aqeela> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Aqeela"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>,
                  <property/direction>,
                  <property/speed>,
                  <property/PDOP>,
                  sosa:resultTime,
                  geo:alt,
                  geo:lat,
                  geo:long;
                  sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Putut> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Putut"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .

<elephant/Liun> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Liun"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Abaw> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Abaw"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Bikang1> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Bikang1"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Bikang2> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Bikang2"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Dara> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Dara"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/activity>,
                  <property/temperature>,
                  <property/direction>,
                  <property/speed>,
                  <property/extTemp>,
                  <property/HDOP>,
                  <property/cov>,
                  <property/count>,
                  <property/distance>,
                  sosa:resultTime,
                  geo:alt,
                  geo:lat,
                  geo:long;
                  sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Guli> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Guli"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Ita> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Ita"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Jasmin> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Jasmin"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Jasper> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Jasper"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Kasih> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Kasih"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Kuma> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Kuma"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Maliau> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Maliau"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Merotai> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Merotai"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Puteri> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Puteri"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Sandi> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Sandi"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Sejati> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Sejati"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Tulid> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Tulid"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Seri> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Seri"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Tunglap> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Tunglap"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<elephant/Umas2> a sosa:Sensor ;
   rdfs:label "Elephant GPS Collar for Umas2"@en ;
   rdfs:comment "A GPS tracking collar specifically designed for monitoring elephant movements and behavior.";
   sosa:observes  <property/temperature>, <property/direction>, <property/speed>, <property/PDOP>, sosa:resultTime, geo:alt, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Elephant> .


<python/Juling> a sosa:Sensor ;
   rdfs:label "Python VHF Chip"@en ;
   rdfs:comment "A very high frequency (VHF) chip specifically designed for tracking python movements.";
   sosa:observes  <property/speed>, <property/HDOP>, <property/type>, sosa:resultTime, geo:lat, geo:long;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Python> .


<property/capturedImage> a sosa:ObservableProperty;
   rdfs:label "Captured Image"@en ;
   rdfs:comment "Image captured by the camera trap, usually in JPEG or PNG format."@en .

<property/capturedVideo> a sosa:ObservableProperty;
   rdfs:label "Captured Video"@en ;
   rdfs:comment "Video captured by the camera trap, usually in MP4 or AVI format."@en .


<sensor/cameraTrap1> a sosa:Sensor ;
   rdfs:label "Camera Trap 1"@en ;
   rdfs:comment "Camera designed for capturing images of wildlife for monitoring and research purposes."@en;
   sosa:observes <property/capturedImage> ;
   geo:lat "5.470379597944459"^^xsd:float ;
   geo:long "117.83454895019533"^^xsd:float .

<sensor/cameraTrap2> a sosa:Sensor ;
   rdfs:label "Camera Trap 2"@en ;
   rdfs:comment "Camera designed for capturing images of wildlife for monitoring and research purposes."@en;
   sosa:observes <property/capturedImage> ;
   geo:lat "5.4695251995096"^^xsd:float ;
   geo:long "117.87935256958009"^^xsd:float .

<sensor/cameraTrap3> a sosa:Sensor ;
   rdfs:label "Camera Trap 3"@en ;
   rdfs:comment "Camera designed for capturing videos to monitor and research Proboscis monkey behavior."@en;
   sosa:observes <property/capturedVideo> ;
   geo:lat "5.476702108427593"^^xsd:float ;
   geo:long "117.85737991333009"^^xsd:float .

<property/waterLevel> a sosa:ObservableProperty;
   rdfs:label "Water Level"@en ;
   rdfs:comment "The observed water level of the river, measured in meters."@en ;
   qudt:unit unit:Meter ;
   qudt:quantityKind qudt:Length .

<sensor/riverSensor> a sosa:Sensor ;
   rdfs:label "River Water Level Sensor"@en ;
   rdfs:comment "Sensor designed for monitoring Kinabatangan River levels, with a warning level at 9.3 meters and danger level at 10.3 meters."@en;
   sosa:observes <property/waterLevel>;
   geo:lat "5.4787560833314055"^^xsd:float ;
   geo:long "117.86325418681373"^^xsd:float .


<property/soilMoisture> a sosa:ObservableProperty;
   rdfs:label "Soil Moisture"@en ;
   rdfs:comment "The observed moisture level of the soil, measured in volumetric water content."@en .

<property/soilTemperature> a sosa:ObservableProperty;
   rdfs:label "Soil Temperature"@en ;
   rdfs:comment "The observed temperature of the soil, measured in Celsius."@en .

<sensor/soilSensor1> a sosa:Sensor ;
   rdfs:label "Soil Sensor 1"@en ;
   rdfs:comment "Sensor designed for monitoring soil moisture and temperature.";
   sosa:observes <property/soilMoisture>, <property/soilTemperature> ;
   geo:lat "5.473258667631439"^^xsd:float ;
   geo:long "117.84721752104818"^^xsd:float .

<sensor/soilSensor2> a sosa:Sensor ;
   rdfs:label "Soil Sensor 2"@en ;
   rdfs:comment "Sensor designed for monitoring soil moisture and temperature.";
   sosa:observes <property/soilMoisture>, <property/soilTemperature> ;
   geo:lat "5.4697733631650935"^^xsd:float ;
   geo:long "117.87007771083155"^^xsd:float .


<property/airTemperature> a sosa:ObservableProperty;
   rdfs:label "Air Temperature"@en ;
   rdfs:comment "The observed air temperature, measured in Celsius."@en .
   
<property/windSpeed> a sosa:ObservableProperty;
   rdfs:label "Wind Speed"@en ;
   rdfs:comment "The observed speed of the wind, measured in m/s."@en .

<sensor/weatherSensor1> a sosa:Sensor ;
   rdfs:label "Weather Sensor 1"@en ;
   rdfs:comment "Sensor designed for monitoring weather conditions like air temperature and wind speed installed on DGFC.";
   sosa:observes <property/airTemperature>, <property/windSpeed> ;
   geo:lat "5.413936752243899"^^xsd:float ;
   geo:long "118.03761835639321"^^xsd:float .


<property/treeHeight> a sosa:ObservableProperty;
   rdfs:label "Tree Height"@en ;
   rdfs:comment "The height of a tree, measured in meters, important for monitoring forest health."@en .

<property/treeSpecies> a sosa:ObservableProperty;
   rdfs:label "Tree Species"@en ;
   rdfs:comment "The species of the tree, important for biodiversity studies."@en .

<property/treeAge> a sosa:ObservableProperty;
   rdfs:label "Tree Age"@en ;
   rdfs:comment "The estimated age of the tree, often calculated by counting growth rings."@en .

<property/treeDiameter> a sosa:ObservableProperty;
   rdfs:label "Tree Diameter"@en ;
   rdfs:comment "The diameter of the tree at breast height (DBH), measured in centimeters."@en .

<property/crownWidth> a sosa:ObservableProperty;
   rdfs:label "Crown Width"@en ;
   rdfs:comment "The width of the tree's crown, measured in meters."@en .

<property/barkType> a sosa:ObservableProperty;
   rdfs:label "Bark Type"@en ;
   rdfs:comment "Information about the type of bark the tree has, used for identification and assessing health."@en .

<property/leafType> a sosa:ObservableProperty;
   rdfs:label "Leaf Type"@en ;
   rdfs:comment "Information about the tree's leaves, such as shape, size, and color, used for identification."@en .

<property/healthStatus> a sosa:ObservableProperty;
   rdfs:label "Health Status"@en ;
   rdfs:comment "An assessment of the tree's overall health, such as whether it shows signs of disease or infestation."@en .

<property/rootCondition> a sosa:ObservableProperty;
   rdfs:label "Root Condition"@en ;
   rdfs:comment "Information on the state of the tree's root system, indicating the tree's overall stability and health."@en .

<property/fruitSeedPresence> a sosa:ObservableProperty;
   rdfs:label "Fruit/Seed Presence"@en ;
   rdfs:comment "Information about whether the tree is bearing fruit or seeds, important for studies on tree reproduction."@en .

<manual/treeProject1> a sosa:Sensor ;
   rdfs:label "Meranti Tree Project-1"@en ;
   rdfs:comment "Manual measurements taken by biologists for Meranti tree project: height, species, and other relevant information.";
   sosa:observes <property/treeHeight>, <property/treeSpecies>, <property/treeAge>, <property/treeDiameter>, <property/crownWidth>, <property/barkType>, <property/leafType>, <property/healthStatus>, <property/rootCondition>, <property/fruitSeedPresence> ;
   geo:lat "5.4144368505567595"^^xsd:float ;
   geo:long "118.03729057292004"^^xsd:float ;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Meranti> .


<manual/treeProject2> a sosa:Sensor ;
   rdfs:label "Meranti Tree Project-2"@en ;
   rdfs:comment "Manual measurements taken by biologists for Meranti tree project: height, species, and other relevant information.";
   sosa:observes <property/treeHeight>, <property/treeSpecies>, <property/treeAge>, <property/treeDiameter>, <property/crownWidth>, <property/barkType>, <property/leafType>, <property/healthStatus>, <property/rootCondition>, <property/fruitSeedPresence> ;
   geo:lat "5.414354785767392"^^xsd:float ;
   geo:long "118.0369610989692"^^xsd:float ;
   sosa:hasFeatureOfInterest <ontologies/featureOfInterest/forest#Meranti> .
`,

      timeout: 60000,
      searchTriplePattern: {
        subject: "?s",
        predicate: "http://www.w3.org/ns/sosa/madeBySensor",
        object: "%s"
      },

      searchTriplePatternTemplate: {
        "Forest Ontology": {
          subject: "?s",
          predicate: "%s",
          object: "?o"

        },
        "SOSA Ontology": {
          subject: "?s",
          predicate: "http://www.w3.org/ns/sosa/madeBySensor",
          object: "%s"

        }
      },
      selectedSearchTriplePatternTemplate: null, //"SOSA Ontology"

      queryTemplate: {
        findKeywordURI: `PREFIX sosa: <http://www.w3.org/ns/sosa/>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        
        SELECT ?entityUri ?type WHERE {
          ?entityUri rdf:type ?type .
          FILTER (CONTAINS(lcase(STR(?entityUri)), lcase("%keyword")))
          FILTER (?type = sosa:Sensor || ?type = sosa:ObservableProperty)
        }
        `,
        observedPropertiesBase: "SELECT ?predicate (DATATYPE(?obj) as ?datatype) (SAMPLE(?obj) AS ?object) WHERE {?s ?predicate ?obj. {SELECT * {%pattern} LIMIT 1}} GROUP BY ?predicate ?obj",
        sensorsSearchBase:
          `SELECT  DISTINCT ?sensor ?featureOfInterest ?lat ?long ?label ?comment 
{%pattern. FILTER(regex(lcase(str(?sensor)), "%keyword" ))
    OPTIONAL { ?sensor <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?featureOfInterest . }
    OPTIONAL { ?sensor <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . }
    OPTIONAL { ?sensor <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . }
    OPTIONAL { ?sensor rdfs:label ?label . }
    OPTIONAL { ?sensor rdfs:comment ?comment . }
}
GROUP BY ?sensor ?label ?comment ?featureOfInterest ?lat ?long`,

        //for pure SOSA:
        predicatesSearch: "SELECT ?predicate (DATATYPE(?object) as ?datatype) (SAMPLE(?obj) AS ?object) WHERE {?s ?predicate ?obj. {SELECT * {?s <http://www.w3.org/ns/sosa/madeBySensor> <%s>} LIMIT 1}} GROUP BY ?predicate",

        sensors:
          `SELECT * { ?p a <http://www.w3.org/ns/sosa/Sensor> .
OPTIONAL { ?p <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?featureOfInterest . }
OPTIONAL { ?p <http://www.w3.org/2003/01/geo/wgs84_pos#lat> ?lat . }
OPTIONAL { ?p <http://www.w3.org/2003/01/geo/wgs84_pos#long> ?long . }
OPTIONAL { ?p rdfs:label ?label . }
OPTIONAL { ?p rdfs:comment ?comment . }
}`,
        sensor: 'SELECT * {<%s> <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?featureOfInterest}',
      },
      isLoading: false, //defualt value is false - for the loading indicator.
      errorMsg: undefined, //default value is undefined - until we get error.
      observableOptions: [], //for the observables picker.
      displayForestQB: true, //display or hide forestQB
      displayAdvanceView: false, //display or hide Development Section / Advance View
    }

  }
}


export default new Vuex.Store({
  state: getDefaultState(),
  actions: {

    axios(state, { method, url, data, params, timeout = 60000, cancelToken }) {

      const token = localStorage.getItem('access_token');
      let axiosData = {
        method: method,
        url: url,
        // headers: {"Authorization" : `Bearer ${token}`},
        data: data,
        params: params,
        timeout: timeout,
        cancelToken: cancelToken
      };

      // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("access_token");
      return new Promise((resolve, reject) => {
        axios(axiosData).then(response => {
          resolve(response);
        }).catch(error => {

          reject(error);
        });
      });
    },
    async determineEndpointOntology({ dispatch, state, commit, context }, { uri }) {

      const keys = Object.keys(state.settings.searchTriplePatternTemplate);


      let server_response = undefined;

      for (let i = 0; i < keys.length; i++) {

        const s = prepareTripleEntity(state.settings.searchTriplePatternTemplate[keys[i]].subject.trim());
        const p = prepareTripleEntity(state.settings.searchTriplePatternTemplate[keys[i]].predicate.trim());
        const o = prepareTripleEntity(state.settings.searchTriplePatternTemplate[keys[i]].object.trim());

        const parsedQuery = parse("ASK  { " + s + " " + p + " " + o + " }", uri);
        //console.log("parsedQuery", parsedQuery);

        try {

          await dispatch("axios", {
            method: "post",
            url: state.settings.endpointURL,
            data: {
              // query: "ASK  {?Aqeela_Subject <http://example.org/elephant/Aqeela> ?Aqeela_Object}",
              query: parsedQuery,

            },
            params: null,
            cancelToken: null,
            timeout: state.settings.timeout,
          })
            .then(
              (response) => {
                server_response = response;
                // console.log(
                //   "response -->",
                //   response.status,
                //   server_response.data
                // );
              },
              (error) => {
                throw error;
              }
            );

          if (server_response === undefined) {
            // console.log(data);
            throw new Error("No proper server response!");
          }

          if (server_response.data.boolean) {
            console.log("detected ontology is", keys[i]);
            // state.settings.selectedSearchTriplePatternTemplate = keys[i];

            commit('setSelectedSearchTriplePatternTemplate', keys[i]);

            commit("setSearchTriplePattern", {
              key: "subject",
              value: state.settings.searchTriplePatternTemplate[keys[i]].subject,
            });

            commit("setSearchTriplePattern", {
              key: "predicate",
              value: state.settings.searchTriplePatternTemplate[keys[i]].predicate,
            });

            commit("setSearchTriplePattern", {
              key: "object",
              value: state.settings.searchTriplePatternTemplate[keys[i]].object,
            });

            break;
          }

          if ((i + 1) == keys.length) {
            commit('setSelectedSearchTriplePatternTemplate', 'custom');
          }

        } catch (error) {
          console.error("error -->", error);
        }
      }
    }
  },
  mutations: {
    setSettings(state, { key, value }) {
      Vue.set(state.settings, key, value);
    },
    setEndpointURL(state, obj) {
      state.settings.endpointURL = obj;
    },
    setSparqlParserUrl(state, obj) {
      state.settings.getSparqlURL = obj;
    },
    setSensorsTemplate(state, obj) {
      state.settings.queryTemplate.sensors = obj;
    },
    setOntologyRdfTriple(state, obj) {
      state.settings.ontologyRdfTriple = obj;
    },
    setLLM(state, obj) {
      state.settings.llm = obj;
    },
    setToUseLLMVersion(state, obj) {
      state.settings.useLLMVersion = obj;
    },
    setPredicatesSearchTemplate(state, obj) {
      state.settings.queryTemplate.predicatesSearch = obj;
    },
    setSearchTriplePattern(state, { key, value }) {
      Vue.set(state.settings.searchTriplePattern, key, value);
    },
    setSelectedSearchTriplePatternTemplate(state, obj) {
      state.settings.selectedSearchTriplePatternTemplate = obj;
    },
    setSPARQL(state, obj) {
      state.sparqlQuery = obj;
    },

    //set nearby map filter
    setMapNearbyFilters(state, obj) {
      state.coreStore.mapFilters.nearby = obj;
    },
    setMapWithinFilters(state, obj) {
      state.coreStore.mapFilters.within = obj;
    },
    setDatePicker(state, obj) {
      if (state.coreStore.datePicker && state.coreStore.datePicker.value) {
        state.coreStore.datePicker.value = obj;
      } else {
        state.coreStore.datePicker = { value: obj, filterIds: [null, null] }
      }
    },
    setDatePickerIds(state, obj) {
      if (state.coreStore.datePicker && state.coreStore.datePicker.filterIds) {
        state.coreStore.datePicker.filterIds = obj;
      } else {
        state.coreStore.datePicker = { value: [null, null], filterIds: obj }
      }

    },

    setMapNearbyFilterRadius(state, { index, radius }) {
      state.coreStore.mapFilters.nearby[index].radius = radius;
    },
    setLimit(state, obj) {
      state.coreStore.limit = obj;
    },
    setSortByExp(state, obj) {
      state.coreStore.sortBy.expression = obj;
    },
    setSortByDir(state, obj) {
      //{expression:"", direction:"DESC"},
      state.coreStore.sortBy.direction = obj;
    },
    setResult(state, obj) {
      state.queryResult = obj;
    },
    setObservablesOptions(state, obj) {
      state.settings.observableOptions = obj;
    },
    setObservables(state, obj) {
      // Check if the new list of observables (obj) is different from the current list (state.coreStore.observables)
      // Also check if the new list is shorter (i.e., items were removed)
      if ((obj !== state.coreStore.observables) && (obj.length < state.coreStore.observables.length)) {
        // _.pullAll removes all values in obj from state.coreStore.observables and returns the removed values
        let removedVal = _.pullAll(state.coreStore.observables, obj);
        // Optional: Log the removed values
        // console.log("removedVal => ", JSON.stringify(removedVal));

        // Loop over each item that was removed
        for (let i = 0; i < removedVal.length; i++) {
          // Specifically, it is deleting entries from the predicates object in the store.
          // Each observable has a `uri` property that serves as its key in the predicates object.
          Vue.delete(state.coreStore.predicates, removedVal[i].uri);
        }
      }

      // After handling deletions, assign the new list of observables to state.coreStore.observables.
      // This replaces the old observable list with the new one (obj).
      state.coreStore.observables = obj;
    },

    setPredicates(state, payload) {
      //state.coreStore.predicates[payload.uri] = payload.value;

      // Use Vue.set to ensure reactivity when adding or updating the predicate.
      // This adds or updates the entry at payload.uri with payload.value.
      Vue.set(state.coreStore.predicates, payload.uri, payload.value);

    },

    setObservable(state, payload) {
      for (let i = 0; i < state.coreStore.observables.length; i++) {
        if (state.coreStore.observables[i].uri == payload.uri) {
          Vue.set(state.coreStore.observables, i, payload.value);
          break;
        }
      }
    },


    /**
     *  This is mainly used by the UpperDatePickerComponent.vue to add the date when date range is selected.
     *
     * The function is used to modify the a specific Predicate Filters
     * @param state
     * @param key observable (parent) predicates key.
     * @param predicateUri the wanted predicate uri to be used for the index search. (Has to be in the array)
     * @param value the filters to be overwritten.
     */
    setPredicateFilters(state, { key, predicateUri, value }) {

      console.log("setPredicateFilters: key=>", key, " predicateUri=>", predicateUri, " value=>", value);

      let index = _.findIndex(state.coreStore.predicates[key], function (o) {
        return o.uri == predicateUri;
      });

      if (index == -1) {
        console.log("Ooops! Can't set predicate, index was not found!");
        return;
      }

      //state.coreStore.predicates[key][index] = value;
      Vue.set(state.coreStore.predicates[key][index], "filters", value);
    },

    /**
     * This is mainly used by the UpperDatePickerComponent.vue to delete the date when cleared.
     *
     * It is main job to find a specific filter for a predicate using its index and delete it.
     * @param state
     * @param key the parent observable uri
     * @param predicateUri the predicate with that filter
     * @param filterIndex the index of the filter to be deleted.
     */
    deletePredicateFilter(state, { key, predicateUri, filterIndex }) {

      let index = _.findIndex(state.coreStore.predicates[key], function (o) {
        return o.uri == predicateUri;
      });
      if (index == -1) {
        console.log("Ooops! Can't set predicate, index was not found!");
        return;
      }

      //state.coreStore.predicates[key][index].filters.splice(filterIndex, 1);
      Vue.delete(state.coreStore.predicates[key][index].filters, filterIndex);
    },
    pushPredicateFilter(state, { parentKey, predicateIndex, newFilter }) {

      state.coreStore.predicates[parentKey][predicateIndex].filters.push(newFilter);

    },

    /**
     * To set an example, Reminder: the selecting all in  predicate-search need to be disabled.
     * @param state
     * @param value
     */
    setExample(state, { value, newState = null }) {
      if (value == null) {
        // Vue.set(state, "coreStore", {
        //   mapFilters: {
        //     nearby: [],
        //     within: []
        //   },
        //   observablesKeys: [],
        //   observables: [],
        //   predicates: {},
        //   sortBy: {
        //     expression: "!none",
        //     direction: "DESC"
        //   },
        //   limit: 100
        // });
        console.log("reset triggered");
        const observableOptions = state.settings.observableOptions;
        if (newState == null) {
          let currTriplePatternTemplate = getDefaultState();
          currTriplePatternTemplate.settings.selectedSearchTriplePatternTemplate = state.settings.selectedSearchTriplePatternTemplate;
          Object.assign(state, currTriplePatternTemplate);
        } else {
          Object.assign(state, newState);
        }

        state.settings.observableOptions = observableOptions;
      } else if (value == "null") {
        Object.assign(state.coreStore, getDefaultState().coreStore);
      }
      else {
        // Vue.set(state, "coreStore", _.cloneDeep(value));

        //const observableOptions = state.settings.observableOptions;
        Object.assign(state.coreStore, getExamplesState(value, state.settings.selectedSearchTriplePatternTemplate));
        //state.settings.observableOptions = observableOptions;
      }
    }
  },
  getters: {
    //get all predicates linked to the entity (with the uri)
    getPredicates: (state) => (uri) => state.coreStore.predicates[uri],
    getExamples: (state) => getExamplesState("examples", state.settings.selectedSearchTriplePatternTemplate),
    getMapAreas: (state) => getMapAreasState(state.settings.selectedSearchTriplePatternTemplate),
    getMapNearbyFilters: (state) => state.coreStore.mapFilters.nearby,
    getMapFilterDistance: (state) => (index) => (state.coreStore.mapFilters.nearby[index].radius / 1000).toFixed(2),

    getMapWithinFilters: (state) => state.coreStore.mapFilters.within,
    getDatePicker: (state) => state.coreStore.datePicker.value,
    getDatePickerIds: (state) => state.coreStore.datePicker.filterIds,


    getObservable: (state) => (uri) => {
      for (let i = 0; i < state.coreStore.observables.length; i++) {
        if (state.coreStore.observables[i].uri == uri) {
          return state.coreStore.observables[i];
        }
      }
      return undefined;
    },

    /**
     * This getter will return a list of all predicates combined without any duplicates.
     * @param state
     * @returns {string[]}
     */
    getPredicatesList: (state) => {
      let list = {};
      state.coreStore.sortBy.recommended = undefined;
      // console.log("getPredicatesList");


      for (let x = 0; x < state.coreStore.observables.length; x++) {//1. for every observables

        let curObserURI = state.coreStore.observables[x].uri; //2. with this uri

        //3. if it has predicates
        if (state.coreStore.predicates[curObserURI] && state.coreStore.predicates[curObserURI].length) {
          //4. add them to the list.
          for (let y = 0; y < state.coreStore.predicates[curObserURI].length; y++) {
            list[state.coreStore.predicates[curObserURI][y].name] = true;


            //find recommended sort by item, useful for Chatbot.
            if (!state.coreStore.sortBy.recommended && state.coreStore.predicates[curObserURI][y].datatype && state.coreStore.predicates[curObserURI][y].datatype.value) {
              if (state.coreStore.predicates[curObserURI][y].datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#date") {
                state.coreStore.sortBy.recommended = state.coreStore.predicates[curObserURI][y].name;
              } else if (state.coreStore.predicates[curObserURI][y].datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#datetime") {
                state.coreStore.sortBy.recommended = state.coreStore.predicates[curObserURI][y].name;
              }
            }

          }
        }
      }


      //If the list updated and the expression not in the list anymore, update the expression none.
      if (!list[state.coreStore.sortBy.expression]) {
        state.coreStore.sortBy.expression = "!none";
      }


      return Object.keys(list);
    },

    //get a specific predicate linked to specific entity (with the uri)
    getPredicate: (state) => (parentKey, predicateUri) => {
      let index = _.findIndex(state.coreStore.predicates[parentKey], function (o) {
        return o.uri == predicateUri;
      });

      if (index == -1) {
        console.log("Ooops! index was not found!");
        return -1;
      }
      return state.coreStore.predicates[parentKey][index];
    },
    //get filters of a specific predicate (predicateUri) linked to specific entity (Key: parent with the uri)
    getPredicateFilters: (state) => (key, predicateUri) => {
      let index = _.findIndex(state.coreStore.predicates[key], function (o) {
        return o.uri == predicateUri;
      });

      if (index == -1) {
        console.log("Ooops! index was not found!");
        return -1;
      }
      return state.coreStore.predicates[key][index].filters;
    },

    getCore: (state) => state.coreStore,
    getSPARQL: (state) => state.sparqlQuery,
    getResult: (state) => state.queryResult,

    getToUseLLMVersion: (state) => {
      return state.settings.useLLMVersion;
    },

    

    /**
     * Converts the current state of coreStore into a structured queryJSON object.
     *
     * This function is responsible for:
     * 
     * - Transforming the coreStore observables and predicates into a query-ready JSON format.
     * - Mapping observables to their corresponding filters.
     * - Incorporating special geospatial filters ("nearby" and "within") based on mapFilters configuration.
     * - Applying global query settings such as result limit and sorting order.
     * - Building a "sensorPattern" object to represent the triple pattern for the query's subject, predicate, and object.
     * 
     * Key Steps:
     * 1. Initializes an empty queryJSON structure with observablesKeys, observables, and filters.
     * 2. Populates observablesKeys and observables arrays from state.coreStore.observables, 
     *    each containing subject, predicate, object, and modifiers for each observable.
     * 3. Iterates over each observable's key to populate filters:
     *    - If predicates exist for the observable, each predicate is added to the filter.
     *    - Adds "nearby" and "within" geospatial filters if specified in state.coreStore.mapFilters.
     * 4. Handles the case where no observables are present by applying map-based filters to a default key ("?s").
     * 5. Sets a limit on the number of query results based on state.coreStore.limit (defaulting to 100).
     * 6. Configures sorting (sortBy) if specified in state.coreStore.sortBy.
     * 7. Constructs a sensorPattern object that represents the SPARQL triple pattern (subject, predicate, object) for the query.
     * 
     * Returns:
     * The fully constructed queryJSON object, ready to be used for querying data.
     * 
     * Dependencies:
     * - Vue.set and Vue.delete are used elsewhere to manage state reactivity but not within this function.
     * - Assumes lodash (e.g., _.pullAll) and other utility functions are available for state mutations outside this function.
     *
     * Usage:
     * const queryJSON = getQueryJSON(state);
     * 
     * @param {Object} state - The Vuex store state or similar state object containing coreStore, mapFilters, and settings.
     * @returns {Object} queryJSON - The structured JSON object representing the current query configuration.
     */
    getQueryJSON: (state) => {



      //Nearby filter URI
      const nearby = "http://www.opengis.net/def/function/geosparql/nearby";

      //Within filter URI
      const within = "http://www.opengis.net/def/function/geosparql/within";

      state.queryJSON = {
        observablesKeys: [],
        observables: [],
        filters: {}
      };

      for (let i = 0; i < state.coreStore.observables.length; i++) {
        let curr = state.coreStore.observables[i];
        state.queryJSON.observablesKeys.push(curr.uri);
        state.queryJSON.observables.push({
          subject: curr.s,
          predicate: curr.p,
          object: curr.o,
          modifiers: curr.modifiers
        });
      }


      for (let x = 0; x < state.queryJSON.observablesKeys.length; x++) {
        let key = state.queryJSON.observablesKeys[x];

        if (state.coreStore.predicates[key]) {

          state.queryJSON.filters[key] = {};


          // console.log("loop state.coreStore.predicates[key].length:", state.coreStore.predicates[key].length);
          for (let y = 0; y < state.coreStore.predicates[key].length; y++) {
            let curr = state.coreStore.predicates[key][y];
            // console.log("loop key:", curr);

            //curr.predicateName = "?"+curr.predicateName;

            let uri = curr.uri;
            state.queryJSON.filters[key][uri] = curr;
            state.queryJSON.filters[key][uri].predicateName = "?" + state.queryJSON.filters[key][uri].name;
            // state.queryJSON.filters[key][uri] = curr;
            //Vue.set(state.queryJSON.filters[key], curr.uri,  curr);

          }

          let flag = true; // to make sure we only create one nearby filter.
          for (let y = 0; y < state.coreStore.mapFilters.nearby.length; y++) {
            let curr = state.coreStore.mapFilters.nearby[y];
            if (curr.include[key] == true) {
              if (flag) {
                flag = false; //make sure it only runs once.
                state.queryJSON.filters[key][nearby] = {
                  uri: nearby,
                  predicateName: null,
                  isSelectable: false,
                  isOptional: false,
                  filters: []
                };
              }
              state.queryJSON.filters[key][nearby].filters.push({
                selectedFilter: { text: curr.type, id: curr.id },
                input: {
                  center: curr.center,
                  radius: curr.radius,
                  distance: curr.distance
                },
                operator: curr.operator
              });
            }
          }


          flag = true; // to make sure we only create one within filter.
          for (let y = 0; y < state.coreStore.mapFilters.within.length; y++) {
            let curr = state.coreStore.mapFilters.within[y];
            if (curr.include[key] == true) {
              if (flag) {
                flag = false; //make sure it only runs once.
                state.queryJSON.filters[key][within] = {
                  uri: within,
                  predicateName: null,
                  isSelectable: false,
                  isOptional: false,
                  filters: []
                };
              }
              state.queryJSON.filters[key][within].filters.push({
                selectedFilter: { text: curr.type, id: curr.id },
                input: {
                  latLngs: curr.latLngs,
                },
                operator: curr.operator
              });
            }
          }
        }
      }
      if (state.coreStore.limit > 0) {
        state.queryJSON.limit = state.coreStore.limit;
      } else {
        state.queryJSON.limit = 100;
      }

      if (state.coreStore.sortBy.expression && state.coreStore.sortBy.direction && state.coreStore.sortBy.expression != "!none") {
        // sortBy:{expression:"!none", direction:"DESC"},

        state.queryJSON.sortBy = {
          expression: state.coreStore.sortBy.expression,
          direction: state.coreStore.sortBy.direction
        };
      }





      /////


      if (state.queryJSON.observablesKeys.length == 0) {
        // let key = state.queryJSON.observablesKeys[x];

        const key = "?s";



        state.queryJSON.filters[key] = {};


        let flag = true; // to make sure we only create one nearby filter.
        for (let y = 0; y < state.coreStore.mapFilters.nearby.length; y++) {
          let curr = state.coreStore.mapFilters.nearby[y];

          if (flag) {
            flag = false; //make sure it only runs once.
            state.queryJSON.filters[key][nearby] = {
              uri: nearby,
              predicateName: null,
              isSelectable: false,
              isOptional: false,
              filters: []
            };
          }
          state.queryJSON.filters[key][nearby].filters.push({
            selectedFilter: { text: curr.type, id: curr.id },
            input: {
              center: curr.center,
              radius: curr.radius,
              distance: curr.distance
            },
            operator: curr.operator
          });

        }


        flag = true; // to make sure we only create one within filter.
        for (let y = 0; y < state.coreStore.mapFilters.within.length; y++) {
          let curr = state.coreStore.mapFilters.within[y];

          if (flag) {
            flag = false; //make sure it only runs once.
            state.queryJSON.filters[key][within] = {
              uri: within,
              predicateName: null,
              isSelectable: false,
              isOptional: false,
              filters: []
            };
          }
          state.queryJSON.filters[key][within].filters.push({
            selectedFilter: { text: curr.type, id: curr.id },
            input: {
              latLngs: curr.latLngs,
            },
            operator: curr.operator
          });

        }
      }

      //----------------- Snesor Pattern ---------------
      let sensorPattern = {}
      if (state.settings.searchTriplePattern.subject.includes("?")) {
        sensorPattern.s = '?s';
      } else if (state.settings.searchTriplePattern.subject.includes("%")) {
        sensorPattern.s = '?s';
        sensorPattern.sensorKey = "s";
      } else {
        sensorPattern.s = '<' + state.settings.searchTriplePattern.subject + '>';
      }


      if (state.settings.searchTriplePattern.predicate.includes("?")) {
        sensorPattern.p = '?p';
      } else if (state.settings.searchTriplePattern.predicate.includes("%")) {
        sensorPattern.p = '?p';
        sensorPattern.sensorKey = "p";
      } else {
        sensorPattern.p = '<' + state.settings.searchTriplePattern.predicate + '>';
      }
      //console.log("option.p", option.p);

      if (state.settings.searchTriplePattern.object.includes("?")) {
        sensorPattern.o = '?o';
      } else if (state.settings.searchTriplePattern.object.includes("%")) {
        sensorPattern.o = '?o';
        sensorPattern.sensorKey = "o";
      } else {
        sensorPattern.o = '<' + state.settings.searchTriplePattern.object + '>';
      }

      state.queryJSON.sensorPattern = sensorPattern;


      // --------------- end sensor pattern -------------

      return state.queryJSON;
    },


    /**
     * Settings
     */
    getEndpointURL: (state) => state.settings.endpointURL,
    getSparqlParserUrl: (state) => state.settings.getSparqlURL,
    /**
     * Get the right query template by using the key
     * 
     * @param key the template name
     * @param key the parameters. it is value can be {"example1","example1", ...etc}, order is important!
     * @returns string
     */
    getQueryTemplate: (state) => (key, param, replacementToken = "%s") => {

      if (key == "predicatesSearch") {
        const s = prepareTripleEntity(state.settings.searchTriplePattern.subject.trim());
        const p = prepareTripleEntity(state.settings.searchTriplePattern.predicate.trim());
        const o = prepareTripleEntity(state.settings.searchTriplePattern.object.trim());
        const queryTemplate = parse(state.settings.queryTemplate["observedPropertiesBase"], (s + " " + p + " " + o), "%pattern");
        console.log("predicatesSearch queryTemplate", queryTemplate);

        const parsed = parse(queryTemplate, param, replacementToken);

        console.log("predicatesSearch parsed", parsed);

        return parsed;
      } else if (key == "sensorsSearch") {
        // this.$store.getters.getQueryTemplate("sensorsSearch", "put")
        const s = prepareTripleEntity(parse(state.settings.searchTriplePattern.subject.trim(), '?sensor', replacementToken));
        const p = prepareTripleEntity(parse(state.settings.searchTriplePattern.predicate.trim(), '?sensor', replacementToken));
        const o = prepareTripleEntity(parse(state.settings.searchTriplePattern.object.trim(), '?sensor', replacementToken));
        const queryTemplate = parse(state.settings.queryTemplate["sensorsSearchBase"], (s + " " + p + " " + o), "%pattern");
        const parsed = parse(queryTemplate, param, "%keyword");
        // const parsed = parse(queryTemplate, '?sensor', replacementToken);
        console.log("sensorsSearch parsed", parsed, param);
        return parsed;
      }


      const parsed = parse(state.settings.queryTemplate[key], param, replacementToken);
      console.log("parsed", parsed);

      return parsed;
    }
  },
  // plugins: [createPersistedState()],
});

/**
 * Replaces all occurrences of a specified token in a string with a given parameter value.
 *
 * Parameters:
 * @param {string} str - The input string containing the token(s) to be replaced.
 * @param {string} param - The string value to replace the token(s) with.
 * @param {string} [replacementToken="%s"] - Optional. The token to search for in the string. Defaults to "%s".
 *
 * Returns:
 * @returns {string} - A new string with all instances of the token replaced by the param.
 *
 * Example Usage:
 * parse("Hello, %s!", "World"); // Returns "Hello, World!"
 * parse("Path: %path%, User: %user%", "admin", "%user%"); // Replaces %user% with "admin"
 */
function parse(str, param, replacementToken = "%s") {
  const regex = new RegExp(replacementToken, 'g');
  return str.replace(regex, param);
}
/**
 * If it is a URI or has %, will be concatenated with at the start < and at the end > 
 * @param {*} entity 
 * @returns 
 */
function prepareTripleEntity(entity) {
  if (entity.includes("%") || isValidUrl(entity) == true) {
    return '<' + entity + '>';
  }
  return entity;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}