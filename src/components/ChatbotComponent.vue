<template>
  <div>
    <div>
      <div class="container">
        <div class="row">
          <div id="Smallchat">
            <div class="Layout Layout-open Layout-expand Layout-right" style="
                background-color: #3f51b5;
                color: rgb(255, 255, 255);
                opacity: 5;
                border-radius: 10px;
              ">
              <div class="Messenger_messenger">
                <div class="Messenger_header" style="background-color: #16a085; color: rgb(255, 255, 255)">
                  <h4 class="Messenger_prompt">ForestBot</h4>
                  <span class="chat_close_icon" style="color: white" @click="changeVisibility"><span
                      aria-hidden="true">&times;</span></span>
                </div>
                <div class="Messenger_content">
                  <bot-ui />
                  <div class="Input Input-blank">
                    <textarea ref="messageInput" class="Input_field" placeholder="Send a message..." rows="2"
                      style="height: 40px" v-on:keyup.enter="onMessageSubmit"></textarea>

                    <button class="Input_button Input_button-send" @click="onMessageSubmit">
                      <div class="Icon" style="width: 18px; height: 18px">
                        <svg height="54px" style="width: 18px; height: 18px" version="1.1" viewBox="1496 193 57 54"
                          width="57px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                          <g id="Group-9-Copy-3" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1"
                            transform="translate(1523.000000, 220.000000) rotate(-270.000000) translate(-1523.000000, -220.000000) translate(1499.000000, 193.000000)">
                            <path id="sendicon"
                              d="M5.42994667,44.5306122 L16.5955554,44.5306122 L21.049938,20.423658 C21.6518463,17.1661523 26.3121212,17.1441362 26.9447801,20.3958097 L31.6405465,44.5306122 L42.5313185,44.5306122 L23.9806326,7.0871633 L5.42994667,44.5306122 Z M22.0420732,48.0757124 C21.779222,49.4982538 20.5386331,50.5306122 19.0920112,50.5306122 L1.59009899,50.5306122 C-1.20169244,50.5306122 -2.87079654,47.7697069 -1.64625638,45.2980459 L20.8461928,-0.101616237 C22.1967178,-2.8275701 25.7710778,-2.81438868 27.1150723,-0.101616237 L49.6075215,45.2980459 C50.8414042,47.7885641 49.1422456,50.5306122 46.3613062,50.5306122 L29.1679835,50.5306122 C27.7320366,50.5306122 26.4974445,49.5130766 26.2232033,48.1035608 L24.0760553,37.0678766 L22.0420732,48.0757124 Z"
                              fill="#96AAB4" fill-rule="nonzero"></path>
                          </g>
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!--===============CHAT ON BUTTON STRART===============-->
            <div class="chat_on">
              <span class="chat_on_icon"><svg class="bi bi-chat-dots" fill="currentColor" height="32"
                  style="color: white" viewBox="0 0 16 16" width="32" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z">
                  </path>
                  <path
                    d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z">
                  </path>
                </svg></span>
            </div>
            <!--===============CHAT ON BUTTON END===============-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

//https://docs.botui.org/guide.html
//https://bootsnipp.com/snippets/Q0BMR
import "botui/build/botui.min.css";
import "botui/build/botui-theme-default.css";
import axios from "axios";

import BotUi from "./BotUi";
import { botui } from "./BotUi";
import _ from "lodash";

// import { bus } from "../main";
// import { mapState } from "vuex";


