/*
==============================================================================
ForestQB-V1 Main Application Entry
==============================================================================

Created by: OMAR MUSSA  
Copyright © 2023–2025 OMAR MUSSA. All rights reserved.

This file bootstraps the ForestQB application, registering all dependencies,
global mixins, Vuex store, Leaflet, jQuery, Bootstrap, and core utility methods.
It renders the main QB_App component and sets up app-wide helpers.

==============================================================================
*/


// window.Vue = require('vue').default;
import Vue from 'vue'
import QB_App from "./QB_App";
import store from './store';
import jQuery from 'jquery';  // Import jQuery

import 'select2';
import 'select2/dist/css/select2.min.css';

// Optionally assign jQuery to the global window object
window.$ = window.jQuery = jQuery;
    

export const bus = new Vue();

require('bootstrap');


// import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// import "bootstrap/dist/js/bootstrap.bundle.min.js"
// npm install bootstrap-select
// npm uninstall bootstrap-select
// import "bootstrap-select";
// import "bootstrap-select/dist/css/bootstrap-select.min.css";



/**
 * https://vue-multiselect.js.org/
 */
import Multiselect from 'vue-multiselect';
// Vue.component('multiselect', Multiselect);

/**
 * https://vue-select.org/
 */
// import vSelect from 'vue-select'
// import 'vue-select/dist/vue-select.css';
// Vue.component('v-select', vSelect)


/**
 * https://vue2-leaflet.netlify.app/
 */
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw-src.css';

Vue.component('l-map', LMap);
Vue.component('l-tile-layer', LTileLayer);
Vue.component('l-marker', LMarker);


