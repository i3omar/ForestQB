<template>
    <div v-if="mapNearbyFilters.length > 0 || mapWithinFilters.length > 0" class="row d-flex justify-content-center mt-100">

        <div class="col-lg-12 pt-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Map Filters:</h5>
                    <div v-if="mapNearbyFilters.length+mapWithinFilters.length > 1" class="row">
                        <div class="col-auto">
                            <p>
                                The relation between the filters are:
                            </p>
                        </div>
                        <div v-if="mapNearbyFilters.length>0" class="col-auto" style="margin-bottom: 20px;">
                            <select v-model="mapNearbyFilters[0].operator" class="form-select form-select-sm" @change="operatorChanged($event.target.value)">
                                <option>UNION</option>
                                <option>INTERSECT</option>
                            </select>
                        </div>

                        <div v-else class="col-auto" style="margin-bottom: 20px;">
                            <select v-model="mapWithinFilters[0].operator" class="form-select form-select-sm" @change="operatorChanged($event.target.value)">
                                <option>UNION</option>
                                <option>INTERSECT</option>
                            </select>
                        </div>

                    </div>

<!--                    <div v-else-if="mapWithinFilters.length > 1" class="row">-->
<!--                        <div class="col-auto">-->
<!--                            <p>-->
<!--                                The relation between the filters are:-->
<!--                            </p>-->
<!--                        </div>-->
<!--                        <div class="col-auto" style="margin-bottom: 20px;">-->
<!--                            <select v-model="mapWithinFilters[0].operator" class="form-select form-select-sm" @change="operatorChanged($event.target.value)">-->
<!--                                <option>UNION</option>-->
<!--                                <option>INTERSECT</option>-->
<!--                            </select>-->
<!--                        </div>-->

<!--                    </div>-->


                    <div v-for="(item, index) in mapNearbyFilters" class="row g-3" style="margin-bottom: 10px;">
<!--                        <span v-if="item.type == 'nearby'">-->
                        <div class="col-auto" style="min-width: 5em;">
                            <label>Circle Filter {{ index + 1 }}: </label>

                        </div>
                        <div class="col-4 col-md-2">
                            <input :id="'inputLat'+index" v-model="item.center.lat" class="form-control form-control-sm"
                                   placeholder="latitude" step="0.000001" type="number">
                        </div>
                        <div class="col-4 col-md-2">
                            <input :id="'inputLong'+index" v-model="item.center.lng"
                                   class="form-control form-control-sm"
                                   placeholder="longitude" step="0.000001" type="number">
                        </div>
                        <div class="col-auto d-md-none"></div>
                        <div class="col-2 d-md-none"></div>
                        <div class="col-4 col-md-2">
                            <div class="input-group input-group-sm">

                                <input :id="'inputRadius'+index" :value="distance(index)"
                                       class="form-control form-control-sm" placeholder="Radius in Kilometer"
                                       type="number" @change="setDistance(index, $event)">
                                <span class="input-group-text">KM</span>
                            </div>
                        </div>
                        <div class="col-2 col-md-1">
                            <!--                            <input :id="'inputColor'+index" class="form-control form-control-sm" v-model="item.color" placeholder="colour" type="text">-->
                            <input :id="'inputColor'+index" v-model="item.color" class="form-control form-control-sm"
                                   placeholder="colour" type="color">
                        </div>

<!--                            </span>-->

<!--                        <div v-for="(item, index) in mapWithinFilters" class="row g-3" style="margin-bottom: 10px;">-->
<!--                            {{item}}-->
<!--                        </div>-->



                    </div>

                    <div v-for="(item, index) in mapWithinFilters" class="row g-3" style="margin-bottom: 10px;">

                        <div class="col-auto" style="min-width: 5em;">
                            <label>Polygon Filter {{ index + 1 }}: </label>

                        </div>

                        <div class="col-auto">
                            <div class="dropdown">
                                <button class="btn btn-secondary btn-sm btn-xs dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    Coordinates
                                </button>
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><a class="dropdown-item">[Latitude, Longitude]</a></li>
                                    <li v-for="(item, index) in item.latLngs">
                                        <a class="dropdown-item">{{ item }}</a>
                                    </li>
<!--    <li><a class="dropdown-item" href="#">Something else here</a></li>-->
                                </ul>
                            </div>
                        </div>

<!--                        <div class="col-auto d-md-none"></div>-->
<!--                        <div class="col-2 d-md-none"></div>-->

                        <div class="col-2 col-md-1">
                            <input :id="'inputColor'+index" v-model="item.color" class="form-control form-control-sm"
                                   placeholder="colour" type="color">
                        </div>



                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MapFilterComponent",
    data() {
        return {};

    },
    computed: {
        mapNearbyFilters: {
            set(value) {
                this.$store.commit('setMapNearbyFilters', value);
            },
            get() {
                return this.$store.getters.getMapNearbyFilters;
            }
        },
        distance: {
            get() {
                //1000 to convert it from m to km
                return index => (this.$store.getters.getMapNearbyFilters[index].radius / 1000).toFixed(2);
            }
        },
        mapWithinFilters: {
            set(value) {
                this.$store.commit('setMapWithinFilters', value);
            },
            get() {
                return this.$store.getters.getMapWithinFilters;
            }
        },
    },
    methods: {
        setDistance: function (index, e) {
            let radius = parseFloat(e.target.value) * 1000; //from km to m
            this.$store.commit('setMapNearbyFilterRadius', {index, radius});
        },
        operatorChanged(value){
            for(let i=0; i<this.mapNearbyFilters.length; i++){
                this.mapNearbyFilters[i].operator = value;
            }

            for(let i=0; i<this.mapWithinFilters.length; i++){
                this.mapWithinFilters[i].operator = value;
            }

        }
    }


}
</script>

<style scoped>
.btn-xs {
    padding: .4rem;
    font-size: .775rem;
    line-height: .5;
    border-radius: .2rem;
}
.dropdown-menu {
    max-height: 280px;
    overflow-y: auto;
}
</style>