export default {
  name: "ChatbotComponent",
  components: {
    BotUi,
  },
  data() {
    return {
      connection: null,
      visible: false,
    };
  },
  computed: {
    sortByExp: {
      //query limit
      set(value) {
        this.$store.commit("setSortByExp", value);
      },
      get() {
        return this.$store.state.coreStore.sortBy.expression;
      },
    },
    sortByDir: {
      //query limit
      set(value) {
        this.$store.commit("setSortByDir", value);
      },
      get() {
        return this.$store.state.coreStore.sortBy.direction;
      },
    },
    limit: {
      //query limit
      set(value) {
        this.$store.commit("setLimit", value);
      },
      get() {
        return this.$store.state.coreStore.limit;
      },
    },
    searchValue: {
      get() {
        return this.$store.state.coreStore.observables;
      },
      set(value) {
        this.$store.commit("setObservables", value);
      },
    },
    datePickerValue: {
      get() {
        return this.$store.getters.getDatePicker;
      },
      set(value) {
        this.$store.commit("setDatePicker", value);
      },
    },
    mapNearbyFilters: {
      set(value) {
        this.$store.commit("setMapNearbyFilters", value);
      },
      get() {
        return this.$store.getters.getMapNearbyFilters;
      },
    },
    mapWithinFilters: {
      set(value) {
        this.$store.commit("setMapWithinFilters", value);
      },
      get() {
        return this.$store.getters.getMapWithinFilters;
      },
    },
    isLoading: {
      set(value) {
        this.$store.commit("setSettings", { key: "isLoading", value: value });
      },
      get() {
        return this.$store.state.settings.isLoading;
      },
    },
    errorMsg: {
      set(value) {
        this.$store.commit("setSettings", { key: "errorMsg", value: value });
      },
      get() {
        return this.$store.state.settings.errorMsg;
      },
    },
    queryJSON() {
      //The json that will be sent to the server
      return this.$store.getters.getQueryJSON;
    },
    sparqlQuery: {
      //the generated sparql query
      set(value) {
        this.$store.commit("setSPARQL", value);
      },
      get() {
        return this.$store.getters.getSPARQL;
      },
    },
    queryResult: {
      set(value) {
        this.$store.commit("setResult", value);
      },
      get() {
        return this.$store.getters.getResult;
      },
    },
  },
  methods: {
    /**
     * This fucntion is a utality to search for an area with the specific keyword.
     * It will return the index of the area if there is a match,
     *
     * Else: it will return -1 if no result found.
     *
     **/
    searchForPredifinedMapAreas: function (keyword) {
      let areas = this.$store.state.settings.predifinedMapAreas;
      keyword = keyword.replaceAll(" ", "").toLowerCase();
      for (let i = 0; i < areas.length; i++) {
        if (
          areas[i]["title"].replaceAll(" ", "").toLowerCase().includes(keyword)
        ) {
          return i;
        }
      }

      return -1;
    },

    processBotCustomResponses: async function (response) {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      const thisComponent = this; //make sure this really means this.
      let exEnt; //extracted entities;
      let intentName = response["custom"]["latest_message"]["intent"]["name"];
      const userMsg = response["custom"]["latest_message"]["text"];

      let botResponses = [];
      console.log(response["custom"]["latest_message"]["intent"]["name"]);
      const intentDict = {
        construct_where_query: "Get readings related to specific sensor.",
        discover_sensors_within_location:
          "List available sensors within a map location.",
        construct_when_query: "Get latest/ealiest sensor readings.",
        list_all_sensors: "List all available sensors.",
        count_all_sensors: "Count all available sensors.",
        list_observable_info: "List info about specific sensor.",
        show_examples: "Show you some examples.",
      };

      /*
      - show_examples
      - list_all_sensors
      - count_all_sensors
      - list_observable_info
      - discover_sensors_within_location
      - construct_where_query
      - construct_when_query
      */

      //threshold
      if (
        !userMsg.startsWith("/") &&
        response["custom"]["latest_message"]["intent"]["confidence"] < 0.2
      ) {
        //very low
        intentName = "nlu_fallback";
      }

      console.log("intentName", intentName);

      switch (intentName) {
        case "nlu_fallback": {//------ less than thrushhold
          const intent_ranking = response["custom"]["latest_message"]["intent_ranking"];
          let list = [];
          for (let i = 0; i < intent_ranking.length; i++) {
            const curIntent = intent_ranking[i];

            if (curIntent.confidence < 0.1) {
              break;
            }

            if (intentDict[curIntent.name])
              list.push({
                text: intentDict[curIntent.name],
                value: "/" + curIntent.name + " " + userMsg,
              });
          }

          botResponses.push({
            content:
              "I am not really confident from what you want me to do, you can eaither:<ul><li>Reword your question.</li> <li>Choose one of the following intent to help me understand what you mean:</li></ul>",
          });
          botResponses.push({
            action: {
              select: {
                action: {
                  placeholder: "Select what you want me to do",
                  // value: 'AR', // Selected value or selected object. Example: {value: "AR", text : "Arabic" }
                  searchselect: false, // Default: true, false for standart dropdown
                  multipleselect: true, // Default: false

                  label: "text", // dropdown label variable
                  options: list,
                  button: {
                    label: "OK",
                  },
                },
              },
            },
          });

          break;
        }
        case "show_examples": {
          const examplesOptions = [
            {
              text: "List available sensors",
              value: "List available sensors",
            },
            {
              text: "List info about specific sensor.",
              value: "information about Abaw",
              addValueToChat: true,
            },
            {
              text: "Search for latest results",
              value: "Where was lastest Seri readings?",
              addValueToChat: true,
            },
            {
              text: "Search for results within date range",
              value: "where was abaw during 2015",
              addValueToChat: true,
            },
            {
              text: "Search for results within date range and size limit",
              value: "where was the last 5 records of abaw in 2015",
              addValueToChat: true,
            },
          ];

          botResponses.push({
            content:
              "Here are some examples to help you understand what can I do for you:",
          });
          botResponses.push({
            action: {
              select: {
                action: {
                  placeholder: "Select an Example",
                  //searchselect: true, // Default: true, false for standart dropdown
                  multipleselect: true, // Default: false
                  label: "value", // dropdown label variable
                  options: examplesOptions,
                  button: {
                    label: "OK",
                  },
                },
              },
            },
          });
          break;
        }
        case "discover_sensors_within_location": {//----------------------------------------------
          exEnt = this.extractEntities({
            entitiesArray: response["custom"]["latest_message"]["entities"],
          });

          // console.log(
          //   "searchForPredifinedMapAreas",
          //   this.searchForPredifinedMapAreas(Object.keys(exEnt["area"])[0])
          // );

          //check if the user already typed an area
          if (exEnt["area"]) {
            let areasIndexes = []; //get indexes of selected areas
            for (let i = 0; i < Object.keys(exEnt["area"]).length; i++) {
              const index = this.searchForPredifinedMapAreas(
                Object.keys(exEnt["area"])[i]
              );
              if (index != -1) {
                areasIndexes.push(index);
              }
            }

            if (areasIndexes.length > 0) {
              //clear map filters if any
              thisComponent.mapNearbyFilters = [];
              thisComponent.mapWithinFilters = [];

              thisComponent.$root.$emit(
                "selectPredifinedMapAreas",
                areasIndexes
              );
            }
          }

          // check map filters

          if (
            this.mapNearbyFilters.length == 0 &&
            this.mapWithinFilters.length == 0
          ) {
            botResponses.push({
              content:
                "There is no filters on the map. Please draw some map filters and then click the following button or try diffrent questions.",
            });
            botResponses.push({
              action: {
                button: {
                  action: [
                    {
                      // show only one button
                      text: "I added some filters, continue.",
                      value: "/discover_sensors_within_location",
                    },
                  ],
                },
              },
            });
            break;
          }

          //clear selected property
          if (this.searchValue.length > 0) {
            this.searchValue = [];
          }

          await this.getResults();

          // check results validity
          if (
            this.queryResult.head &&
            this.queryResult.head.vars &&
            this.queryResult.head.vars.length > 0 &&
            this.queryResult.results &&
            this.queryResult.results.bindings &&
            this.queryResult.results.bindings.length > 0 &&
            this.queryResult.results.bindings[0][
            this.queryResult.head.vars[0]
            ] &&
            this.queryResult.results.bindings[0][this.queryResult.head.vars[0]]
              .value
          ) {
            let head = this.queryResult["head"]["vars"];
            let results = this.queryResult["results"]["bindings"];

            let listItems = "";

            if (results.length == 1) {
              const sensor_name = this.getPredicateName(
                results[0][head[0]].value
              ).name;
              botResponses.push({
                content:
                  "There is " +
                  results.length +
                  " available sensor within the selected location: " +
                  sensor_name,
              });

              botResponses.push({
                action: {
                  button: {
                    action: [
                      {
                        // show only one button
                        text: "What is " + sensor_name + "?",
                        value: "What is " + sensor_name + "",
                      },
                    ],
                  },
                },
              });
            } else {
              botResponses.push({
                content:
                  "There are " +
                  results.length +
                  " available sensors within the selected location.",
              });

              let options = [];
              for (let i = 0; i < results.length; i++) {
                //[head[0]] we are assuming the first predicate will always be the main one.
                let obj = this.getPredicateName(results[i][head[0]].value);
                let featureOfIntrest = "";
                if (
                  results[i]["featureOfInterest"] !== undefined &&
                  results[i]["featureOfInterest"].value !== undefined &&
                  results[i]["featureOfInterest"].value.length > 0
                ) {
                  featureOfIntrest =
                    "(" +
                    this.getPredicateName(results[i]["featureOfInterest"].value)
                      .name +
                    ")";
                }

                listItems +=
                  "<li>" + obj.name + " " + featureOfIntrest + "</li>";
                options.push({
                  value: "What is " + obj.name,
                  text: "What is " + obj.name + " " + featureOfIntrest,
                });
              }

              botResponses.push({ content: "<ul>" + listItems + "</ul>" });
              botResponses.push({
                content:
                  "You can explore more by selecting an item from the drop list:",
              });
              botResponses.push({
                action: {
                  select: {
                    action: {
                      placeholder: "Select a Sensor",
                      // value: 'AR', // Selected value or selected object. Example: {value: "AR", text : "Arabic" }
                      searchselect: false, // Default: true, false for standart dropdown
                      multipleselect: true, // Default: false

                      label: "text", // dropdown label variable
                      options: options,
                      button: {
                        label: "OK",
                      },
                    },
                  },
                },
              });
            }
          } else {
            botResponses.push({
              content: "No result found within the selected location.",
            });
          }

          break; // ------- end of discover_sensors_within_location -----------------------------
        }
        case "count_all_sensors":
        case "list_all_sensors": {
          let server_response = undefined;

          await this.$store
            .dispatch("axios", {
              method: "post",
              url: this.$store.state.settings.endpointURL,
              data: { query: this.$store.getters.getQueryTemplate("sensors") },
              params: null,
            })
            .then(
              (response) => {
                server_response = response;
              },
              (error) => {
                throw error;
              }
            );

          if (
            server_response === undefined ||
            server_response.data["results"] === undefined ||
            server_response.data["results"]["bindings"] === undefined
          ) {
            // console.log(data);
            throw new Error("No observable data!");
          }

          let head = server_response.data["head"]["vars"];
          let results = server_response.data["results"]["bindings"];

          let listItems = "";

          if (
            response["custom"]["latest_message"]["intent"]["name"] ==
            "count_all_sensors"
          ) {
            botResponses.push({
              content: "There are " + results.length + " available sensors.",
            });
            botResponses.push({
              action: {
                button: {
                  action: [
                    {
                      // show only one button
                      text: "List all of them",
                      value: "/list_all_sensors",
                    },
                  ],
                },
              },
            });
            break;
          }

          botResponses.push({
            content: "There are " + results.length + " available sensors.",
          });

          let options = [];
          for (let i = 0; i < results.length; i++) {
            //[head[0]] we are assuming the first predicate will always be the main one.
            let obj = this.getPredicateName(results[i][head[0]].value);
            let featureOfIntrest = "";
            if (
              results[i]["featureOfInterest"] !== undefined &&
              results[i]["featureOfInterest"].value !== undefined &&
              results[i]["featureOfInterest"].value.length > 0
            ) {
              featureOfIntrest =
                "(" +
                this.getPredicateName(results[i]["featureOfInterest"].value)
                  .name +
                ")";
            }

            listItems += "<li>" + obj.name + " " + featureOfIntrest + "</li>";
            options.push({
              value: "What is " + obj.name,
              text: "What is " + obj.name + " " + featureOfIntrest,
            });
          }

          botResponses.push({ content: "<ul>" + listItems + "</ul>" });
          botResponses.push({
            content:
              "You can explore more by selecting an item from the drop list:",
          });
          botResponses.push({
            action: {
              select: {
                action: {
                  placeholder: "Select a Sensor",
                  // value: 'AR', // Selected value or selected object. Example: {value: "AR", text : "Arabic" }
                  searchselect: false, // Default: true, false for standart dropdown
                  multipleselect: true, // Default: false

                  label: "text", // dropdown label variable
                  options: options,
                  button: {
                    label: "OK",
                  },
                },
              },
            },
          });

          break;
        }
        case "list_observable_info": {
          let server_response = undefined;
          if (
            !response["custom"]["latest_message"]["entities"] ||
            !response["custom"]["latest_message"]["entities"][0] ||
            !response["custom"]["latest_message"]["entities"][0]["value"]
          ) {
            throw Error(
              "I couldn't recognized any entities in your sentence. Are you sure you have typed it correctly?"
            );
          }
          let observable =
            response["custom"]["latest_message"]["entities"][0]["value"];
          console.log("observable", observable);

          await this.$store
            .dispatch("axios", {
              method: "post",
              url: this.$store.state.settings.endpointURL,
              data: {
                query:
                  // 'SELECT  DISTINCT ?predicate {?s ?predicate ?o. FILTER(regex(lcase(str(?predicate)), "' +
                  // observable.toLowerCase() +
                  // '" ))} GROUP BY ?predicate',
                  this.$store.getters.getQueryTemplate(
                    "sensorsSearch",
                    observable.toLowerCase()
                  ),
              },
              params: null,
            })
            .then(
              (response) => {
                server_response = response;
              },
              (error) => {
                throw error;
              }
            );

          if (
            server_response === undefined ||
            server_response.data["results"] === undefined ||
            server_response.data["results"]["bindings"] === undefined
          ) {
            // console.log(data);
            throw new Error("No observable data!");
          }

          let head = server_response.data["head"]["vars"];
          let results = server_response.data["results"]["bindings"];

          console.log("results.length", results[0]);

          if (
            results.length == 0 ||
            (results.length > 0 && _.isEmpty(results[0]))
          ) {
            botResponses.push({
              content:
                "I couldn't find anything about '" +
                observable +
                "', maybe try different name?",
            });
            botResponses.push({
              content:
                "You can explore available sensors by clicking on the following button:",
            });
            botResponses.push({
              action: {
                button: {
                  action: [
                    {
                      // show only one button
                      text: "List all sensors.",
                      value: "/list_all_sensors",
                    },
                  ],
                },
              },
            });
            break;
          }

          // let observableURI = results[0]["predicate"]["value"];
          let observableURI = results[0][head[0]]["value"];

          ///////-------

          server_response = undefined;

          await this.$store
            .dispatch("axios", {
              method: "post",
              url: this.$store.state.settings.endpointURL,
              data: {
                query: this.$store.getters.getQueryTemplate(
                  "sensor",
                  observableURI
                ),
              },
              params: null,
            })
            .then(
              (response) => {
                server_response = response;
              },
              (error) => {
                throw error;
              }
            );

          let featureOfInterestList = null;

          if (
            server_response === undefined ||
            server_response.data["results"] === undefined ||
            server_response.data["results"]["bindings"] === undefined
          ) {
            // console.log(data);
            //throw new Error('No observable data!');
          } else {
            let head = server_response.data["head"]["vars"];
            let results = server_response.data["results"]["bindings"];

            featureOfInterestList = "";

            // options = [];
            if (results.length == 1) {
              let obj = this.getPredicateName(results[0][head[0]].value);
              featureOfInterestList += " a/an " + obj.name + "<br>";
            } else {
              for (let i = 0; i < results.length; i++) {
                //[head[0]] we are assuming the first predicate will always be the main one.
                let obj = this.getPredicateName(results[i][head[0]].value);
                // let featureOfIntrest = "";
                // if (results[i]["featureOfInterest"] !== undefined && results[i]["featureOfInterest"].value !== undefined && results[i]["featureOfInterest"].value.length > 0) {
                //     featureOfIntrest = "(" + this.getPredicateName(results[i]["featureOfInterest"].value).name + ")";
                // }

                featureOfInterestList += "<li>" + obj.name + "</li>";
              }
              featureOfInterestList = ":<ul>" + featureOfInterestList + "</ul>";
            }

            // botResponses.push({content: observable+" is "+featureOfInterestList});
          }

          //////----

          let data = await axios.post(this.$store.state.settings.endpointURL, {
            // query: 'SELECT DISTINCT ?predicate (DATATYPE(?object) as ?datatype) ?object WHERE {?s1 ?predicate ?object. {SELECT * {?s1 <'+this.fieldsetUri+'> ?o} LIMIT 1}}'
            query: this.$store.getters.getQueryTemplate(
              "predicatesSearch",
              observableURI
            ),
          });

          const data_head = data.data["head"]["vars"];
          data = data.data["results"]["bindings"];

          let loadedOptions = [];
          let nameDict = {}; //make sure if there is a duplicate name to add numberings.

          let listItems = "";
          for (let i = 0; i < data.length; i++) {
            if (observableURI != data[i][data_head[0]].value) {
              let obj = this.getPredicateName(data[i][data_head[0]].value);

              if (nameDict[obj.name] === undefined) {
                nameDict[obj.name] = 1;
              } else {
                nameDict[obj.name]++;
              }

              //prepare the data and default behaviour.
              data[i].uri = data[i][data_head[0]].value;
              if (nameDict[obj.name] > 1) {
                //make sure if there is a duplicate name to add numberings.
                data[i].name = obj.name + "_" + nameDict[obj.name] + "";
              } else {
                data[i].name = obj.name;
              }

              // data[i].desc = obj.desc;
              // data[i].fieldsetUri = this.fieldsetUri;
              // data[i].isSelectable = true;
              // data[i].isOptional = false;
              // data[i].filters = [];
              delete data[i][data_head[0]]; //after preparing the data, no need to keep it.
              loadedOptions.push(data[i]);

              listItems += "<li>" + data[i].name + "</li>";
            }
          }

          botResponses.push({
            content: "Here what I have found about '" + observable + "'",
          });
          if (featureOfInterestList && featureOfInterestList != "") {
            botResponses.push({
              content:
                "It has the URI: " +
                observableURI +
                ", with the following predicates linked to it:",
            });
          } else {
            botResponses.push({
              content:
                "'" +
                observable +
                "' is" +
                featureOfInterestList +
                "It has the URI: " +
                observableURI +
                ", with the following predicates linked to it:",
            });
          }
          botResponses.push({ content: "<ul>" + listItems + "</ul>" });
          break;
        }
        case "construct_where_query":
        case "construct_when_query": {
          // botResponses.push({content: response});

          let iPickedMyOwnDate = false;
          let iPickedMyOwnArea = false;
          let searchParameters = [];
          let foundObservablesNames = [];
          let foundObservables = [];

          exEnt = this.extractEntities({
            entitiesArray: response["custom"]["latest_message"]["entities"],
          });
          exEnt = this.createDateInfoEntities(exEnt); //clean date entities used for the date filters.

          // make sure limit are correct, not a date
          // if no limit, check if any extractor has detected CARDINAL
          exEnt = this.cleanupExtractedEntity(exEnt, "limit", "DATE");
          exEnt = this.cleanupExtractedEntity(exEnt, "observable", "DATE");

          // this was cusing some issue when there is from, to dates
          // exEnt = this.cleanupExtractedEntity(exEnt, "dateInfo", "DATE");

          if (exEnt["time"] && Object.keys(exEnt["time"]).length > 0) {
            // let date = new Date(exEnt["time"][Object.keys(exEnt["time"])[0]][0]);
            // print the found date
            // botResponses.push({content: date.getDate()+"/"+ (date.getMonth()+1)+"/"+ date.getFullYear()});
            // botResponses.push({content: exEnt["time"][Object.keys(exEnt["time"])[0]][0]});
          }

          //botResponses.push({content: response["custom"]["latest_message"]["entities"]});
          console.log({
            content: response["custom"]["latest_message"]["entities"],
          });
          //print the observable name
          //botResponses.push({content: exEnt});

          if (response["custom"]["latest_message"]["entities"].length == 0) {
            throw Error("Hmm, what?");
          }

          let observables = [];
          if (exEnt["observable"]) {
            //setting up observables
            observables = Object.keys(exEnt["observable"]);

            console.log("observables -->", observables);
            console.log("exEnt -->", exEnt);
            botResponses.push({
              content:
                "I will do a search for '" +
                observables.join(", ") +
                "' for you.",
            });

            if (observables.length > 0) {
              //remove selected ones
              this.searchValue = [];
            }

            for (let i = 0; i < observables.length; i++) {
              let observable = observables[i];
              let server_response = undefined;

              await this.$store
                .dispatch("axios", {
                  method: "post",
                  url: this.$store.state.settings.endpointURL,
                  data: {
                    query:
                      // 'SELECT  DISTINCT ?predicate {?s ?predicate ?o. FILTER(regex(lcase(str(?predicate)), "' +
                      // observable.toLowerCase() +
                      // '" ))} GROUP BY ?predicate',
                      this.$store.getters.getQueryTemplate(
                        "sensorsSearch",
                        observable.toLowerCase()
                      ),
                  },
                  params: null,
                })
                .then(
                  (response) => {
                    server_response = response;
                  },
                  (error) => {
                    throw error;
                  }
                );

              if (
                server_response === undefined ||
                server_response.data["results"] === undefined ||
                server_response.data["results"]["bindings"] === undefined
              ) {
                // console.log(data);
                // throw new Error("No observable data!");
                break;
              }

              let head = server_response.data["head"]["vars"];
              let results = server_response.data["results"]["bindings"];

              if (
                results.length > 0 &&
                results[0][head[0]] &&
                results[0][head[0]]["value"]
              ) {
                // botResponses.push({content: exEnt});
                //botResponses.push({content: results[0]["predicate"]["value"]});

                //the options that appears on the search
                let observableSearchOptions =
                  this.$store.state.settings.observableOptions;

                let foundMatches = [];
                let nameDict = {}; //make sure if there is a duplicate name to add numberings.

                for (let x = 0; x < results.length; x++) {
                  let found = false;
                  // let obj = this.getPredicateName(results[x].predicate.value);

                  // if (nameDict[obj.name] === undefined) {
                  //   nameDict[obj.name] = 1;
                  // } else {
                  //   nameDict[obj.name]++;
                  // }

                  // if (nameDict[obj.name] > 1) {
                  //   //make sure if there is a duplicate name to add numberings.
                  //   obj.name = obj.name + "_" + nameDict[obj.name] + "";
                  // }

                  /**
                   * If the results for the same query have more than one entity.
                   * We will follow a strcit rule where need to check if it start or end with the same name.
                   *
                   **/
                  if (results.length > 1) {
                    console.log(
                      "results[" + x + "][head[0]].value",
                      results[x][head[0]].value
                    );

                    const objName = this.getPredicateName(
                      results[x][head[0]].value
                    ).name;
                    if (
                      !objName
                        .toLowerCase()
                        .startsWith(observable.toLowerCase().trim()) &&
                      !objName
                        .toLowerCase()
                        .endsWith(observable.toLowerCase().trim())
                    ) {
                      continue;
                    }
                  }

                  let foundObj = await this.prepareObservableOption(
                    results[x],
                    {
                      key: head[0],
                      nameDict: nameDict,
                      colorIndex: x,
                    }
                  );

                  foundMatches.push(foundObj.text);

                  for (let y = 0; y < observableSearchOptions.length; y++) {
                    if (
                      observableSearchOptions[y].uri &&
                      results[x][head[0]].value &&
                      observableSearchOptions[y].uri ==
                      results[x][head[0]].value
                    ) {
                      if (
                        response["custom"]["latest_message"]["intent"][
                        "name"
                        ] == "construct_when_query"
                      ) {
                        observableSearchOptions[
                          y
                        ].modifiers.limit.enabled = true;
                        observableSearchOptions[y].modifiers.limit.value = 1;
                      }

                      // this.searchValue.push(observableSearchOptions[y]);
                      foundObservables.push(observableSearchOptions[y]);
                      found = true;
                      break; //no nedd to continue looping.
                    }
                  }

                  if (!found) {
                    // if not in the observableSearchOptions, create new one
                    console.log("!found");
                    //const nameWithNoSpaces = obj.name.split(" ").join("_");
                    // let foundObj = {
                    //   p: results[x].predicate.value,
                    //   text: obj.name,
                    //   s: "?subject_" + nameWithNoSpaces,
                    //   o: "?object_" + nameWithNoSpaces,
                    //   title: "Description not exist.",
                    //   color: "#1abc9c",
                    //   modifiers: {
                    //     limit: {
                    //       enabled: false,
                    //       value: 0,
                    //     },
                    //   },
                    // };

                    console.log("chatbot prepareObservableOption");

                    if (
                      response["custom"]["latest_message"]["intent"]["name"] ==
                      "construct_when_query"
                    ) {
                      foundObj["modifiers"] = {
                        limit: {
                          enabled: true,
                          value: 1,
                        },
                      };
                    }

                    // this.searchValue.push(foundObj);
                    foundObservables.push(foundObj);
                  }
                }

                if (foundMatches.length > 1) {
                  let ul = makeUL(foundMatches).innerHTML;
                  botResponses.push({
                    content:
                      "I found " +
                      foundMatches.length +
                      " results for '" +
                      observable +
                      "' which are: " +
                      ul,
                  });
                }
              }
            } //-----------

            if (foundObservables.length == 0) {
              throw new Error(
                "I can't find any sensor in your question, please try again or write help."
              );
            }
          } //--------------------------------- end observable section ---------------------------------

          //--------------------------------- [selectPredifinedMapAreas] -------------------------
          //check if the user already typed an area
          if (exEnt["area"]) {
            let areasIndexes = []; //get indexes of selected areas
            for (let i = 0; i < Object.keys(exEnt["area"]).length; i++) {
              const index = this.searchForPredifinedMapAreas(
                Object.keys(exEnt["area"])[i]
              );
              if (index != -1) {
                areasIndexes.push(index);
              }
            }

            if (areasIndexes.length > 0) {
              //clear map filters if any
              thisComponent.mapNearbyFilters = [];
              thisComponent.mapWithinFilters = [];

              iPickedMyOwnArea = true;

              thisComponent.$root.$emit(
                "selectPredifinedMapAreas",
                areasIndexes
              );
            }
          }
          //--------------------------------- [selectPredifinedMapAreas] -------------------------

          if (exEnt["dateInfo"] && exEnt["dateInfo"].length > 0) {
            // botResponses.push({content: "Is this the time filters you typed?"});

            let d1; //date 1
            let d2; //date 2

            let timeMsg = "";
            if (exEnt["dateInfo"].length == 1) {
              d1 = new Date(exEnt["dateInfo"][0].date);
              let year = d1.getFullYear();
              let month = d1.getMonth();
              let day = d1.getDate();
              console.log("dateInfo");
              if (exEnt["dateInfo"][0].grain == "year") {
                d2 = new Date(year + 1, month, day);
              } else if (exEnt["dateInfo"][0].grain == "month") {
                d2 = new Date(
                  year,
                  month + (new Date().getMonth() - month),
                  day
                );
              } else if (exEnt["dateInfo"][0].grain == "week") {
                d2 = new Date(year, month, day + (new Date().getDate() - day));
              } else if (
                ["day", "hour", "minute"].includes(exEnt["dateInfo"][0].grain)
              ) {
                d2 = new Date(year, month, day);
              }
            } else if (exEnt["dateInfo"].length == 2) {
              d1 = new Date(exEnt["dateInfo"][0].date);
              d2 = new Date(exEnt["dateInfo"][1].date);
            } else if (exEnt["dateInfo"].length == 3) {
              d1 = new Date(exEnt["dateInfo"][0].date);
              d2 = new Date(exEnt["dateInfo"][2].date);
            }

            const options = { year: "numeric", month: "short", day: "numeric" };

            console.log("dateInfo", exEnt["dateInfo"]);

            if (d1 && d2 && d1 < d2) {
              //is before
              timeMsg =
                "from " +
                d1.toLocaleDateString(undefined, options) +
                " to " +
                d2.toLocaleDateString(undefined, options);
            } else if (d1 && d2 && d1 > d2) {
              //is after
              timeMsg =
                "from " +
                d2.toLocaleDateString(undefined, options) +
                " to " +
                d1.toLocaleDateString(undefined, options);
            } else if (d1) {
              timeMsg = "from " + d1.toLocaleDateString(undefined, options);
            }

            // this.processDucklingEntities(exEnt["time"])

            this.botuiMessage({
              content:
                "I see that you want to add a date filters. Is this what you typed?",
            });
            this.botuiMessage({
              content: timeMsg,
            });

            await botui.action
              .button({
                action: [
                  {
                    // show only one button
                    text: "Yes, continue.",
                    value: "yes",
                  },
                  {
                    // show only one button
                    text: "No, continue without date filters.",
                    value: "no",
                  },
                  {
                    // show only one button
                    text: "Stop, I will ask again.",
                    value: "error",
                  },
                ],
              })
              .then(function (res) {
                // will be called when a button is clicked.
                console.log(res.value); // will print "one" from 'value'

                if (res.value == "no") {
                  console.log("reset");
                  thisComponent.mapNearbyFilters = [];
                  thisComponent.mapWithinFilters = [];

                  //thisComponent.datePickerValue = [null, null];
                } else if (res.value == "yes") {
                  thisComponent.$root.$emit("setUpperDatePicker", d1, d2);
                  iPickedMyOwnDate = true;
                } else {
                  thisComponent.botuiMessage({
                    content: "OK. Please ask again.",
                  });
                  throw new Error("Search Aborted.");
                }
              });
          }

          console.log("exEnt", exEnt);

          if (exEnt["limit"] && Object.keys(exEnt["limit"]).length > 0) {
            if (!Number(Object.keys(exEnt["limit"])[0])) {
              const num = text2num(Object.keys(exEnt["limit"])[0]);
              if (num > 0) {
                this.limit = num;
              } else {
                this.limit = 100;
              }
            } else {
              this.limit = Object.keys(exEnt["limit"])[0];
            }
          } else {
            if (
              response["custom"]["latest_message"]["intent"]["name"] ==
              "construct_when_query"
            ) {
              this.limit = observables.length;
            } else {
              this.limit = 100;
            }
          }

          // console.log("Order:", exEnt["order"]["group"]);

          if (
            exEnt["order"] &&
            (exEnt["order"]["group"] || exEnt["order"]["ascending"])
          ) {
            if (
              exEnt["order"]["ascending"] ||
              exEnt["order"]["group"] == "ascending"
            ) {
              this.sortByDir = "asc";
            } else {
              this.sortByDir = "desc";
            }
          } else {
            this.sortByDir = "desc"; //default
          }

          //------------------------------- [checkpoint for map and date filters] --------------------------->>>>>

          let filters = [];
          if (
            (this.mapNearbyFilters.length > 0 ||
              this.mapWithinFilters.length > 0) &&
            !iPickedMyOwnArea
          ) {
            filters.push("map filters"); //we found some map filters
          }
          if (this.datePickerValue[0] !== null && !iPickedMyOwnDate) {
            filters.push("date picker [" + this.datePickerValue + "]"); //we found date filters
          }

          if (filters.length > 0) {
            let filterMsg = filters[0];
            if (filters.length > 1) {
              filterMsg += " and " + filters[1]; //prepare massage
            }
            this.botuiMessage({
              //show massage
              content:
                "You have some pre-selected filters using " +
                filterMsg +
                ", do you want to use them?",
            });

            await botui.action
              .button({
                action: [
                  {
                    // show only one button
                    text: "Yes, continue.",
                    value: "yes",
                  },
                  {
                    // show only one button
                    text: "No. Reset all filters, then continue.",
                    value: "no",
                  },
                ],
              })
              .then(function (res) {
                // will be called when a button is clicked.
                console.log(res.value); // will print "one" from 'value'

                if (res.value == "no") {
                  console.log("reset");
                  if (!iPickedMyOwnArea) {
                    //if this location was selected by the user, we should respect that and not clear it.
                    thisComponent.mapNearbyFilters = []; //clear map filters
                    thisComponent.mapWithinFilters = []; //clear map filters
                  }

                  if (!iPickedMyOwnDate) {
                    //if this date was selected by the user, we should respect that and not clear it
                    thisComponent.$root.$emit("clearUpperDatePicker"); //clear date filter
                  }

                  //thisComponent.datePickerValue = [null, null];
                }
              });
          }

          //-------------------------------- [End checkpoint for map and date filters] --------------<<<<<<

                   /*
                    *
                    * this.searchValue = {
                        "p": results[0]["predicate"]["value"],
                        "text": observable,
                        "s": "?subject_"+observable,
                        "o": "?object_"+observable,
                        "title": "Description not exist.",
                        "color": "#1abc9c"
                    };
                    *
                    *
                    * */

          for (let i = 0; i < foundObservables.length; i++) {
            this.searchValue.push(foundObservables[i]);
            foundObservablesNames.push(
              '<span style="font-weight: 900; color: ' +
              foundObservables[i].color +
              ';">' +
              foundObservables[i].text +
              "</span>"
            );
          }
          await delay(1000); //wait a second to load before getting the results.
          this.queryResult = "loading"; //start loading

          //check if there are a recommended sort, use it.
          if (this.$store.state.coreStore.sortBy.recommended) {
            this.sortByExp = this.$store.state.coreStore.sortBy.recommended;
          }

          if (this.limit) {
            searchParameters.push(["Results Limit", this.limit]);
          }

          if (this.datePickerValue[0] != null) {
            searchParameters.push([
              "Date Range",
              "From: " +
              this.datePickerValue[0] +
              " To: " +
              this.datePickerValue[1],
            ]);
          }

          if (this.sortByExp && this.sortByExp != "!none") {
            searchParameters.push([
              "Sort By",
              this.sortByExp + " in " + this.sortByDir + " order",
            ]);
          }
          if (
            this.mapNearbyFilters.length > 0 ||
            this.mapWithinFilters.length > 0
          ) {
            searchParameters.push([
              "Map Filters",
              this.mapNearbyFilters.length +
              this.mapWithinFilters.length +
              " Map Filters were placed on the map",
            ]);
          }

          let searchParametersLi = "";
          for (let i = 0; i < searchParameters.length; i++) {
            searchParametersLi +=
              "<li><strong>" +
              searchParameters[i][0] +
              "</strong>: " +
              searchParameters[i][1] +
              "</li>";
          }

          botResponses.push({
            content:
              (foundObservablesNames.length > 1
                ? "<p>Search for: [" + foundObservablesNames.join(", ") + "]"
                : "<p>Search for: " + foundObservablesNames.join("")) +
              "</p><p>The search parameters are:</p><ul>" +
              searchParametersLi +
              "</ul>",
          });

          this.getResults();

          botResponses.push({
            content: "The results should be shown in the page now.",
          });

          break;
        }
        default:
          botResponses.push({ content: "I don't know how to process that." });
          botResponses.push({ content: response });
      }

      return botResponses;
    },

    /**
     * This function purpose is to compare the extracted limit numeric value if it was detected by "SpacyEntityExtractor"
     * If this was value was identified as date using "SpacyEntityExtractor", this function will delete that limit value.
     *
     * why? because sometimes "DIETClassifier" mistakenly clssifies dates as limit (as it is a numeric value) this
     * will validate that DIETClassifier did not mistakenly identify the entity.
     * @param exEnt extracted entities
     */
    cleanupExtractedEntity: function (
      exEnt,
      entity = "limit",
      compareWith = "DATE"
    ) {
      //------------------------------------------------- dateInfo -------------------------------------------------
      if (entity == "dateInfo") {
        if (!exEnt[compareWith]) {
          exEnt[compareWith] = {}; //if not set, we will create empty one. {}
        }

        if (exEnt[entity] && exEnt[entity].length > 0) {
          // let keys = exEnt[entity];
          let DATEkeys = Object.keys(exEnt[compareWith]);

          for (let x = exEnt[entity].length - 1; x >= 0; x--) {
            let found = false;
            for (let y = 0; y < Object.keys(exEnt[compareWith]).length; y++) {
              //two ways in which (a,b) cannot overlap with (x,y)
              //the formula becomes, =if( y<a || b<x),"Do not overlap"

              if (
                exEnt[compareWith][DATEkeys[y]] &&
                exEnt[entity][x] &&
                !(
                  exEnt[compareWith][DATEkeys[y]].end <
                  exEnt[entity][x].start ||
                  exEnt[entity][x].end < exEnt[compareWith][DATEkeys[y]].start
                )
              ) {
                //this is overlap, it will stay
                found = true;
              }
            } //--inner loop end

            if (!found) {
              console.log("found value", found);
              exEnt[entity].splice(x, 1); // 2nd parameter means remove one item only
              //delete exEnt[entity][x];
            }
          } //--upper loop end
        }
        console.log("cleanupExtractedEntity", exEnt);

        return exEnt;
      } //------------------------------------------------- if dateInfo, it will end here -------------------------------------------------

      //---------- General cleanup process (compare with)
      if (
        exEnt[compareWith] &&
        Object.keys(exEnt[compareWith]).length > 0 &&
        exEnt[entity] &&
        Object.keys(exEnt[entity]).length > 0
      ) {
        let keys = Object.keys(exEnt[entity]);
        let DATEkeys = Object.keys(exEnt[compareWith]);
        //if it is exactly matches the entity
        for (let i = Object.keys(exEnt[entity]).length - 1; i >= 0; i--) {
          if (entity == "limit" && exEnt[entity][keys[i]].count > 1) {
            console.log("limit skip");
            continue; //skip if count > 1, as it means two extractors agree it is a limit
          }

          if (
            exEnt[compareWith][keys[i]] &&
            exEnt[entity][keys[i]] &&
            exEnt[compareWith][keys[i]].start == exEnt[entity][keys[i]].start &&
            exEnt[compareWith][keys[i]].end == exEnt[entity][keys[i]].end
          ) {
            //this is not the entity and will be deleted.
            delete exEnt[entity][keys[i]];
          }
        }

        // if it is contained by that entity
        for (let x = Object.keys(exEnt[entity]).length - 1; x >= 0; x--) {
          if (
            entity == "limit" &&
            exEnt[entity][keys[x]] &&
            exEnt[entity][keys[x]]["extractor"]
          ) {
            console.log("limit skip");
            continue; //skip if this has extractor which means we trust it.
          }

          for (let y = 0; y < Object.keys(exEnt[compareWith]).length; y++) {
            if (
              exEnt[compareWith][DATEkeys[y]] &&
              exEnt[entity][keys[x]] &&
              exEnt[compareWith][DATEkeys[y]].start <=
              exEnt[entity][keys[x]].start &&
              exEnt[compareWith][DATEkeys[y]].end >= exEnt[entity][keys[x]].end
            ) {
              //this is not the correct entity and will be deleted.
              delete exEnt[entity][keys[x]];
            }
          }
        }
        //---------------------------------- specific entity cleanup process
        if (entity == "observable") {
          //self compaire
          if (exEnt[entity] && Object.keys(exEnt[entity]).length > 0) {
            console.log(
              "--observables cleanup",
              Object.keys(exEnt[entity]).length
            );
            const observableKeys = Object.keys(exEnt[entity]);
            const sizeLimit = 4; //remove any entity with size less than this.
            for (let i = 0; i < observableKeys.length; i++) {
              if (observableKeys[i].length < sizeLimit) {
                delete exEnt[entity][observableKeys[1]]; //remove, because it is less than 'sizeLimit' value.
              }
            }
          }
        } else if (entity == "limit") {
          if (
            Object.keys(exEnt["limit"]).length == 0 &&
            exEnt["CARDINAL"] &&
            Object.keys(exEnt["CARDINAL"]).length > 0
          ) {
            let limitFound = false;
            const CARDINALKeys = Object.keys(exEnt["CARDINAL"]);
            for (let i = 0; i < CARDINALKeys.length && !limitFound; i++) {
              const num = text2num(CARDINALKeys[i]);
              if (num > 0) {
                exEnt["limit"][CARDINALKeys[i]] =
                  exEnt["CARDINAL"][CARDINALKeys[i]];
                limitFound = true;
              }
            }
          }
        }
      }
      return exEnt;
    },
    /**
     * This function will extract all entities from the bot response.
     * */
    extractEntities: function ({ entitiesArray }) {
      let extracted = {};
      // let ducklingCounter = 0;
      for (let i = 0; i < entitiesArray.length; i++) {
        const entity = entitiesArray[i];

        const classifiers = [
          "MitieEntityExtractor",
          "RegexEntityExtractor",
          "DIETClassifier",
          "SpacyEntityExtractor",
          "CRFEntityExtractor",
        ];
        if (classifiers.includes(entity["extractor"])) {
          if (
            Object.prototype.hasOwnProperty.call(extracted, [entity["entity"]]) &&
            Object.prototype.hasOwnProperty.call(extracted[entity["entity"]], entity["value"])
          ) {
            extracted[entity["entity"]][entity["value"]].count++;
          } else {
            //guard
            if (
              entity["entity"] == "area" &&
              entity["extractor"] != "RegexEntityExtractor"
            ) {
              continue;
            }

            if (!Object.prototype.hasOwnProperty.call(extracted, [entity["entity"]])) {
              extracted[entity["entity"]] = {};
            }
            extracted[entity["entity"]][entity["value"]] = {
              count: 1,
              start: entity["start"],
              end: entity["end"],
            };

            if (
              entity["entity"] == "limit" &&
              entity["extractor"] == "MitieEntityExtractor"
            ) {
              extracted[entity["entity"]][entity["value"]]["extractor"] =
                "MitieEntityExtractor"; //it means we trust it.
            }
          }

          if (Object.prototype.hasOwnProperty.call(entity, "group")) {
            extracted[entity["entity"]]["group"] = entity["group"];
          }
        } else if (entity["extractor"] == "DucklingEntityExtractor") {
          if (extracted[entity["entity"]] == undefined) {
            extracted[entity["entity"]] = [];
          }

          // if (extracted[entity["entity"]][ducklingCounter] == undefined) {
          //     extracted[entity["entity"]][ducklingCounter] = [];
          // }

          if (
            Object.prototype.hasOwnProperty.call(entity["value"], "from") ||
            Object.prototype.hasOwnProperty.call(entity["value"], "to")
          ) {
            let toFrom = {};

            if (entity["value"]["to"]) {
              //extracted[entity["entity"]][ducklingCounter].push({to:entity["value"]["to"]});

              toFrom["to"] = [entity["value"]["to"]];
              if (
                entity["additional_info"] &&
                entity["additional_info"]["to"] &&
                entity["additional_info"]["to"]["grain"]
              ) {
                toFrom["to"].push(entity["additional_info"]["to"]["grain"]);
              }
            }

            if (entity["value"]["from"]) {
              //extracted[entity["entity"]][ducklingCounter].push({to:entity["value"]["from"]});
              toFrom["from"] = [entity["value"]["from"]];

              if (
                entity["additional_info"] &&
                entity["additional_info"]["from"] &&
                entity["additional_info"]["from"]["grain"]
              ) {
                toFrom["from"].push(entity["additional_info"]["from"]["grain"]);
              }
            }
            console.log("toForm", toFrom);
            toFrom["start"] = entity["start"];
            toFrom["end"] = entity["end"];

            extracted[entity["entity"]].push(toFrom); //[ducklingCounter]
          } else {
            extracted[entity["entity"]].push({
              value: entity["value"],
              start: entity["start"],
              end: entity["end"],
            }); //[ducklingCounter]
          }

          if (Object.prototype.hasOwnProperty.call(entity, "additional_info")) {
            if (Object.prototype.hasOwnProperty.call(entity["additional_info"], "grain")) {
              //error
              // extracted[entity["entity"]][ducklingCounter].grain = entity["additional_info"]["grain"]; //[ducklingCounter]
              if (extracted[entity["entity"]].length > 0) {
                extracted[entity["entity"]][
                  extracted[entity["entity"]].length - 1
                ].grain = entity["additional_info"]["grain"];
              }
            }
          }
          // ducklingCounter++;
        }

        console.log("extractEntities", entitiesArray);
      }

      // //extract dateInfo from duckling time
      // if (extracted.hasOwnProperty("time")) {
      //     extracted["dateInfo"] = [];
      //     for (let i = 0; i < extracted["time"].length; i++) {
      //         if (extracted["time"][i].hasOwnProperty("value") && extracted["time"][i].hasOwnProperty("grain")) {
      //             const dd = new Date(extracted["time"][i]["value"]);
      //
      //             if (["day", "week", "month", "year", "second", "hour", "minute"].includes(extracted["time"][i]["grain"])) {
      //                 extracted["dateInfo"].push({
      //                     date: dd.getFullYear() + "-" + (dd.getMonth() + 1) + "-" + dd.getDate(),
      //                     grain: extracted["time"][i]["grain"]
      //                 });
      //             }
      //
      //
      //         } else if (extracted["time"][i].hasOwnProperty("from") || extracted["time"][i].hasOwnProperty("to")) {
      //             if (extracted["time"][i].hasOwnProperty("from")) {
      //                 const from = new Date(extracted["time"][i]["from"][0]);
      //                 if (["day", "week", "month", "year", "second", "hour", "minute"].includes(extracted["time"][i]["from"][1])) {
      //                     extracted["dateInfo"].push({
      //                         date: from.getFullYear() + "-" + (from.getMonth() + 1) + "-" + from.getDate(),
      //                         grain: extracted["time"][i]["from"][1]
      //                     });
      //                 }
      //             }
      //
      //             if (extracted["time"][i].hasOwnProperty("to")) {
      //                 const to = new Date(extracted["time"][i]["to"][0]);
      //                 if (["day", "week", "month", "year", "second", "hour", "minute"].includes(extracted["time"][i]["to"][1])) {
      //                     extracted["dateInfo"].push({
      //                         date: to.getFullYear() + "-" + (to.getMonth() + 1) + "-" + to.getDate(),
      //                         grain: extracted["time"][i]["to"][1]
      //                     });
      //                 }
      //             }
      //         }
      //
      //     }
      // }

      console.log("extracted", extracted);

      //console.log("extractEntities", entitiesArray);

      return extracted;
    },
    createDateInfoEntities: function (extractedEntities) {
      if (!extractedEntities["dateInfo"]) {
        extractedEntities["dateInfo"] = [];
      }

      //extract dateInfo from duckling time
      if (Object.prototype.hasOwnProperty.call(extractedEntities, "time")) {
        let ducklingTime = [];

        for (let i = 0; i < extractedEntities["time"].length; i++) {
          if (
            Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "value") &&
            Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "grain")
          ) {
            const dd = new Date(extractedEntities["time"][i]["value"]);

            if (
              [
                "day",
                "week",
                "month",
                "year",
                "second",
                "hour",
                "minute",
              ].includes(extractedEntities["time"][i]["grain"])
            ) {
              ducklingTime.push({
                date:
                  dd.getFullYear() +
                  "-" +
                  (dd.getMonth() + 1) +
                  "-" +
                  dd.getDate(),
                grain: extractedEntities["time"][i]["grain"],
                start: extractedEntities["time"][i]["start"],
                end: extractedEntities["time"][i]["end"],
              });
            }
          } else if (
            Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "from") ||
            Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "to")
          ) {
            let fromToFlag = false;
            if (
              Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "from") &&
              Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "to")
            ) {
              fromToFlag = true;
            }

            if (Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "from")) {
              console.log("inside from");
              const from = new Date(extractedEntities["time"][i]["from"][0]);
              if (
                [
                  "day",
                  "week",
                  "month",
                  "year",
                  "second",
                  "hour",
                  "minute",
                ].includes(extractedEntities["time"][i]["from"][1])
              ) {
                console.log("inside from push");
                ducklingTime.push({
                  date:
                    from.getFullYear() +
                    "-" +
                    (from.getMonth() + 1) +
                    "-" +
                    from.getDate(),
                  grain: extractedEntities["time"][i]["from"][1],
                  start: extractedEntities["time"][i]["start"],
                  end: fromToFlag
                    ? Math.floor(extractedEntities["time"][i]["end"] / 2)
                    : extractedEntities["time"][i]["end"],
                  fromTo: fromToFlag, //flag to treat this diffrently
                });
              }
            }

            if (Object.prototype.hasOwnProperty.call(extractedEntities["time"][i], "to")) {
              const to = new Date(extractedEntities["time"][i]["to"][0]);
              if (
                [
                  "day",
                  "week",
                  "month",
                  "year",
                  "second",
                  "hour",
                  "minute",
                ].includes(extractedEntities["time"][i]["to"][1])
              ) {
                console.log("inside to push");
                ducklingTime.push({
                  date:
                    to.getFullYear() +
                    "-" +
                    (to.getMonth() + 1) +
                    "-" +
                    (fromToFlag && to.getDate() > 1
                      ? to.getDate() - 1
                      : to.getDate()),
                  grain: extractedEntities["time"][i]["to"][1],
                  start: fromToFlag
                    ? Math.floor(extractedEntities["time"][i]["end"] / 2)
                    : extractedEntities["time"][i]["end"],
                  end: extractedEntities["time"][i]["end"],
                  fromTo: fromToFlag, //flag to treat this diffrently
                });
              }
            }
          }
        }

        // console.log("ducklingTime", ducklingTime[0], ducklingTime[1]);
        //let cleanedDucklingTime = [];

        //if something is agreed on by duckilng and spacy, it will be considered immediatly

        // let compareWith = "DATE";
        //extractedEntities["DATE"]

        //------------------------------------------------- find entities that match spacy DATE, if any

        if (
          ducklingTime &&
          ducklingTime.length > 0 &&
          extractedEntities["DATE"] &&
          Object.keys(extractedEntities["DATE"].length > 0)
        ) {
          let DATEkeys = Object.keys(extractedEntities["DATE"]);
          console.log("cleanupdateInfo -- before outer loop");

          for (let x = ducklingTime.length - 1; x >= 0; x--) {
            let found = false;
            console.log("cleanupdateInfo -- outer loop");
            for (let y = 0; y < DATEkeys.length; y++) {
              //two ways in which (a,b) cannot overlap with (x,y)
              //the formula becomes, =if( y<a || b<x),"Do not overlap"

              if (
                extractedEntities["DATE"][DATEkeys[y]] &&
                ducklingTime[x] &&
                extractedEntities["DATE"][DATEkeys[y]].start ==
                ducklingTime[x].start &&
                extractedEntities["DATE"][DATEkeys[y]].end ==
                ducklingTime[x].end
              ) {
                //we found an exact match
                ducklingTime[x]["priorityMatch"] = true;
              }
            } //--inner loop end
          } //--upper loop end
        }
        //------------------------------------------------- end of find entities that match spacy DATE, if any -------------------------------------------------

        console.log("ducklingTime", ducklingTime[0], ducklingTime[1]);

        //https://chandoo.org/wp/date-overlap-formulas/
        //cleaning overlaping times
        for (let x = 0; x < ducklingTime.length;) {
          let curTime = ducklingTime[x];
          console.log("ducklingTime[x]", ducklingTime[x]);
          for (let y = x + 1; y < ducklingTime.length; y++) {
            console.log("ducklingTime[y]", ducklingTime[y]);
            if (
              !(
                //if overlap
                (
                  ducklingTime[x].end <= ducklingTime[y].start ||
                  ducklingTime[y].end <= ducklingTime[x].start
                )
              )
            ) {
              console.log("overlap between:", ducklingTime[x], ducklingTime[y]);
              if (
                //find the one with bigger range
                ducklingTime[x].end - ducklingTime[x].start >=
                ducklingTime[y].end - ducklingTime[y].start
              ) {
                if (
                  ducklingTime[y].priorityMatch &&
                  !ducklingTime[x].priorityMatch
                ) {
                  curTime = undefined; //we know curTime is not priority and need to be removed:
                  ducklingTime.splice(x, 1);
                  break;
                } else {
                  ducklingTime.splice(y, 1); //delete smaller range
                  y--;
                }
              } else {
                curTime = undefined; //we know curTime is not larger and need to be removed:
                ducklingTime.splice(x, 1);
                break;
              }
            }
          }
          if (curTime) {
            console.log("curTime push:", curTime);
            extractedEntities["dateInfo"].push(curTime);
            x++; //we are sure it was large and we need to move to the next index.
          }
        }
      }

      console.log("LOG: createDateInfoEntities", extractedEntities);
      return extractedEntities;
    },
    botuiMessage: function (payload) {
      if (payload["action"]) {
        console.log("Dev Note: It is an action and it will not be added to the chat.");
      } else {
        botui.message.add(payload);
        if (payload["content"]) {
          // let sender = "Bot";
          // if(payload["human"]){
          //   sender = "User";
          // }
          // axios.post("./api/chatlog", {log: sender+": "+JSON.stringify(payload["content"])});
        }
      }
    },
    /**
     *
     * @param text
     * @param addToChat if false, the message will be sent but will not be displayed to the user.
     */
    submitMsg: function (text, addToChat = true) {
      //cleanup
      text = text.replace(/(\r\n|\n|\r)/gm, ""); //replaces all 3 types of line breaks with a empty space
      text = text.replace(/\s+/g, " "); //Removing Extra Spaces from Lines
      text = text.replaceAll("?", ""); //Removing ? from text
      text = text.replaceAll("!", ""); //Removing ! from text

      // const rasaApi = "http://localhost:5006/webhooks/rest/webhook"; //port default 5005
      //rasa run --enable-api --cors "*" -p 5006
      if (addToChat) {
        botui.message.add({
          human: true,
          content: text,
        });
      }

      botui.action.hide(); // hide the all actions if any when the user send a message.

      // try { //Load the examples
      // const d = new Date();

      // this.$refs.messagesList.scrollTop = this.$refs.messagesList.scrollHeight;
      //botui-messages-container
      const collection = document.getElementsByClassName(
        "botui-messages-container"
      )[0];
      collection.scrollTop = collection.scrollHeight;

      const thisComponent = this;

      botui.message
        .add({
          loading: true,
        })
        .then(async function (index) {
          // do some stuff like ajax, etc.

          try {
            //Load the examples
            console.log("text", text);

            let data = (
              await axios.post(thisComponent.$store.state.settings.rasaApiURL, {
                message: text,
                sender: "123",
              })
            ).data;

            //log it to the server.
            //axios.post("./api/chatlog", {log: "User: "+JSON.stringify(text)});
            axios.post("./api/chatlog", {
              log: "Rasa: " + JSON.stringify(data),
            });

            console.log("Rasa: ", JSON.stringify(data));

            if (data.length == 0) {
              throw new Error("I can't think of an answer to this!");
            }

            for (let i = 0; i < data.length; i++) {
              if (data[i].custom) {
                let htmlResponses =
                  await thisComponent.processBotCustomResponses(data[i]);

                for (let hri = 0; hri < htmlResponses.length; hri++) {
                  if (htmlResponses[hri].content) {
                    if (hri == 0) {
                      //replace the loading box
                      botui.message.update(index, {
                        loading: false,
                        type: "html",
                        content: htmlResponses[hri].content,
                      });
                    } else {
                      botui.message.bot({
                        content: htmlResponses[hri].content,
                      });
                    }
                    // axios.post("./api/chatlog", {log: "*Bot: "+JSON.stringify(htmlResponses[hri].content)});
                  } else if (htmlResponses[hri].action) {
                    const key = Object.keys(htmlResponses[hri].action)[0];

                    botui.action[key](htmlResponses[hri].action[key]).then(
                      function (res) {
                        // will be called when a button is clicked.
                        let addToChat = false;
                        //console.log(htmlResponses[hri].action[key].action.options); // will print

                        //if this action is a list and has options
                        if (
                          htmlResponses[hri].action[key].action &&
                          htmlResponses[hri].action[key].action.options
                        ) {
                          //find selected option, then check if it has addValueToChat option.
                          const selected = htmlResponses[hri].action[
                            key
                          ].action.options.find((element) => {
                            return element.value == res.value;
                          });
                          if (selected.addValueToChat) {
                            //this means value won't be hidden.
                            addToChat = selected.addValueToChat;
                          }
                        }

                        //console.log(selected.addValueToChat);

                        thisComponent.submitMsg(res.value, addToChat);
                      }
                    );
                  }
                }
              } else {
                if (data[i].text) { //text data
                  if (i == 0) {
                    //replace the loading box
                    botui.message.update(index, {
                      loading: false,
                      type: "html",
                      content: data[i].text,
                    });
                  } else {
                    botui.message.bot({
                      content: data[i].text,
                    });
                  }
                } else if (data[i].image) { //sometimes it is images
                  if (i == 0) {
                    //replace the loading box
                    botui.message.update(index, {
                      loading: false,
                      type: "html",
                      content: '<img src="' + data[i].image + '" alt="An image response from the chatbot" width="400">',//data[i].image,
                    });
                  } else {
                    botui.message.bot({

                      content: '<img src="' + data[i].image + '" alt="An image response from the chatbot" width="200">',
                    });
                  }
                }
              }
            }
          } catch (error) {
            //log it to the server.
            // axios.post("./api/chatlog", {log: "^Error: "+error.message,});
            botui.message.update(index, {
              loading: false,
              content: error.message,
            });
          }
        });
    },
    onMessageSubmit: function (e) {
      /*
       * example simulating an upload callback.
       * It's important to notice that even when your message wasn't send
       * yet to the server you have to add the message into the array
       */

      const text = this.$refs.messageInput.value.trim();
      this.$refs.messageInput.value = "";

      if (text.length == 0) {
        return;
      }

      this.submitMsg(text);
    },
    changeVisibility() {
      this.visible = !this.visible;
    },
    async getSparql() {
      //get sparql by sending the queryJSON to be converted to sparql on the server.
      this.sparqlQuery = ""; //clear old query
      try {
        //this.isLoading = true;
        let data = (
          await axios.post(
            this.$store.state.settings.getSparqlURL,
            this.queryJSON
          )
        ).data;

        this.sparqlQuery = data.query;
        //this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        //console.error(error);
        this.errorMsg = error.message;
      }
    },
    async getResults() {
      // bus.$emit('startSearch');
      this.queryResult = "loading";
      this.isLoading = true;
      this.errorMsg = undefined;
      try {
        await this.getSparql();
        if (this.sparqlQuery == undefined || this.sparqlQuery.length == 0) {
          throw new Error("Unable to generate the query!");
        }

        // let data = (await axios.post(this.$store.state.settings.endpointURL,
        //     {
        //         query: this.sparqlQuery
        //     }
        // )).data;

        let server_response = undefined;

        await this.$store
          .dispatch("axios", {
            method: "post",
            url: this.$store.state.settings.endpointURL,
            data: {
              query: this.sparqlQuery,
            },
            params: null,
            timeout: this.$store.state.settings.timeout,
          })
          .then(
            (response) => {
              server_response = response;
              console.log(response.status, server_response.data);
            },
            (error) => {
              throw error;
            }
          );

        if (server_response === undefined) {
          // console.log(data);
          throw new Error("No proper server response!");
        }

        this.queryResult = server_response.data;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        this.queryResult = String();
        if (error.message) {
          this.errorMsg = error.message;
        } else {
          this.errorMsg = error;
        }
      }
    },
  },
  created: function () { },
  mounted() {
    const thisComponent = this;
    let initFlag = false;
    $(".chat_close_icon").click(function () {
      $(".Layout").hide();
      $(".chat_on").show(300);
    });

    $(document).ready(function () {
      $(".chat_on").click(function () {
        $(".Layout").toggle();
        $(".chat_on").hide(300);

        if (!initFlag) {
          initFlag = true;
          thisComponent.botuiMessage({
            loading: true,
            delay: 1000,
            content: "Hi, I am ForestBot! I will help you to explore the data.",
          });
        }
      });
    });
    // botui = BotUI('my-botui-app', {
    //     vue: Vue // pass the dependency.
    // })

    // botui.message.add({
    //     delay: 1000,
    //     loading: true,
    //     content: "message.text ? message.text : message,",
    // });
  },
};

