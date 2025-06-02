<template>
  <table class="table table-hover table-striped table-sm">
    <thead>
      <tr>
        <th scope="col" style="width: 30px">Display</th>
        <th scope="col" style="width: 30px">Optional</th>
        <th scope="col" style="width: 150px">Entity Name</th>
        <th scope="col">Filters</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in selectedPredicates" :key="item.uri">
        <td>
          <div class="form-check form-switch">
            <input
              v-model="item.isSelectable"
              class="form-check-input"
              role="switch"
              type="checkbox"
            />
          </div>
        </td>
        <td>
          <div class="form-check form-switch">
            <input
              v-model="item.isOptional"
              class="form-check-input"
              role="switch"
              type="checkbox"
            />
          </div>
        </td>
        <td>
          <!--                <div>-->
          <!--                {{ item.name }}-->
          <!--                <editable-input tag="div" placeholder="Enter content" :contenteditable="true" v-model="item.name" :disable-newline="true" @enter="enterPressed" :format-text="true" :autofocus="true" />-->

          <!--                <span class="child" @click="alert('child1 clicked')">Child1</span>-->
          <editable-input
            v-model="item.name"
            validate-regex="^[a-z0-9_]{3,20}$"
            validate-msg="Naming size is limited to 3-20 Chars. You can only use numbers, letters and underscores."
          />
          <!--            </div>-->
        </td>
        <td>
          <add-filter
            :fieldsetUri="fieldsetUri"
            :predicate="item"
            :predicates="selectedPredicates"
          />
        </td>
      </tr>
    </tbody>
    <thead v-if="this.observables.length > 1 || mapNearbyFilters.length > 0 || mapWithinFilters.length > 0">
      <tr>
        <th scope="col" style="width: 30px">Enabled</th>
        <th scope="col" colspan="3">Filter</th>
      </tr>
    </thead>
    <tfoot>
      <tr v-if="this.observables.length > 1 && this.observable.modifiers.limit">
        <td>
          <div class="form-check form-switch">
            <input
              :checked="!!this.observable.modifiers.limit.enabled"
              @change="(e) => (isChecked = e.target.checked)"
              @input="inputUpdate($event, 'enabled')"
              class="form-check-input"
              role="switch"
              type="checkbox"
            />
          </div>
        </td>
        <td colspan="3">
          <div class="row">
            <div class="col">
              Limit '{{ this.observable.text }}' Results to:
              <input
                :value="this.observable.modifiers.limit.value"
                @input="inputUpdate($event, 'value')"
                class="form-control form-select-sm"
                style="width: 100px; display: inline"
                type="number"
              />
               out of the overall result size.
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(item, index) in mapNearbyFilters" :key="item.id">
        <td>
        <div class="form-check form-switch">
                <input
                  v-model="item.include[fieldsetUri]"
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                />
              </div>
        </td>
        <td colspan="3">
          <div class="row">
            <div class="col">
              Map 'Nearby' Filter {{ index + 1 }} (Circle)
            </div>
          </div>
        </td>
      </tr>
      <tr v-for="(item, index) in mapWithinFilters" :key="item.id">
        <td><div class="form-check form-switch">
                <input
                  v-model="item.include[fieldsetUri]"
                  class="form-check-input"
                  role="switch"
                  type="checkbox"
                />
              </div></td>
        <td colspan="3">
          <div class="row">
            <div class="col">
              Map 'Within' Filter {{ index + 1 }} (Polygon)
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
import AddFilter from "./AddFilterComponent";
import EditableInput from "./EditableInput";
// import EditableInput from 'vue-contenteditable-input'

export default {
  name: "PredicatesListComponent",
  props: ["predicates", "fieldsetUri"],

  data: function () {
    return {
      predicatesSearchValue: [],
      options: [],
      checked: true,
    };
  },
  computed: {
    observables: {
      get() {
        return this.$store.state.coreStore.observables;
      },
      set(value) {
        this.$store.commit("setObservables", value);
      },
    },
    observable: {
      get() {
        const uri = this.fieldsetUri;
        return this.$store.getters.getObservable(uri);
      },
      set(value) {
        const uri = this.fieldsetUri;
        this.$store.commit("setObservable", { value, uri });
      },
    },
    selectedPredicates: {
      get() {
        const uri = this.fieldsetUri;
        return this.$store.getters.getPredicates(uri);
      },
      set(value) {
        const uri = this.fieldsetUri;
        this.$store.commit("setPredicates", { value, uri });
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
  },
  mounted() {
    // for (let i= 0; i<this.mapNearbyFilters.length; i++){
    //     if(!this.mapNearbyFilters[i].include){
    //         this.mapNearbyFilters[i].include = {}
    //     }
    //
    //     this.mapNearbyFilters[i].include[this.fieldsetUri] = true;
    //
    // }
  },
  methods: {
    enterPressed(value) {
      alert("Enter Pressed with: ", value);
    },
    inputUpdate: function (event, key) {
      let value;
      if (key == "enabled") {
        value = event.target.checked;
      } else {
        value = parseInt(event.target.value);
      }

      //console.log("inputUpdate", key, event.target.value);
      this.observable.modifiers.limit[key] = value;
    },
  },
  watch: {
    selectedPredicates() {
      // if(this.selectedPredicates && this.selectedPredicates.length>0) {
      //     //console.log("watch predicates() => ", this.predicates);
      //     if (this.selectedPredicates) {
      //         for (let i = 0; i < this.selectedPredicates.length; i++) {
      //             this.selectedPredicates[i].isSelectable = true;
      //             this.selectedPredicates[i].isOptional = false;
      //             this.selectedPredicates[i].filters = [];
      //         }
      //         if (this.selectedPredicates.length > 0) {
      //             //this.$store.commit('setPredicates', {value: this.predicates, uri: this.predicates[0].p, source:"predicates watch!"});
      //             //this.$forceUpdate();
      //         }
      //     }
      // }
    },
  },
  components: {
    AddFilter,
    EditableInput,
  },
};
</script>

<style>
/*ul {*/
/*    list-style-type: none; !* Remove bullets *!*/
/*    padding: 0; !* Remove padding *!*/
/*    margin: 0; !* Remove margins *!*/
/*}*/

/*li {*/
/*    padding: 0px 0 0px 0; !* Remove padding *!*/
/*}*/
</style>
