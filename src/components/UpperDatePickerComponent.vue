<template>
    <date-picker ref="upperDatePicker" v-model="value" placeholder="Filter by Date" range type="date" valueType="format"
                 @change="dateRangeSelected"/>
</template>

<script>

//https://www.npmjs.com/package/vue2-datepicker
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {bus} from '../main';

export default {
    name: "UpperDatePickerComponent",
    data: function () {
        return {
            value: [null, null],
            // filterIds: [null, null],
        };
    },
    computed: {
        observablesLength() { //get the how many of elements were selected
            return this.$store.state.coreStore.observables.length;
        },
        coreStore() { //main json that represent the app selections
            return this.$store.state.coreStore; //$store.getters.getCore;
        },
        datePickerValue: {
            get() {
                return this.$store.getters.getDatePicker;
            },
            set(value) {
                this.$store.commit('setDatePicker', value)
            }
        },
        filterIds: {
            get() {
                return this.$store.getters.getDatePickerIds;
            },
            set(value) {
                this.$store.commit('setDatePickerIds', value)
            }
        },
        observables: {
            get() {
                return this.$store.state.coreStore.observables;
            },
            set(value) {
                this.$store.commit('setObservables', value)
            }
        }
    },
    watch: {
        observables() {
            // if(this.value[0] != null && this.value[1] != null){
            //     const delay = ms => new Promise(res => setTimeout(res, ms));
            //     delay(1000);
            //     alert("tt")
            //
            //     this.dateRangeSelected();
            // }

        },
        datePickerValue(newValue, OldValue) {
                console.log("start datePickerValue watch --> ")

            if(newValue != OldValue && this.value.toString() != [newValue[0], newValue[1]].toString()){
                console.log(" --> inside if", newValue[0]);

                this.value = [newValue[0], newValue[1]];

            }

        }

    },
    created() {
        bus.$on('predicatesReady', (data) => {
            if (this.value[0] != null && this.value[1] != null) {

                this.dateRangeSelected();
            }
        });

        this.$root.$on('clearUpperDatePicker', () => this.clearSelectedDateRange());//this.$emit('clearSelectedDateRange'));
        this.$root.$on('setUpperDatePicker', (date1, date2) => this.setSelectedDateRange(date1, date2));
    },
    mounted() {


    },
    methods: {
        setSelectedDateRange: function (date1, date2) {
            console.log("setSelectedDateRange", date1, date2);
            // console.log("this.$refs.upperDatePicker.currentValue", this.$refs.upperDatePicker.currentValue);
            let d1;
            let d2;

            if(!date1){ //if undefined, put today date
                date1 = new Date();
            }
            if(!date2){ //if undefined, put today date
                date2 = new Date();
            }

            //order dates
            if (date1 < date2) { //date 1 is before
                d1 = date1;
                d2 = date2;
            } else if (date1 > date2) { //date 1 is after
                d1 = date2;
                d2 = date1;
            }else{//they are equal
                d1 = date1;
                d2 = date2;
            }

            this.value = [this.formattedDate(d1), this.formattedDate(d2)];
        },
        formattedDate: function (date) {

            const yyyy = date.getFullYear();
            let mm = date.getMonth() + 1; // Months start at 0!
            let dd = date.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            return yyyy + '-' + mm + '-' +dd;
        },

        clearSelectedDateRange: function () {
            this.$refs.upperDatePicker.clear();// clear selected date
        },

        dateRangeSelected: function () {

            this.datePickerValue = this.value;
            // if (this.observablesLength > 0) {
                const predicatesKeys = Object.keys(this.coreStore.predicates);

                for (let x = 0; x < predicatesKeys.length; x++) {
                    for (let y = 0; y < this.coreStore.predicates[predicatesKeys[x]].length; y++) {
                        let currPredicate = this.coreStore.predicates[predicatesKeys[x]][y];

                        if (currPredicate && currPredicate.datatype && currPredicate.datatype.value
                            && (currPredicate.datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#date"
                                || currPredicate.datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#datetime")) {

                            const parentKey = predicatesKeys[x];

                            let foundCount = 0; //if found, increment this.

                            for (let z = currPredicate.filters.length - 1; z >= 0; z--) {
                                console.log("currPredicate.filters.length:", currPredicate.filters.length)
                                if (currPredicate.filters[z].filterId == this.filterIds[0]) {
                                    // console.log("found 0:", this.filterIds[0])

                                    const key = parentKey; //parent
                                    const predicateUri = this.coreStore.predicates[predicatesKeys[x]][y].uri;
                                    const filterIndex = z;
                                    this.$store.commit('deletePredicateFilter', {
                                        key,
                                        predicateUri,
                                        filterIndex
                                    });
                                    foundCount++;
                                } else if (currPredicate.filters[z].filterId == this.filterIds[1]) {
                                    // console.log("found 1:", this.filterIds[1])

                                    const key = parentKey; //parent
                                    const predicateUri = this.coreStore.predicates[predicatesKeys[x]][y].uri;
                                    const filterIndex = z;
                                    this.$store.commit('deletePredicateFilter', {
                                        key,
                                        predicateUri,
                                        filterIndex
                                    });
                                    foundCount++;
                                }


                                if (foundCount > 1) {
                                    console.log("break!");
                                    break;
                                }

                                console.log("loop z:", z);
                            }


                        }
                        //console.log("loop y:", y);
                    }
                }


                this.filterIds = [null, null]; //clear dates

                for (let x = 0; x < predicatesKeys.length; x++) {
                    for (let y = 0; y < this.coreStore.predicates[predicatesKeys[x]].length; y++) {
                        let currPredicate = this.coreStore.predicates[predicatesKeys[x]][y];
                        console.log("Loop jump");

                        if (currPredicate && currPredicate.datatype && currPredicate.datatype.value && (currPredicate.datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#date" || currPredicate.datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#datetime")) {

                            console.log("found", currPredicate.datatype.value, "in", currPredicate.uri, "parentKey:", predicatesKeys[x]);

                            const parentKey = predicatesKeys[x];


                            let newFilters = [];
                            newFilters = currPredicate.filters;


                            if (this.value[0] == null || this.value[1] == null) { //this is a clear button, remove filters.

                            } else { //then, we want to add new filter.


                                let selFilData = {
                                    text: "Range",
                                    id: "select5",
                                    type: "dateRange",
                                    suffix1: "",
                                    suffix2: ""
                                };

                                //adding the filters
                                //check if it is datetime
                                if (currPredicate.datatype.value.toLowerCase() == "http://www.w3.org/2001/xmlschema#datetime") {
                                    selFilData = {
                                        text: "Range",
                                        id: "select7",
                                        type: "dateTimeRange",
                                        suffix1: "T00:00:00",
                                        suffix2: "T23:59:59"
                                    };
                                }

                                if (this.filterIds[0] == null) {
                                    this.filterIds[0] = "fRange1" + new Date().getTime();
                                }
                                newFilters.push({
                                    filterId: this.filterIds[0],
                                    selectedFilter: {
                                        "text": selFilData.text,
                                        "id": selFilData.id
                                    },
                                    selectedOption: {
                                        "type": selFilData.type
                                    },
                                    input: {value: this.value[0] + selFilData.suffix1, expression: ">="}
                                });
                                if (this.filterIds[1] == null) {
                                    this.filterIds[1] = "fRange2" + new Date().getTime();
                                }
                                newFilters.push({
                                    filterId: this.filterIds[1],
                                    selectedFilter: {
                                        "text": selFilData.text,
                                        "id": selFilData.id
                                    },
                                    selectedOption: {
                                        "type": selFilData.type
                                    },
                                    input: {value: this.value[1] + selFilData.suffix2, expression: "<="}
                                });


                                //this.$store.commit('pushPredicateFilter', {parentKey, predicateIndex, newFilter});


                                const key = parentKey; //parent
                                const predicateUri = this.coreStore.predicates[predicatesKeys[x]][y].uri;
                                const value = newFilters;
                                this.$store.commit('setPredicateFilters', {key, predicateUri, value});

                                //console.log("break parent!");
                                break;
                            }

                        }
                        //console.log("loop y:", y);
                    }
                }


            // } else {
            //     if (this.value[0] != null && this.value[1] != null) { //if NOT a clear button click, notify:
            //         this.value = [null, null];
            //         alert("Please select an animal first.");
            //     }
            //
            // }
        }

    },
    components: {DatePicker}

}
/*
{
            "filterId": "f01640111658047",
            "selectedFilter": {
              "text": "Range",
              "id": "select5"
            },
            "selectedOption": {
              "type": "dateRange"
            },
            "input": {
              "value": "2021-12-22",
              "expression": ">"
            }
          },
 {
            "filterId": "f11640111658047",
            "selectedFilter": {
              "text": "Range",
              "id": "select5"
            },
            "selectedOption": {
              "type": "dateRange"
            },
            "input": {
              "value": "2021-12-23",
              "expression": "<"
            }
 }
 */
</script>

<style scoped>

</style>