/**
 * This function will get the predicate name from the list if exist,
 * or will try to guess the name based on the uri.
 *
 * @param predicate uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
 * @returns {{name: string, desc: string}}
 */
// function getPredicateName(predicate) {
//   if (predicatesData[predicate]) {
//     if (
//       predicatesData[predicate].name.length &&
//       predicatesData[predicate].name.length > 0
//     ) {
//       return predicatesData[predicate];
//     }
//   }

//   //If Name dont exist in the list, I will try to guess it myself:
//   let str = predicate;

//   if (predicate.lastIndexOf("#") > predicate.lastIndexOf("/")) {
//     str = str.substring(str.lastIndexOf("#") + 1, str.length);
//   } else if (predicate.lastIndexOf("/") > -1) {
//     str = str.substring(str.lastIndexOf("/") + 1, str.length);
//   }

//   const words = str.split(/[\s,_]+/);

//   for (let i = 0; i < words.length; i++) {
//     words[i] = words[i][0].toUpperCase() + words[i].substr(1);
//   }

//   let newStr = "";
//   for (let i = 0; i < words.length; i++) {
//     newStr += words[i].replace(/([a-z0-9])([A-Z])/g, "$1 $2") + " ";
//   }

//   //words.join(" ");

//   str = newStr;

//   //if no name, return this:
//   return { name: str.trim(), desc: "Description not exist." };
// } // ----- end of getPredicateName

