/**
 * ------------------------------------------------------------------------
 * EXAMPLES DATA MODULE
 * ------------------------------------------------------------------------
 * Created by: OMAR MUSSA
 * Copyright © 2023–2025 OMAR MUSSA. All rights reserved.
 * 
 * This module provides a set of data structures used for demonstrating or
 * testing geo-spatial and semantic data filtering, especially for animal
 * tracking (e.g., elephants, pythons) using both custom and SOSA/SSN
 * ontologies. It includes example datasets, spatial areas, and queries
 * relevant for interactive mapping, semantic queries, and data exploration
 * in applications (e.g., dashboards, map interfaces, research tools).
 * 
 * CONTENTS:
 * 
 * 1. examplesData
 *    - Contains three main example configurations (example1, example2, example3),
 *      each simulating different animal tracking queries with filters (spatial,
 *      temporal, observable properties) and the predicates (RDF triples) used
 *      to represent semantic data about the animals.
 *    - The "examples" array provides human-readable descriptions and keys for
 *      referencing each example configuration.
 *    - Data fields:
 *        - mapFilters: Geo-filters (e.g., polygons, circles) specifying areas of interest.
 *        - observables: Subjects (e.g., elephants) being queried, with metadata.
 *        - predicates: Detailed semantic properties (triples) for each observable.
 *        - datePicker, sortBy, limit: Used for temporal filtering, sorting, and limiting results.
 *
 * 2. sosaExamplesData
 *    - Mirrors examplesData but uses more generic/standardized URIs and properties
 *      following the SOSA/SSN W3C ontologies for sensor and observation data.
 *    - Useful for testing with "pure" semantic web standards or integrating with
 *      systems that expect SOSA/SSN data shapes.
 *    - Also contains an "examples" array with query descriptions and keys.
 *
 * 3. mapAreasData
 *    - Array of predefined spatial areas used for spatial filtering on maps.
 *    - Each object can be a "nearby" circle (center + radius) or a "within"
 *      polygon (array of lat/lng points).
 *    - Useful for users to quickly apply geo-filters in UIs.
 * 
 * 4. sosaMapAreasData
 *    - Array of spatial areas defined similarly to mapAreasData but tailored
 *      to the sosaExamplesData spatial context.
 * 
 * TYPICAL USAGE:
 *  - To provide example queries, filters, and areas in mapping/data exploration
 *    tools, especially those dealing with wildlife tracking, spatial analytics,
 *    or semantic data integration.
 *  - Allows users/developers to quickly load, preview, or test application
 *    features using rich, structured example data.
 * 
 * NOTE:
 *  - All example data is mock/sample data designed for demonstration and
 *    testing only. Modify or extend as needed for production use.
 * 
 * EXPORTS:
 *  - examplesData:     Example queries and filters (custom ontology).
 *  - sosaExamplesData: Example queries/filters using SOSA/SSN ontology.
 *  - mapAreasData:     Predefined spatial areas for the custom examples.
 *  - sosaMapAreasData: Spatial areas for SOSA examples.
 * 
 * ------------------------------------------------------------------------
 */

