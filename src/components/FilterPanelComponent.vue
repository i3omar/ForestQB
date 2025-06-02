<template>
    <form class="form-box">
        <fieldset class="form-group border p-3" v-for="item in this.$store.state.coreStore.observables" :key="item.uri" v-bind:data-fieldsetUri="item.uri">
            <legend :style="'color: '+ item.color">{{item.text}} <input v-model="item.color" style="height: 15px; width: 25px; display:inline;"
                                   placeholder="colour" type="color"></legend>
            <predicates-search  v-bind:fieldsetUri="item.uri" />
        </fieldset>
    </form>
</template>

<script>
import PredicatesSearch from "./PredicatesSearchComponent"
export default {
    name: "FilterPanelComponent",
    // props: ["mainSearchBoxValues", "coreJson"],
    data: function (){
        return{

        };
    },
    components: {PredicatesSearch}
}
</script>

<style scoped>
.form-box {  text-align: left; }
fieldset{
    margin-top: 0;
    margin-bottom: 1.5em;
    border-color: #276248;
}
legend {
    font-size: inherit;
    width: inherit;
    padding: 0 20px;
    margin-bottom: 0px;
    line-height: 30px;
    font-weight: 600;
    text-transform: uppercase;
    color: #555;
    top: 60px;
}
</style>
