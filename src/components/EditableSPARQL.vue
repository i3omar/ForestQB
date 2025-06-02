<template>
    <span>
        <div v-if="!editing">
            <code style="cursor: pointer;" class='text' v-on:click.self="enableEditing">{{inputVal}}</code>
<!--            <input @click="enableEditing" class="input" :value="inputVal"/>-->
        </div>
        <div v-if="editing">
            <textarea style="margin-bottom: 5px;"  @keydown.enter="saveEdit" v-model="tempValue" class="form-control form-control-sm" type="text" placeholder="Enter predicate name."></textarea>

            <button type="button" class="btn btn-outline-danger btn-sm"  @click.prevent.stop="disableEditing">Cancel</button>
            <button type="button" class="btn btn-outline-success btn-sm"  @click.prevent.stop="saveEdit">Save</button>
        </div>
    </span>
</template>

<script>
export default {
    props: ['value', 'validateRegex','validateMsg'],
    name: "EditableSPARQL",
    data: function () {
        return {

            tempValue: null,
            editing: false
        };
    },
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        enableEditing: function(){
            this.tempValue = this.inputVal;
            this.editing = true;
        },
        disableEditing: function(){
            this.tempValue = null;
            this.editing = false;
        },
        saveEdit: function(){
            // However we want to save it to the database
            if(this.validate(this.tempValue)){
                this.inputVal = this.tempValue;
                this.disableEditing();
            }else {
                if(this.validateMsg === undefined){
                    alert("Error: input is not valid.")
                }else{
                    alert(this.validateMsg);
                }
            }

        },
        /**
         *  Return true, if value is valid or no regex was passed.
         * @param val
         * @returns {boolean|*}
         */
        validate: function(val){
            if (this.validateRegex === undefined){
                return true;
            }
            const re = new RegExp(this.validateRegex, "i");

            console.log("validate", re, val, re.test(val));

            return re.test(val);
        }
    }
}
</script>

<style scoped>
textarea {height: 400px; }
</style>
