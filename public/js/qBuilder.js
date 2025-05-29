var qb = new QueryBuilder();


$("#showHideBtn").click(function (e) {
    if ($('#collapseSettings:visible').length == 0) {
        $("#collapseSettings").slideDown();
        $(this).html("Hide Advanced Settings");
    } else {
        $("#collapseSettings").slideUp();
        $(this).html("Show Advanced Settings");
    }
});

/**
 * Start Searching
 */
$("#searchButton").click(function (e) {
    qb.getSparql();
});


////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Map Section ////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
var mymap = L.map('mapid').setView([5.414202580762663, 118.03759950624499], 15);

L.tileLayer('https://api.maptiler.com/maps/outdoor/{z}/{x}/{y}.png?key=AISaRizWH7HJeb4c7WSp', {
    attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

///----------------------- End of Map Section -------------------------------------------///
////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Select (Dropdown) Section //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    const selectElement = $('#observableSelect');

    for (let i = 0; i < observableData.length; i++) {
        let s = "?s" + (i + 1);
        let p = observableData[i]["p"];
        let o = "?o" + (i + 1);
        let title = observableData[i]["title"];
        let text = observableData[i]["text"];


        const option = qb.loadTemplate(qb.templates.templateObservableOption, {
            "%s%": s,
            "%p%": p,
            "%o%": o,
            "%t%": title,
            "%text%": text
        });

        selectElement.append(option);
    }


    selectElement.select2({
        // closeOnSelect: false
        // selectionAdapter: "SingleSelection",

        // data: observableData

    });


    //select2.on("select2:open", function (e) { log("select2:open", e); });
    //select2.on("select2:close", function (e) { log("select2:close", e); });
    selectElement.on("select2:select", function (e) {
        log("select2:select", e);
    });
    selectElement.on("select2:unselect", function (e) {
        log("select2:unselect", e);
    });

    //select2.on("select2:change", function (e) { log("change", e); });


});

function log(name, evt) {
    if (!evt) {
        var args = "{}";
    } else {
        var args = JSON.stringify(evt.params, function (key, value) {
            if (value && value.nodeName) return "[DOM node]";
            if (value instanceof $.Event) return "[$.Event]";
            return value;
        });
    }
    //console.log(name + " -> " + args );
    var x = $('#observableSelect').find(':selected')
    //console.log(x[0].attributes['data-object'].nodeValue);
    var selections = [];
    for (i = 0; i < x.length; i++) {
        selections[i] = {
            subject: x[i].attributes['data-subject'].nodeValue,
            predicate: x[i].attributes['data-predicate'].nodeValue,
            object: x[i].attributes['data-object'].nodeValue
        }
    }

    //console.log(selections);
    qb.queryData.animals = selections;

    qb.output(JSON.stringify(qb.queryData));
    //alert("output");
    //console.log(JSON.stringify(qb.queryData));


}

///----------------------- End of Select (Dropdown) Section -----------------------------///
////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Date Filter Section ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

$(function () {

    var start = moment().subtract(29, 'days');
    var end = moment();

    /**
     * This function will be triggered once the date get changed.
     * @param start
     * @param end
     */
    function cb(start, end) {
        $('#dateFilter span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));


        qb.queryData.dateFilter.start = start.format('MMMM D, YYYY');
        qb.queryData.dateFilter.end = end.format('MMMM D, YYYY');

        //console.log(qb.queryData);
    }

    $('#dateFilter').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],

            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'Last 6 Months': [moment().subtract(6, 'month').startOf('month'), moment()],
            'This Year': [moment().startOf('year'), moment().endOf('year')],
            'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }
    }, cb);

    cb(start, end);

});

///----------------------- End of Date Filter Section -----------------------------------///
////////////////////////////////////////////////////////////////////////////////////////////

// var dataJson = {
//     dateFilter: {start: "", end: ""},
//     observables: []
// };

$(document).ready(function () {

    /*
    *
    * var startRDate = 2010;
var endRDate = 2021;
var yearArrLength = (endRDate - startRDate) + 1;
var yearsArr = [];

for (var i = 0; i != yearArrLength; i++) {
    yearsArr.push(startRDate + i)
}
//setting up the slider
$("#yearSlider").slider({
    // min: startRDate, max: endRDate,
    value: [startRDate, endRDate],
    ticks: yearsArr,
    ticks_labels: yearsArr,
    lock_to_ticks: true
});
    * */
    // var multipleCancelButton = new Choices('#choices-multiple-remove-button', {
    //     removeItemButton: true,
    //     maxItemCount:5,
    //     searchResultLimit:5,
    //     renderChoiceLimit:5
    // });


});