export const examplesData = {
  "example1": {
    "mapFilters": {
      "nearby": [],
      "within": [
        {
          "type": "within",
          "latLngs": [
            [
              5.417812158839451,
              118.05113309004811
            ],
            [
              5.417023425778339,
              118.05016240279656
            ],
            [
              5.41591844493409,
              118.04943128605375
            ],
            [
              5.415150053019861,
              118.04901735362367
            ],
            [
              5.414508426195798,
              118.04870363470401
            ],
            [
              5.4131290272649615,
              118.04786417400466
            ],
            [
              5.412502278943057,
              118.04735546320447
            ],
            [
              5.413070597347375,
              118.04669101402398
            ],
            [
              5.414781898998277,
              118.0462861916749
            ],
            [
              5.416857434052813,
              118.04537596413866
            ],
            [
              5.4188160876135125,
              118.04389534023359
            ],
            [
              5.420192699692301,
              118.04224370716841
            ],
            [
              5.421006561273836,
              118.04045844168287
            ],
            [
              5.421511875971044,
              118.03864321089351
            ],
            [
              5.421565642309238,
              118.03686649756858
            ],
            [
              5.4213161216866546,
              118.03539785716568
            ],
            [
              5.420930856896983,
              118.03452421794647
            ],
            [
              5.420338978756933,
              118.03363202721815
            ],
            [
              5.419585090267265,
              118.03344892716271
            ],
            [
              5.418266554844769,
              118.03299492006775
            ],
            [
              5.4166745903557665,
              118.03300658793887
            ],
            [
              5.41517758854931,
              118.03328261710706
            ],
            [
              5.4134487501875626,
              118.03323808693678
            ],
            [
              5.4121545243973115,
              118.03165688281298
            ],
            [
              5.411489356256962,
              118.02888832316968
            ],
            [
              5.411667793908542,
              118.02687298099048
            ],
            [
              5.41202701204366,
              118.02349042009156
            ],
            [
              5.411525270398044,
              118.02170790491802
            ],
            [
              5.410256059837901,
              118.022678498528
            ],
            [
              5.410429742757821,
              118.023840408423
            ],
            [
              5.410131565469446,
              118.02577582915548
            ],
            [
              5.409871406669251,
              118.02771394388404
            ],
            [
              5.409799144010225,
              118.03038943951834
            ],
            [
              5.410500628489245,
              118.03291516756873
            ],
            [
              5.411960685999472,
              118.0344183793932
            ],
            [
              5.414282818146503,
              118.03505946532825
            ],
            [
              5.417148706236787,
              118.03458539536224
            ],
            [
              5.418784393065626,
              118.03472226136365
            ],
            [
              5.419840942941716,
              118.03576071368299
            ],
            [
              5.420127525488446,
              118.03727262435133
            ],
            [
              5.419789431076121,
              118.03905987791951
            ],
            [
              5.418737330394391,
              118.04157291524463
            ],
            [
              5.417066552340783,
              118.04323592019503
            ],
            [
              5.415087328489832,
              118.04434548248538
            ],
            [
              5.413143008252361,
              118.04507601511433
            ],
            [
              5.412082727479769,
              118.04531007714105
            ],
            [
              5.411095239326306,
              118.04630136030029
            ],
            [
              5.4107624102956935,
              118.04766951478088
            ],
            [
              5.411035837854209,
              118.04832917579918
            ],
            [
              5.411711799637722,
              118.04917576897427
            ],
            [
              5.413108275478929,
              118.05007474380548
            ],
            [
              5.414962413979645,
              118.0507907207357
            ],
            [
              5.41599030789122,
              118.05110910732766
            ],
            [
              5.416356212078991,
              118.05180443334393
            ],
            [
              5.417812158839451,
              118.05113309004811
            ]
          ],
          "operator": "UNION",
          "color": "#1abc9c",
          "id": "polygon_1674567380267",
          "include": {
            "http://schema.org/DGFC/elephant#Aqeela": true
          }
        }
      ]
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://schema.org/DGFC/elephant#Aqeela",
        "text": "Aqeela (Elephant)",
        "s": "?Aqeela_Subject",
        "p": "http://schema.org/DGFC/elephant#Aqeela",
        "o": "?Aqeela_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#34495e"
      }
    ],
    "predicates": {
      "http://schema.org/DGFC/elephant#Aqeela": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#string"
          },
          "object": {
            "type": "literal",
            "value": "AG504100"
          },
          "uri": "http://www.w3.org/ns/sosa/Observation",
          "name": "Observation",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Observation"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "60.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Altitude",
          "desc": "Altitude or height is a distance measurement, usually in the vertical or &quot;up&quot; direction, between a reference datum and a point or object.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Altitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.4084167"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.00768"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2010-10-05T01:02:55"
          },
          "uri": "http://www.w3.org/2006/time#DateTime",
          "name": "DateTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?DateTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "45.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Direction",
          "name": "Direction",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "3"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/PDOP",
          "name": "PDOP",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "0.8"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Speed",
          "name": "Speed",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#double"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#double",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Temperature",
          "name": "Temperature",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        }
      ]
    },
    "datePicker": {
      "value": [
        null,
        null
      ],
      "filterIds": [
        null,
        null
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc",
      "recommended": "DateTime"
    },
    "limit": "10000"
  },
  "example2": {
    "mapFilters": {
      "nearby": [],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://schema.org/DGFC/elephant#Abaw",
        "text": "Abaw (Elephant)",
        "s": "?Abaw_Subject",
        "p": "http://schema.org/DGFC/elephant#Abaw",
        "o": "?Abaw_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#82589F"
      }
    ],
    "predicates": {
      "http://schema.org/DGFC/elephant#Abaw": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Activity",
          "name": "Activity",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Activity"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#string"
          },
          "object": {
            "type": "literal",
            "value": "SAT1062Abaw1"
          },
          "uri": "http://www.w3.org/ns/sosa/Observation",
          "name": "Observation",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Observation"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "81.5"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Altitude",
          "desc": "Altitude or height is a distance measurement, usually in the vertical or &amp;quot;up&amp;quot; direction, between a reference datum and a point or object.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Altitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.3659"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "117.31692"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Direction",
          "name": "Direction",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Speed",
          "name": "Speed",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#double"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#double",
            "type": "literal",
            "value": "27.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Temperature",
          "name": "Temperature",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#double"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#double",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/ExtTemp",
          "name": "ExtTemp",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ExtTemp"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "3"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/HDOP",
          "name": "HDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?HDOP"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#date"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#date",
            "type": "literal",
            "value": "2014-02-23"
          },
          "uri": "http://www.w3.org/2006/time#localDate",
          "name": "LocalDate",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [
            {
              "filterId": "fRange11674567184643",
              "selectedFilter": {
                "text": "Range",
                "id": "select5"
              },
              "selectedOption": {
                "type": "dateRange"
              },
              "input": {
                "value": "2014-06-23",
                "expression": ">="
              }
            },
            {
              "filterId": "fRange21674567184643",
              "selectedFilter": {
                "text": "Range",
                "id": "select5"
              },
              "selectedOption": {
                "type": "dateRange"
              },
              "input": {
                "value": "2014-06-23",
                "expression": "<="
              }
            }
          ],
          "predicateName": "?LocalDate"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#time"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#time",
            "type": "literal",
            "value": "00:19:33"
          },
          "uri": "http://www.w3.org/2006/time#localTime",
          "name": "LocalTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [
            {
              "filterId": "f01674566480053",
              "selectedFilter": {
                "text": "Range",
                "id": "select6"
              },
              "selectedOption": {
                "type": "timeRange"
              },
              "input": {
                "value": "06:00:00",
                "expression": "<"
              }
            }
          ],
          "predicateName": "?LocalTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "1"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Count",
          "name": "Count",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Count"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Cov",
          "name": "Cov",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Cov"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "0.0"
          },
          "uri": "http://www.w3.org/ns/sosa/ObservableProperty/Distance",
          "name": "Distance",
          "desc": "",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Distance"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#date"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#date",
            "type": "literal",
            "value": "2014-02-22"
          },
          "uri": "http://www.w3.org/2006/time#gMTDate",
          "name": "GMTDate",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?GMTDate"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#time"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#time",
            "type": "literal",
            "value": "16:19:33"
          },
          "uri": "http://www.w3.org/2006/time#gMTTime",
          "name": "GMTTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?GMTTime"
        }
      ]
    },
    "datePicker": {
      "value": [
        "2014-06-23",
        "2014-06-23"
      ],
      "filterIds": [
        "fRange11674567184643",
        "fRange21674567184643"
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc",
      "recommended": "LocalDate"
    },
    "limit": 100
  },
  "example3": {
    "mapFilters": {
      "nearby": [
        {
          "type": "nearby",
          "center": {
            "lat": 5.413741510687777,
            "lng": 118.03771701093723
          },
          "radius": 1000,
          "operator": "UNION",
          "distance": "1.00",
          "color": "#1abc9c",
          "id": "circle_1670600161060",
          "include": {
            "http://schema.org/DGFC/elephant#Ita": true,
            "http://schema.org/DGFC/elephant#Jasmin": true,
            "http://schema.org/DGFC/elephant#Kasih": true,
            "http://schema.org/DGFC/elephant#Puteri": true,
            "http://schema.org/DGFC/elephant#Putut": true
          }
        }
      ],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://schema.org/DGFC/elephant#Ita",
        "text": "Ita (Elephant)",
        "s": "?Ita_Subject",
        "p": "http://schema.org/DGFC/elephant#Ita",
        "o": "?Ita_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#1abc9c"
      },
      {
        "uri": "http://schema.org/DGFC/elephant#Jasmin",
        "text": "Jasmin (Elephant)",
        "s": "?Jasmin_Subject",
        "p": "http://schema.org/DGFC/elephant#Jasmin",
        "o": "?Jasmin_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#2ecc71"
      },
      {
        "uri": "http://schema.org/DGFC/elephant#Kasih",
        "text": "Kasih (Elephant)",
        "s": "?Kasih_Subject",
        "p": "http://schema.org/DGFC/elephant#Kasih",
        "o": "?Kasih_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#3498db"
      },
      {
        "uri": "http://schema.org/DGFC/elephant#Puteri",
        "text": "Puteri (Elephant)",
        "s": "?Puteri_Subject",
        "p": "http://schema.org/DGFC/elephant#Puteri",
        "o": "?Puteri_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#9b59b6"
      },
      {
        "uri": "http://schema.org/DGFC/elephant#Putut",
        "text": "Putut (Elephant)",
        "s": "?Putut_Subject",
        "p": "http://schema.org/DGFC/elephant#Putut",
        "o": "?Putut_Object",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#34495e"
      }
    ],
    "predicates": {
      "http://schema.org/DGFC/elephant#Ita": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.094185"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.446467"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        }
      ],
      "http://schema.org/DGFC/elephant#Jasmin": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.39331"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Jasmin",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.676665"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Jasmin",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        }
      ],
      "http://schema.org/DGFC/elephant#Kasih": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.29373"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Kasih",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.468767"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Kasih",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        }
      ],
      "http://schema.org/DGFC/elephant#Puteri": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.36885"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Puteri",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.685"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Puteri",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        }
      ],
      "http://schema.org/DGFC/elephant#Putut": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.39623"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Longitude",
          "desc": "Longitude is the measurement east or west of the prime meridian.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Putut",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Longitude"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.689842"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Latitude",
          "desc": "Latitude is a geographic coordinate that specifies the northu2013south position of a point on the Earth's surface.",
          "fieldsetUri": "http://schema.org/DGFC/elephant#Putut",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Latitude"
        }
      ]
    },
    "datePicker": {
      "value": [
        null,
        null
      ],
      "filterIds": [
        null,
        null
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc"
    },
    "limit": "10000"
  },



  "examples": [
    {
      "text": "Aqeela data within specific map location.",
      "value": "example1"
    },
    {
      "text": "Abaw location on 2014-06-23 night time (before 6AM local time).",
      "value": "example2"
    },
    {
      "text": "Multiple sensors within specific map location.",
      "value": "example3"
    },
  ]
};