function makeUL(array) {
  // Create the list element:
  var list = document.createElement("ul");

  for (var i = 0; i < array.length; i++) {
    // Create the list item:
    var item = document.createElement("li");

    // Set its contents:
    item.appendChild(document.createTextNode(array[i]));

    // Add it to the list:
    list.appendChild(item);
  }

  // Finally, return the constructed list:
  return list;
}

//Javascript: Words to numbers [closed]
// https://stackoverflow.com/questions/11980087/javascript-words-to-numbers
var Small = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
  twenty: 20,
  thirty: 30,
  forty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};

var Magnitude = {
  thousand: 1000,
  million: 1000000,
  billion: 1000000000,
  trillion: 1000000000000,
  quadrillion: 1000000000000000,
  quintillion: 1000000000000000000,
  sextillion: 1000000000000000000000,
  septillion: 1000000000000000000000000,
  octillion: 1000000000000000000000000000,
  nonillion: 1000000000000000000000000000000,
  decillion: 1000000000000000000000000000000000,
};

var a, n, g;

function text2num(s) {
  a = s.toString().split(/[\s-]+/);
  n = 0;
  g = 0;
  a.forEach(feach);
  return n + g;
}

function feach(w) {
  var x = Small[w];
  if (x != null) {
    g = g + x;
  } else if (w == "hundred") {
    g = g * 100;
  } else {
    x = Magnitude[w];
    if (x != null) {
      n = n + g * x;
      g = 0;
    } else {
      console.log("Unknown number: " + w);
    }
  }
}
</script>