Vue.mixin({
    methods: {
        capitalizeFirstLetter: str => str.charAt(0).toUpperCase() + str.slice(1),
        /**
     * Convert the color to lighter version, this is used for the delete button on the search picker.
     */
    LightenDarkenColor: function (col, amt) {
        var usePound = false;
  
        if (col[0] == "#") {
          col = col.slice(1);
          usePound = true;
        }
  
        var num = parseInt(col, 16);
  
        var r = (num >> 16) + amt;
  
        if (r > 255) r = 255;
        else if (r < 0) r = 0;
  
        var b = ((num >> 8) & 0x00ff) + amt;
  
        if (b > 255) b = 255;
        else if (b < 0) b = 0;
  
        var g = (num & 0x0000ff) + amt;
  
        if (g > 255) g = 255;
        else if (g < 0) g = 0;
  
        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
      },
        getColor: function (colorIndex){

            const colorArray = [
                "#3498db",
                "#82589F", //lavender
                "#34495e",
                "#16a085",
                "#795548",
                "#e67e22",
                "#e74c3c",
                "#f39c12",
                "#c0392b",
                "#7f8c8d",
                "#706fd3",
                "#ff5252",
                "#34ace0", //e blue
                "#d63031", // chi gong - red
                "#e17055", // organgeville
                "#636e72", // gray
                "#e84393", //pink
                "#EAB543", //honey
                "#ff793f", //pumpkin
                "#706fd3", //purple
                "#58B19F", //green
    

            ];

            if(colorIndex == null){
                return colorArray[Math.floor((Math.random() * colorArray.length))];
            }
            return colorArray[colorIndex % colorArray.length];
        },
        /**
         * This function will get the predicate name from the list if exist,
         * or will try to guess the name based on the uri.
         *
         * @param predicate uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
         * @returns {{name: string, desc: string}}
         */
        getPredicateName: function (predicate) {
            // if (predicatesData[predicate]) {
            //     if (predicatesData[predicate].name.length && predicatesData[predicate].name.length > 0) {
            //         return predicatesData[predicate];
            //     }
            // }

            //If Name dont exist in the list, I will try to guess it myself:
            let str = predicate;

            if (predicate.lastIndexOf("#") > predicate.lastIndexOf("/")) {
                str = str.substring(str.lastIndexOf("#") + 1, str.length);
            } else if (predicate.lastIndexOf("/") > -1) {
                str = str.substring(str.lastIndexOf("/") + 1, str.length);
            }

            const words = str.split(/[\s,_]+/);

            for (let i = 0; i < words.length; i++) {
                words[i] = words[i][0].toUpperCase() + words[i].substr(1);
            }

            let newStr = "";
            for (let i = 0; i < words.length; i++) {
                newStr += words[i].replace(/([a-z0-9])([A-Z])/g, '$1$2');
            }

            //words.join(" ");

            str = newStr;


            //if no name, return this:
            return { "name": str.trim(), "desc": "Description not exist." };
        }, // ----- end of getPredicateName

        /**
         * This function will prepare the observable option to be added to the list
         *
         *
         * @param predicate uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
         * @returns {{name: string, desc: string}}
         */
         prepareObservableOption: async function (resultObject, payload) {
                let {key, nameDict, colorIndex} = payload;
                if(nameDict == null){
                    nameDict = {};
                }

                let obj = this.getPredicateName(resultObject[key].value);
                let featureOfIntrest = "";

                if (resultObject["featureOfInterest"] !== undefined && resultObject["featureOfInterest"].value !== undefined && resultObject["featureOfInterest"].value.length > 0) {
                    featureOfIntrest = " (" + this.getPredicateName(resultObject["featureOfInterest"].value).name + ")";
                }

                //prepare the data and default behaviour.
                let option = {};
                let objName = obj.name + featureOfIntrest;


                if (nameDict[objName] === undefined) {
                    nameDict[objName] = 0;
                } else {
                    nameDict[objName]++;
                }

                //this.$store.state.coreStore.observables;
                option.uri = resultObject[key].value;

                //determine ontology if not set
                if(this.$store.state.settings.selectedSearchTriplePatternTemplate == null && option.uri){
                    await this.$store.dispatch("determineEndpointOntology", { uri: option.uri});
                }  


                 //make sure if there is a duplicate name to add numberings.
                 (nameDict[obj.name] > 1)? option.text = objName + "_" + nameDict[objName] + "": option.text = objName;

                 if(this.$store.state.settings.searchTriplePattern.subject.includes("?")){
                     (nameDict[obj.name] > 1)? option.s = '?' + obj.name + '_Subject' + nameDict[objName]:option.s = '?' + obj.name + '_Subject';
                 }else if(this.$store.state.settings.searchTriplePattern.subject.includes("%")){
                     option.s = option.uri;
                 }else{
                     option.s = this.$store.state.settings.searchTriplePattern.subject;
                 }


                 if(this.$store.state.settings.searchTriplePattern.predicate.includes("?")){
                     (nameDict[obj.name] > 1)? option.p = '?' + obj.name + '_Predicate' + nameDict[objName]: option.o = '?' + obj.name + '_Predicate';
                 }else if(this.$store.state.settings.searchTriplePattern.predicate.includes("%")){
                     option.p = option.uri;
                 }else{
                     option.p = this.$store.state.settings.searchTriplePattern.predicate;
                 }
                 //console.log("option.p", option.p);

                 if(this.$store.state.settings.searchTriplePattern.object.includes("?")){
                     (nameDict[obj.name] > 1)? option.o = '?' + obj.name + '_Object' + nameDict[objName]: option.o = '?' + obj.name + '_Object';
                 }else if(this.$store.state.settings.searchTriplePattern.object.includes("%")){
                     option.o = option.uri;
                 }else{
                     option.o = this.$store.state.settings.searchTriplePattern.object;
                 }
                 
          

             option.title = obj.desc;
             option.modifiers = {
                 limit:{
                     enabled:false,
                     value:0
                 }
             };

             option.color = this.getColor(colorIndex);

             //console.log("option", option);

             return option;
         },
    }
})

const app = new Vue({
    store,
    render: h => h(QB_App),
}).$mount('#app');