export const sosaExamplesData = {
  "example1": {
    "mapFilters": {
      "nearby": [
        {
          "type": "nearby",
          "center": {
            "lat": 5.459775187975875,
            "lng": 117.99575043492952
          },
          "radius": 3282.2108768466564,
          "operator": "UNION",
          "distance": "3.28",
          "color": "#1abc9c",
          "id": "circle_1692401137207",
          "include": {
            "http://example.org/elephant/Abaw": true
          }
        }
      ],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://example.org/elephant/Abaw",
        "text": "Abaw (Elephant)",
        "s": "?Abaw_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Abaw",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#16a085"
      }
    ],
    "predicates": {
      "http://example.org/elephant/Abaw": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "33.8"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "299.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "8.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "63"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Abaw"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T14:12:20"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.4695706"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "117.98419"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "-158.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Abaw",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ]
    },
    "datePicker": {
      "value": [
        null,
        null
      ],
      "filterIds": [
        null,
        null
      ]
    },
    "sortBy": {
      "expression": "ResultTime",
      "direction": "desc",
      "recommended": "ResultTime"
    },
    "limit": "5"
  },
  "example2": {
    "mapFilters": {
      "nearby": [],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://example.org/elephant/Aqeela",
        "text": "Aqeela (Elephant)",
        "s": "?Aqeela_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Aqeela",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#3498db"
      }
    ],
    "predicates": {
      "http://example.org/elephant/Aqeela": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "30.5"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [
            {
              "filterId": "f01692400230341",
              "selectedFilter": {
                "text": "Range",
                "id": "select3"
              },
              "selectedOption": {
                "type": "number"
              },
              "input": {
                "value": "30",
                "expression": ">"
              }
            }
          ],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "352.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "10.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "81"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Aqeela"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T07:46:39"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [
            {
              "filterId": "fRange11692400503762",
              "selectedFilter": {
                "text": "Range",
                "id": "select7"
              },
              "selectedOption": {
                "type": "dateTimeRange"
              },
              "input": {
                "value": "2022-01-01T00:00:00",
                "expression": ">="
              }
            },
            {
              "filterId": "fRange21692400503762",
              "selectedFilter": {
                "text": "Range",
                "id": "select7"
              },
              "selectedOption": {
                "type": "dateTimeRange"
              },
              "input": {
                "value": "2022-01-10T23:59:59",
                "expression": "<="
              }
            }
          ],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "6.1077013"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "116.680984"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "-49.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Aqeela",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ]
    },
    "datePicker": {
      "value": [
        "2022-01-01",
        "2022-01-10"
      ],
      "filterIds": [
        "fRange11692400503762",
        "fRange21692400503762"
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc",
      "recommended": "ResultTime"
    },
    "limit": 100
  },
  "example3": {
    "mapFilters": {
      "nearby": [
        {
          "type": "nearby",
          "center": {
            "lat": 5.6732786135326,
            "lng": 118.38622352370297
          },
          "radius": 918.0423854132885,
          "operator": "UNION",
          "distance": "0.92",
          "color": "#1abc9c",
          "id": "circle_1692398686548",
          "include": {
            "http://example.org/elephant/Liun": true,
            "http://example.org/elephant/Ita": true,
            "http://example.org/elephant/Merotai": true,
            "http://example.org/elephant/Tunglap": true
          }
        }
      ],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://example.org/elephant/Liun",
        "text": "Liun (Elephant)",
        "s": "?Liun_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Liun",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#3498db"
      },
      {
        "uri": "http://example.org/elephant/Ita",
        "text": "Ita (Elephant)",
        "s": "?Ita_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Ita",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#82589F"
      },
      {
        "uri": "http://example.org/elephant/Merotai",
        "text": "Merotai (Elephant)",
        "s": "?Merotai_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Merotai",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#34495e"
      },
      {
        "uri": "http://example.org/elephant/Tunglap",
        "text": "Tunglap (Elephant)",
        "s": "?Tunglap_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/elephant/Tunglap",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#16a085"
      }
    ],
    "predicates": {
      "http://example.org/elephant/Liun": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "34.7"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "110.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "177.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "49"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Liun"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T13:27:17"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.46047"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.210625"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "-57.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Liun",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ],
      "http://example.org/elephant/Ita": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "35.7"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "209.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "18.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "39"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Ita"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T23:57:46"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.547883"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.3121"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "913.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Ita",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ],
      "http://example.org/elephant/Merotai": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "36.3"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "205.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "108.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "16"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Merotai"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T22:29:41"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.4860616"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.2346"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "511.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Merotai",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ],
      "http://example.org/elephant/Tunglap": [
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "35.4"
          },
          "uri": "http://example.org/property/temperature",
          "name": "Temperature",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Temperature"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "204.0"
          },
          "uri": "http://example.org/property/direction",
          "name": "Direction",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Direction"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "90.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#integer"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#integer",
            "type": "literal",
            "value": "72"
          },
          "uri": "http://example.org/property/PDOP",
          "name": "PDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?PDOP"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/elephant/Tunglap"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T16:20:30"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.5961294"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "118.357155"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "508.0"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#alt",
          "name": "Alt",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/elephant/Tunglap",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Alt"
        }
      ]
    },
    "datePicker": {
      "value": [
        null,
        null
      ],
      "filterIds": [
        null,
        null
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc",
      "recommended": "ResultTime"
    },
    "limit": "1000"
  },
  "example4": {
    "mapFilters": {
      "nearby": [],
      "within": []
    },
    "observablesKeys": [],
    "observables": [
      {
        "uri": "http://example.org/python/Juling",
        "text": "Juling (Python)",
        "s": "?Juling_Subject",
        "p": "http://www.w3.org/ns/sosa/madeBySensor",
        "o": "http://example.org/python/Juling",
        "title": "Description not exist.",
        "modifiers": {
          "limit": {
            "enabled": false,
            "value": 0
          }
        },
        "color": "#82589F"
      }
    ],
    "predicates": {
      "http://example.org/python/Juling": [
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "30.0"
          },
          "uri": "http://example.org/property/HDOP",
          "name": "HDOP",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": true,
          "filters": [],
          "predicateName": "?HDOP"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#string"
          },
          "object": {
            "type": "literal",
            "value": "GPS"
          },
          "uri": "http://example.org/property/type",
          "name": "Type",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [
            {
              "filterId": "f01692400837051",
              "selectedFilter": {
                "text": "Contain",
                "id": "select1"
              },
              "selectedOption": {
                "type": "text"
              },
              "input": {
                "value": "VHF",
                "expression": ""
              }
            }
          ],
          "predicateName": "?Type"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://www.w3.org/ns/sosa/Observation"
          },
          "uri": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
          "name": "Type_2",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Type_2"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "35.0"
          },
          "uri": "http://example.org/property/speed",
          "name": "Speed",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Speed"
        },
        {
          "object": {
            "type": "uri",
            "value": "http://example.org/python/Juling"
          },
          "uri": "http://www.w3.org/ns/sosa/madeBySensor",
          "name": "MadeBySensor",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?MadeBySensor"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#dateTime"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#dateTime",
            "type": "literal",
            "value": "2022-12-04T18:43:23"
          },
          "uri": "http://www.w3.org/ns/sosa/resultTime",
          "name": "ResultTime",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?ResultTime"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "5.4721794"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#lat",
          "name": "Lat",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Lat"
        },
        {
          "datatype": {
            "type": "uri",
            "value": "http://www.w3.org/2001/XMLSchema#float"
          },
          "object": {
            "datatype": "http://www.w3.org/2001/XMLSchema#float",
            "type": "literal",
            "value": "117.89587"
          },
          "uri": "http://www.w3.org/2003/01/geo/wgs84_pos#long",
          "name": "Long",
          "desc": "Description not exist.",
          "fieldsetUri": "http://example.org/python/Juling",
          "isSelectable": true,
          "isOptional": false,
          "filters": [],
          "predicateName": "?Long"
        }
      ]
    },
    "datePicker": {
      "value": [
        null,
        null
      ],
      "filterIds": [
        null,
        null
      ]
    },
    "sortBy": {
      "expression": "!none",
      "direction": "desc",
      "recommended": "ResultTime"
    },
    "limit": "1000"
  },





  "examples": [
    {
      "text": "Latest 5 'Abaw' readings within specific map location.",
      "value": "example1"
    },
    {
      "text": "'Aqeela' location between 2022-01-01 to 2022-01-10 with Temperature > 30.",
      "value": "example2"
    },
    {
      "text": "Multiple sensors within specific map location.",
      "value": "example3"
    },
    {
      "text": "'Juling' data that was collected using VHF.",
      "value": "example4"
    },
  ]
};


