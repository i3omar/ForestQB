<template>
  <div>
    <!-- Modal -->
    <div ref="myModal" class="modal fade" id="extractorWizardModal" tabindex="-1" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Filters</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Content -->

            <table class="table table-hover">
              <thead>
                <tr>
                  <th style="width: 1em" scope="col"></th>
                  <th scope="col">Filter</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in extractorWizardModalInput" :key="key">
                  <th scope="row">
                    <!-- <input class="form-check-input" type="checkbox" :value="key" name="sensorCheckbox"
                      v-model="extractorWizardModalInputCheckboxes" /> -->
                    <button type="button" class="btn btn-danger btn-sm btn-xs"
                      @click="deleteInputWithKey(key)">Delete</button>
                  </th>
                  <td>
                    <label :for="key" class="form-label">{{ getPredicateName(key).name }}</label>
                  </td>
                  <td>
                    <ul>
                      <li v-for="(sensorValue, sensorKey) in extractorWizardModalInput[key]['sensors']"
                        :key="sensorKey">
                        For {{ getPredicateName(sensorKey).name }}: <br>
                        <input
                          v-for="(fieldValue, valueKey) in extractorWizardModalInput[key]['sensors'][sensorKey]['value']"
                          :key="valueKey"
                          v-model="extractorWizardModalInput[key]['sensors'][sensorKey]['value'][valueKey]" type="text"
                          class="form-control" :id="sensorKey" :placeholder="'Enter your ' + sensorKey">
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- End Content -->
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="extractorWizardModalSave = true">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    <!-- End Modal -->

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
                  <!--                                    <div class="Messages">-->
                  <!--                                        <div class="Messages_list">-->
                  <!--                                            &lt;!&ndash;  &ndash;&gt;-->
                  <!--                                            -->
                  <bot-ui />

                  <!--                                        </div>-->
                  <!--                                    </div>-->
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

    <!--        <button v-if="!visible" @click="changeVisibility()" class="chat-btn">-->
    <!--            <svg style="color: white;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-chat-dots" viewBox="0 0 16 16">-->
    <!--            <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>-->
    <!--            <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"></path>-->
    <!--        </svg>-->
    <!--        </button>-->


    <!-- Modal -->
    <!-- extractorWizardModal -->
    <!-- ref="myModal" -->







  </div> <!-- END OF COMPONENT -->
</template>


<script>
//https://docs.botui.org/guide.html
//https://bootsnipp.com/snippets/Q0BMR

import "botui/build/botui.min.css";
import "botui/build/botui-theme-default.css";
import axios from "axios";
import rdfPrompt from "../rdfPrompt.js";
import { Modal } from "bootstrap";

import BotUi from "./BotUi";
import { botui } from "./BotUi";
import { bus } from "../main";
import { optionsData } from "../filterOptions.js";

// import { parse, compareAsc, format } from 'date-fns';
import { parse, format } from 'date-fns';


