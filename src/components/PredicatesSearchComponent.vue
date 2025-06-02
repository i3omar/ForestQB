<template>
    <div class="card" onload="setUri($event)" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title">Linked Entities</h5>
            <h6 v-if="options.length > 0" class="card-subtitle mb-2">There {{options.length > 2? "are "+options.length+" entities":"is "+options.length+" entity"}} linked to this sensor.</h6>
            <h6 v-if="options.length > 0" class="card-subtitle mb-2 text-muted">Select items you want to be included in the search. (<span
                style="cursor:pointer; color:blue; text-decoration:underline;"
                @mousedown.prevent.stop="unselectAll(unselect)">{{ unselectLabel }}</span>)</h6>
            <h6 v-else>No linked items were found to this entity.</h6>
            <multiselect v-model="predicatesSearchValue" :clear-on-select="false" :close-on-select="false"
                         :hide-selected="true"
                         :internal-search="true" :limit="100" :loading="isLoading" :max-height="600"
                         :multiple="true" :options="options" :options-limit="300"
                         :searchable="true" :show-no-results="true" deselect-label="Remove this value" label="name"
                         open-direction="bottom" placeholder="Select an option" track-by="name">
                <template slot="clear" slot-scope="props">
                    <!--                    <div class="multiselect__clear" v-if="predicatesSearchValue.length"-->
                    <!--                         @mousedown.prevent.stop="clearAll()"></div>-->
                </template>
                <template slot="singleLabel" slot-scope="{ option }">{{ option.name }}</template>


            </multiselect>

            <!-- <multiselect v-model="predicatesSearchValue" :options="options" :hide-selected="true" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Select an option" label="name" track-by="name" :preselect-first="true">
    <template slot="selection" slot-scope="{ values, search, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} linked {{ values.length > 1? "entities are":"entity is" }} selected out of {{options.length}}</span></template>
  </multiselect> -->
        </div>

        <!--        v-bind:id="currentUriKey+'-flush'"-->


        <div :id="this.flushId" class="accordion accordion-flush">
            <div class="accordion-item">
                <h2 id="flush-headingOne" class="accordion-header">
                    <button @click="accordionClicked" :ref="this.flushId" :data-bs-target="'#flush-collapseOne'+this.flushId" aria-controls="flush-collapseOne" aria-expanded="false"
                            class="accordion-button collapsed" data-bs-toggle="collapse"
                            type="button">
                            <button type="button" class="btn btn-outline-secondary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sliders" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
</svg> &nbsp; {{accordionHidden?"Show Filters Panel":"Hide Filters Panel"}}</button>
                    </button>
                </h2>
                <div :id="'flush-collapseOne'+this.flushId" :data-bs-parent="'#'+this.flushId"
                     aria-labelledby="flush-headingOne"
                     class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <predicates-list :fieldsetUri="this.fieldsetUri" v-bind:predicates="predicatesSearchValue"/>


                    </div>
                </div>
            </div>

        </div>


    </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import PredicatesList from './PredicatesListComponent'
import axios from "axios";
import { bus } from '../main';

