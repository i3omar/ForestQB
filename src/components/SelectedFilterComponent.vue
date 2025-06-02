<template>
    <div class="col-lg-7 row align-items-center">
        <!--    <pre>{{this.filterData}}</pre>-->
        <div v-if="this.filter.selectedOption.type == 'text'" class="col-auto row align-items-center">
            <input v-model="filter.input.value" class="form-control form-control-sm col-auto"
                   placeholder="Write your input."
                   type="text">
        </div>
        <div v-else-if="this.filter.selectedOption.type == 'select'" class="col-auto row align-items-center">
            <select v-model="filter.input.value" class="form-select form-select-sm col-auto">
                <option disabled selected value="">Choose options</option>
                <option v-for="option in this.filter.selectedOption.options" :value="option.id">{{
                        option.text
                    }}
                </option>
            </select>
        </div>
        <div v-else-if="this.filter.selectedOption.type == 'number'" class="col-auto row align-items-center">
            <div class="col-lg-6" style="padding: 0 0.5em 0 0">
                <select v-model="filter.input.expression" class="form-select form-select-sm">
                    <option disabled selected value="">Expression</option>
                    <option value="=">=</option>
                    <option value="&lt;">&lt;</option>
                    <option value="&gt;">&gt;</option>
                    <option value="&lt;=">&lt;=</option>
                    <option value="&gt;=">&gt;=</option>
                </select>
            </div>

            <div class="col-lg-6" style="padding: 0">
                <input v-model="filter.input.value" class="form-control form-control-sm" placeholder="number" type="number">
            </div>
        </div>

        <div v-else-if="this.filter.selectedOption.type == 'dateRange'" class="col-sm-12 row  align-items-center">
            <div class="col-lg-6" style="padding: 0 0.5em 0 0">
                <select v-model="filter.input.expression" class="form-select form-select-sm col-sm-6">
                    <option disabled selected value="">Expression</option>
                    <option value="=">=</option>
                    <option value="&lt;">&lt;</option>
                    <option value="&gt;">&gt;</option>
                    <option value="&lt;=">&lt;=</option>
                    <option value="&gt;=">&gt;=</option>
                </select>
            </div>
            <div class="col-lg-6" style="padding: 0">
                <date-picker v-model="filter.input.value" class="col-lg-12" type="date" valueType="format"></date-picker>
            </div>
        </div>

        <div v-else-if="this.filter.selectedOption.type == 'timeRange'" class="col-sm-12 row  align-items-center">
            <div class="col-lg-6" style="padding: 0 0.5em 0 0">
                <select v-model="filter.input.expression" class="form-select form-select-sm col-sm-6">
                    <option disabled selected value="">Expression</option>
                    <option value="=">=</option>
                    <option value="&lt;">&lt;</option>
                    <option value="&gt;">&gt;</option>
                    <option value="&lt;=">&lt;=</option>
                    <option value="&gt;=">&gt;=</option>
                </select>
            </div>
            <div class="col-lg-6" style="padding: 0">
                <date-picker v-model="filter.input.value" class="col-lg-12" type="time" format="HH:mm:ss" valueType="format"></date-picker>
            </div>
        </div>

        <div v-else-if="this.filter.selectedOption.type == 'dateTimeRange'" class="col-sm-12 row  align-items-center">
            <div class="col-lg-6" style="padding: 0 0.5em 0 0">
                <select v-model="filter.input.expression" class="form-select form-select-sm col-sm-6">
                    <option disabled selected value="">Expression</option>
                    <option value="=">=</option>
                    <option value="&lt;">&lt;</option>
                    <option value="&gt;">&gt;</option>
                    <option value="&lt;=">&lt;=</option>
                    <option value="&gt;=">&gt;=</option>
                </select>
            </div>
            <div class="col-lg-6" style="padding: 0">
                <date-picker v-model="filter.input.value" class="col-lg-12" type="datetime" format="YYYY-MM-DD HH:mm:ss" valueType="YYYY-MM-DDTHH:mm:ss"></date-picker>
            </div>
        </div>
    </div>
</template>


<script>

//https://www.npmjs.com/package/vue2-datepicker
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {
    name: "SelectedFilterComponent",
    props: ["fieldsetUri", "filterData", "options"],
    data: function () {
        return {
            selectedOption: {}
        };
    },
    computed: {
        filter: {
            get: function () {
                return this.filterData;
            },

            set: function (newValue) {
                this.$emit('input', newValue);
            }
        }
    },
    watch: {
        "filterData.selectedFilter": function () {

            if (this.filterData && this.filterData.selectedFilter) {
                //this.selectedOption = this.options[this.filterData.selectedFilter.id];
                this.filter.selectedOption = this.options[this.filterData.selectedFilter.id];
                this.filter.input = {value: "", expression: ""};//this.options[this.filterData.selectedFilter.id];
            }


        }

    },
    components: {DatePicker}
}
</script>

<style scoped>

</style>