export default {
  name: "ChatbotComponent",
  components: {
    BotUi,
  },
  data() {
    return {
      connection: null,
      visible: false,
      extractorWizardModalInput: {},
      extractorWizardModalInputCheckboxes: [],
      extractorWizardModalSave: false,
    };
  },
  computed: {
    coreStore() { // main json that represent the app selections
      return this.$store.state.coreStore; //$store.getters.getCore; 
    },
    useLLM: { // will check both if this is LLM version and it is enabled
      get() {
        if (this.useLLMVersion == true) {
          if (this.llmEnabled == true) {
            return true;
          }
        }
        return false;
      }
    },
    llmEnabled: {
      set(value) {
        this.$store.commit("setLLM", value);
      },
      get() {
        return this.$store.state.settings.llm;
      },
    },
    useLLMVersion: {
      set(value) {
        this.$store.commit("setToUseLLMVersion", value);
      },
      get() {
        return this.$store.getters.getToUseLLMVersion;
      }
    },
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
    async queryLLM(promptText) {
      // Get the LLM API URL from the Vuex store's settings
      const llmApiURL = this.$store.state.settings.llmApiURL;
      try {
        // Send a POST request to the LLM API with the prompt text as the request body
        const response = await axios.post(llmApiURL, promptText);

        // Return only the data part of the response (usually the useful result)
        return response.data;
      } catch (error) {
        if (error.code === 'ECONNABORTED' || error.message.includes('Network Error')) {
          throw new Error('Network error: Unable to connect to LLM API.');
        }
        throw error; // Re-throw other errors
      }
    },
    deleteInputWithKey(key) {
      this.$delete(this.extractorWizardModalInput, key);
    },
    async openModalAndGetInput(data) {
      this.extractorWizardModalInput = JSON.parse(JSON.stringify(data));
      this.extractorWizardModalSave = false;
      await this.showModalAndWait();
      console.log("extractorWizardModalSave", this.extractorWizardModalSave); // This will log the user input after the modal is closed

      if (this.extractorWizardModalSave) {
        return JSON.parse(JSON.stringify(this.extractorWizardModalInput));
      }

      return JSON.parse(JSON.stringify(data));
    },
    showModalAndWait() {
      return new Promise((resolve) => {
        let modal = new Modal(document.getElementById('extractorWizardModal'));
        modal.show();

        // Add event listener for modal close
        this.$refs.myModal.addEventListener('hidden.bs.modal', () => {
          resolve(); // This will resolve the promise when the modal is closed
        }, { once: true }); // The listener will be removed after it's executed once
      });
    },

    myOptions(elementType, selected = "init") { //the options for the list.
      let temp = []; //the options list

      const options = optionsData.init;



      for (let i = 0; i < options.length; i++) {
        if (elementType) {
          const match = options[i].datatype.find(element => {
            if (element.toLowerCase() == elementType.name) {
              console.log("elementType.name:", elementType.name, " - element:", element);
              return true;
            }
          });
          if (match !== undefined) { // array contains substring match
            temp.push(options[i]);
          }
        }
      }//--end for loop

      console.log("myOptions:", temp)

      return temp;
    },

    extractComparisonOperatorAndValue: function (str) {
      console.log("@@@@ extractComparisonOperatorAndValue", str, typeof str, str == new Date("invalid"))
      str = str.trim(); // Remove leading and trailing spaces
      str = str.replace(/\b(Range|range)\s*/gi, ""); // Remove 'Range' word
      // str = str.replace(/^[:\-\.\,]+\s*|\s*[:\-\.\,]+$/g, ""); //Remove :-.,
      str = str.replace(/^[:\-,.]+\s*|\s*[:\-,.]+$/g, ""); //Remove :-.,

      const operator = this.extractComparisonOperator(str);

      console.log("@@@@ extractComparisonOperatorAndValue operator", operator, "value:", str.substring(operator == null ? 0 : operator.length).trim())

      // if (operator !== null && operator.length > 0){
      return {
        operator: operator,
        value: str.substring(operator == null ? 0 : operator.length).trim()
      };
      // }
      // return null;
    },

    /**
     * Extracts a comparison operator (including "=") from the start of a string.
     * Supports operators like "<", "<=", ">", ">=", and "=", optionally surrounded by spaces.
     *
     * @param {string} inputString - The input string to extract the operator from.
     * @param {string} operatorRegex - Regular expression to match comparison operators with optional spaces at the start of the string

     * @returns {string|null} - The extracted operator, or null if not found.
     */
    extractComparisonOperator: function (inputString, operatorRegex = /^\s*(<\s*=|>\s*=|===|==|<=|>=|<|>|=)\s*/) {

      inputString = inputString.replace(/\s+/g, ''); // Remove spaces from the extracted operator

      // Use the regex to find the operator
      const matches = inputString.match(operatorRegex);
      // console.log("matches", matches);

      // If a match is found, return the operator without spaces, otherwise return null
      if (matches && matches.length > 0) {
        return matches[0].trim();
      } else {
        return null;
      }
    },
    /**
     * Parses and sorts an array of date strings.
     * 
     * @param {string[]} dateStrings - An array of date strings.
     * @returns {Date[]} - An array of parsed and sorted Date objects.
     */
    parseDateArray: function (dateStrings, formated = false, formatPattern = "yyyy-MM-dd") {
      const thisComponent = this;

      console.log("@@@@ parseDateArray dateStrings", dateStrings)

      // Ensure dateStrings is always treated as an array
      if (!Array.isArray(dateStrings)) {
        dateStrings = [dateStrings.toString()]; // Convert any input to a string, then to an array
      }

      // Parse the date strings
      const parsedDates = dateStrings.map(str => thisComponent.parseDate(str));

      // Filter out null values
      // const validDates = parsedDates.filter(date => date !== null);

      // Sort the parsed dates
      // const sortedDates = validDates.sort(compareAsc);

      if (formated) {
        // Format the sorted dates as formatPattern
        // return sortedDates.map(date => format(date, formatPattern))

        // Extract the comparison equation (e.g., "<") if it exists
        // const comparisonEquation = dateStrings.find(str => /(<|<=|>|>=)/.test(str));

        const invalidDate = new Date('invalid');
        // Attach the comparison equation as a prefix
        const formattedDates = parsedDates.map(date => date !== null ? format(date, formatPattern) : invalidDate);





        console.log("formattedDates", formattedDates);

        for (let index = 0; index < formattedDates.length; index++) {
          if (formattedDates[index] === invalidDate) {
            //just skip and keep it as is.
          } else {
            const operator = thisComponent.extractComparisonOperator(dateStrings[index]);
            console.log("operator", operator);

            formattedDates[index] = operator ? operator.replace(/\s+/g, '') + " " + formattedDates[index] : formattedDates[index];
          }
        }

        return formattedDates;
      }

      return parsedDates;
    },

    /**
   * Parses a string to extract a date using the date-fns library.
   * 
   * This function attempts to parse a variety of date formats.
   * It can handle a range of common date formats such as 'MM-dd-yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd', and 'MM MMM, yyyy'.
   * 
   * @param {string} str - The input string containing a date.
   * @returns {Date|null} - A JavaScript Date object if a valid date is found, otherwise null.
   * 
   * @example
   * let dateStr = ">= 12 Jan, 2020";
   * let dateObj = parseDate(dateStr);
   * console.log(dateObj);  // Outputs: 2020-01-12T00:00:00.000Z (or equivalent in local timezone)
   */
    parseDate: function (str) {
      // Handle special cases
      if (str.includes('today')) {
        return new Date();
      }

      // Remove comparison operators
      str = str.replace(/>=|<=|>|=|</g, '').trim();

      // Extensive list of date formats
      let formats = [
        // 'MM-dd-yyyy HH:mm',
        // 'MM/dd/yyyy HH:mm:ss',
        // 'MM MMM, yyyy HH:mm',
        // 'MMMM dd, yyyy H:mm:ss a',
        // 'dd-MM-yyyy HH:mm',
        // 'dd/MM/yyyy HH:mm:ss',
        // 'dd MMM, yyyy HH:mm',
        // 'dd MMMM, yyyy H:mm:ss a',
        // 'yyyy-MM-dd HH:mm',
        // 'yyyy/MM/dd HH:mm:ss',
        // 'yyyy MMM dd HH:mm',
        // 'yyyy MMMM dd H:mm:ss a',
        // 'MMM dd, yyyy HH:mm',
        // 'MMMM dd, yyyy H:mm:ss a',
        'MM-dd-yyyy',
        'MM/dd/yyyy',
        'MM MMM, yyyy',
        'MMMM dd, yyyy',
        'dd-MM-yyyy',
        'dd/MM/yyyy',
        'dd MMM, yyyy',
        'dd MMMM, yyyy',
        'yyyy-MM-dd',
        'yyyy/MM/dd',
        'yyyy MMM dd',
        'yyyy MMMM dd',
        'MMM dd, yyyy',
        'MMMM dd, yyyy',
        'dd-MM-yy',
        'dd/MM/yy',
        'MM-dd-yy',
        'MM/dd/yy',
        'yyyy-MM',
        'yyyy/MM',
        'MMM yyyy',
        'MMMM yyyy'
      ];

      for (let format of formats) {
        try {
          let date = parse(str, format, new Date());
          if (!isNaN(date)) {
            return date;
          }
        } catch (error) {
          console.log("dateParse", error);
        }
      }

      // If no valid date found, return null
      return null;
    },


    /**
     * Convert the duckling dateinfo into date object
     **/
    convertDateInfo(dateInfo) {

      let d1; //date 1
      let d2; //date 2

      if (dateInfo.length == 1) {
        d1 = new Date(dateInfo[0].date);
        let year = d1.getFullYear();
        let month = d1.getMonth();
        let day = d1.getDate();
        console.log("dateInfo");
        if (dateInfo[0].grain == "year") {
          d2 = new Date(year + 1, month, day);
        } else if (dateInfo[0].grain == "month") {
          d2 = new Date(
            year,
            month + (new Date().getMonth() - month),
            day
          );
        } else if (dateInfo[0].grain == "week") {
          d2 = new Date(year, month, day + (new Date().getDate() - day));
        } else if (
          ["day", "hour", "minute"].includes(dateInfo[0].grain)
        ) {
          d2 = new Date(year, month, day);
        }
      } else if (dateInfo.length == 2) {
        d1 = new Date(dateInfo[0].date);
        d2 = new Date(dateInfo[1].date);
      } else if (dateInfo.length == 3) {
        d1 = new Date(dateInfo[0].date);
        d2 = new Date(dateInfo[2].date);
      }

      return [d1, d2]

    },

    prepareFilter: function (datatype, valueArray) {
      /**
      * Function to generate a unique filter object with a unique ID.
      * Combines a timestamp and a random alphanumeric string for uniqueness.
      * Returns a standardized filter object with placeholders.
      */
      const generateUniqueFilter = () => {
        // Generate a unique alphanumeric string
        const generateRandomString = (length = 9) => {
          return Math.random().toString(36).substring(2, 2 + length);
        };

        // Create a unique ID by combining the current timestamp and a random string
        const uniqueID = `f_id_${Date.now()}_${generateRandomString()}`;

        // Standard structure of a filter object
        return {
          filterId: uniqueID, // Unique identifier for the filter
          selectedFilter: {}, // Metadata for the selected filter
          selectedOption: {}, // Placeholder for filter options
          input: {
            value: "", // Placeholder for the input value
            expression: "" // Placeholder for the comparison operator
          }
        };
      };



      let newFilter = undefined;
      let filtersArray = [];

      // STEP 1: Validate the datatype parameter.
      // If `datatype` or `datatype.value` is not defined, set a default value of "object".
      if (!datatype || !datatype.value) {
        datatype = { value: "object" };
      }

      // STEP 2: Simplify the datatype's value to a lowercased predicate name.
      // Reduce datatype URI to the exact type. (e.g., "integer" or "date")
      datatype.name = this.getPredicateName(datatype.value).name.toLowerCase();

      // Retrieve available filter options for the given datatype
      const myOptions = this.myOptions(datatype);
      //i need to use it.

      console.log("datatype", datatype.name);


      // STEP 3: Ensure the input `valueArray` is always an array.
      // Ensure valueArray is always an array
      if (!Array.isArray(valueArray)) {
        valueArray = [valueArray];
      } else if (valueArray.length === 0) {
        return filtersArray; // Return empty array if no values provided
      }

      // STEP 4: Extract comparison operator and value from the first element of `valueArray`.
      // Example: If `valueArray[0]` is ">100", extractedOperator might be { operator: ">", value: "100" }.
      let extractedOperator = this.extractComparisonOperatorAndValue(valueArray[0]);
      console.log("@@@@ extractedOperator", extractedOperator);


      // STEP 5: Handle single-date scenarios.
      // If only a single date exists, duplicate it to simulate a date range within the same day,
      // e.g., from '2016-05-10 00:00:00' to '2016-05-10 23:59:59' to represent the full day.
      if (valueArray.length == 1 && (this.parseDate(valueArray[0]) != null)) {
        console.log("@@@@ only one date found, we duplicate it. valueArray[0]:", valueArray[0]);
        valueArray.push(valueArray[0]);
      }//-----------------------

      console.log("@@@@ condition", datatype.name.indexOf("date") > -1, this.parseDate(extractedOperator.value) != null, "valueArray", valueArray);

      /**
       * Step 5.1: Iterate over filter options to find those related to ranges (e.g., "date range").
       */
      // Handle range filters (e.g., date ranges)
      if (valueArray[0].trim().toLowerCase().indexOf("bound") && (extractedOperator.operator != null || (datatype.name.indexOf("date") > -1 && this.parseDate(extractedOperator.value) != null))) {
        // Normalize operators: Replace "==" or "===" with "=" for consistency.
        if (extractedOperator.operator == "==" || extractedOperator.operator == "===") {
          extractedOperator.operator = "=";
        }

        let foundFlag = false;
        for (let i = 0; i < myOptions.length && !foundFlag; i++) {
          if (myOptions[i].text.trim().toLowerCase().indexOf("range") != -1) {
            let x = 0;
            const timeSuffix = ["T00:00:00", "T23:59:59"]; //Time suffix for full-day date ranges.

            do {
              foundFlag = true;

              newFilter = generateUniqueFilter();



              console.log("@@@@ -extractedOperator", extractedOperator);



              newFilter.selectedFilter.id = myOptions[i].id;
              newFilter.selectedFilter.text = myOptions[i].text;

              if (datatype.name == "datetime") {
                extractedOperator.value = extractedOperator.value + (x == 0 ? timeSuffix[0] : timeSuffix[1]);
              }

              if (datatype.name.indexOf("date") > -1 && extractedOperator.operator == null) {
                extractedOperator.operator = (x == 0 ? ">=" : "<=");
              }

              if (extractedOperator.operator == null) {
                extractedOperator.operator = "=";
              }

              newFilter.selectedOption = optionsData[myOptions[i].id];
              newFilter.input = {
                "value": extractedOperator.value,
                "expression": extractedOperator.operator
              };

              console.log("@@@@ -newFilter", newFilter);

              filtersArray.push(newFilter); // Add the filter to the array.
              x++; // Move to the next element in `valueArray`.

              // Re-extract operator and value for the next value in the array.
              if (x < valueArray.length) {
                extractedOperator = this.extractComparisonOperatorAndValue(valueArray[x]);
              }

            } while (x < valueArray.length && (extractedOperator.operator != null || (datatype.name.indexOf("date") > -1 && this.parseDate(extractedOperator.value) != null)));

          }
        }//---- End Rnage Loop
      } else {
        /**
      * Step 6: Match values to available options.
      * If the value matches an option (e.g., "contains"), create corresponding filters.
      */

        let foundFlag = false;


        console.log("@@@@ 0 < myOptions.length && !foundFlag", 0 < myOptions.length && !foundFlag)

        for (let i = 0; i < myOptions.length && !foundFlag; i++) {
          const cleanOption = this.deleteKeywordFromText("Functions", myOptions[i].text);

          console.log("@@@@ myOptions[" + i + "].text.trim().toLowerCase()", cleanOption.trim().toLowerCase())


          console.log("@@@@ valueArray[0].trim().toLowerCase().indexOf(myOptions[i].text.trim().toLowerCase()) != -1", valueArray[0], valueArray[0].trim().toLowerCase().indexOf(cleanOption.trim().toLowerCase()) != -1)
          if (valueArray[0].trim().toLowerCase().indexOf(cleanOption.trim().toLowerCase()) != -1) { //we check if the text has the same keyword as the filter, if yes then we catch it.
            let x = 0;
            do {
              foundFlag = true;
              newFilter = generateUniqueFilter();

              let value = valueArray[x];
              let expression = "";


              if (myOptions[i].text.trim().toLowerCase().indexOf("bound") != -1) { //if it is bound filter we will check if 

                const operator = this.extractComparisonOperator(valueArray[x], /^\s*(!===|!==|!=|!)\s*/);

                if (valueArray[x].trim().toLowerCase().indexOf("not") > -1 || valueArray[x].trim().toLowerCase().indexOf("false") > -1 || valueArray[x].trim().toLowerCase().indexOf("!") > -1 || operator !== null) {
                  value = "not";
                } else {
                  value = "exist";
                }
              } else {
                value = this.deleteKeywordFromText(cleanOption, value) //if text contain "Match: text" and keyword is 'match'--> return "text"
              }

              console.log("@@@@ myOptions[i].id, myOptions[i].text, value, expression = ", myOptions[i].id, myOptions[i].text, value, expression)

              newFilter.selectedFilter.id = myOptions[i].id;
              newFilter.selectedFilter.text = myOptions[i].text;

              newFilter.selectedOption = optionsData[myOptions[i].id];
              newFilter.input = {
                "value": value,
                "expression": expression

              };

              filtersArray.push(newFilter);

              x++;

            } while (x < valueArray.length);

          }

        }//end Bound and filters loop - if the text has similar name to the filter we will catch it. If not, we will go the the next step down here:

        /**
     * Step 7: Fallback logic for "contain" or "match" filters.
     * Use a default filter if no exact match is found.
     */
        if (!foundFlag) {
          let containIndex = undefined;
          let matchIndex = undefined;
          let indexToUse = undefined;



          for (let i = 0; i < myOptions.length && !foundFlag; i++) {

            if (myOptions[i].text.trim().toLowerCase().indexOf("contain") != -1) {
              containIndex = i;
            }
            if (myOptions[i].text.trim().toLowerCase().indexOf("match") != -1) {
              matchIndex = i;
            }
          }


          if (containIndex) {
            indexToUse = containIndex;
          } else if (matchIndex) {
            indexToUse = matchIndex;
          }

          if (indexToUse && indexToUse >= 0) {



            let x = 0;
            do {

              let value = valueArray[x];
              let expression = "";
              newFilter = generateUniqueFilter();

              newFilter.selectedFilter.id = myOptions[indexToUse].id;
              newFilter.selectedFilter.text = myOptions[indexToUse].text;

              newFilter.selectedOption = optionsData[myOptions[indexToUse].id];
              newFilter.input = {
                "value": value,
                "expression": expression

              };

              filtersArray.push(newFilter);

              x++;



            } while (x < valueArray.length);
          }

        }

      }

      // newFilter.selectedFilter.id = myOptions[0].id;
      // newFilter.selectedFilter.text = myOptions[0].text;

      // newFilter.selectedOption = optionsData[myOptions[0].id];
      // newFilter.input = {
      //   "value": "not",
      //   "expression": ""

      // };

      // } else if (datatype.name.indexOf(datatypes[1]) !== -1) {

      // } else if (datatype.name.indexOf(datatypes[2]) !== -1) {

      // } else {
      //   console.log('Default case or value not handled');
      // }





      // return newFilter;

      return filtersArray;

    },

    /**
     * Removes parts of the text that contain the specified keyword, regardless of case.
     * 
     * The function splits the input text into parts based on spaces. It then filters out
     * any part that contains the keyword, ignoring case sensitivity. The remaining parts
     * are then joined back together into a single string.
     * 
     * @param {string} keyword - The keyword to search for in the text. Parts of the text
     * containing this keyword will be removed.
     * @param {string} text - The text to search through and remove parts from.
     * @returns {string} The modified text with parts containing the keyword removed.
     */
    deleteKeywordFromText: function (keyword, text) {
      // Split the text into parts by spaces
      const parts = text.split(' ');

      // Filter out parts that contain the keyword, ignoring case
      const filteredParts = parts.filter(part => !part.toLowerCase().includes(keyword.toLowerCase()));

      // Join the remaining parts back into a string
      let joinedParts = filteredParts.join(' ');

      // This regular expression matches a quote at the start (^['"]) or at the end (['"]$) of the string
      return joinedParts.replace(/^['"]|['"]$/g, '');
    },

    /**
     * Iterates over the given observable properties to apply filters based on sensor values.
     * This function traverses through each observable property URI, processes its associated
     * sensors, and applies filters as necessary. The filters are based on the sensor values
     * and are pushed to a newFilters array. This array is then used to update the predicate filters
     * in the component's store using a commit operation. The function also handles special cases
     * where the sensor values need to be validated or transformed (e.g., ensuring valid date objects).
     * 
     * @param {Object} observProperties - An object containing observable properties with their URIs as keys.
     *    Each property can contain sensors, each sensor having a value and potentially other attributes.
     */
    addFilters: function (observProperties) {
      const thisComponent = this;
      const observablePropertiesURIs = Object.keys(observProperties);

      // console.log("**** predicatesKeys", Object.keys(this.coreStore.predicates));


      observablePropertiesURIs.forEach(function (uri) {
        // const currPredicate = this.coreStore.predicates[uri];
        console.log("**** observablePropertiesURIs", uri);

        const obj = observProperties[uri];
        if (obj.sensors) {

          Object.keys(obj.sensors).forEach(function (sensorURI) {

            console.log("**** obj.sensors", sensorURI, "thisComponent.coreStore.predicates[sensorURI]", thisComponent.coreStore.predicates[sensorURI]);

            if (thisComponent.coreStore.predicates[sensorURI]) {
              for (let y = 0; y < thisComponent.coreStore.predicates[sensorURI].length; y++) {

                const currPredicate = thisComponent.coreStore.predicates[sensorURI][y];
                console.log("**** currPredicate", uri === currPredicate.uri, uri, currPredicate.uri, obj.sensors[sensorURI].value);

                if (uri === currPredicate.uri && obj.sensors[sensorURI] && obj.sensors[sensorURI].value) {
                  let newFilters = currPredicate.filters;
                  // const datatype = currPredicate.datatype ? currPredicate.datatype.value : null;

                  if (!Array.isArray(obj.sensors[sensorURI].value)) {
                    obj.sensors[sensorURI].value = [obj.sensors[sensorURI].value];
                  }

                  // Use the filter() method to remove items equal to new Date("invalid")
                  // const invalid = new Date("invalid");
                  obj.sensors[sensorURI].value = obj.sensors[sensorURI].value.filter(item => {
                    // Check if the item is a Date object
                    if (item instanceof Date) {
                      // Return true for valid dates and false for invalid dates
                      return !isNaN(item.getTime());
                    }
                    // If the item is not a Date object, retain it in the array
                    return true;
                  });

                  console.log("@@@@ obj.sensors[sensorURI].value", obj.sensors[sensorURI].value);

                  const filtersArray = thisComponent.prepareFilter(currPredicate.datatype, obj.sensors[sensorURI].value);

                  filtersArray.forEach(function (filterObj) {
                    if (filterObj != null) {
                      newFilters.push(filterObj);

                      const key = sensorURI; //parent
                      const predicateUri = currPredicate.uri;
                      const value = newFilters;


                      thisComponent.$store.commit('setPredicateFilters', { key, predicateUri, value });
                    }
                  });

                  break;
                }

                // if (obj.sensors[sensorURI].value) {
                //   // sensorsFilterList[sensorURI].push([obj.name, obj.sensors[sensorURI].value]);
                // }

              }

            }


          });




        } else if (obj.value) {
          // filtersUL += "<li><b>" + obj.name + ":</b> " + obj.value.join(", ") + "</li>";
        }

      });




      // const predicatesKeys = Object.keys(this.coreStore.predicates);
      // const observablePropertiesURIs = Object.keys(observProperties);

      // for (let x = 0; x < predicatesKeys.length; x++) {
      //   for (let y = 0; y < this.coreStore.predicates[predicatesKeys[x]].length; y++) {
      //     const currPredicate = this.coreStore.predicates[predicatesKeys[x]][y];

      //     if (observProperties.hasOwnProperty(currPredicate.uri) && observProperties[currPredicate.uri].value) {
      //       let newFilters = currPredicate.filters;
      //       // const datatype = currPredicate.datatype ? currPredicate.datatype.value : null;
      //       newFilters.push(this.prepareFilter(currPredicate.datatype, observProperties[currPredicate.uri].value));

      //       const key = currPredicate[x]; //parent
      //       const predicateUri = currPredicate.uri;
      //       const value = newFilters;



      //       this.$store.commit('setPredicateFilters', { key, predicateUri, value });

      //     }

      //   }
      // }


    },

    /**
     * This fucntion is a utality to search for an area with the specific keyword.
     * It will return the index of the area if there is a match,
     *
     * Else: it will return -1 if no result found.
     *
     **/
    searchForPredifinedMapAreas: function (keyword) {
      // let areas = this.$store.state.settings.predifinedMapAreas; //old way
      let areas = this.$store.getters.getMapAreas;
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

    /**
     * Performs a similarity search based on the provided text and returns results up to the specified limit.
     * This function makes an asynchronous HTTP POST request to a predefined similarity search URL,
     * configured via Vuex store settings. It sends the search text as a query along with the limit for results.
     *
     * @param {string} text - The text to use as the basis for the similarity search.
     * @param {number} [limit=20] - The maximum number of results to return (default is 20).
     * @returns {Promise<Object>} A promise that resolves to the data containing the search results.
     * @throws {Error} Throws an error with a user-friendly message if the server cannot be reached or returns an error.
     *
     * @example
     * similaritySearch("example text", 10)
     *   .then(data => console.log(data))
     *   .catch(error => console.error(error));
     */
    similaritySearch: async function (text, limit = 20) {
      try {
        const similaritySearchData = (
          await axios.post(this.$store.state.settings.similaritySearchURL, {
            collectionName: this.$store.state.settings.collectionName,
            limit: limit,
            query: [text],
          })
        ).data;
        return similaritySearchData;
      } catch (error) {
        throw new Error("My apologies! Server data seems elusive right now. Mind giving it another shot?");
      }
    },



    /**
     * Asynchronously extracts and processes entity data from text input using a language model and RDF (Resource Description Framework) data.
     * This function is part of a system that utilizes language models to interpret and query structured and unstructured data in response to user inputs.
     *
     * @param {string} text - The user input text from which entities need to be extracted.
     * @param {Array} botResponses - An optional parameter to collect responses that the bot might generate during processing (for logging or subsequent use).
     *
     * The function performs the following steps:
     * 1. Conducts a similarity search to find content related to the input text, which aids in narrowing down the relevant context for entity extraction.
     * 2. Prepares an RDF document based on the results of the similarity search, structured to be used as part of the language model query.
     * 3. Configures the setup for querying the language model, specifying details like the model type, control parameters such as temperature, and including few-shot learning examples.
     * 4. Constructs a detailed prompt combining the user input with RDF structured data and few-shot examples to guide the model's understanding of the query.
     * 5. Sends the constructed prompt to the language model via an API call and processes the response to extract relevant information.
     * 6. Parses the model's response into structured JSON format for further processing.
     * 7. Identifies entities and their properties from the JSON, linking them to their respective URIs and additional data sourced from external APIs or databases.
     * 8. Processes and aggregates the data into a structured format suitable for further analysis or response generation.
     * 
     * This function is critical in scenarios where structured data querying is necessary to respond to complex informational queries posed in natural language.
     *
     * Example usage:
     * LlmEntityExtractor("What is the temperature and humidity levels in the Amazon rainforest?", [])
     * .then(data => console.log(data))
     * .catch(error => console.error("Extraction failed:", error));
     *
     * Note: Ensure that the API endpoints and model configurations are correctly set up and accessible for the function to perform as expected.
     */
    LlmEntityExtractor: async function (text, botResponses = [],) {

      // Step 1: Similarity search to obtain relevant content
      // We use 2 in this.similaritySearch(text, 2) to retrieve the top 2 most similar subgraphs, 
      // which are then merged together. For further details on this approach, please refer to our published paper: 
      // https://doi.org/10.1007/978-981-96-0573-6_18
      const similaritySearchData = await this.similaritySearch(text, 2);
      // Step 2: Prepare RDF document from search results
      const fullRDFDoc = rdfPrompt.prepareFullRDF({ rdfEmbeddingIndexes: similaritySearchData });

      // Step 3: Configure LLM query setup
      const llmSetup = {
        model: this.$store.state.settings.modelName, // model: "gpt-3.5-turbo",
        temperature: 0,
        fewShotData: [  /* ... few-shot examples ... */
          { "user": "what is the ability to move of the animals" },
          { "assistant": '{"query": {"<property/speed>":{}}}' },
          { "user": "Get the latest 50 Readings of Sandi and Aqeela between 2015-08-11 and 2015-08-12 while Sandi Temperature > 32 and Aqeela Temperature <= 30 and Both Speed above 1 and less than 10 within area 1" },
          {
            "assistant": `{
  "query":{
    "<elephant/Sandi>":{
      "sosa:resultTime": {
        "value":[">=2015-08-11","<=2015-08-12"]
      },
      "<property/temperature>":{
        "value": [">32"]
      },
      "<property/speed>":{
         "value":[">1","<10"]
      }
    },
    "<elephant/Aqeela>":{
      "sosa:resultTime": {
        "value":["2015-08-11","2015-08-12"]
      },
      "<property/temperature>":{
        "value": ["<=30"]
      },
      "<property/speed>":{
         "value":[">1","<10"]
      }
    }
  }
}` },
          { "user": "Do we have Juling readings that includes its GPS location with an empty Horizontal Dilution of Precision?" },
          {
            "assistant": `{
  "query":{
    "<elephant/Juling>":{
      "geo:lat": {
        "value":["2015-08-11","2015-08-12"]
      },
      "geo:long":{
        
      },
      "<property/HDOP>":{
         "value":["Not Bound"]
      }
    }
  }
}` },
          { "user": "add speed filter that is greater than 30" },
          {
            "assistant": `{
  "query":{
      "<property/speed>":{
         "value":[">30"]
      }
  }
}` },
          { "user": "Where is Aqeela and Putut while Aqeela speed is above 30 and Putut temperature is 30" },
          {
            "assistant": `{
  "query":{
    "<elephant/Aqeela>":{
      "<property/speed>":{
         "value":[">30"]
      }
    },
    "<elephant/Putut>":{
      "<property/temperature>":{
         "value":["=30"]
      }
    }
  }
}` },

          // Aggregate function example:
          { "user": "I want you to find all readings from Sandi, Kasih, and Puteri during 2022, where the speeds of Kasih and Puteri are above 160, and show me the average temperature of Sandi" },
          {
            "assistant": `{
  "query": {
    "<elephant/Sandi>": {
      "sosa:resultTime": {
        "value": [
          ">=2022-01-01",
          "<=2022-12-31"
        ]
      },
      "<property/temperature>": {
        "value": [
          "Aggregate: AVG"
        ]
      }
    },
    "<elephant/Kasih>": {
      "sosa:resultTime": {
        "value": [
          ">=2022-01-01",
          "<=2022-12-31"
        ]
      },
      "<property/speed>": {
        "value": [
          ">160"
        ]
      }
    },
    "<elephant/Puteri>": {
      "sosa:resultTime": {
        "value": [
          ">=2022-01-01",
          "<=2022-12-31"
        ]
      },
      "<property/speed>": {
        "value": [
          ">160"
        ]
      }
    }
  }
}` },


        ],
        delimiter: "####",
        templateIndex: 1, // 0 - is the orginal, 1 - to support aggregate functions
        templateData: { RDF: fullRDFDoc }
      };

      // Step 4: Create the LLM prompt
      const promptText = rdfPrompt.promptArray(text, llmSetup);
      console.log("[LLM-EntityExtractor] Step 4 - Prompt generated for LLM:", promptText);

      // Step 5: Query the language model via API
      // const llmResponse = (
      //   await axios.post(thisComponent.$store.state.settings.llmApiURL, promptText)
      // ).data;

      // Step 5: Query the language model via API
      // const llmResponse = await this.queryLLM(promptText);
      // const llmContent = llmResponse["choices"][0]["message"]["content"];
      let llmContent = null;

      try {
        const llmResponse = await this.queryLLM(promptText);

        if (
          llmResponse &&
          llmResponse.choices &&
          Array.isArray(llmResponse.choices) &&
          llmResponse.choices[0] &&
          llmResponse.choices[0].message &&
          typeof llmResponse.choices[0].message.content === 'string'
        ) {
          llmContent = llmResponse.choices[0].message.content;
        } else {
          // Throw error for unexpected response
          throw new Error("Unexpected response from language model API.");
        }
      } catch (error) {
        // You can add more details to the error message if you want
        throw new Error("Failed to get response from language model API: " + error.message);
      }
      console.log("[LLM-EntityExtractor] Step 5 - Raw LLM response:", llmContent);


      // Step 6: Parse LLM response into JSON format
      const jsonContent = rdfPrompt.parseTextToJson(llmContent); //entities
      console.log("[LLM-EntityExtractor] Step 6 - Parsed JSON from LLM:", jsonContent);

      const firstKey = Object.keys(jsonContent[0])[0];

      const firstLevelKeys = Object.keys(jsonContent[0][firstKey]);

      console.log("firstLevelKeys", firstLevelKeys);

      console.log("jsonContent", jsonContent);
      let foundObservables = { sensors: {}, observableProperties: {} };

      // Step 7: Begin extracting and mapping entities to URIs/data
      if (jsonContent.length > 0) {
        for (let x = 0; x < firstLevelKeys.length; x++) {

          let observable = firstLevelKeys[x];
          const entityName = this.getPredicateName(observable).name;
          let server_response = undefined;

          // console.log("**** 1. ", firstLevelKeys);
          console.log(`[LLM-EntityExtractor] Step 7.1 - observable: '${observable}' - Processing entity: '${entityName}'`);


          // Query server for URI information about the entity
          server_response = await this.findUriWith(entityName.toLowerCase());

          console.log("**** 3. server_response", server_response);




          if (
            server_response === undefined ||
            server_response.data["results"] === undefined ||
            server_response.data["results"]["bindings"] === undefined
          ) {
            // console.log(data);
            // throw new Error("No observable data!");
            console.log(`[LLM-EntityExtractor] Step 7.2 - No observable data found for '${entityName}'. Skipping.`);
            break;
          }

          console.log("server_response.data", server_response.data);



          let head = server_response.data["head"]["vars"];
          let results = server_response.data["results"]["bindings"];

          // console.log("results", results);

          if (
            results.length > 0 &&
            results[0][head[0]] &&
            results[0][head[0]]["value"]
          ) {

            // Process results and organize into foundObservables
            for (let y = 0; y < results.length; y++) {
              const uri = results[y][head[0]].value;

              console.log("**** 2. uri", uri);

              let obj = {
                "type": results[y][head[1]].value,
                name: this.getPredicateName(results[y][head[0]].value).name
              };



              /**
               * Processes an object by transforming its properties into a concatenated string.
               * For non-numeric values, both the key and the value are added to the result.
               * The function ensures all elements are treated as arrays for uniform processing.
               *
               * @param {Object} obj - The object to be processed.
               * @returns {String} - A concatenated string of keys and values, with keys included for non-numeric values.
               */
              const concatenateObjectProperties = function (obj) {
                let result = [];

                // Using Object.entries to get both key and value
                Object.entries(obj).forEach(([key, value]) => {
                  // Check if the key is not a number or contains 'val'
                  if ((typeof key !== 'number') && !key.toLowerCase().includes("val")) {
                    // Add the key to the result
                    result.push(key);
                  }
                  // Convert non-array elements into an array and concatenate
                  result = result.concat(Array.isArray(value) ? value : [value]);
                });

                // Concatenate string representations of all elements
                result = result.join(" ");

                return result;
              };

              if (results[y][head[1]].value.toLowerCase().indexOf('sensor'.toLowerCase()) !== -1) {
                foundObservables.sensors[uri] = obj;
                const secondLevelKeys = Object.keys(jsonContent[0][firstKey][firstLevelKeys[x]]);

                console.log(`[LLM-EntityExtractor] Step 7.3 - Sensor properties for '${entityName}':`, secondLevelKeys);


                for (let z = 0; z < secondLevelKeys.length; z++) {
                  const secondLevelEntity = secondLevelKeys[z];
                  const propertyName = this.getPredicateName(secondLevelEntity).name;

                  let server_response2 = undefined;

                  // Find URI/type for property
                  server_response2 = await this.findUriWith(propertyName.toLowerCase());
                  let head2 = server_response2.data["head"]["vars"];
                  let results2 = server_response2.data["results"]["bindings"];

                  if (
                    results2.length > 0 &&
                    results2[0][head2[0]] &&
                    results2[0][head2[0]]["value"]
                  ) {

                    if (results2[y][head2[1]].value.toLowerCase().indexOf('observableProperty'.toLowerCase()) !== -1) {

                      console.log("**** results2[y][head2[1]].value", results2[y][head2[1]].value);

                      const innerUri = results2[y][head2[0]].value;
                      if (!foundObservables.observableProperties[innerUri]) {
                        foundObservables.observableProperties[innerUri] = {};
                      }
                      let obj = foundObservables.observableProperties[innerUri];

                      obj.type = results2[y][head2[1]].value;
                      obj.name = this.getPredicateName(results2[y][head2[0]].value).name

                      console.log("**** jsonContent[0][firstKey][firstLevelKeys[x]]", jsonContent[0][firstKey][firstLevelKeys[x]]);



                      const thirdLevelKeys = Object.keys(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity]);

                      if (thirdLevelKeys.length == 0) { //skip if empty
                        continue;
                      }


                      if (!obj.sensors) {
                        obj.sensors = {};
                      }
                      if (!obj.sensors[uri]) {
                        obj.sensors[uri] = {};
                      }

                      const valueElmTypeIsOK = (!Array.isArray(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity][thirdLevelKeys[0]]) || (Array.isArray(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity][thirdLevelKeys[0]]) && jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity][thirdLevelKeys[0]].length > 0))
                      if (thirdLevelKeys.length == 1 && thirdLevelKeys[0].toLowerCase().includes("val") && valueElmTypeIsOK) {

                        //check if it also has a vlaue, add it
                        obj.sensors[uri].value = jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity][thirdLevelKeys[0]];
                      } else if (thirdLevelKeys.length > 0) {
                        console.log("!!! 1461", (jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity].value ? "YES" : "NO"))
                        if (jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity].value && valueElmTypeIsOK) {//if it has value
                          obj.sensors[uri] = jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity];
                        } else {
                          obj.sensors[uri].value = concatenateObjectProperties(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelEntity]);
                          console.log("obj.sensors[uri].value=", obj.sensors[uri].value);
                        }
                      }

                      foundObservables.observableProperties[innerUri] = obj;
                      console.log(`[LLM-EntityExtractor] Step 7.4 - Linked property '${obj.name}' to sensor '${entityName}'.`);
                    }
                  }
                }
              } else {
                // Not a sensor, treat as observable property
                const secondLevelProperty = Object.keys(jsonContent[0][firstKey][firstLevelKeys[x]]);
                const valueElmTypeIsOK = (!Array.isArray(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelProperty[0]]) || (Array.isArray(jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelProperty[0]]) && jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelProperty[0]].length > 0));


                if (secondLevelProperty.length == 1 && secondLevelProperty[0].toLowerCase().includes("val") && valueElmTypeIsOK) {
                  //check if it also has a vlaue, add it
                  obj.value = jsonContent[0][firstKey][firstLevelKeys[x]][secondLevelProperty[0]];
                } else if (secondLevelProperty.length > 0) {
                  console.log("!!! 1497", jsonContent[0][firstKey][firstLevelKeys[x]])
                  if (jsonContent[0][firstKey][firstLevelKeys[x]].value && valueElmTypeIsOK) {//if it has value
                    obj.sensors[uri] = jsonContent[0][firstKey][firstLevelKeys[x]];
                  } else {
                    obj.sensors[uri].value = concatenateObjectProperties(jsonContent[0][firstKey][firstLevelKeys[x]]);
                  }
                }

                foundObservables.observableProperties[uri] = obj;
                console.log(`[LLM-EntityExtractor] Step 7.5 - Registered non-sensor observable property '${obj.name}'.`);
              }
            }
          }
        } //----------- For Loop End
      }


      // Step 8: Output the final structure
      console.log("[LLM-EntityExtractor] Step 8 - Final extracted observables:", foundObservables);

      return foundObservables;
    },

    findUriWith: async function (keyword) {
      let server_response = undefined;

      await this.$store
        .dispatch("axios", {
          method: "post",
          url: this.$store.state.settings.endpointURL,
          data: {
            query:
              this.$store.getters.getQueryTemplate(
                "findKeywordURI",
                keyword,
                "%keyword"
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

      return server_response;
    },

    /**
     * This will handle the user messages by the llm response
     *
     * */
    handleByLlmResponses: async function (
      userMsg,
      botResponses = [],
      templateIndex = 2,
      // response = null
    ) {
      // Note: response["custom"]["latest_message"]["text"] can also provide the text,
      // but it may sometimes be empty or null. Hence, we rely on the `text` argument.

      // Retrieve the most similar subgraph (top-1) based on the input text using similarity search.
      // This helps in providing the most relevant RDF context to the language model.
      const similaritySearchData = await this.similaritySearch(userMsg, 1);

      // Prepare a full RDF document using the found subgraph embeddings.
      // This RDF doc will be used to guide the LLM's response generation.
      const fullRDFDoc = rdfPrompt.prepareFullRDF({ rdfEmbeddingIndexes: similaritySearchData });

      // Set up the parameters for the language model (LLM) call.
      const llmSetup = {
        model: this.$store.state.settings.modelName, // model: "gpt-3.5-turbo",
        temperature: 0,
        fewShotData: [],
        delimiter: "####",
        templateIndex: templateIndex,
        templateData: { RDF: fullRDFDoc }
      };

      // Construct the final prompt text for the LLM using the input text and LLM setup.
      const promptText = rdfPrompt.promptArray(userMsg, llmSetup);
      console.log("Prompt:", promptText);
      // console.log("similaritySearchData", similaritySearchData)


      // Query the LLM service and capture the response.
      try {
        // const llmResponse = (
        //   await axios.post(this.$store.state.settings.llmApiURL, promptText)
        // ).data;

        const llmResponse = await this.queryLLM(promptText);

        // Extract the main content from the LLM response.
        // const llmContent = llmResponse["choices"][0]["message"]["content"];
        const llmContent = llmResponse?.choices?.[0]?.message?.content || "[No content returned]";
        botResponses.push({ content: llmContent });

      } catch (error) {
        // Graceful error handling in case LLM request fails.
        console.log("LLM API call failed:", error);
        botResponses.push({ content: "[Sorry, something went wrong.]" });
      }

      return botResponses;
    },

    processBotCustomResponses: async function (userMsg, response) {
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      // console.log("useLLM", this.useLLM)
      const threshold = (this.useLLM ? 0.6 : 0.6); // 2 : 0.7
      const thisComponent = this; //make sure this really means this.
      let exEnt; //extracted entities;
      let intentName = response["custom"]["latest_message"]["intent"]["name"];
      let botResponses = [];    // array of bot responses
      // const userMsg = text; //response["custom"]["latest_message"]["text"];

      // let server_response;      // server response from axios
      // let head;                 // header/column names from server response
      // let results;              // results array from server response
      // let botResponses = [];    // array of bot responses
      // // let listItems;            // used for <ul><li> list output
      // let options;              // used for dropdown/select options
      // let observable;           // current observable string value
      // let featureOfInterestList; // used for info about observables
      // let data;                 // for axios result in 'list_observable_info'
      // let foundObservables = []; // for construct_where_query/when_query
      // let foundObservablesNames = []; // for constructing summary of observables
      // let searchParameters = []; // for search param summary in construct_where/when
      // let llmObservables;        // output from LlmEntityExtractor
      // let iPickedMyOwnDate = false; // flag for date picker in construct_where/when
      // let iPickedMyOwnArea = false; // flag for area picker in construct_where/when
      // let addToExistingSensors = false; // flag for construct_where/when
      // let noLimit = false;      // limit check flag
      // let noSort = false;       // sort check flag
      // let filters;              // for filter summary
      // let searchParametersLi = ""; // for summary list
      // let observableURI;        // for observable info

      // let botResponses = [];
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

      const llmIntents = ["llm_ask_rdf", "llm_ask_specific", "llm_ask_general"];


      /*
      - show_examples
      - list_all_sensors
      - count_all_sensors
      - list_observable_info
      - discover_sensors_within_location
      - construct_where_query
      - construct_when_query

      - llm_ask_rdf
      - llm_ask_specific
      - llm_ask_general
      */

      console.log("Original intentName", intentName,
        "confidance",
        response["custom"]["latest_message"]["intent"]["confidence"]
      );

      //threshold
      if (
        !userMsg.startsWith("/") &&
        response["custom"]["latest_message"]["intent"]["confidence"] < threshold
      ) {
        //very low
        intentName = "nlu_fallback";
      }

      if (userMsg.trim().toLowerCase().startsWith("add ") && intentName == "nlu_fallback") {
        intentName = "construct_where_query";
      }

      if (!this.useLLM && llmIntents.includes(intentName)) {
        // As LLM is disabled, switch to nlu_fallback
        intentName = "nlu_fallback";
      }

      console.log("intentName", intentName);

      switch (intentName) {
        case "nlu_fallback": {//------ less than threshold

          if (this.useLLM) {
            botResponses = this.handleByLlmResponses(
              userMsg,
              botResponses,
              2,
              // response
            );

          } else { // This means LLM not enabled
            const intent_ranking =
              response["custom"]["latest_message"]["intent_ranking"];
            let list = [];
            for (let i = 0; intent_ranking && intent_ranking.length && i < intent_ranking.length; i++) {
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
                list.length > 0 ? "I'm not entirely confident in understanding your request. You can:<ul><li>Reword your question.</li><li>Select from one of the following intents to clarify your intent:</li><li>Type 'help' for examples.</li></ul>" : "I'm not entirely confident about what you're asking me to do. Could you please rephrase your question or type 'help' for examples?",
            });
            if (list.length > 0) {
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
            }

          } //LLM not enabled --- end
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
                  // value: 'AR', // Selected value or selected object. Example: {value: "AR", text : "Arabic" }
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

          let areasIndexes = []; //get indexes of selected areas

          //check if the user already typed an area
          if (exEnt["area"]) {
            areasIndexes = []; //clear
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
          }//--- end if (exEnt["area"])

          // check map filters

          //if user type some area name and it is not found, and no map filter selected

          // Function to generate bot responses based on map areas from the store
          const generateAreasOptions = (areas) => {

            let options = [];

            // Iterate over each area to create options for the dropdown
            for (let i = 0; i < areas.length; i++) {
              options.push({
                // Set the value to a string indicating the action to be taken
                value: "what sensors in " + areas[i].title,
                // Display text for the dropdown option
                text: areas[i].title,
              });
            }

            // Return an array with the configuration for the bot response
            return {
              action: {
                select: {
                  action: {
                    // Placeholder text for the dropdown
                    placeholder: "Select a Location",
                    // Use a standard dropdown instead of a search-select
                    searchselect: false,
                    // Allow multiple selections
                    multipleselect: true,
                    // Key to be used as the label for each option
                    label: "text",
                    // Array of options for the dropdown
                    options: options,
                    // Configuration for the submission button
                    button: {
                      label: "OK",
                    },
                  },
                },
              },
            };
          };




          if (
            exEnt["area"] &&
            areasIndexes.length == 0 &&
            this.mapNearbyFilters.length == 0 &&
            this.mapWithinFilters.length == 0
          ) {
            botResponses.push({
              content:
                "Oh, it seems like I couldn't locate the spot you're looking for on the map. No worries, though! You can try rephrasing your question with the correct location name, or feel free to pick from one of the options below.",
            });


            // Usage: Call the function with the store context to get the bot responses
            let options = generateAreasOptions(this.$store.getters.getMapAreas);
            botResponses.push(options);

            break;

          } else if (
            this.mapNearbyFilters.length == 0 &&
            this.mapWithinFilters.length == 0
          ) {
            botResponses.push({
              content:
                "Oops, I couldn't find any filters on the map. How about trying to draw some filters and then hitting 'Continue'? Or, if you prefer, you can reword your question.",
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
            // results.length == 0 ||(results.length > 0 && _.isEmpty(results[0]))
            results.length == 0 || (results.length > 0 && Object.keys(results[0]).length === 0)
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

          let observableURI = results[0][head[0]]["value"];

          // let observableURI = results[0]["predicate"]["value"];

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

            //options = [];
            if (results.length == 1) {
              let obj = this.getPredicateName(results[0][head[0]].value);
              featureOfInterestList += " a/an " + obj.name + "<br>";
            } else {
              for (let i = 0; i < results.length; i++) {
                //[head[0]] we are assuming the first predicate will always be the main one.
                let obj = this.getPredicateName(results[i][head[0]].value);

                featureOfInterestList += "<li>" + obj.name + "</li>";
              }
              featureOfInterestList = ":<ul>" + featureOfInterestList + "</ul>";
            }

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
        /*
            - llm_ask_rdf
            - llm_ask_specific
            - llm_ask_general
        */
        case "llm_ask_rdf":
        case "llm_ask_specific": {
          botResponses = this.handleByLlmResponses(
            userMsg,
            botResponses,
            2,
          );
          break;
        }
        case "llm_ask_general": {
          botResponses = this.handleByLlmResponses(
            userMsg,
            botResponses,
            3,
          );
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
          let addToExistingSensors = false;
          let server_response = undefined;
          let observable = undefined;

          exEnt = this.extractEntities({
            entitiesArray: response["custom"]["latest_message"]["entities"],
          });
          exEnt = this.createDateInfoEntities(exEnt); //clean date entities used for the date filters.

          //make sure limit are correct, not a date
          //if no limit, check if any extractor has detected CARDINAL
          exEnt = this.cleanupExtractedEntity(exEnt, "limit", "DATE");
          exEnt = this.cleanupExtractedEntity(exEnt, "observable", "DATE");

          //this was cusing some issue when there is from, to dates
          // exEnt = this.cleanupExtractedEntity(exEnt, "dateInfo", "DATE");

          if (exEnt["time"] && Object.keys(exEnt["time"]).length > 0) {
            //let date = new Date(exEnt["time"][Object.keys(exEnt["time"])[0]][0]);
            //print the found date
            //botResponses.push({content: date.getDate()+"/"+ (date.getMonth()+1)+"/"+ date.getFullYear()});
            // botResponses.push({content: exEnt["time"][Object.keys(exEnt["time"])[0]][0]});
          }

          //botResponses.push({content: response["custom"]["latest_message"]["entities"]});
          console.log({
            content: response["custom"]["latest_message"]["entities"],
          });
          //print the observable name
          //botResponses.push({content: exEnt});

          let llmObservables = undefined;

          if (this.useLLM) {
            llmObservables = await this.LlmEntityExtractor(userMsg)
          }

          if (response["custom"]["latest_message"]["entities"].length == 0 && llmObservables && llmObservables.sensors && Object.keys(llmObservables.sensors).length == 0 && llmObservables.observableProperties && Object.keys(llmObservables.observableProperties).length == 0) {
            throw Error("Hmm, what?");
          }

          let observables = [];
          if (exEnt["observable"] || llmObservables && llmObservables.sensors && Object.keys(llmObservables.sensors).length > 0) {
            //setting up observables
            console.log("this.useLLM", this.useLLM)
            if (this.useLLM) {

              const sensorsURIs = Object.keys(llmObservables.sensors);
              sensorsURIs.forEach(function (uri) {
                observables.push(llmObservables.sensors[uri].name)
              });

            } else {
              observables = Object.keys(exEnt["observable"]);
            }


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
              observable = observables[i];

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
                    found = true;
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

            console.log("llmObservables", llmObservables);

            if (foundObservables.length == 0) {//no sensors?

              if (Object.keys(llmObservables.observableProperties).length > 0 && this.searchValue.length > 0) { //ok, let check if we have observableProperties, if yes lets give the user the option to add it to selected sensors.

                this.botuiMessage({
                  content: "It seems you're adding filters but haven't mentioned any sensors. Would you like to apply them to selected sensors?"
                });

                await botui.action
                  .button({
                    action: [
                      {
                        // show only one button
                        text: "Proceed, ignoring sensors without the filter.",
                        value: "yes",
                      },
                      {
                        // show only one button
                        text: "Stop, I will ask again.",
                        value: "error",
                      },
                    ],
                  })
                  .then(async function (res) {
                    // will be called when a button is clicked.
                    console.log(res.value); // will print "one" from 'value'

                    if (res.value == "yes") {


                      addToExistingSensors = true;
                      thisComponent.searchValue.forEach(function (value, index) {

                        console.log("value", value);

                        if (!llmObservables.sensors) {
                          llmObservables.sensors = {};
                        }

                        Object.keys(llmObservables.observableProperties).forEach(function (key) {
                          if (!llmObservables.observableProperties[key]["sensors"]) {
                            llmObservables.observableProperties[key]["sensors"] = {};
                          }

                          llmObservables.sensors[value.uri] = {
                            "type": "http://www.w3.org/ns/sosa/Sensor",
                            "name": value.text
                          };

                          foundObservables.push(value);

                          llmObservables.observableProperties[key]["sensors"][value.uri] = { value: llmObservables.observableProperties[key]["value"] };
                        }); //---inner
                      }); //---outter

                      console.log(llmObservables);
                    } else {
                      thisComponent.botuiMessage({
                        content: "OK. Please ask again.",
                      });
                      throw new Error("Search Aborted.");
                    }
                  });

              } else if (Object.keys(llmObservables.observableProperties).length > 0 && this.searchValue.length == 0) {
                throw new Error(
                  "It seems you're adding filters but haven't selected any sensors. Please select some sensors and try again, or type 'help' for assistance."
                );
              }
              else {
                throw new Error(
                  "I couldn't find any sensors in your question. Please try again or type 'help' for assistance."
                );
              }


            }
          } //--------------------------------- end observable section ---------------------------------



          //------------------------------------ [LLM observable Property] ------------------------------

          if (this.useLLM && llmObservables && llmObservables.observableProperties && Object.keys(llmObservables.observableProperties).length > 0) {

            let onecycleFlag = true;


            while (onecycleFlag) {

              const observablePropertiesURIs = Object.keys(llmObservables.observableProperties);

              if (Object.keys(llmObservables.observableProperties).length == 0) {
                this.botuiMessage({
                  content: "Based on your input, all filters have been successfully removed."
                });
                break;
              }

              onecycleFlag = false;

              if (this.extractorWizardModalSave) {
                this.botuiMessage({
                  content: "Is this what you want?"
                });
              } else {
                this.botuiMessage({
                  content:
                    observablePropertiesURIs.length > 1 ? "I see that you want to add multiple filters. Is this what you typed?" : "I see that you want to add '" + llmObservables.observableProperties[observablePropertiesURIs[0]].name + "' filter. Is this what you typed?",
                });

              }

              let filtersUL = "<br><ul>";
              let sensorsFilterList = {};
              observablePropertiesURIs.forEach(function (uri) {
                console.log("!!!! observablePropertiesURIs", uri);

                let isDate = false;
                if (uri.toLowerCase().indexOf("time") > -1 || uri.toLowerCase().indexOf("date") > -1) {
                  // thisComponent.parseDate()
                  isDate = true;
                }

                const obj = llmObservables.observableProperties[uri];
                console.log("objobj", obj);
                if (obj.sensors) {

                  Object.keys(obj.sensors).forEach(function (sensorURI) {
                    console.log("!!!! sensorURI", sensorURI);


                    console.log("!!!! obj.sensors[sensorURI].value = ", obj.sensors[sensorURI].value);

                    if (!sensorsFilterList[sensorURI]) {
                      sensorsFilterList[sensorURI] = [];
                    }
                    if (obj.sensors[sensorURI].value) {
                      let sortedDateArray = [];
                      if (isDate) {
                        sortedDateArray = thisComponent.parseDateArray(obj.sensors[sensorURI].value, true, "yyyy-MM-dd");


                        console.log("@@@@ sortedDateArray", sortedDateArray, "condition:", sortedDateArray.length == 1 && (sortedDateArray[0] instanceof Date && isNaN(sortedDateArray[0].getDate())))

                        //if it return invalid date, give it another try to get the date by extracting value
                        if (sortedDateArray.length == 1 && (sortedDateArray[0] instanceof Date && isNaN(sortedDateArray[0].getDate()))) {
                          let extractedOperator = thisComponent.extractComparisonOperatorAndValue(obj.sensors[sensorURI].value);
                          obj.sensors[sensorURI].value = [extractedOperator.value];
                        } else {
                          obj.sensors[sensorURI].value = sortedDateArray;
                        }
                      }

                      sensorsFilterList[sensorURI].push([obj.name, obj.sensors[sensorURI].value]);
                    }
                  });
                } else if (obj.value) {
                  filtersUL += "<li><b>" + obj.name + ":</b> " + obj.value.join(", ") + "</li>";
                }
              });

              if (Object.keys(sensorsFilterList).length > 0) {
                Object.keys(sensorsFilterList).forEach(function (sensorURI) {
                  filtersUL += "<li>Filters for " + thisComponent.getPredicateName(sensorURI).name + ": " + "</li>";
                  filtersUL += "<ul>";

                  sensorsFilterList[sensorURI].forEach(function (obj) {
                    if (obj.length > 1)
                      console.log("!!!! obj[1].join", obj);
                    filtersUL += "<li><b>" + obj[0] + ":</b> " + (Array.isArray(obj[1]) ? obj[1].join(", ") : obj[1]) + "</li>";
                  });

                  filtersUL += "</ul>";//end sublist
                });
              }
              filtersUL += "<ul>";//end main list


              this.botuiMessage({
                content: filtersUL,
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
                      text: "I want to edit this.",
                      value: "edit",
                    },
                    {
                      // show only one button
                      text: "No, continue without these filters.",
                      value: "no",
                    },
                    {
                      // show only one button
                      text: "Stop, I will ask again.",
                      value: "error",
                    },
                  ],
                })
                .then(async function (res) {
                  // will be called when a button is clicked.
                  console.log(res.value); // will print "one" from 'value'


                  if (res.value == "edit") {
                    const data = await thisComponent.openModalAndGetInput(llmObservables.observableProperties);
                    console.log("@@@@ openModalAndGetInput data", data);
                    llmObservables.observableProperties = data;
                    onecycleFlag = true;

                  } else if (res.value == "no") {
                    // console.log("reset");
                    llmObservables.observableProperties = {};

                  } else if (res.value == "yes") {
                    // thisComponent.$root.$emit("setUpperDatePicker", d1, d2);
                    // iPickedMyOwnDate = true;


                    // const eventData = waitForEvent(bus, 'predicatesReady');

                    //to make sure all sensors loaded
                    const targetCount = Object.keys(sensorsFilterList).length;
                    let currentCount = 0;

                    const handler = (data) => {
                      currentCount++;
                      if (currentCount === targetCount) {
                        console.log("LLM ready to set predicates filters.", data);

                        thisComponent.addFilters(llmObservables.observableProperties);
                        bus.$off('predicatesReady', handler);  // Remove the event listener
                      }
                    };

                    bus.$on('predicatesReady', handler);

                    delay(2000);

                  } else {
                    thisComponent.botuiMessage({
                      content: "OK. Please ask again.",
                    });
                    throw new Error("Search Aborted.");
                  }
                });

            }//end loop
          }
          //--------------------------------- end LLM Observable Property section ---------------------------------

          let noLimit = false;
          let noSort = false;
          // let noDate = false;

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

          if (exEnt["dateInfo"] && exEnt["dateInfo"].length > 0 && !this.useLLM) {

            let timeMsg = "";
            const [d1, d2] = thisComponent.convertDateInfo(exEnt["dateInfo"]);

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
            noLimit = true;
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
            noSort = true;
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


          if (addToExistingSensors) {
            //clear selected property
            if (this.searchValue.length > 0) {
              this.searchValue = [];
            }
            await delay(2000);
          }


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
          await delay(2000 + ((foundObservables.length - 1) * 1000)); //wait a second to load before getting the results. 2 seconds for 1 sensor, 2 sensors will be 3 seconds etc.



          //----- Check if nothing extracted, abort
          // console.log("foundObservablesNames.length", foundObservablesNames.length, "noLimit", noLimit, "noSort", noSort, "!iPickedMyOwnArea", !iPickedMyOwnArea, "!iPickedMyOwnDate", !iPickedMyOwnDate)
          if (foundObservablesNames.length == 0 && noLimit && noSort && !iPickedMyOwnArea && !iPickedMyOwnDate) {
            throw new Error("Sorry, I'm unable to find the information I need in your question. Could you please rephrase or provide more details so I can assist you better?");
          }
          //------ end of abort section



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

          if (foundObservablesNames.length > 0) {
            botResponses.push({
              content:
                (foundObservablesNames.length > 1
                  ? "<p>Search for: [" + foundObservablesNames.join(", ") + "]"
                  : "<p>Search for: " + foundObservablesNames.join("")) +
                "</p><p>The search parameters are:</p><ul>" +
                searchParametersLi +
                "</ul>",
            });

          } else {
            botResponses.push({
              content: "<p>The search parameters are:</p><ul>" +
                searchParametersLi +
                "</ul>",
            });
          }


          this.getResults();

          botResponses.push({
            content: "The results should be shown in the page now.",
          });

          break;
        }
        default: {
          botResponses.push({ content: "I don't know how to process that." });
          botResponses.push({ content: response });
        }
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

    waitForEvent: function (bus, eventName) {
      return new Promise((resolve) => {
        bus.$once(eventName, (data) => {
          resolve(data); // Resolving the promise when the event is triggered
        });
      });
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
            extracted.hasOwnProperty([entity["entity"]]) &&
            extracted[entity["entity"]].hasOwnProperty(entity["value"])
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

            if (!extracted.hasOwnProperty([entity["entity"]])) {
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

          if (entity.hasOwnProperty("group")) {
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
            entity["value"].hasOwnProperty("from") ||
            entity["value"].hasOwnProperty("to")
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

          if (entity.hasOwnProperty("additional_info")) {
            if (entity["additional_info"].hasOwnProperty("grain")) {
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

      console.log("extracted", extracted);
      //console.log("extractEntities", entitiesArray);

      return extracted;
    },
    createDateInfoEntities: function (extractedEntities) {
      if (!extractedEntities["dateInfo"]) {
        extractedEntities["dateInfo"] = [];
      }

      //extract dateInfo from duckling time
      if (extractedEntities.hasOwnProperty("time")) {
        let ducklingTime = [];

        for (let i = 0; i < extractedEntities["time"].length; i++) {
          if (
            extractedEntities["time"][i].hasOwnProperty("value") &&
            extractedEntities["time"][i].hasOwnProperty("grain")
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
            extractedEntities["time"][i].hasOwnProperty("from") ||
            extractedEntities["time"][i].hasOwnProperty("to")
          ) {
            let fromToFlag = false;
            if (
              extractedEntities["time"][i].hasOwnProperty("from") &&
              extractedEntities["time"][i].hasOwnProperty("to")
            ) {
              fromToFlag = true;
            }

            if (extractedEntities["time"][i].hasOwnProperty("from")) {
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

            if (extractedEntities["time"][i].hasOwnProperty("to")) {
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
            // let found = false;
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
      if (!payload["action"]) {
        botui.message.add(payload);
        // if (payload["content"]) {
        // let sender = "Bot";
        // if(payload["human"]){
        //   sender = "User";
        // }
        // axios.post("./api/chatlog", {log: sender+": "+JSON.stringify(payload["content"])});
        // }
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
            // axios.post("./api/chatlog", {
            //   log: "Rasa: " + JSON.stringify(data),
            // });

            console.log("Rasa: ", data);

            if (data.length == 0) {
              // throw new Error("I can't think of an answer to this!");
              // thisComponent.handleByLlmResponses(text);
              // response["custom"]["latest_message"]["intent"]["name"]
              data.push({
                custom: {
                  latest_message: {
                    intent: {
                      name: "nlu_fallback",
                      confidence: 0,
                    },
                  },
                },
              });

              // [0].custom.latest_message.intent.name
            }

            for (let i = 0; i < data.length; i++) {
              if (data[i].custom) {
                let htmlResponses =
                  await thisComponent.processBotCustomResponses(text, data[i]);

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
                if (data[i].text) {
                  //text data
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
                } else if (data[i].image) {
                  //sometimes it is images
                  if (i == 0) {
                    //replace the loading box
                    botui.message.update(index, {
                      loading: false,
                      type: "html",
                      content:
                        '<img src="' +
                        data[i].image +
                        '" alt="An image response from the chatbot" width="400">', //data[i].image,
                    });
                  } else {
                    botui.message.bot({
                      content:
                        '<img src="' +
                        data[i].image +
                        '" alt="An image response from the chatbot" width="200">',
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

      // this.messages.push({
      //     content: "thinking...",
      //     myself: false,
      //     participantId: 1,
      //     timestamp: {year: d.getFullYear(), month: d.getMonth(), day: d.getDay(), hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds(), millisecond: d.getMilliseconds()},
      //     type: 'text'
      // });

      // let data = (await axios.post("http://localhost:5005/webhooks/rest/webhook", {
      //     "message":message.content,
      //     "sender":"123"
      // })).data;
      // this.messages.pop()
      // for(let i=0; i<data.length; i++){
      //     // this.messages.push({
      //     //     content: data[i].text,
      //     //     myself: false,
      //     //     participantId: 1,
      //     //     timestamp: {year: d.getFullYear(), month: d.getMonth(), day: d.getDay(), hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds(), millisecond: d.getMilliseconds()},
      //     //     type: 'text'
      //     // });
      // }

      // } catch (error) {
      //     // this.messages.push({
      //     //     content: "Error:"+ error.message,
      //     //     myself: false,
      //     //     participantId: 1,
      //     //     timestamp: {year: 2019, month: 3, day: 5, hour: 20, minute: 10, second: 3, millisecond: 123},
      //     //     type: 'text'
      //     // });
      // }

      /*
       * you can update message state after the server response
       */
      // timeout simulating the request
      // setTimeout(() => {
      //     message.viewed = true
      // }, 2000)
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
  created: function () {
    // Storing a reference to the current component instance to maintain context in callback functions
    const thisComponent = this;

    // Register an event listener on the root Vue instance for the "buildEmbeddingIndex" event
    this.$root.$on("buildEmbeddingIndex", async function () {
      // Retrieve RDF triple data from the Vuex store
      const tripleData = thisComponent.$store.state.settings.ontologyRdfTriple;
      // Call the buildIndex method of rdfPrompt to rebuild the index with new triple data
      rdfPrompt.buildIndex(tripleData);// rebuild the index;

      // Uncomment to log the RDF triples being indexed
      // console.log("we start indexing",rdfPrompt.getRdfTriples());

      // Perform an asynchronous HTTP POST request to the indexing server
      let data = (
        await axios.post(thisComponent.$store.state.settings.indexingServerURL, {
          collectionName: thisComponent.$store.state.settings.collectionName,
          rdfTriples: rdfPrompt.getRdfTriples(), // RDF triples to be indexed
        })
      ).data;

      // Emit an event from the root Vue instance signaling the end of the indexing process
      thisComponent.$root.$emit("buildEmbeddingIndexEnd");
    });
  },
  // The mounted() lifecycle hook runs after the component has been mounted to the DOM.
  mounted() {
    // Storing a reference to the current component instance for use in nested functions
    const thisComponent = this;



    // Initialize a flag to control initial setup within interactive elements
    let initFlag = false;
    // Retrieve RDF triple data from Vuex store's state
    const tripleData = thisComponent.$store.state.settings.ontologyRdfTriple;

    // If the useLLM flag is true, populate the index with the RDF data
    if (this.useLLM) {
      rdfPrompt.buildIndex(tripleData);// populate the the index array;

      //remove the following, only for testing
      const fullRDFDoc = rdfPrompt.prepareFullRDF({
        rdfEmbeddingIndexes: [
          {
            "id": 21,
            "version": 0,
            "score": 0.55978453,
            "payload": null,
            "vector": null
          },
          {
            "id": 43,
            "version": 0,
            "score": 0.44688192,
            "payload": null,
            "vector": null
          }
        ]
      });

      console.log('Fake similarity saerch:', fullRDFDoc);
    }



    // Set up a click event handler for the chat close icon
    $(".chat_close_icon").click(function () {
      $(".Layout").hide(); // Hide the chat window
      $(".chat_on").show(300); // Show the chatbot opening button
    });

    // / Wait for the document to be fully loaded
    $(document).ready(function () {
      $(".chat_on").click(function () {
        $(".Layout").toggle();
        $(".chat_on").hide(300);

        // If the initial flag is false, perform first-time setup
        if (!initFlag) {
          initFlag = true;
          // Display a loading message with a welcome message from the bot
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

    // rdfPrompt.test();
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

.modal {
  z-index: 1000000020 !important;
  /* most top */
}

.modal-backdrop {
  z-index: 1000000010 !important;
  /* second most top */
}

#Smallchat .Layout {
  pointer-events: auto;
  box-sizing: content-box !important;
  z-index: 1000000000;
  /* third most top */
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