function QueryBuilder(options) {

    //Defaults
    var settings = $.extend({


        // Ajax Settings
        apiPath: './api/',
        sparqlBoxID: '#sparqlDataContainer',
        spinnerHTML: '<i class="fa fa-cog fa-spin fa-3x fa-fw"></i>',
        errorHTML: '<i class="fa fa-cog fa-exclamation-triangle fa-3x fa-fw"></i><p>Failed to load data!</p>',
        //to remove it
        spinnerId: '.fa-spin',
        filterPanelId: 'filterPanel',

        observableUniqueKey: "predicate",//this indicate the important unique part between the triple pattern.
        autoGeneratedID: 1000, //Starting number
        SelectablePredicatesSuffix: "_Selectable",
        SelectablePredicatesContainerSuffix: "_Container",

    }, options);

    //global this - to access it easily from everywhere here.
    const thisClass = this; //never remove it.

    /**
     * This function will increment and return the an id to be used when needed.
     * The initial value is located in settings.autoGeneratedID.
     *
     * @param incrementFirst is true, will increment first, else will return the current value.
     * @returns {number}
     */
    this.getAutoGeneratedID = function (incrementFirst = false) {
        if (incrementFirst) {
            settings.autoGeneratedID++;
        }
        return settings.autoGeneratedID;
    }

    /**
     * This array contains the the html elements that respond to the selected options from the
     * advance settings in the query builder UI. The type is typically set on the server, the
     * frontend will present the coorect element based on this array.
     *
     * @type {{select: {html: string}, text: {html: string}}}
     */
    this.selectedDataFields = {
        text: {
            html: "&nbsp;<input class=\"form-control form-control-sm\" type=\"text\" placeholder=\"Write your input.\">"
        },
        select: {
            html: "&nbsp;<select id=\"inputState\" class=\"form-control form-control-sm\">\n" +
                "        <option selected>Choose options</option>\n" +
                "        <option>Some option1</option>\n" +
                "        <option>Some option2</option>\n" +
                "      </select>"
        }
    };


    /**
     * This function reads the selected element data that was retrived from the server
     * and get the correct html for it from selectedDataFields.
     *
     * @param selectedOptionData
     * @returns {*|string|string|RegExp}
     */
    this.getSelectedDataField = function (selectedOptionData) {

        let curHtml = this.selectedDataFields[selectedOptionData.type].html;

        //alert(curHtml);

        return curHtml;
    }


    //query data array
    this.queryData = {
        dateFilter: {
            // predicate: "w:created",
            // startDate: '"2014-05-23T10:20:13+05:30"^^xsd:dateTime',
            // endDate: '"2015-05-23T10:20:13+05:30"^^xsd:dateTime'
        },
        observablesKeys: [],
        /**
         * Can be used to get all observable elements. BUT for set, use animals(newArr) please!
         * EX: observables":[{"subject":"eleph1","predicate":"?p1","object":"?o1"}]
         * @returns {[]}
         */
        observables: [],
        filters: {},

        observablesListener: function (oldArr, newArr) {
        },
        setPredicateFor: function (observablesKey, predicate, predicateName, selectable=true) {
        },
        setFilterFor: function (observablesKey, predicate, filter, filterValue) { //needs to be alterned to include predicates
        },
        clearFilters: function () {
            Object.keys(this.filters).forEach(function (key) {
                thisClass.queryData.filters[key] = {};
            });
        },


        /**
         * Update the animals list
         * @param newArr array with new animals
         */
        set animals(newArr) {
            this.observablesListener(this.observables, newArr);
            this.observables = newArr;
        },

        /**
         * Get all observable elements.
         * EX: observables":[{"subject":"eleph1","predicate":"?p1","object":"?o1"}]
         * @returns {[]}
         */
        // get animals() {
        //     return this.observables;
        // }
    }

    this.queryData.setPredicateFor = function (observablesKey, predicate, predicateName, selectable=true) {
        console.log("setPredicateFor:", observablesKey, predicate, selectable);
        const observable = qb.queryData.filters[observablesKey];
        // observable[predicate]["isSelectable"] = selectable;
        observable[predicate] = {
            ["isSelectable"]: selectable,
            ["predicateName"]: '?'+predicateName
        };

        //console.log(qb.filters)
        //console.log(JSON.stringify(qb.queryData));

        qb.output(JSON.stringify(qb.queryData));

    }

    /**
     *
     * EX: "filters":{"eleph1":{
        dateFilter: {
            predicate: "w:created",
            startDate: '"2014-05-23T10:20:13+05:30"^^xsd:dateTime',
            endDate: '"2015-05-23T10:20:13+05:30"^^xsd:dateTime'
        },

        }}
     *
     *
     */

    this.queryData.setFilterFor = function (observablesKey, predicate, filter, filterValue) {
        console.log("setFilterFor:", observablesKey, predicate, filter, filterValue);
        const observable = qb.queryData.filters[observablesKey];
        observable[filter][predicate] = filterValue;

        //console.log(qb.filters)
        //console.log(JSON.stringify(qb.queryData));

        qb.output(JSON.stringify(qb.queryData));

    }

    this.processPredicateData = function (){

        //get all animals - the ids
        const animalKeys = thisClass.extractItemsWithKey(this.queryData.animals);

        //SelectablePredicatesSuffix --

        for(let x = 0; x<animalKeys.length; x++) {

            //console.log("animalKeys[i]", animalKeys[x], '#' + animalKeys[x] + settings.SelectablePredicatesSuffix);

            //const selectedPreData = $('#' + animalKeys[x] + settings.SelectablePredicatesSuffix).select2('data');

             const selectableSelect = document.getElementById(animalKeys[x] + settings.SelectablePredicatesSuffix);
            const selectedPreData = $(selectableSelect).select2('data');

            //alert(typeof selectedPreData);

            for (let y = 0; y < selectedPreData.length; y++) {
                console.log("selectedPreData[y]", selectedPreData[y])
                thisClass.queryData.setPredicateFor(animalKeys[x], selectedPreData[y].element.id, selectedPreData[y].text, true);
            }

        }

    }

    this.processFilterData = function () {

        //get all animals - the ids for the fieldset
        const animalKeys = thisClass.extractItemsWithKey(this.queryData.animals);

        //remove all data from the filter list to process new one.
        this.queryData.clearFilters();

        animalKeys.forEach(function (key) {
            const fieldset = document.getElementById(key);
            var listItems = $(fieldset).find("li");

            //console.log("listitems");
            //console.log(listItems[0].id);

            for (let i = 0; i < listItems.length; i++) {
                if (listItems[i].id) {//has an id (exclude the add btn)
                    //console.log(listItems[i].id);
                    const element = document.getElementById(listItems[i].id + "Selected");
                    if (element) {
                        const eleType = element.getAttribute("data-type");
                        const eleFilter = element.getAttribute("data-filter");
                        let filterValue = "";

                        switch (eleType) {

                            case "text":
                                filterValue = element.firstElementChild.value;
                                break;
                            default:
                                filterValue = element.firstElementChild.value;
                        }

                        //console.log(key, eleFilter, filterValue);
                        thisClass.queryData.setFilterFor(key, eleFilter, filterValue);


                    }


                }

            }


        });

    }

    /**
     * Update the animals filter panel based on the new selected input
     * @param oldArr array with the old (previous) selected input
     * @param newArr array with the new (current) selected input
     */
    this.queryData.observablesListener = function (oldArr, newArr) {
        var oldKeys = thisClass.extractItemsWithKey(oldArr);
        var newKeys = thisClass.extractItemsWithKey(newArr);

        console.log("newKeys");
        console.log(newKeys);

        this.observablesKeys = newKeys;

        var diff = $(oldKeys).not(newKeys).get()

        console.log("diff ", diff);

        for (const k in newKeys) {
            if (this.filters[newKeys[k]] == undefined) {
                this.filters[newKeys[k]] = {};
            }
        }

        for (const k in diff) {
            if (this.filters[diff[k]]) {
                delete this.filters[diff[k]];
            }
        }

        thisClass.updateFilterPanel(diff);
    };

    /**
     * Update the filter panel in the advanced settings.
     * @param diff
     */
    this.updateFilterPanel = function (diff) {
        var dataHolder = '';

        //if something deleted, remove its fieldset.
        for (const key in diff) {
            //console.log("key to delete:", key, diff[key]);
            const diffObj = document.getElementById(diff[key]);
            if (diffObj) {
                console.log("delete", diffObj);
                // $('#' + diff[key]).hide('slow').remove();

                diffObj.remove();
            }
        }

        if (Object.keys(thisClass.queryData.filters).length == 0) {
            $('#filterPanelLabel').fadeIn()
        } else {
            $('#filterPanelLabel').hide()
        }

        //see what is new and add it.
        for (const key in thisClass.queryData.filters) {
            console.log("key", key);

            const currObj = document.getElementById(key);
            if (!currObj) { //if does not exist
                const label = findElementByAttr(key).innerHTML;

                dataHolder += thisClass.loadTemplate(thisClass.templates.template1, {
                    '%id%': key,
                    '%legend%': label
                });

                // $(dataHolder).appendTo('#'+settings.filterPanelId).show('slow');
                const filterPanelObj = document.getElementById(settings.filterPanelId);
                filterPanelObj.insertAdjacentHTML('beforeend', dataHolder);

                const parentObj = document.getElementById(key + settings.SelectablePredicatesSuffix).parentNode;
                parentObj.id = this.getAutoGeneratedID(true);


                this.ajaxRequest('post', 'sparql/data/predicates/', {"uri": key}, "#" + parentObj.id).done(function (response) {


                    const selectableSelect = document.getElementById(key + settings.SelectablePredicatesSuffix);
                    const selectableTableBody = document.getElementById(key + "_Table");
                    // let dataHolder = "";
                    //
                    // dataHolder = thisClass.loadTemplate(thisClass.templates.templateSelectShowItems, {
                    //     // '%title%': json.title,
                    //     // '%description%': json.description,
                    //     // '%quote%': json.quote,
                    //     // '%quoteAuthor%': json.quoteAuthor
                    // });

                    // fieldsetObj.insertAdjacentHTML( 'afterbegin', dataHolder);//"<p>"+JSON.stringify(response)+"</p>");

                    const p = "p1";

                    let elements = "";
                    let tableRows = "";
                    for (let i = 0; i < response.length; i++) {
                        let PrNaObj = thisClass.getPredicateName(response[i][p].value);
                        if (response[i][p].value != key) {
                            elements += "<option id='" + response[i][p].value + "' title='" + PrNaObj.desc + "' selected='selected'>" + PrNaObj.name + "</option>";
                            tableRows += "<tr id='" + response[i][p].value + "_Row'><td><input class=\"form-check-input\" type=\"checkbox\" id=\"flexSwitchCheckChecked\" checked></td><td><input class=\"form-check-input\" type=\"checkbox\" id=\"flexSwitchCheckChecked\" checked></td><td>" + PrNaObj.name + "</td>" +
                                "<td><ul><li><button type=\"button\" onclick=\"qb.filterAddBtnClicked(this)\" class=\"btn btn-primary btn-xs\">Add</button></li></ul></td>" +
                                "</tr>";
                        }
                    }

                    selectableSelect.insertAdjacentHTML('beforeend', elements);
                    selectableTableBody.insertAdjacentHTML('beforeend', tableRows);

                    const selectableSelectObj = $(selectableSelect);
                    selectableSelectObj.select2({
                        placeholder: 'Select an option',
                        // data: optionsData['init'],
                        templateResult: formatOption,
                        multiple: true,
                        theme: "classic"
                    });

                    selectableSelectObj.fadeIn();


                    //fieldsetObj.insertAdjacentHTML( 'afterbegin', element);//"<p>"+JSON.stringify(response)+"</p>");
                    //var dataHolder = '';


                    // console.log(response);

                    // $(settings.sparqlBoxID).html(JSON.stringify(response));

                    //$(response).appendTo(settings.sparqlBoxID).show('slow');
                    //alert(response);
                    //ugid.fadeIn('slow');

                }); //----- end ajax


            } //----- end if
        } //----- end for loop
    }

    this.queryJson = function () {
        return JSON.stringify(this.queryData);
    }

    /**
     * Will get the unique fields name and return it as an array.
     * Mainly this is for observable (animals) keys.
     *
     * @param array an array with a dictionary inside it.
     * Example: [{"subject":"leo1","predicate":"?p2","object":"?o2"},
     *          {"subject":"monk1","predicate":"?p3","object":"?o3"}]
     *
     * @returns [] example: ["leo1","monk1"]
     */
    this.extractItemsWithKey = function (array) {
        var items = [];

        for (var i in array) {
            items.push(array[i][settings.observableUniqueKey]);
        }

        return items;
    }


    // Patterns used to color some of the page elements.
    var colorPatterns = {
        pattern1: ['#00708C', '#FF404C', '#1CA5B8', '#012C40'],
        pattern2: ['#5C4B51', '#1CA5B8', '#012C40', '#F3B562', '#FF404C'],
        pattern3: ['#00708C', '#FF404C', '#1CA5B8', '#012C40', '#5C4B51', '#03275A'],
    }

    // Templates that can be reused and filled with data to be placed in the web page.
    this.templates = {
        templateObservableOption: '<option title="%t%" data-subject="%s%" data-predicate="%p%" data-object="%o%">%text%</option>',
        template1: '<fieldset id="%id%" class="filter-border form-inline">' +
            '<legend class="filter-border">%legend%:</legend>' +
            '<div class="card" style="width: 100%;">\n' +
            '            <div class="card-body">\n' +
            '                <h5 class="card-title">Included Items</h5>\n' +
            '                <h6 class="card-subtitle mb-2 text-muted">Only select items you want to be included in the search.</h6>\n' +
            '                <select id="%id%' + settings.SelectablePredicatesSuffix + '" class="form-control form-control-sm" style="width: 100%; display: none;" aria-label="Selectable Predicates" multiple>\n' +
            '                </select>\n' +
            '            </div>\n' +
            '        </div>' +
            '<div>&nbsp;</div>'+

            '<table class="table table-hover table-striped table-sm">\n' +
            '                    <thead>\n' +
            '                        <tr>\n' +
            '                            <td style="width: 30px;">Display</td>\n' +
            '                            <td style="width: 30px;">Optional</td>\n' +
            '                            <td style="width: 150px;">Entity Name</td>\n' +
            '                            <td>Filters</td>\n' +
            '                        </tr>\n' +
            '                    </thead>\n' +
            '                    <tbody id="%id%_Table">\n' +
            '                    </tbody>\n' +
            '                </table>' +
            // '<ul><li><button type="button" onclick="qb.filterAddBtnClicked(this)" class="btn btn-primary btn-sm">Add</button></li></ul>' +

            '</fieldset>',
        template2: '<div class="row"> <div id="%F1%" class="col link courseBox clickableElement"> <h5><b>%F2%</b></h5> </div> </div> <div class="row"> <div id="%F3%" class="col link courseBox clickableElement"> <h5><b>%F4%</b></h5> </div> </div> <div class="row"> <div id="%F5%" class="col link courseBox clickableElement"> <h5><b>%F6%</b></h5> </div> </div> <div class="row"> <div id="%F7%" class="col link courseBox clickableElement"> <h5><b>%F8%</b></h5> </div> </div> <div class="row"> <div class="container col"> <div class="row"> <div id="%F9%" class="col link courseBox clickableElement"> <h5><b>%F10%</b></h5> </div> </div> </div> <div class="container col-md-1 my-auto"> <p class="text-center">OR</p> </div> <div class="container col"> <div class="row"> <div id="%F11%" class="col link courseBox clickableElement"> <h5><b>%F12%</b></h5> </div> </div> </div> </div>',
        templateFilterItem1:
            '<select id="%SelF%" class="" style="width: 200px">\n' +
            '<option></option>' +
            '</select>' +
            '<span id="%SelectedF%" data-type="" data-filter=""></span>' +
            '<a id="%DelF%" style="cursor: pointer;" class="text-decoration-none">\n' +
            '                Delete\n' +
            '                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">\n' +
            '  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>\n' +
            '  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>\n' +
            '</svg>\n' +
            '</a>',
        templateSelectShowItems: '<div class="card" style="margin: 5px;">\n' +
            '            <div class="card-body">\n' +
            '                <h5 class="card-title">Selectable Items</h5>\n' +
            '                <h6 class="card-subtitle mb-2 text-muted">Only selected items will be shown in the results.</h6>\n' +
            '\n' +
            '                <select class="form-select" aria-label="Default select example">\n' +
            '                    <option selected>Open this select menu</option>\n' +
            '                    <option value="1">One</option>\n' +
            '                    <option value="2">Two</option>\n' +
            '                    <option value="3">Three</option>\n' +
            '                </select>\n' +
            '            </div>\n' +
            '        </div>',

    }

    /**
     * When the small add button on the advanced setting get clicked, this function will handle it.
     *
     *
     * @param addBtn
     */
    this.filterAddBtnClicked = function (addBtn) {
        let autoId = this.getAutoGeneratedID(true);
        var myParentUl = this.parentWithTag(addBtn, "ul");
        li = document.createElement('li');
        li.setAttribute("class", ".filter_li")
        // select = document.createElement('select');
        // op1 = document.createElement('option');
        //
        // op1.innerHTML="contains";
        // select.appendChild(op1);
        // li.appendChild(select);
        // myParentUl.insertBefore(li, this.parentWithTag(addBtn, "li"));
        //console.log(myParentUl.tagName);

        const options = this.loadTemplate(this.templates.templateFilterItem1, {
            "%DelF%": autoId + "Delete",
            "%SelF%": autoId + "Select",
            "%SelectedF%": autoId + "Selected"
        });
        li.innerHTML = options;
        li.id = autoId;
        myParentUl.insertBefore(li, this.parentWithTag(addBtn, "li"));

        let delBtn = document.getElementById(autoId + "Delete");

        delBtn.addEventListener("click", function () {
            let dli = thisClass.parentWithTag(delBtn, "li");
            myParentUl.removeChild(dli);
        });



        $('#' + autoId + "Select").select2({
            placeholder: 'Select an option',
            data: optionsData['init'],
            templateResult: formatOption,
            theme: "classic"
        });


        $('#' + autoId + "Select").on('select2:select', function (e) {
            var data = e.params.data;

            $('#' + autoId + "Selected").attr("data-type", optionsData[data.id].type);
            $('#' + autoId + "Selected").attr("data-filter", data.text);

            //the selected option id, which is used to refer to the next option.
            //console.log(data);
            console.log($('#' + autoId + "Selected"));

            $('#' + autoId + "Selected").html(thisClass.getSelectedDataField(optionsData[data.id]));
        });

    }

    /**
     * To add a custom format options.
     * @param option
     * @returns {*}
     */
    function formatOption(option) {
        var $option = "";
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
     * Will return first parent that match with the specific tag
     * For example: this.parentWithTag(addBtn, "li")); will return first parent that is li.
     * @param elem
     * @param tagName
     * @returns Node or undefined
     */
    this.parentWithTag = function (elem, tagName) {

        var parentNode = elem.parentNode;
        //if(elem.parentNode) {
        //console.log("parentWithTag:"+elem.tagName);

        while (parentNode) {
            if (parentNode.tagName == tagName.toUpperCase()) {
                //console.log("true"+parentNode.tagName);
                return parentNode;
            } else {
                parentNode = parentNode.parentNode;
            }
        }

        // if (parentNode.tagName == tagName.toUpperCase()) {
        //     console.log("true"+parentNode.tagName);
        //     return parentNode;
        // } else {
        //     this.parentWithTag(parentNode, tagName);
        // }
        // }else{
        //     return undefined;
        // }

    }

    /**
     * This function will get the predicate name from the list if exist,
     * or will try to guess the name based on the uri.
     *
     * @param predicate uri example: http://www.w3.org/2003/01/geo/wgs84_pos#alt
     * @returns {{name: string, desc: string}}
     */
    this.getPredicateName = function (predicate) {
        if (predicatesData[predicate]) {
            if (predicatesData[predicate].name.length && predicatesData[predicate].name.length > 0) {
                return predicatesData[predicate];
            }
        }

        //If Name dont exist in the list, I will try to guess it myself:
        let str = predicate;

        if (predicate.lastIndexOf("#") > predicate.lastIndexOf("/")) {
            str = str.substring(str.lastIndexOf("#") + 1, str.length);
        } else if (predicate.lastIndexOf("/") > -1) {
            str = str.substring(str.lastIndexOf("/") + 1, str.length);
        }


        //if no name, return this:
        return {"name": str, "desc": "Description not exist."};
    } // ----- end of getPredicateName

    this.getSparql = function () {

        //this.processFilterData(); //this needs to be updated.
        this.processPredicateData();

        this.ajaxRequest('post', 'getSparql', this.queryJson(), settings.sparqlBoxID).done(function (response) {

                //var dataHolder = '';

                // dataHolder += thisClass.loadTemplate(thisClass.templates.aboutTemplate, {
                //     '%title%': json.title,
                //     '%description%': json.description,
                //     '%quote%': json.quote,
                //     '%quoteAuthor%': json.quoteAuthor
                // });
                console.log('results:',response);

                $(settings.sparqlBoxID).html(escapeHtml(JSON.stringify(response)));

                //$(response).appendTo(settings.sparqlBoxID).show('slow');
                //alert(response);
                //ugid.fadeIn('slow');
            }
        )
    }

    ///////////////  TOOLS  ///////////////

    //Alternatively, here is plain Javascript escape function
    function escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /**
     * This function is a shortcut to call the jQuery AJAX method
     * @param   {string} getPost   contains 'Get' or 'Post'
     * @param   {string} route   contains the app route like "getSparql", result in ./api/getSparql
     * @param   {object} data      contains the data that will be attached to the page
     *                             for example : {path:'/about/'}
     * @param   {string} idSpinner #parent (optional)
     * @returns {function} the AJAX method.
     */
    this.ajaxRequest = function (getPost, route, data, idSpinner) {
        return $.ajax({
            cache: false,
            async: true,
            type: getPost,
            dataType: 'json',
            url: settings.apiPath + route,
            data: data,
            beforeSend: function () {
                $(idSpinner).append(settings.spinnerHTML);
            }

        }).always(function () { //remove spinner
            $(idSpinner).find(settings.spinnerId).fadeOut(500, function () {
                $(this).remove();
            });
        }).fail(function (err) {
            console.log(err.responseText);
            $(idSpinner).html(settings.errorHTML);
        });
    }


    /**
     * This function will replace the template placeholder with the fields object data.
     * @param   {string}   template a string that contain the html with the placeholder symbols
     * @param   {object} fields   contains the fields names that will be replaced with the value
     *                            that will be replaced with. For example:
     *                                var fields = {
     *                                  "%NAME%": "Omar",
     *                                  "%AGE%": 27
     *                                };
     *
     * @returns {string} that contains the html template with all the placeholders replace with
     *                   the 'fields' object data.
     */
    this.loadTemplate = function (template, fields) {
        var temp = template.replace(/%\w+%/g, function (all) {
            return all in fields ? fields[all] : all;
        });

        return temp;
    }

    /**
     * Find first element that match the value of an attribute.
     *
     * @param attrValue
     * @param parent
     * @param dataAttrName
     * @returns {*}
     */
    function findElementByAttr(attrValue, parent = "#observableSelect", dataAttrName = "data-predicate") {
        return $(parent).find('[' + dataAttrName + '="' + attrValue + '"]')[0];
    }

    function JSON_keys(obj) {
        var keys = [];
        for (var k in obj) {
            keys.push(k);
        }
        return keys;
    }

    /**
     *
     * For example: getRandomColorPattern(['#ff0000', '#00ff00', '#0000ff'])
     * @param {Array} colorArray array that have all the wanted colors.
     * @param {number} len        [[Description]]
     * @returns {string} text after space added to it.
     */
    function getRandomColorPattern(colorArray) {
        var len = colorArray.length;
        var start = Math.floor(Math.random() * len);
        //console.log(start);
        if (start == 0) {
            start = 1;
        }

        var pattern = [];
        for (var i = 0; i < len; i++) {
            pattern[i] = colorArray[start % len];
            start++;
        }

        return pattern;
    }


    /**
     * Show element in frontend
     * @param inp
     */
    this.output = function (inner, id = "json_output") {
        document.getElementById(id).innerHTML = JSON.stringify(JSON.parse(inner), null, 2)//syntaxHighlight(inner);
    }

    /**
     * Print pretty JSON
     * @param json
     * @returns {*}
     */
    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }


}
