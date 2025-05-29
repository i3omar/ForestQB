<template>
    <div class="col-lg-4 col-md-6 align-items-center">
    <select class="js-filter-picker" style="width: 100%"  :id="hash" >
        <option></option>
        <option v-for="option in myOptions" :value="option.id"  :title="option.title">{{ option.text }}</option>
    </select>
    </div>
</template>

<script>
//style="min-width: 160px; display: inline;"
//:key="option.id"
//option ==> {"text":"contain","id":"select1","title":"The entity should contain this text."}

export default {
    name: "Select2",
    props:["value","options", "datatype"],
    data: function (){
        return {
            key: "",
            hash: new Date().getTime()
        }
    },
    computed:{
        myOptions(){ //the options for the list.
            let temp = []; //the options list

            //-- if it does not have a datatype or value of the datatype, stop.
            if(!this.datatype || !this.datatype.value ){
                return  temp;
            }//-- end if

            const substring = reduceUri(this.datatype.value); //reduce the uri to the exact type.

            for(let i =0; i<this.options.length; i++){
                if(this.datatype){ //this.options[i].datatype.includes(reduceUri(this.datatype.value))
                    const match = this.options[i].datatype.find(element => {
                        if (element.toLowerCase() == substring) {
                            //console.log("substring:",substring," - element:", element);
                            return true;
                        }
                    });
                    if (match !== undefined) { // array contains substring match
                        temp.push(this.options[i]);
                    }
                }
            }//--end for loop

            return temp;
        },
        selectedFilter: {
            get: function () {
                return this.value;
            },
            set: function (newValue) {
                this.$emit('input', newValue);
            }
        }
    },

    mounted() {
        $('#'+this.hash).select2({
            placeholder: 'Select an option',
            // data: optionsData['init'],
            templateResult: formatOption,
            theme: "classic"
        });

        $('#'+this.hash).on('select2:select', this.key, function (e) {
            var data = e.params.data;
            //console.log("select2:select =>",data.id);
            this.selectedFilter = {text:data.text, id:data.id};
        }.bind(this));

        // if this was manually modified will be reflected on selection.
        // This is for the preselected examples.
        if(this.selectedFilter != null){
            $('#'+this.hash).val(this.selectedFilter.id); // Select the option with a value of the id
            $('#'+this.hash).trigger('change'); // Notify any JS components that the value changed
        }
    },
    methods:{
        handleSelect(e){
            console.log("handleSelect");
           // this.value = e.target.value;
        }
    }

}

/**
 * To add a custom format options.
 * @param option
 * @returns {*}
 */
function formatOption(option) {
    var $option = "";
    console.log("formatOption", option);
    if (option.title) {
        $option = $(
            '<div><strong>' + option.text + '</strong></div><div>' + option.title + '</div>'
        );
    } else {
        $option = $(
            '<span><strong>' + option.text + '</strong></span>'
        );
    }

    return $option;
};


/**
 * This function will try to guess the name based on the uri.
 *
 * @param uri uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
 * @returns string returns example: alt
 */
function reduceUri(uri) {
    //It will try to guess:
    let str = uri;
    const hashIndex = uri.lastIndexOf("#");
    const slashIndex = uri.lastIndexOf("/");

    if (hashIndex > -1 && hashIndex > slashIndex) {
        str = str.substring(hashIndex + 1, str.length);
    } else if (uri.lastIndexOf("/") > -1) {
        str = str.substring(slashIndex + 1, str.length);
    }



    return str.toLowerCase();
} // ----- end of reduceUri
</script>

<style scoped>


</style>
