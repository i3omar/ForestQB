<template>
  <div>
    <!--     v-model="this.$store.state.observables"   -->
    <multiselect
      ref="multiSel"
      v-model="searchValue"
      :clear-on-select="false"
      :close-on-select="false"
      :hide-selected="true"
      :internal-search="true"
      :limit="10"
      :max="10"
      :max-height="600"
      :multiple="true"
      :options="options"
      :options-limit="300"
      :searchable="true"
      :loading="isLoading"
      :show-no-results="true"
      deselect-label="Remove this selection"
      label="text"
      open-direction="bottom"
      placeholder="- Select a sensor -"
      track-by="text"
      @remove="removeItem"
      @search-change="loadSensorsList"
    >
      <!--            <multiselect v-model="searchValue" placeholder="Fav No Man’s Sky path" label="text" track-by="text" :options="options" :limit="10" :max-height="600" :multiple="true" :show-labels="false">-->

      <!--            <template slot="singleLabel" slot-scope="{ option }">{{ option.text }}</template>-->

      <template slot="selection" slot-scope="{ values, remove }">
        <span
          class="multiselect__tag"
          :style="'background-color:' + item.color"
          v-for="item in values"
          :key="item.text"
        >
          <span
            >{{ item.text }}
            <i
              tabindex="1"
              :style="
                'background-color:' +
                LightenDarkenColor(item.color, -20) +
                '; color:black;'
              "
              @keypress.enter.prevent="remove(item)"
              @mousedown.prevent="remove(item)"
              class="multiselect__tag-icon"
              style="background-color: red"
            ></i>
          </span>
        </span>
      </template>
    </multiselect>
    <!--        <pre class="language-json"><code>{{ searchValue  }}</code></pre>-->
  </div>
</template>

<script>
//:loading="isLoading"
import Multiselect from "vue-multiselect";
import { mapState } from "vuex";
import axios from "axios";

// import decamelize from 'decamelize';