<style>
.header-title-text {
  position: absolute;
  top: 15px;
}

.header-paticipants-text {
  position: absolute;
  top: 30px;
}

.chat-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  border: 0;
  background-color: #00b894;
}

/* The popup chat - hidden by default */
.chat-popup {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  max-height: 60%;
  height: 500px;
  width: 400px;
  box-shadow: 1px 0px 8px #888888;
  background-color: transparent;
  border-radius: 10px;
}

/*===========================
     CHAT BOOT MESSENGER
   ===========================*/
#Smallchat .Messages,
#Smallchat .Messages_list {
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
}

.chat_close_icon {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
  position: absolute;
  right: 12px;
  z-index: 9;
}

.chat_on {
  position: fixed;
  z-index: 10;
  width: 62px;
  height: 62px;
  right: 15px;
  bottom: 20px;
  background-color: #00b894;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  padding: 9px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
  cursor: pointer;
  display: block;
}

.chat_on_icon {
  color: #fff;
  font-size: 25px;
  text-align: center;
}

/*
#Smallchat,#Smallchat * {
 box-sizing:border-box;
 -webkit-font-smoothing:antialiased;
 -moz-osx-font-smoothing:grayscale;
 -webkit-tap-highlight-color:transparent
}
*/
#Smallchat .Layout {
  pointer-events: auto;
  box-sizing: content-box !important;
  z-index: 999999999;
  position: fixed;
  bottom: 20px;
  min-width: 50px;
  max-width: 300px;
  max-height: 30px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  border-radius: 50px;
  box-shadow: 5px 0 20px 5px rgba(0, 0, 0, 0.1);
  -webkit-animation: appear 0.15s cubic-bezier(0.25, 0.25, 0.5, 1.1);
  animation: appear 0.15s cubic-bezier(0.25, 0.25, 0.5, 1.1);
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
  opacity: 0;
  -webkit-transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    border-radius 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    background-color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s;
  transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1),
    border-radius 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    background-color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s,
    color 50ms cubic-bezier(0.25, 0.25, 0.5, 1) 0.15s;
}