export const mapAreasData = [
  {
    "id": 1,
    "title": "Area 1 - Danau Girang Field Centre",
    "type": "nearby",
    "center": {
      "lat": 5.413741510687777,
      "lng": 118.03771701093723
    },
    "radius": 1000,
    "operator": "UNION",
    "distance": "31.67",
    "color": "#1abc9c",
  },
  {
    "id": 2,
    "title": "Area 2 - DGFC Accommodations & Footpath",
    "type": "within",
    "latLngs": [
      [
        5.415287962409813,
        118.03439456693013
      ],
      [
        5.414326493164673,
        118.03458814567422
      ],
      [
        5.414029444306553,
        118.03557583967634
      ],
      [
        5.413324395334329,
        118.03710082545877
      ],
      [
        5.4127643421628715,
        118.03779418565684
      ],
      [
        5.412071000144934,
        118.03863639928751
      ],
      [
        5.411597941603161,
        118.03912556584693
      ],
      [
        5.411191147546933,
        118.03965977596818
      ],
      [
        5.410935600220032,
        118.03992060245949
      ],
      [
        5.410812267058021,
        118.04014370252845
      ],
      [
        5.411016138844154,
        118.04046715755251
      ],
      [
        5.411571821875581,
        118.04079702997116
      ],
      [
        5.412129087250798,
        118.03998261544622
      ],
      [
        5.412817878827105,
        118.03923352083078
      ],
      [
        5.4135035638935705,
        118.03877354817816
      ],
      [
        5.413986011127366,
        118.03822611167563
      ],
      [
        5.414101985479666,
        118.03757860965563
      ],
      [
        5.414449121542356,
        118.03646946907976
      ],
      [
        5.414780423716715,
        118.03554572179566
      ],
      [
        5.415287962409813,
        118.03439456693013
      ]
    ],
    "operator": "UNION",
    "color": "#1abc9c",
  },
  {
    "id": 3,
    "title": "Area 3 - DGFC Kinabatangan River",
    "type": "within",
    "latLngs": [
      [
        5.417812158839451,
        118.05113309004811
      ],
      [
        5.417023425778339,
        118.05016240279656
      ],
      [
        5.41591844493409,
        118.04943128605375
      ],
      [
        5.415150053019861,
        118.04901735362367
      ],
      [
        5.414508426195798,
        118.04870363470401
      ],
      [
        5.4131290272649615,
        118.04786417400466
      ],
      [
        5.412502278943057,
        118.04735546320447
      ],
      [
        5.413070597347375,
        118.04669101402398
      ],
      [
        5.414781898998277,
        118.0462861916749
      ],
      [
        5.416857434052813,
        118.04537596413866
      ],
      [
        5.4188160876135125,
        118.04389534023359
      ],
      [
        5.420192699692301,
        118.04224370716841
      ],
      [
        5.421006561273836,
        118.04045844168287
      ],
      [
        5.421511875971044,
        118.03864321089351
      ],
      [
        5.421565642309238,
        118.03686649756858
      ],
      [
        5.4213161216866546,
        118.03539785716568
      ],
      [
        5.420930856896983,
        118.03452421794647
      ],
      [
        5.420338978756933,
        118.03363202721815
      ],
      [
        5.419585090267265,
        118.03344892716271
      ],
      [
        5.418266554844769,
        118.03299492006775
      ],
      [
        5.4166745903557665,
        118.03300658793887
      ],
      [
        5.41517758854931,
        118.03328261710706
      ],
      [
        5.4134487501875626,
        118.03323808693678
      ],
      [
        5.4121545243973115,
        118.03165688281298
      ],
      [
        5.411489356256962,
        118.02888832316968
      ],
      [
        5.411667793908542,
        118.02687298099048
      ],
      [
        5.41202701204366,
        118.02349042009156
      ],
      [
        5.411525270398044,
        118.02170790491802
      ],
      [
        5.410256059837901,
        118.022678498528
      ],
      [
        5.410429742757821,
        118.023840408423
      ],
      [
        5.410131565469446,
        118.02577582915548
      ],
      [
        5.409871406669251,
        118.02771394388404
      ],
      [
        5.409799144010225,
        118.03038943951834
      ],
      [
        5.410500628489245,
        118.03291516756873
      ],
      [
        5.411960685999472,
        118.0344183793932
      ],
      [
        5.414282818146503,
        118.03505946532825
      ],
      [
        5.417148706236787,
        118.03458539536224
      ],
      [
        5.418784393065626,
        118.03472226136365
      ],
      [
        5.419840942941716,
        118.03576071368299
      ],
      [
        5.420127525488446,
        118.03727262435133
      ],
      [
        5.419789431076121,
        118.03905987791951
      ],
      [
        5.418737330394391,
        118.04157291524463
      ],
      [
        5.417066552340783,
        118.04323592019503
      ],
      [
        5.415087328489832,
        118.04434548248538
      ],
      [
        5.413143008252361,
        118.04507601511433
      ],
      [
        5.412082727479769,
        118.04531007714105
      ],
      [
        5.411095239326306,
        118.04630136030029
      ],
      [
        5.4107624102956935,
        118.04766951478088
      ],
      [
        5.411035837854209,
        118.04832917579918
      ],
      [
        5.411711799637722,
        118.04917576897427
      ],
      [
        5.413108275478929,
        118.05007474380548
      ],
      [
        5.414962413979645,
        118.0507907207357
      ],
      [
        5.41599030789122,
        118.05110910732766
      ],
      [
        5.416356212078991,
        118.05180443334393
      ],
      [
        5.417812158839451,
        118.05113309004811
      ]
    ],
    "operator": "UNION",
    "color": "#1abc9c",
  },
];

export const sosaMapAreasData = [
  {
    "id": 1,
    "title": "Area 1 - Nearby Kg Mengaris",
    "type": "nearby",
    "center": {
      "lat": 5.407661982039801,
      "lng": 117.95007047709079
    },
    "radius": 5000,
    "operator": "UNION",
    "distance": "5",
    "color": "#3498db",
  },
  {
    "id": 2,
    "title": "Area 2 - Nearby Abai",
    "type": "nearby",
    "center": {
      "lat": 5.687640119001124,
      "lng": 118.38314369553702
    },
    "radius": 2130.1519992913354,
    "operator": "UNION",
    "distance": "2.13",
    "color": "#9b59b6",
  },
  {
    "id": 3,
    "title": "Area 3 - Nearby the River",
    "type": "nearby",
    "center": {
      "lat": 5.479814361676679,
      "lng": 118.22647302236876
    },
    "radius": 1717.910376959084,
    "operator": "UNION",
    "distance": "2.13",
    "color": "#e74c3c",
  },
];
