<template>
  <span><l-map ref="map" :center="center" :zoom="zoom" :options="mapOptions" style="height: 400px">
      <!-- Modal -->
      <div class="modal fade" id="selectAreaModal" tabindex="-1" role="dialog" aria-labelledby="Select an area"
        aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Select an Area
              </h5>
              <button aria-label="Close" class="btn-close" @click="cancelMapAreaModal" type="button"></button>
            </div>
            <div class="modal-body">
              <p>
                Create a map filter for a specific area by selecting one of the
                list option.
              </p>
              <select v-model="selectedArea" class="form-select" aria-label="Default select example">
                <option value="-1" selected>Select an option</option>
                <option v-for="(item, index) in mapAreas" :key="item.id" :value="index">
                  {{ item.title }}
                </option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="cancelMapAreaModal">
                Close
              </button>
              <button type="button" class="btn btn-primary" @click="insertMapFilter">
                Insert
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- end of Modal -->

      <l-control-fullscreen :options="{ title: { false: 'Full Screen', true: 'Be regular' } }" position="topleft" />
      <l-tile-layer :attribution="attribution" :url="url"></l-tile-layer>

      <l-circle-marker v-for="(item, index) in locations" v-bind:key="index" :lat-lng="item.latLng" :radius="6"
        :fillColor="item.color" :color="borderColor" :fillOpacity="1" :opacity="0.3" />

      <l-feature-group ref="featureG">
        <l-circle v-for="circle in circles" :key="circle.id" :ref="`${circle.id}`" :color="circle.color"
          :lat-lng="circle.center" :radius="circle.radius" />

        <l-polygon v-for="polygon in polygons" :key="polygon.id" :ref="`${polygon.id}`" :color="polygon.color"
          :latLngs="polygon.latLngs" />
      </l-feature-group>

      <l-control class="predefined-areas-control">
        <p @click="showSelectAreaModal">Show Saved Locations</p>
      </l-control>

      <l-control position="bottomleft">
        <!--<p v-for="circle in circles">{{ circle.center }}</p>-->
      </l-control>
    </l-map>

  </span>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LMarker,
  LCircleMarker,
  LIcon,
  LCircle,
  LPolygon,
  LFeatureGroup,
  LControl,
} from "vue2-leaflet";
import { latLng, icon, latLngBounds } from "leaflet";
import LControlFullscreen from "vue2-leaflet-fullscreen";
// import LDraw from "leaflet-draw";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LCircleMarker,
    LIcon,
    LCircle,
    LPolygon,
    LFeatureGroup,
    LControl,
    LControlFullscreen,
  },
  data() {
    return {
      url: "https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=AISaRizWH7HJeb4c7WSp",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 9,
      center: latLng(5.589874625218994, 117.8461903744057),
      icon: icon({
        iconUrl: "./images/vendor/leaflet/dist/location2.png",
        iconSize: [32, 32],
        // iconAnchor: [16, 37]
      }),
      markerLatLng: [
        [5.412886233609388, 118.036962098006],
        [5.41336687556735, 118.03792769716487],
      ], //118.03759950624499

      mapOptions: {
        // wheelDebounceTime: 500, // set a high value for wheel debounce time
        // wheelPxPerZoomLevel: 10000, // set a high value for pixels per zoom level
        scrollWheelZoom: false, //disable mouse scrolling - prevent mistakes
      },

      searchObservables: [], //capture the observable when the search was made

      colorArray: [
        "#1abc9c",
        "#3498db",
        "#e67e22",
        "#9b59b6",
        "#34495e",
        "#e74c3c",
        "#f1c40f",
        "#ff5252",
        "#16a085",
        "#27ae60",
        "#2980b9",
        "#8e44ad",
        "#2c3e50",
        "#2ecc71",
        "#f39c12",
        "#d35400",
        "#c0392b",
        "#7f8c8d",
        "#079992",
        "#78e08f",
        "#706fd3",
      ],
      selectedArea: -1,
      borderColor: "#FFFFFF",

      // circles: []
    };
  },
  created() {
    this.$root.$on("selectPredifinedMapAreas", (indexes) =>
      this.setSelectedapAreas(indexes)
    );
  },
  methods: {
    /**
     *
     * source: https://stackoverflow.com/questions/59376525/how-to-color-vue2-leaflet-markers-dynamically
     * source2: https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
     **/
    getIcon(item) {
      // console.log("getIcon(item)", item);
      // ${item.color};
      const myCustomColour = item.color; //'#583470'
      const myBorderColour = this.LightenDarkenColor(myCustomColour, -30);

      //     const markerHtmlStyles = `
      // background-color: ${myCustomColour};
      // width: 2rem;
      // height: 2rem;
      // display: block;
      // left: -1.5rem;
      // top: -1.5rem;
      // position: relative;
      // border-radius: 3rem 3rem 0;
      // transform: rotate(45deg);
      // border: 1px solid ${myBorderColour}`;

      const markerHtmlStyles =
        `background-color: ${myCustomColour};
  width: 1.5rem;
  height: 1.5rem;
  display: block;
  position: relative;
  border-radius: 50%;
  border: 0.2rem solid rgba(255,255,255,0.5)`;

      const icon = L.divIcon({
        className: "my-custom-pin",
        // iconAnchor: [0, 24],
        // labelAnchor: [-6, 0],
        // popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`,
      });

      return icon;
    },
    /**
     *  Prepare lnglat to polygon filter. (Convert it from dict to array)
     *  Before:
     *  [{ "lat": 5.895135372208802, "lng": 118.04931007325649 }, { "lat": 5.712063059836936, "lng": 117.65969038009645 }]
     *  After:
     *  [[5.895135372208802, 118.04931007325649 ], [5.712063059836936, 117.65969038009645 ]]
     *
     * @param latlngs make sure it is formatted like [{"lat":123, "lng":123}, {"lat":123, "lng":123}]
     * @returns {*[]}
     */
    showSelectAreaModal() {
      $("#selectAreaModal").modal("show");
    },
    setSelectedapAreas(indexes) {
      for (let i = 0; i < indexes.length; i++) {
        const selectedItem = this.mapAreas[indexes[i]]; //this.$store.state.settings.predifinedMapAreas[indexes[i]];

        console.log("indexes[i]", indexes[i]);

        let tempOperator = selectedItem.operator;
        if (this.circles.length > 0) {
          tempOperator = this.circles[0].operator;
        } else if (this.polygons.length > 0) {
          tempOperator = this.polygons[0].operator;
        }

        if (selectedItem.type == "nearby") {
          let circle = {
            type: selectedItem.type,
            center: selectedItem.center,
            radius: selectedItem.radius,
            operator: tempOperator,
            distance: (selectedItem.radius / 1000).toFixed(2),
            color:
              this.colorArray[
              (this.circles.length + this.polygons.length) %
              this.colorArray.length
              ], //'#0000FF',
            id: "circle_" + new Date().getTime(), // id for the reference too.
            include: {},
          };

          //   this.center= latLng(selectedItem.center.lat, selectedItem.center.lng);

          for (let i = 0; i < this.observables.length; i++) {
            circle.include[this.observables[i].uri] = true;
            //console.log("circle", this.observables[i].p, circle.include[this.observables[i].p])
          }

          //   this.$refs.map.mapObject.panTo(latLng(selectedItem.center.lat, selectedItem.center.lng));

          this.circles.push(circle);

          const thisComponent = this;
          setTimeout(function () {
            // console.log("test", thisComponent.$refs[circle.id][0].mapObject);
            thisComponent.$refs.map.mapObject.flyToBounds(
              thisComponent.$refs[circle.id][0].mapObject
            );
          }, 1);
        } else if (selectedItem.type == "within") {
          let polygon = {
            type: selectedItem.type,
            latLngs: selectedItem.latLngs,
            // radius: e.layer._mRadius,
            operator: tempOperator, //"UNION",
            // distance: (e.layer._mRadius / 1000).toFixed(2),
            color:
              this.colorArray[
              (this.circles.length + this.polygons.length) %
              this.colorArray.length
              ], //'#0000FF',
            id: "polygon_" + new Date().getTime(), // id for the reference too.
            include: {},
          };

          for (let i = 0; i < this.observables.length; i++) {
            polygon.include[this.observables[i].uri] = true;
            //console.log("polygon", this.observables[i].p, polygon.include[this.observables[i].p])
          }

          //   this.$refs.map.mapObject.panTo(latLng(selectedItem.latLngs[0][0], selectedItem.latLngs[0][1]));
          this.$refs.map.mapObject.flyToBounds(selectedItem.latLngs);

          this.polygons.push(polygon);
        }
      }
    },
    insertMapFilter() {
      //   this.settingsEndpointURI = this.$refs.settingsEndpointURI.value;
      //   this.settingsSensors = this.$refs.settingsSensors.value;
      // this.settingsPredicatesSearchTemplate = this.$refs.settingsPredicatesSearchTemplate.value;

      if (this.selectedArea == -1) {
        window.alert("Please select an option");
      } else {
        //const selectedItem =
        //this.$store.state.settings.predifinedMapAreas[this.selectedArea];

        this.setSelectedapAreas([this.selectedArea]);

        // let tempOperator = selectedItem.operator;
        // if (this.circles.length > 0) {
        //   tempOperator = this.circles[0].operator;
        // } else if (this.polygons.length > 0) {
        //   tempOperator = this.polygons[0].operator;
        // }

        // if (selectedItem.type == "nearby") {
        //   let circle = {
        //     type: selectedItem.type,
        //     center: selectedItem.center,
        //     radius: selectedItem.radius,
        //     operator: tempOperator,
        //     distance: (selectedItem.radius / 1000).toFixed(2),
        //     color:
        //       this.colorArray[
        //         (this.circles.length + this.polygons.length) %
        //           this.colorArray.length
        //       ], //'#0000FF',
        //     id: "circle_" + new Date().getTime(), // id for the reference too.
        //     include: {},
        //   };

        //   this.center= latLng(selectedItem.center.lat, selectedItem.center.lng);

        //   for (let i = 0; i < this.observables.length; i++) {
        //     circle.include[this.observables[i].p] = true;
        //     //console.log("circle", this.observables[i].p, circle.include[this.observables[i].p])
        //   }

        //   //   this.$refs.map.mapObject.panTo(latLng(selectedItem.center.lat, selectedItem.center.lng));

        //   this.circles.push(circle);

        //   const thisComponent = this;
        //   setTimeout(function () {
        //     // console.log("test", thisComponent.$refs[circle.id][0].mapObject);
        //     thisComponent.$refs.map.mapObject.flyToBounds(
        //       thisComponent.$refs[circle.id][0].mapObject
        //     );
        //   }, 1);

        // } else if (selectedItem.type == "within") {
        //   let polygon = {
        //     type: selectedItem.type,
        //     latLngs: selectedItem.latLngs,
        //     // radius: e.layer._mRadius,
        //     operator: tempOperator, //"UNION",
        //     // distance: (e.layer._mRadius / 1000).toFixed(2),
        //     color:
        //       this.colorArray[
        //         (this.circles.length + this.polygons.length) %
        //           this.colorArray.length
        //       ], //'#0000FF',
        //     id: "polygon_" + new Date().getTime(), // id for the reference too.
        //     include: {},
        //   };

        //   for (let i = 0; i < this.observables.length; i++) {
        //     polygon.include[this.observables[i].p] = true;
        //     //console.log("polygon", this.observables[i].p, polygon.include[this.observables[i].p])
        //   }

        //   //   this.$refs.map.mapObject.panTo(latLng(selectedItem.latLngs[0][0], selectedItem.latLngs[0][1]));
        //    this.$refs.map.mapObject.flyToBounds(selectedItem.latLngs);

        //   this.polygons.push(polygon);
        // }

        $("#selectAreaModal").modal("hide");
        this.selectedArea = -1;
      }
    },
    cancelMapAreaModal() {
      $("#selectAreaModal").modal("hide");
      this.selectedArea = -1;
      //this.$refs.settingsEndpointURI.value = this.settingsEndpointURI;
      //this.$refs.settingsSensors.value = this.settingsSensors;
      // this.$refs.settingsPredicatesSearchTemplate.value = this.settingsPredicatesSearchTemplate;
    },

    preparePolygonLnglat: function (latlngs) {
      let convLatlngs = [];
      latlngs.forEach(function (item) {
        convLatlngs.push(Object.values(item));
      });
      convLatlngs.push(convLatlngs[0]); //add first lnglat to the end.

      return convLatlngs;
    },
  },
  mounted() {
    this.$nextTick(() => {
      const map = this.$refs.map.mapObject;
      //const editableLayers = new window.L.FeatureGroup().addTo(map);
      const drawControl = new window.L.Control.Draw({
        position: "topright",
        draw: {
          polyline: false,
          polygon: true,
          rectangle: false,
          circle: {
            allowIntersection: false,
            showArea: true,
          },
          marker: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: this.$refs.featureG.mapObject,
        },
      });

      map.addControl(drawControl);

      map.on(window.L.Draw.Event.CREATED, (e) => {
        // const type = e.layerType;
        console.log("created", e.layerType);
        const layer = e.layer;
        //console.log(layer);

        let tempOperator = "UNION";
        if (this.circles.length > 0) {
          tempOperator = this.circles[0].operator;
        } else if (this.polygons.length > 0) {
          tempOperator = this.polygons[0].operator;
        }

        if (e.layerType == "circle") {
          let circle = {
            type: "nearby",
            center: e.layer._latlng,
            radius: e.layer._mRadius,
            operator: tempOperator,
            distance: (e.layer._mRadius / 1000).toFixed(2),
            color:
              this.colorArray[
              (this.circles.length + this.polygons.length) %
              this.colorArray.length
              ], //'#0000FF',
            id: "circle_" + new Date().getTime(), // id for the reference too.
            include: {},
          };

          for (let i = 0; i < this.observables.length; i++) {
            circle.include[this.observables[i].uri] = true;
            //console.log("circle", this.observables[i].p, circle.include[this.observables[i].p])
          }

          this.circles.push(circle);
        } else if (e.layerType == "polygon") {
          console.log("polygon is here", e);

          // let convLatlngs = [];
          // e.layer._latlngs[0].forEach(function(item) {
          //     convLatlngs.push(Object.values(item));
          // });
          // convLatlngs.push(convLatlngs[0]);

          let polygon = {
            type: "within",
            latLngs: this.preparePolygonLnglat(e.layer._latlngs[0]),
            // radius: e.layer._mRadius,
            operator: tempOperator, //"UNION",
            // distance: (e.layer._mRadius / 1000).toFixed(2),
            color:
              this.colorArray[
              (this.circles.length + this.polygons.length) %
              this.colorArray.length
              ], //'#0000FF',
            id: "polygon_" + new Date().getTime(), // id for the reference too.
            include: {},
          };

          for (let i = 0; i < this.observables.length; i++) {
            polygon.include[this.observables[i].uri] = true;
            //console.log("polygon", this.observables[i].p, polygon.include[this.observables[i].p])
          }

          this.polygons.push(polygon);
        }

        //this.shapes.push(layer);
        // Do whatever else you need to. (save to db, add to map etc)
        //editableLayers.addLayer(layer);
      });

      //on draw editing event
      map.on(window.L.Draw.Event.EDITED, (e) => {
        console.log("EDITED");
        const editedLayer = e.layers._layers; //get all edited layers.
        for (let y = 0; y < this.circles.length; y++) {
          const [el] = this.$refs[this.circles[y].id]; //get the reference for that circle
          if (editedLayer[el.mapObject._leaflet_id]) {
            //check the edited layer if it has the id if this circle.
            //We have a match, edit the center and radius of the circle.
            this.circles[y].center =
              editedLayer[el.mapObject._leaflet_id]._latlng;
            this.circles[y].radius =
              editedLayer[el.mapObject._leaflet_id]._mRadius;
          }
        }

        for (let y = 0; y < this.polygons.length; y++) {
          const [el] = this.$refs[this.polygons[y].id]; //get the reference for that polygons
          if (editedLayer[el.mapObject._leaflet_id]) {
            //check the edited layer if it has the id if this polygons.
            //We have a match, edit the center and radius of the polygons.
            this.polygons[y].latLngs = this.preparePolygonLnglat(
              editedLayer[el.mapObject._leaflet_id]._latlngs[0]
            );
          }
        }
      });

      map.on(window.L.Draw.Event.DELETED, (e) => {
        console.log("DELETED");
        const deletedLayer = e.layers._layers; //get all deleted layers.
        for (let y = this.circles.length - 1; y >= 0; y--) {
          const [el] = this.$refs[this.circles[y].id]; //get the reference for that circle
          if (deletedLayer[el.mapObject._leaflet_id]) {
            //check the deleted layer if it has the id if this circle.
            //We have a match, delete the circle.
            // delete this.circles[y];
            this.circles.splice(y, 1);
          }
        }

        for (let y = this.polygons.length - 1; y >= 0; y--) {
          const [el] = this.$refs[this.polygons[y].id]; //get the reference for that circle
          if (deletedLayer[el.mapObject._leaflet_id]) {
            //check the deleted layer if it has the id if this polygons.
            //We have a match, delete the polygons.
            // delete this.polygons[y];
            this.polygons.splice(y, 1);
          }
        }
      });
    });
  },
  watch: {
    results(newVal, oldVal) {
      this.searchObservables = this.observables;
    },
    /**
     * This is to keep track of the Map Nearby Filter -> include property.
     * It is important to use this watcher to know what observables to apply the nearby filter for.
     *
     * @param newVal new observables value.
     * @param oldVal old observables value.
     */
    observables(newVal, oldVal) {
      //this check is mandatory to prevent endless cycle
      //Also, make sure this is a delete changes.
      if (newVal !== oldVal && newVal.length < oldVal.length) {
        let removedVal; //an array contained the removed observables.
        if (newVal.length == 0 && oldVal.length == 1) {
          //No need to use pullAll when we have only one item & it was deleted.
          removedVal = oldVal;
        } else {
          //This is when we have more than two items and want to figure out what was deleted.
          removedVal = _.pullAll(oldVal, newVal);
        }

        for (let x = 0; x < this.circles.length; x++) {
          for (let y = 0; y < removedVal.length; y++) {
            if (this.circles[x].include[removedVal[y].url] !== undefined) {
              //make sure it has value to delete
              //have to use this.$delete to ensure the deletion triggers view updates.
              this.$delete(this.circles[x].include, removedVal[y].uri);
            }
          } //--end of inner for
        } //--end of outer for

        for (let x = 0; x < this.polygons.length; x++) {
          for (let y = 0; y < removedVal.length; y++) {
            if (this.polygons[x].include[removedVal[y].url] !== undefined) {
              //make sure it has value to delete
              //have to use this.$delete to ensure the deletion triggers view updates.
              this.$delete(this.polygons[x].include, removedVal[y].uri);
            }
          } //--end of inner for
        } //--end of outer for
      } else {
        //New object was added
        for (let x = 0; x < this.circles.length; x++) {
          for (let y = 0; y < newVal.length; y++) {
            if (this.circles[x].include[newVal[y].url] === undefined) {
              //make sure it has no value (avoid overwrite)
              //have to use this.$set to ensure the reactive object triggers the view updates.
              this.$set(this.circles[x].include, newVal[y].uri, true);
            }
          }
        }

        for (let x = 0; x < this.polygons.length; x++) {
          for (let y = 0; y < newVal.length; y++) {
            if (this.polygons[x].include[newVal[y].url] === undefined) {
              //make sure it has no value (avoid overwrite)
              //have to use this.$set to ensure the reactive object triggers the view updates.
              this.$set(this.polygons[x].include, newVal[y].uri, true);
            }
          }
        }
      }
    },
  },
  computed: {
    mapAreas() {
      //main json that represent the examples options
      return this.$store.getters.getMapAreas;
    },
    results() {
      return this.$store.getters.getResult;
    },
    circles: {
      set(value) {
        this.$store.commit("setMapNearbyFilters", value);
      },
      get() {
        return this.$store.getters.getMapNearbyFilters;
      },
    },
    polygons: {
      set(value) {
        this.$store.commit("setMapWithinFilters", value);
      },
      get() {
        return this.$store.getters.getMapWithinFilters;
      },
    },
    observables: {
      get() {
        return this.$store.state.coreStore.observables;
      },
      set(value) {
        this.$store.commit("setObservables", value);
      },
    },
    // queryResult:{
    //     set(value){
    //         this.$store.commit('setResult', value);
    //     },
    //     get(){
    //         return this.$store.getters.getResult;
    //     }
    // },

    locations() {
      let locations = [];
      let lat = undefined;
      let long = undefined;
      const thisComponent = this;
      let listOfIdKeys = [];

      if (thisComponent.searchObservables.length > 1) {
        for (let i = 0; i < thisComponent.searchObservables.length; i++) {
          if (thisComponent.searchObservables[i].s.trim().startsWith("?")) {
            listOfIdKeys.push(
              thisComponent.searchObservables[i].s.trim().substring(1)
            );
          } else if (
            thisComponent.searchObservables[i].uri.trim().startsWith("?")
          ) {
            listOfIdKeys.push(
              thisComponent.searchObservables[i].uri.trim().substring(1)
            );
          } else if (
            thisComponent.searchObservables[i].o.trim().startsWith("?")
          ) {
            listOfIdKeys.push(
              thisComponent.searchObservables[i].o.trim().substring(1)
            );
          } else {
            listOfIdKeys.push("");
          }
        }
      }

      if (
        this.$store.getters.getResult &&
        this.$store.getters.getResult.head &&
        this.$store.getters.getResult.head.vars
      ) {
        for (
          let i = 0;
          i < this.$store.getters.getResult.head.vars.length;
          i++
        ) {
          if (
            this.$store.getters.getResult.head.vars[i]
              .toLowerCase()
              .includes("lat")
          ) {
            lat = this.$store.getters.getResult.head.vars[i];
          } else if (
            this.$store.getters.getResult.head.vars[i]
              .toLowerCase()
              .includes("long")
          ) {
            long = this.$store.getters.getResult.head.vars[i];
          }
        }
      }

      if (
        lat &&
        long &&
        this.$store.getters.getResult &&
        this.$store.getters.getResult.results &&
        this.$store.getters.getResult.results.bindings
      ) {
        //console.log("lat:", lat," long:", long, "test:",this.$store.getters.getResult.results.bindings[0][lat].value);
        for (
          let i = 0;
          i < this.$store.getters.getResult.results.bindings.length;
          i++
        ) {
          if (
            this.$store.getters.getResult.results.bindings[i][lat] &&
            this.$store.getters.getResult.results.bindings[i][long]
          ) {
            // locations.push(
            //   latLng(
            //     this.$store.getters.getResult.results.bindings[i][lat].value,
            //     this.$store.getters.getResult.results.bindings[i][long].value
            //   )
            // );

            if (thisComponent.searchObservables.length > 1) {
              for (let x = 0; x < thisComponent.searchObservables.length; x++) {
                if (
                  this.$store.getters.getResult.results.bindings[i][
                  listOfIdKeys[x]
                  ]
                ) {
                  locations.push({
                    latLng: latLng(
                      this.$store.getters.getResult.results.bindings[i][lat]
                        .value,
                      this.$store.getters.getResult.results.bindings[i][long]
                        .value
                    ),
                    color: thisComponent.searchObservables[x].color,
                  });
                }
              }
            } else {
              locations.push({
                latLng: latLng(
                  this.$store.getters.getResult.results.bindings[i][lat].value,
                  this.$store.getters.getResult.results.bindings[i][long].value
                ),
                color:
                  thisComponent.searchObservables.length > 0
                    ? thisComponent.searchObservables[0].color
                    : "#1abc9c",
              });
            }
          }
        }
        if (locations.length > 0) {
          // this.center = locations[0];

          this.$refs.map.mapObject.fitBounds(
            locations.map((m) => {
              return [m.latLng.lat, m.latLng.lng];
            })
          );
        }
      }

      // locations.push(latLng(5.412886233609388, 118.036962098006));
      // locations.push(latLng(5.41336687556735, 118.03792769716487));
      //console.log("locations", locations);

      console.log("locations");

      return locations;
    },
  },
};
</script>


<style>
.predefined-areas-control>p {
  background: #fff;
  padding: 0.5em;
  border: 1px solid #aaa;
  border-radius: 0.1em;
  cursor: pointer;
  border-radius: 0.5em;
  box-shadow: 0px 0px 2px grey;
}
</style>