#Smallchat .Layout-right {
  right: 20px;
}

#Smallchat .Layout-open {
  overflow: hidden;
  /*was 300*/
  min-width: 400px;
  max-width: 400px;
  height: 500px;
  max-height: 500px;
  border-radius: 10px;
  color: #fff;
  -webkit-transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    border-radius 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    background-color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1);
  transition: right 0.1s cubic-bezier(0.25, 0.25, 0.5, 1),
    bottom 0.1s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-width 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    max-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    min-height 0.2s cubic-bezier(0.25, 0.25, 0.5, 1.1),
    border-radius 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    background-color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1),
    color 0ms cubic-bezier(0.25, 0.25, 0.5, 1.1);
}

#Smallchat .Layout-expand {
  height: 500px;
  min-height: 500px;
  display: none;
}

#Smallchat .Layout-mobile {
  bottom: 10px;
}

#Smallchat .Layout-mobile.Layout-open {
  width: calc(100% - 20px);
  min-width: calc(100% - 20px);
}

#Smallchat .Layout-mobile.Layout-expand {
  bottom: 0;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
  border-radius: 0 !important;
}

@-webkit-keyframes appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  to {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

#Smallchat .Messenger_messenger {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 300px;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

#Smallchat .Messenger_header,
#Smallchat .Messenger_messenger {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
}