export default {
    name: "PredicatesSearchComponent",
    props: ['fieldsetUri'],

    data: function () {
        return {
            options: [],

            /**
             * flushId is for the bootstrap accordion-flush
             */
            flushId: 'flush_' + new Date().getTime(), //old: Math.floor(Math.random() * 1000000000),
            unselect: true,
            unselectLabel: "Unselect All",
            selectLabelOptions: ["Unselect All", "Select All"],
            isLoading: false,
            accordionHidden: true,
        };
    },
    components: {
        Multiselect, PredicatesList
    },
    computed: {
        predicatesSearchValue: {
            get() {
                const uri = this.fieldsetUri;
                return this.$store.getters.getPredicates(uri);
            },
            set(value) {
                const uri = this.fieldsetUri;
                this.$store.commit('setPredicates', {value, uri});
            }
        },

        // observable: {
        //     get() {
        //         const uri = this.fieldsetUri;
        //         return this.$store.getters.getObservable(uri);
        //     },
        //     set(value) {
        //         const uri = this.fieldsetUri;
        //         this.$store.commit('setObservable', {value, uri});
        //     }
        // },

        // mapFilters: {
        //     set(value) {
        //         this.$store.commit('setMapNearbyFilters', value);
        //     },
        //     get() {
        //         return this.$store.getters.getMapNearbyFilters;
        //     }
        // }
        // observablesValue: {
        //     get () {
        //         return this.$store.state.coreStore.observables;
        //     },
        //     set (value) {
        //         this.$store.commit('setObservables', value)
        //     }
        // }
    },
    /**
     * Once the component loaded, it will run ajax request to load the predicates.
     * @returns {Promise<void>}
     */
    async mounted() {
        this.loadPredicateSearchList();

        

    },
    watch:{
        predicatesSearchValue(){
            if(this.predicatesSearchValue.length == this.options.length){
                this.unselectLabel = this.selectLabelOptions[0];

            }else if(this.predicatesSearchValue.length == 0){
                this.unselectLabel = this.selectLabelOptions[1];

            }
        }

    },
    methods: {
        accordionClicked(){

            // console.log("accordionHidden", this.$refs[this.flushId].ariaExpanded)
            // if(this.accordionHidden){
            //     // "Show Filters Panel"
            //     // this.accordionBtnName = "Hide Filters Panel";
            //     this.accordionHidden = false;
            // }else{
            //     this.accordionHidden = true;
            // }
            //console.log("accordionHidden", this.$refs[this.flushId].ariaExpanded)
            this.accordionHidden = this.$refs[this.flushId].ariaExpanded === 'false';
        },
        loadPredicateSearchList: async function(){


            try {
                this.isLoading = true;

                let data = (await axios.post(this.$store.state.settings.endpointURL,
                    {
                        // query: 'SELECT DISTINCT ?predicate (DATATYPE(?object) as ?datatype) ?object WHERE {?s1 ?predicate ?object. {SELECT * {?s1 <'+this.fieldsetUri+'> ?o} LIMIT 1}}'
                        query: this.$store.getters.getQueryTemplate("predicatesSearch", this.fieldsetUri)
                    }
                ));

                if (data.data["results"] === undefined || data.data["results"]["bindings"] === undefined) {
                    throw 'No predicates!';
                }

                data = data.data["results"]["bindings"];


                let loadedOptions = [];
                let nameDict = {}; //make sure if there is a duplicate name to add numberings.

                for (let i = 0; i < data.length; i++) {
                    if (data[i].predicate && this.fieldsetUri != data[i].predicate.value) {
                        let obj = this.getPredicateName(data[i].predicate.value);

                        if(nameDict[obj.name] === undefined){
                            nameDict[obj.name] = 1;
                        }else{
                            nameDict[obj.name]++;
                        }

                        //prepare the data and default behaviour.
                        data[i].uri = data[i].predicate.value;
                        if(nameDict[obj.name] > 1){
                            //make sure if there is a duplicate name to add numberings.
                            data[i].name = obj.name + "_"+nameDict[obj.name]+"";
                        }else{
                            data[i].name = obj.name;
                        }

                        data[i].desc = obj.desc;
                        data[i].fieldsetUri = this.fieldsetUri;
                        data[i].isSelectable = true;
                        data[i].isOptional = false;
                        data[i].filters = [];
                        delete data[i].predicate; //after preparing the data, no need to keep it.
                        loadedOptions.push(data[i]);
                    }
                }
                this.options = loadedOptions;
                //If predicatesSearchValue has no values, select all options.
                //This is important because if predefined example was selected,
                //you don't wont to lose the selected examples.
                // console.log("predicatesSearchValue", this.predicatesSearchValue, " -> ", this.predicatesSearchValue == null);
                if (!this.predicatesSearchValue || this.predicatesSearchValue.length == 0) {
                    this.predicatesSearchValue = loadedOptions;
                }

                this.isLoading = false;
                bus.$emit('predicatesReady');

            } catch (error) {
                this.isLoading = false;
                console.error(error);
            }

        },
        unselectAll(unselect) {
            if (this.unselectLabel == this.selectLabelOptions[0]) {
                this.predicatesSearchValue = []
                this.unselectLabel = this.selectLabelOptions[1];
            } else {
                this.predicatesSearchValue = this.options;
                this.unselectLabel = this.selectLabelOptions[0];
            }
            this.unselect = !this.unselect;
        }
    }
}


/**
 * This function will get the predicate name from the list if exist,
 * or will try to guess the name based on the uri.
 *
 * @param predicate uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
 * @returns {{name: string, desc: string}}
 */
// function getPredicateName(predicate) {
//     if (predicatesData[predicate]) {
//         if (predicatesData[predicate].name.length && predicatesData[predicate].name.length > 0) {
//             return predicatesData[predicate];
//         }
//     }

//     //If Name dont exist in the list, I will try to guess it myself:
//     let str = predicate;

//     if (predicate.lastIndexOf("#") > predicate.lastIndexOf("/")) {
//         str = str.substring(str.lastIndexOf("#") + 1, str.length);
//     } else if (predicate.lastIndexOf("/") > -1) {
//         str = str.substring(str.lastIndexOf("/") + 1, str.length);
//     }


//     //if no name, return this:
//     return {"name": str, "desc": "Description not exist."};
// } // ----- end of getPredicateName
</script>

<style scoped>

</style>
