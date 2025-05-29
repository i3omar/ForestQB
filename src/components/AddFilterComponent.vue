<template>
    <span>
        <div v-for="(filter,index) in filters" class="row align-items-center" :key="filter.filterId">

            <select2 v-model="filter.selectedFilter" :datatype="datatype" :options="init"/>
            <selected-filter :fieldsetUri="fieldsetUri" :filterData="filter" :options="options"/>

                        <a class="text-decoration-none col-lg-1" style="cursor: pointer;"
                           @click.prevent.stop="remove(index)">
                            <svg class="bi bi-trash" fill="currentColor" height="16" viewBox="0 0 16 16"
                                 width="16" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    fill-rule="evenodd"></path>
                            </svg>
                        </a>

        </div>
        <button class="btn btn-primary btn-sm btn-xs" type="button" @click.prevent.stop="addFilter()">Add</button>
    </span>
</template>

<script>

import SelectedFilter from "./SelectedFilterComponent";
// import Multiselect from 'vue-multiselect';
import Select2 from './Select2Component';
import _ from "lodash";
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import { optionsData } from "../filterOptions.js";


export default {
    name: "AddFilterComponent",
    props: ["fieldsetUri", "predicates", "predicate"],
    data: function () {
        return {
            init: optionsData.init, //intial value
            options: optionsData, //all list options
            //filters: [],
            counter: 0,
            selectedFilter: null,
            selectedOption: null,
            hash: new Date().getTime() //to be used in the filter id

        };
    },
    computed: {
        datatype: function () {
            const key = this.fieldsetUri; //parent
            const predicateUri = this.predicate.uri; //current predicate
            let predicate = this.$store.getters.getPredicate(key, predicateUri); //get the predicate object (data)
            console.log("predicate: ", predicate);

            if (predicate == -1) { //not found
                return [];
            }

            return predicate.datatype; //return only the datatype object of that predicate.
        },
        filters: {
            get: function () {
                const key = this.fieldsetUri; //parent
                const predicateUri = this.predicate.uri;
                return this.$store.getters.getPredicateFilters(key, predicateUri);
            },

            set: function (value) {
                // {key, predicateUri, value}
                const key = this.fieldsetUri; //parent
                const predicateUri = this.predicate.uri;
                this.$store.commit('setPredicateFilters', {key, predicateUri, value});
            }
        }
    },
    watch: {
        filters() {

        }
    },
    methods: {
        remove: function (index) {
            //{key, predicateUri, value}

            // this.filters = _.pull(this.filters, item);

            //this.$store.commit('setPredicates', {value: this.predicates, uri: item.fieldsetUri, source:"AddFilter remove method!"});

            // const index = this.filters.indexOf(item);
            //const index = this.filters.findIndex(x => x.filterId === item.filterId);
            //if (index > -1) {
                //console.log("Remove ", item.filterId, " - Index:", index)
                this.filters.splice(index, 1);
            //}
        },
        addFilter() {
            // this.filters.push({
            //   field: "f" + this.counter++,
            //   selectedFilter: "",
            //   options: []
            // });
            let tempF = [];
            tempF = this.filters;
            tempF.push({
                filterId: "f" + (this.counter++) + this.hash,
                selectedFilter: {},
                selectedOption: {},
                input: {value: "", expression: ""}
            });

            this.filters = tempF;
        },
        selectionChanged(e, filter) {
            const index = e.target.value;

            filter.options = this.options[this.init[index].id];
            //console.log("this.init[index].id --> ", this.init[index].id, " +++ this.options[this.init[index].id] -->", this.options[this.init[index].id]);
            //const index = this.filters.indexOf(filter);
            //this.filters[index] = e.target.getAttribute('data-next');
            //console.log("datanext", e.target.getAttribute('data-next'));
            //this.selectedOption = optionsData[this.selectedFilter]
        }
    },
    components: {SelectedFilter, Select2} //Multiselect

}

// function initNewSelect(id){
//   console.log("initNewSelect");
//   $(id).select2({
//     // placeholder: 'Select an option',
//     // data: optionsData['init'],
//     // templateResult: formatOption,
//     theme: "classic"
//   });
// }
</script>

<style scoped>

.btn-xs {
    padding: .4rem;
    font-size: .775rem;
    line-height: .5;
    border-radius: .2rem;
}

.multiselect__input {
    background-color: red;
}

.multiselect {
    width: 200px;
}
</style>