#Smallchat .Messenger_header {
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 40px;
  height: 40px;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

#Smallchat .Messenger_header h4 {
  opacity: 0;
  font-size: 16px;
  -webkit-animation: slidein 0.15s 0.3s;
  animation: slidein 0.15s 0.3s;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}

#Smallchat .Messenger_prompt {
  margin: 0;
  font-size: 16px;
  line-height: 18px;
  font-weight: 400;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@-webkit-keyframes slidein {
  0% {
    opacity: 0;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes slidein {
  0% {
    opacity: 0;
    -webkit-transform: translateX(10px);
    transform: translateX(10px);
  }

  to {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

#Smallchat .Messenger_content {
  height: 450px;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #dff9fb;
}

#Smallchat .Messages {
  position: relative;
  -webkit-flex-shrink: 1;
  -ms-flex-negative: 1;
  flex-shrink: 1;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 10px;
  background-color: #dff9fb;
  -webkit-overflow-scrolling: touch;
}

#Smallchat .Input {
  position: relative;
  width: 100%;
  -webkit-box-flex: 0;
  -webkit-flex-grow: 0;
  -ms-flex-positive: 0;
  flex-grow: 0;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  padding-top: 17px;
  padding-bottom: 15px;
  color: #96aab4;
  background-color: #fff;
  border-top: 1px solid #e6ebea;
}

#Smallchat .Input-blank .Input_field {
  max-height: 40px;
}

#Smallchat .Input_field {
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 0;
  padding-right: 0px;
  padding-left: 0px;
  padding-left: 20px;
  padding-right: 75px;
  background-color: transparent;
  font-size: 16px;
  line-height: 20px;
  min-height: 20px !important;
}

#Smallchat .Input_button-emoji {
  right: 45px;
}

#Smallchat .Input_button {
  position: absolute;
  bottom: 15px;
  width: 25px;
  height: 25px;
  padding: 0;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}

#Smallchat .Input_button-send {
  right: 15px;
}

#Smallchat .Input-emoji .Input_button-emoji .Icon,
#Smallchat .Input_button:hover .Icon {
  -webkit-transform: scale(1.1);
  -ms-transform: scale(1.1);
  transform: scale(1.1);
  -webkit-transition: all 0.1s ease-in-out;
  transition: all 0.1s ease-in-out;
}

#Smallchat .Input-emoji .Input_button-emoji .Icon path,
#Smallchat .Input_button:hover .Icon path {
  fill: #2c2c46;
}
</style>