export default {
  name: "MainSearchBoxComponent",

  components: {
    Multiselect,
  },
  data() {
    return {
      // searchValue: this.value,
      isLoading: false,
      cancelTokenSource: undefined, //to cancel ajax (axios) request if new one is requested.
      timer: undefined, //to delay the ajax request when user is still typing.
      SOSAFlag: true, //to start with predicates from SOSA first.
      //options: [] //observableData
    };
  },
  computed: {
    options: {
      get() {
        return this.$store.state.settings.observableOptions;
      },
      set(value) {
        this.$store.commit("setObservablesOptions", value);
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

    settingsSensors: {
      set(value) {
        this.$store.commit("setSensorsTemplate", value);
      },
      get() {
        return this.$store.state.settings.queryTemplate.sensors;
      },
    },
  },
  created() {
    this.$root.$on("settingsDidChange", () => {
      this.searchValue = [];
      this.loadSensorsList();
    });
  },
  watch: {
    // searchValue(newVal, oldVal) {
    // this check is mandatory to prevent endless cycle
    // if ((newVal !== oldVal) && (newVal.length < oldVal.length)) {
    //     let removedVal = _.pullAll(oldVal, newVal);
    //     // console.log("removedVal => ", JSON.stringify(removedVal));
    //     for (let i = 0; i < removedVal.length; i++) {
    //         this.$store.commit('setPredicates', {
    //             value: [], //give it an empty value to be removed.
    //             uri: removedVal[i].p,
    //             source: "MainSearchBox Watch" //for development - print it
    //         });
    //     }
    // }
    // },
    // settingsSensors(newVal, oldVal) {
    //     this.searchValue = [];
    //     this.loadSensorsList();
    // }
  },

  methods: {
    removeItem(removedOption) {
      // alert(removedOption.p);
      // this.$store.commit('setPredicates', {
      //     value: [], //give it an empty value to be removed.
      //     uri: removedOption.p,
      //     source: "MainSearchBox removeItem method" //for development - print it
      // });
    },
    // /**
    //  * Convert the color to lighter version, this is used for the delete button on the search picker.
    //  */
    // LightenDarkenColor: function (col, amt) {
    //   var usePound = false;

    //   if (col[0] == "#") {
    //     col = col.slice(1);
    //     usePound = true;
    //   }

    //   var num = parseInt(col, 16);

    //   var r = (num >> 16) + amt;

    //   if (r > 255) r = 255;
    //   else if (r < 0) r = 0;

    //   var b = ((num >> 8) & 0x00ff) + amt;

    //   if (b > 255) b = 255;
    //   else if (b < 0) b = 0;

    //   var g = (num & 0x0000ff) + amt;

    //   if (g > 255) g = 255;
    //   else if (g < 0) g = 0;

    //   return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    // },

    isValidURL: function (string) {
      var res = string.match(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
      );
      return res !== null;
    },

    loadSensorsList: async function (query) {
      try {
        this.isLoading = true;
        // console.log('loadSensorsList', query, this.$refs.multiSel.filteredOptions.length);

        // let data = (await axios.post(this.$store.state.settings.endpointURL,
        //     {
        //         // query: 'SELECT DISTINCT ?p {?s ?p ?o}'
        //         // query: 'SELECT DISTINCT ?p WHERE {?S  ?p  ?O FILTER(regex(str(?p), "http://schema.org/DGFC" ) )}  '
        //         query: this.$store.getters.getQueryTemplate("sensors")
        //     }
        // ));
        // let data = (await axios.get(this.$store.state.settings.endpointURL, {
        //     headers:{'Accept-Encoding': 'application/json'},
        //     params: {
        //         query: this.$store.getters.getQueryTemplate("sensors")
        //     }
        // }));

        let server_response = undefined;

        if (this.cancelTokenSource) {
          // console.log("this.timer", this.cancelTokenSource);
          this.cancelTokenSource.cancel("Operation canceled by the user.");
        }

        const thisComponent = this;
        this.cancelTokenSource = axios.CancelToken.source();

        if (this.$refs.multiSel.filteredOptions.length == 0) {
          this.SOSAFlag = false;
        }

        if (query && query.length > 0 && !this.SOSAFlag) {
          console.log("custome search");
          // this.SOSAFlag = false;
          //remove the API trigger within 3 seconds
          // clearTimeout(this.timer);
          //assign new timer for the API call
          // this.timer = setTimeout(() => {
          this.$store
            .dispatch("axios", {
              method: "post",
              url: this.$store.state.settings.endpointURL,
              data: {
                query:
                  // 'SELECT  DISTINCT ?predicate {?s ?predicate ?o. FILTER(regex(lcase(str(?predicate)), "' +
                  // query.toLowerCase() +
                  // '" ))}  GROUP BY ?predicate',

                  this.$store.getters.getQueryTemplate("sensorsSearch", query.toLowerCase()),

                  // 'PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>'+
                  // 'SELECT DISTINCT ?subject WHERE { ?subject ?predicate ?object . FILTER(regex(lcase(str(?subject)), "' +
                  // query.toLowerCase() +
                  // '" ))} GROUP BY ?subject',
              },
              // data: {query: 'SELECT (SAMPLE(?predicate) AS ?p) (SAMPLE(?foi) AS ?featureOfInterest) WHERE {?s ?predicate ?o. OPTIONAL {?predicate <http://www.w3.org/ns/sosa/hasFeatureOfInterest> ?foi} FILTER(regex(lcase(str(?predicate)), "' + query.toLowerCase() + '" ))}  GROUP BY ?predicate'},
              params: null,
              cancelToken: this.cancelTokenSource.token,
            })
            .then(
              (response) => {
                //console.log(response);
                thisComponent.fillMainSearchBox(response);
              },
              (error) => {
                throw error;
              }
            );
          // }, 1000) //the API only triggers once users stop typing after 3 seconds
        } else {
          console.log("SOSA search");
          this.SOSAFlag = true;
          this.$store
            .dispatch("axios", {
              method: "post",
              url: this.$store.state.settings.endpointURL,
              data: { query: this.$store.getters.getQueryTemplate("sensors") },
              params: null,
              cancelToken: this.cancelTokenSource.token,
            })
            .then(
              (response) => {
                thisComponent.fillMainSearchBox(response);
              },
              (error) => {
                throw error;
              }
            );
        }

        // if (server_response === undefined || server_response.data["results"] === undefined || server_response.data["results"]["bindings"] === undefined) {
        //     // console.log(data);
        //      throw new Error('No observable data!');
        // }
        //
        // const head = server_response.data["head"]["vars"];
        // let results = server_response.data["results"]["bindings"];
        //
        //
        // // let option = {};
        // // option.p = '?p0';
        // // option.text = 'Anything';
        // // option.title = 'Anything';
        // // option.s = '?s0';
        // // option.o = '?o0';
        //
        // let loadedOptions = [];
        // // loadedOptions.push(option);
        //
        // let nameDict = {}; //make sure if there is a duplicate name to add numberings.
        //
        // var colorArray = [
        //     "#1abc9c",
        //     "#2ecc71",
        //     "#3498db",
        //     "#9b59b6",
        //     "#34495e",
        //     "#16a085",
        //     "#27ae60",
        //     "#2980b9",
        //     "#8e44ad",
        //     "#2c3e50",
        //     "#f1c40f",
        //     "#e67e22",
        //     "#e74c3c",
        //     "#f39c12",
        //     "#d35400",
        //     "#c0392b",
        //     "#7f8c8d",
        //     "#079992",
        //     "#78e08f",
        //     "#706fd3",
        //     "#ff5252"
        //
        // ];
        //
        //
        //
        //
        // for (let i =0; i< results.length; i++){
        //     //[head[0]] we are assuming the first predicate will always be the main one.
        //     let obj = getPredicateName(results[i][head[0]].value);
        //     let featureOfIntrest = "";
        //     if(results[i]["featureOfInterest"] !== undefined && results[i]["featureOfInterest"].value!== undefined && results[i]["featureOfInterest"].value.length > 0 ){
        //         featureOfIntrest = "("+getPredicateName(results[i]["featureOfInterest"].value).name+")";
        //     }
        //
        //     //prepare the data and default behaviour.
        //     let option = {};
        //     let objName = obj.name +" "+featureOfIntrest;
        //
        //     if(nameDict[objName] === undefined){
        //         nameDict[objName] = 0;
        //     }else{
        //         nameDict[objName]++;
        //     }
        //
        //     option.p = results[i][head[0]].value;
        //
        //     if(nameDict[obj.name] > 1){
        //         //make sure if there is a duplicate name to add numberings.
        //         option.text = objName + "_"+nameDict[objName]+"";
        //         option.s = '?'+obj.name +'_Subject'+nameDict[objName];
        //         option.o = '?'+obj.name +'_Object'+nameDict[objName];
        //     }else{
        //         option.text = objName;
        //         option.s = '?'+obj.name +'_Subject';
        //         option.o = '?'+obj.name +'_Object';
        //     }
        //
        //     option.title = obj.desc;
        //
        //     // option.s = '?s'+(i+1);
        //     // option.o = '?o'+(i+1);
        //
        //
        //     option.color = colorArray[i%colorArray.length];
        //
        //     loadedOptions.push(option);
        // }
        // this.options = loadedOptions;
        //
        //
        //
        //
        // this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.error(error);
        alert(error);
      }
    },

    /**
     * This function will fill yje main search box with all the options
     *
     */
    fillMainSearchBox: async function (server_response) {
      if (
        server_response === undefined ||
        server_response.data["results"] === undefined ||
        server_response.data["results"]["bindings"] === undefined ||
        server_response.data["results"]["bindings"].length == 0 ||
        server_response.data["results"]["bindings"][0] === undefined ||
        Object.keys(server_response.data["results"]["bindings"][0]).length == 0
      ) {
        // console.log(data);
        //throw new Error('No observable data!');
        this.options = [];
        this.isLoading = false;
        return;
      }

      const head = server_response.data["head"]["vars"];
      let results = server_response.data["results"]["bindings"];
      //console.log("results", results);

      // let option = {};
      // option.p = '?p0';
      // option.text = 'Anything';
      // option.title = 'Anything';
      // option.s = '?s0';
      // option.o = '?o0';

      let loadedOptions = [];
      // loadedOptions.push(option);

      let nameDict = {}; //make sure if there is a duplicate name to add numberings.

      for (let i = 0; i < results.length; i++) {
        //[head[0]] we are assuming the first predicate will always be the main one.
        //prepare the data and default behaviour.
        const option = await this.prepareObservableOption(results[i], {
          key: head[0],
          nameDict: nameDict,
          colorIndex: i,
        });

        loadedOptions.push(option);
      }

    //   console.log("nameDict", nameDict);
    
      this.options = loadedOptions;
      this.isLoading = false;
    },
  },
  async mounted() {
    this.loadSensorsList();
  },

  // watch:
  //     {
  //         value(newVal, oldVal) {
  //             // this check is mandatory to prevent endless cycle
  //             if (newVal !== oldVal) this.searchValue = newVal;
  //         },
  //         searchValue(newVal, oldVal) {
  //             // this check is mandatory to prevent endless cycle
  //             if (newVal !== oldVal) this.$emit('input', newVal);
  //         }
  //     }
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
</script>


<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect__tags {
  border-color: #CED4D4;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.multiselect__tag-icon:after {
  content: "×";
  color: black;
  font-size: 14px;
}

.multiselect__tag-icon:focus,
.multiselect__tag-icon:hover {
  background: black;
}

.multiselect__tag-icon:focus:after,
.multiselect__tag-icon:hover:after {
  color: white;
}
</style>
