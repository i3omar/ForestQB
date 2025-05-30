<!--
==============================================================================
ForestQB-V1 Main Application Component
==============================================================================
Created by: OMAR MUSSA
Copyright © 2023–2025 OMAR MUSSA. All rights reserved.

This file defines the main application shell for ForestQB, an interactive
linked data query builder and sensor dashboard for spatial and semantic
exploration. 

KEY FEATURES:
  - Responsive navigation and UI controls for managing example data, 
    map filters, settings, and sensor queries.
  - Modal dialogs for saving/loading user queries and editing configuration.
  - Integration of map, search, filter, and results display using Vue.js 
    and Bootstrap.
  - Designed to support spatial sensor data workflows, including custom 
    and SOSA/SSN ontologies.
  - Modular structure: components for Leaflet map, advanced SPARQL editing,
    and chatbot assistant.

NOTES:
  - Uses Bootstrap for styling and modals.
  - All app logic, API integration, and component orchestration managed here.
  - Example data is for demonstration and testing only; extend as needed.

EXPORTS:
  - MainApp (default): Vue component representing the main dashboard shell.

==============================================================================
-->

<template>
  <div id="main-app">
    <!-- ============= Nav COMPONENT ============== -->
    <nav class="
        navbar navbar-dark
        fixed-top
        navbar-expand-md
        mb-3
        border-bottom
        box-shadow
        bg-dark
      ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">ForestQB</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="main_nav">
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                File
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li>
                  <a class="dropdown-item" href="#" @click="reset">Reset (Default)</a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#" data-bs-target="#saveDataModal" data-bs-toggle="modal">Save</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#" data-bs-target="#loadDataModal" data-bs-toggle="modal">Load
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown" v-show="displayForestQB">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                Examples
              </a>
              <ul class="dropdown-menu dropdown-menu-right">
                <li>
                  <a class="dropdown-item disabled" href="#">Select an example:</a>
                </li>
                <li v-for="option in examplesData" :key="option.value" @click="setExample(option.value)">
                  <a class="dropdown-item" href="#"> {{ option.text }} </a>
                </li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">
                View
              </a>

              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#" @click="hideShowForestQB">{{ displayForestQB ? "Hide" : "Show" }}
                    ForestQB</a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>
                <li>
                  <a class="dropdown-item" href="#" @click="hideShowAdvanceView">{{ displayAdvanceView ? "Hide" : "Show"
                    }} Advanced View</a>
                </li>
              </ul>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#" data-bs-target="#settingsModal" data-bs-toggle="modal">
                Settings
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto" v-show="displayForestQB">
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button id="showHideBtn" aria-controls="advance settings" aria-expanded="false"
                  class="btn btn-sm btn-outline-success my-2 my-sm-0" type="button"
                  @click.stop="showHideCustomizationBtn">


                  <svg v-if="showSearchCustomizationPanel" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                    fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                    class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                    <path
                      d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                    <path
                      d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                  </svg>

                  {{ showSearchCustomizationPanel ? "Hide Search Customisation" : "Search Customisation" }}
                </button>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <button v-if="queryResult == 'loading'" class="btn btn-sm btn-outline-danger my-2 my-sm-0" type="button"
                  @click="cancelSearch()">
                  <span aria-hidden="true" class="spinner-border spinner-border-sm" role="status"></span>
                  Stop Search
                </button>
                <button v-else-if="observablesLength == 0 &&
                  (this.$store.state.coreStore.mapFilters.nearby.length > 0 ||
                    this.$store.state.coreStore.mapFilters.within.length > 0)
                " id="searchButton" class="btn btn-sm btn-info my-2 my-sm-0" type="button" @click="getResults()">
                  Find Sensors
                </button>
                <button v-else id="searchButton" class="btn btn-sm btn-success my-2 my-sm-0" type="button"
                  @click="getResults()">
                  Search
                </button>
              </a>
            </li>
          </ul>
        </div>
        <!-- navbar-collapse.// -->
      </div>
      <!-- container-fluid.// -->
    </nav>
    <!-- ============= Nav COMPONENT END// ============== -->

    <div class="container">
      <span>
        <div class="row d-flex justify-content-center mt-100 pt-2">
          <div class="col d-flex justify-content-end" style="margin-bottom: 0.8em">
            <upper-picker class="float-end" v-show="displayForestQB" />
          </div>
        </div>

        <div class="row d-flex justify-content-center mt-100">
          <div class="col"></div>
          <div class="col-lg-12 col-md-12">
            <leaflet-map v-show="displayForestQB" />
          </div>
          <div class="col"></div>
        </div>

        <div class="row" d-flex justify-content-center mt-100>
          <div class="col"></div>
          <div class="col-lg-12 col-md-12 pt-4">
            <span v-show="displayForestQB">
              <main-search-box />
            </span>
          </div>
          <div class="col"></div>
        </div>

        <span v-show="displayForestQB">
          <map-filter />
        </span>

        <span v-show="displayForestQB">
          <div class="row d-flex justify-content-center mt-100">
            <div class="col"></div>
            <div class="col-md-12 pt-4">
              <transition name="slide">

                <div id="collapseSettings" class="card" v-show="showSearchCustomizationPanel">
                  <div id="filterPanel" class="card-body">
                    <h5 class="card-title text-start">Search Customisation:</h5>
                    <div class="text-end">
                      <button type="button" style="position: relative; top: -30px" class="btn-close" aria-label="Close"
                        @click.stop="showHideCustomizationBtn"></button>
                    </div>

                    <div v-if="observablesLength == 0" class="alert alert-warning">
                      Options will be displayed once you have selected some
                      sensors.
                    </div>

                    <div v-else>
                      <filter-panel-list />

                      <ul class="list-group list-group-flush">
                        <li v-if="observablesLength != 0" class="list-group-item list-group-item-action">
                          <span v-if="sortByDir == 'desc'" @click="changeSort" style="cursor: pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                              class="bi bi-sort-alpha-down-alt" viewBox="0 0 16 16">
                              <path
                                d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                              <path fill-rule="evenodd"
                                d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                              <path
                                d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z" />
                            </svg>
                          </span>
                          <span v-else @click="changeSort" style="cursor: pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                              class="bi bi-sort-alpha-up-alt" viewBox="0 0 16 16">
                              <path
                                d="M12.96 7H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V7z" />
                              <path fill-rule="evenodd"
                                d="M10.082 12.629 9.664 14H8.598l1.789-5.332h1.234L13.402 14h-1.12l-.419-1.371h-1.781zm1.57-.785L11 9.688h-.047l-.652 2.156h1.351z" />
                              <path
                                d="M4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z" />
                            </svg>
                          </span>

                          Sort By:
                          <select v-model="sortByExp" class="form-select form-select-sm"
                            style="width: 200px; display: inline">
                            <option value="!none" selected>
                              No Sorting (Select a sortable item).
                            </option>

                            <option v-for="item in sortByList" :key="item">
                              {{ item }}
                            </option>
                          </select>
                          <span v-if="sortByExp != '!none'">
                            in
                            <select v-model="sortByDir" class="form-select form-select-sm"
                              style="width: 130px; display: inline">
                              <option value="asc">ascending</option>
                              <option value="desc" selected>descending</option>
                            </select>
                            order.
                          </span>
                        </li>

                        <li v-if="observablesLength != 0" class="list-group-item list-group-item-action">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            class="bi bi-filter" viewBox="0 0 16 16">
                            <path
                              d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
                          </svg>
                          Result Size (Limit):
                          <input v-model="limit" class="form-control form-select-sm"
                            style="width: 100px; display: inline" type="number" />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </transition>

              <br />
            </div>
            <div class="col"></div>
          </div>
        </span>
      </span>

      <div class="row d-flex justify-content-center mt-100" style="margin-bottom: 20px">
        <!-- <div class="col"></div> -->
        <div class="col-md-12">
          <!-- Button that disappears after clicking -->
          <a id="ExpandSearchBtn" role="button" v-if="!showSearchCustomizationPanel"
            @click.stop="showHideCustomizationBtn">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
              class="bi bi-chevron-bar-expand" viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="M3.646 10.146a.5.5 0 0 1 .708 0L8 13.793l3.646-3.647a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 0-.708zm0-4.292a.5.5 0 0 0 .708 0L8 2.207l3.646 3.647a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708zM1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8z" />
            </svg>
            Expand Search
          </a>

          <div class="float-end" v-show="displayForestQB">
            <button v-if="queryResult != 'loading' &&
              observablesLength == 0 &&
              (this.$store.state.coreStore.mapFilters.nearby.length > 0 ||
                this.$store.state.coreStore.mapFilters.within.length > 0)
            " id="searchButton" class="btn btn-outline-primary" type="button" @click="getResults()">
              Find Sensors
            </button>
            <button v-else-if="queryResult != 'loading'" id="searchButton" class="btn btn-outline-primary" type="button"
              @click="getResults()">
              Search
            </button>
          </div>


          <!-- Load Save Modals -->
          <div class="modal fade" id="saveDataModal" tabindex="-1" role="dialog" aria-labelledby="saveDataModal"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header py-2">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Save Data
                  </h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="formFileSm" class="form-label">Save your search entries:</label>
                    <button type="button" class="btn btn-sm btn-success my-2 my-sm-0"
                      @click="downloadAsFile('ForestQB_Data', $store.state)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-download" viewBox="0 0 16 16">
                        <path
                          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path
                          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                      </svg>
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="loadDataModal" tabindex="-1" role="dialog" aria-labelledby="saveDataModal"
            aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header py-2">
                  <h5 class="modal-title">Load Data</h5>
                  <button type="button" id="loadDataModalClose" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label for="formFileSm" class="form-label">Upload your saved file:</label>
                    <input class="form-control form-control-sm" ref="dataFileUpload" id="dataFileUpload" type="file"
                      @change="uploadFile" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Settings Modal -->
          <div id="settingsModal" data-bs-backdrop="static" aria-hidden="true" aria-labelledby="settingsModalLabel"
            class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header py-2">
                  <h5 id="settingsModalLabel" class="modal-title">Settings</h5>
                  <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label class="form-label">SPARQL Endpoint URL</label>
                    <input ref="settingsEndpointURL" :value="settingsEndpointURL" class="form-control"
                      placeholder="https://example.com" type="url" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Query Parser URL (Convert JSON query into SPARQL)</label>
                    <input ref="settingsSparqlParserURL" :value="settingsSparqlParserURL" class="form-control"
                      placeholder="https://example.com" type="url" />
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Sensor List - SPARQL Query

                      <div class="QBtooltip">
                        <img :src="'../images/info.svg'" />
                        <span class="QBtooltiptext">This query is used to populate the sensor list.</span>
                      </div>
                    </label>
                    <textarea ref="settingsSensors" :value="settingsSensors" class="form-control" rows="5"></textarea>
                  </div>
                  <hr />

                  <div class="mb-3">
                    <label class="form-label">Select Ontology Template:</label>
                    <div style="margin: 0 0 10px 40px">
                      <span v-for="(item, key) in this.$store.state.settings
                        .searchTriplePatternTemplate" :key="key">
                        <div class="form-check form-check">
                          <input class="form-check-input" type="radio" name="selectedSearchTriplePatternOptions"
                            :value="key" v-model="selectedSearchTriplePatternData" />
                          <label class="form-check-label" for="selectedSearchTriplePatternOptions">{{ key }}</label>
                        </div>
                      </span>
                      <div class="form-check form-check">
                        <input class="form-check-input" type="radio" name="selectedSearchTriplePatternOptions"
                          value="custom" v-model="selectedSearchTriplePatternData" />
                        <label class="form-check-label" for="selectedSearchTriplePatternOptions">Custom</label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Simplest Triple Pattern to find sensor readings (%s will
                      be replaced with selected sensor URI, at least one of the
                      following textfileds has to be %s)

                      <div class="QBtooltip">
                        <img :src="'../images/info.svg'" />
                        <span class="QBtooltiptext">This query is used to search for the sensor readings.
                          This symbol %s will be replaced with the selected
                          sensor URI.</span>
                      </div>
                    </label>

                    <div class="mb-3 row">
                      <label for="inputSubject" class="col-sm-2 col-form-label">Subject</label>
                      <div class="col-sm-10">
                        <input ref="triplePatternSubject" type="text" class="form-control"
                          v-model="triplePatternSubjectData" :disabled="selectedSearchTriplePatternData != 'custom'
                            " />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label for="inputSubject" class="col-sm-2 col-form-label">Predicate</label>
                      <div class="col-sm-10">
                        <input ref="triplePatternPredicate" type="text" class="form-control"
                          v-model="triplePatternPredicateData" :disabled="selectedSearchTriplePatternData != 'custom'
                            " />
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label for="inputSubject" class="col-sm-2 col-form-label">Subject</label>
                      <div class="col-sm-10">
                        <input ref="triplePatternObject" type="text" class="form-control"
                          v-model="triplePatternObjectData" :disabled="selectedSearchTriplePatternData != 'custom'
                            " />
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">The constrcuted Basic Triple Pattern will be:

                      <div class="QBtooltip">
                        <img :src="'../images/info.svg'" />
                        <span class="QBtooltiptext">This is just an example for the above triple
                          pattern.</span>
                      </div>
                    </label>


                    <textarea class="form-control" rows="2" disabled
                      :value="`SELECT * WHERE { ${triplePatternSubjectData} ${triplePatternPredicateData} ${triplePatternObjectData} }`">
                    </textarea>
                  </div>

                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="button"
                    @click="cancelSettingsChanges">
                    Close
                  </button>
                  <button class="btn btn-primary" data-bs-dismiss="modal" type="button" @click="saveSettingsChanges">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end of settings modal -->

          <!-- Sensors selection Modal -->
          <div id="sensorSelectionModal" aria-hidden="true" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 id="sensorSelectionModalLabel" class="modal-title">
                    List of sensors within the selected area
                  </h5>
                  <button aria-label="Close" class="btn-close" data-bs-dismiss="modal" type="button"></button>
                </div>
                <div class="modal-body">
                  <div class="mb-3">
                    <label class="form-label">Here is a list of sensors related to the selected map
                      filter.<br />
                      Please select the appropiate sensors:

                      <div class="QBtooltip">
                        <img :src="'../images/info.svg'" />
                        <span class="QBtooltiptext">All sensors listed here are located within the map
                          filter.</span>
                      </div>
                    </label>
                    <table class="table table-hover" v-if="observablesLength == 0 &&
                      queryResult.head &&
                      queryResult.head.vars &&
                      queryResult.head.vars.length > 0 &&
                      queryResult.results &&
                      queryResult.results.bindings &&
                      queryResult.results.bindings.length > 0 &&
                      queryResult.results.bindings[0][
                      queryResult.head.vars[0]
                      ] &&
                      queryResult.results.bindings[0][
                        queryResult.head.vars[0]
                      ].value
                    ">
                      <thead>
                        <tr>
                          <th style="width: 1em" scope="col">Select?</th>
                          <th scope="col">Sensor Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in queryResult['results'][
                          'bindings'
                        ]" :key="item[queryResult.head.vars[0]].value">
                          <th scope="row">
                            <input class="form-check-input" type="checkbox" :value="index" name="sensorCheckbox"
                              v-model="selectSensorCheckboxes" />
                          </th>
                          <td>
                            {{
                              getPredicateName(
                                item[queryResult.head.vars[0]].value
                              ).name
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>
                <div class="modal-footer">
                  <button class="btn btn-secondary" data-bs-dismiss="modal" type="button">
                    Close
                  </button>
                  <button class="btn btn-primary" data-bs-dismiss="modal" type="button" @click="insertSelectSensors">
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- end of settings modal -->
        </div>
        <div class="col"></div>
      </div>

      <div v-if="queryResult == 'loading'" class="row d-flex justify-content-center mt-100">
        <div class="col-lg-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="queryResult || errorMsg" class="row d-flex justify-content-center mt-100">
        <div v-if="queryResult.head &&
          queryResult.head.vars &&
          queryResult.head.vars.length > 0
        " class="col-lg-12 col-md-12">
          <div class="card">
            <div class="card-body">
              <results />
            </div>
          </div>
        </div>

        <div v-else-if="errorMsg" class="col-lg-12 col-md-12">
          <div class="card">
            <div class="card-body d-flex justify-content-center mt-100">
              <span class="text-danger"><strong>Oops!</strong> {{ errorMsg }}</span>
            </div>
          </div>
        </div>

        <div v-else class="col-lg-12 col-md-12">
          <div class="card">
            <div class="card-body d-flex justify-content-center mt-100">
              <span>Sorry, we couldn't find any results. &nbsp;
                <svg class="bi bi-emoji-frown" fill="currentColor" height="16" viewBox="0 0 16 16" width="16"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path
                    d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                </svg></span>
            </div>
          </div>
        </div>
      </div>

      <br />
      <br />
      <span v-show="displayAdvanceView">
        <div class="row d-flex justify-content-center mt-100">
          <div class="col-lg-12 col-md-12">
            <hr />
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Advanced View:</h5>

                <nav>
                  <div id="nav-tab" class="nav nav-tabs" role="tablist">
                    <button id="nav-home-tab" aria-controls="nav-home" aria-selected="true" class="nav-link active"
                      data-bs-target="#nav-home" data-bs-toggle="tab" role="tab" type="button">
                      QB JSON
                    </button>
                    <button id="nav-queryJson-tab" aria-controls="nav-query-json" aria-selected="false" class="nav-link"
                      data-bs-target="#nav-query-json" data-bs-toggle="tab" role="tab" type="button">
                      Query JSON
                    </button>
                    <button id="nav-profile-tab" aria-controls="nav-profile" aria-selected="false" class="nav-link"
                      data-bs-target="#nav-profile" data-bs-toggle="tab" role="tab" type="button">
                      SPARQL
                    </button>
                    <button id="nav-contact-tab" aria-controls="nav-contact" aria-selected="false" class="nav-link"
                      data-bs-target="#nav-contact" data-bs-toggle="tab" role="tab" type="button">
                      SPARQL Results (JSON)
                    </button>
                  </div>
                </nav>
                <div id="nav-tabContent" class="tab-content">
                  <div id="nav-home" aria-labelledby="nav-home-tab" class="tab-pane fade show active" role="tabpanel">
                    <p>Represent the data that reflect the UI choices.</p>
                    <pre><code>{{ coreStore }}</code></pre>
                  </div>
                  <div id="nav-query-json" aria-labelledby="nav-queryJson-tab" class="tab-pane fade" role="tabpanel">
                    <p>Represent the data that will be sent to the server.</p>
                    <pre><code>{{ queryJSON }}</code></pre>
                  </div>
                  <div id="nav-profile" aria-labelledby="nav-profile-tab" class="tab-pane fade" role="tabpanel">
                    <!-- <code>{{ sparqlQuery }}</code> -->
                    <editableSPARQL v-model="sparqlQuery" />
                    <br />
                    <span v-if="sparqlQuery && sparqlQuery.length > 0">
                      <button class="btn btn-outline-secondary btn-sm" type="button" @click="getResults(false)">
                        Run this query
                      </button>
                    </span>
                    <span v-else>
                      To generate SPARQL, click on the upper search button.
                    </span>
                  </div>
                  <div id="nav-contact" aria-labelledby="nav-contact-tab" class="tab-pane fade" role="tabpanel">
                    <pre><code>{{ queryResult }}</code></pre>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </span>
      <br />
      <br />
      <br />
    </div>

    <!-- Chatbot Component -->
    <chatbot /> 

    <footer class="bg-light text-center text-lg-start">
      <!-- Copyright -->
      <div class="text-center p-2" style="font-size: 0.8em; background-color: rgba(0, 0, 0, 0.15)">
        ForestQB for linked data © 2023–2025 Created By Omar Mussa
      </div>
      <!-- Copyright -->
    </footer>
  </div>
</template>

<script>
// Import required Vue components and libraries
import LeafletMap from "./components/LeafletComponent";
import MainSearchBox from "./components/MainSearchBoxComponent";
import FilterPanelList from "./components/FilterPanelComponent";
import Results from "./components/ResultsComponent";
import UpperPicker from "./components/UpperDatePickerComponent";
import MapFilter from "./components/MapFilterComponent";
import Chatbot from "./components/ChatbotComponent";
import EditableSPARQL from "./components/EditableSPARQL";

import _ from "lodash"; // Utility library
import axios from "axios"; // HTTP client for requests

export default {
  name: "MainApp",
  data: function () {
    return {
      // Various local data properties used across the component
      mainSearchBoxValues: [], // Stores search box inputs
      selectedExample: null, // Stores the selected example
      cancelTokenSource: undefined, // Axios cancel token for aborting requests
      selectSensorCheckboxes: [], // Selected sensors from modal
      triplePatternSubjectData: "", // Subject for triple pattern (editable)
      triplePatternPredicateData: "", // Predicate for triple pattern
      triplePatternObjectData: "", // Object for triple pattern
      selectedSearchTriplePatternData: "", // Selected pattern template
      showSearchCustomizationPanel: false, // Toggle for customization panel
    };
  },
  computed: {
    // Vuex computed properties for reactivity

    // Fetch the list of predicates from the store
    sortByList() {
      return this.$store.getters.getPredicatesList;
    },

    observablesLength() {
      // get the how many of elements were selected
      // if observables length changes, make sure sortByList will be updated.
      // important to sortByList to stay updated.
      const temp = this.sortByList;
      return this.$store.state.coreStore.observables.length;
    },
    // Two-way binding for observables in Vuex
    searchValue: {
      get() {
        return this.$store.state.coreStore.observables;
      },
      set(value) {
        this.$store.commit("setObservables", value);
      },
    },
    // Access the core store object (reflects UI choices)
    coreStore() {
      //main json that represent the app selections
      return this.$store.state.coreStore; //$store.getters.getCore;
    },
    examplesData() {
      //main json that represent the examples options
      return this.$store.getters.getExamples;
    },
    sortByExp: {
      //query limit
      set(value) {
        this.$store.commit("setSortByExp", value);
      },
      get() {
        return this.$store.state.coreStore.sortBy.expression;
      },
    },
    sortByDir: {
      //query limit
      set(value) {
        this.$store.commit("setSortByDir", value);
      },
      get() {
        return this.$store.state.coreStore.sortBy.direction;
      },
    },
    limit: {
      //query limit
      set(value) {
        this.$store.commit("setLimit", value);
      },
      get() {
        return this.$store.state.coreStore.limit;
      },
    },
    queryJSON() {
      //The json that will be sent to the server
      return this.$store.getters.getQueryJSON;
    },
    sparqlQuery: {
      //the generated sparql query
      set(value) {
        this.$store.commit("setSPARQL", value);
      },
      get() {
        return this.$store.getters.getSPARQL;
      },
    },
    // View toggles (ForestQB and advanced view)
    displayForestQB: {
      set(value) {
        this.$store.commit("setSettings", {
          key: "displayForestQB",
          value: value,
        });
      },
      get() {
        return this.$store.state.settings.displayForestQB;
      },
    },
    displayAdvanceView: {
      set(value) {
        this.$store.commit("setSettings", {
          key: "displayAdvanceView",
          value: value,
        });
      },
      get() {
        return this.$store.state.settings.displayAdvanceView;
      },
    },
    // Loading and error states
    isLoading: {
      set(value) {
        this.$store.commit("setSettings", { key: "isLoading", value: value });
      },
      get() {
        return this.$store.state.settings.isLoading;
      },
    },
    errorMsg: {
      set(value) {
        this.$store.commit("setSettings", { key: "errorMsg", value: value });
      },
      get() {
        return this.$store.state.settings.errorMsg;
      },
    },
    queryResult: {
      set(value) {
        this.$store.commit("setResult", value);
      },
      get() {
        return this.$store.getters.getResult;
      },
    },
    // Settings bindings (URLs, triple patterns, etc.)
    settingsEndpointURL: {
      set(value) {
        this.$store.commit("setEndpointURL", value);
      },
      get() {
        return this.$store.state.settings.endpointURL;
      },
    },
    settingsSparqlParserURL: {
      set(value) {
        this.$store.commit("setSparqlParserUrl", value);
      },
      get() {
        return this.$store.getters.getSparqlParserUrl;
      },
    },
    settingsSensors: {
      set(value) {
        this.$store.commit("setSensorsTemplate", value);
      },
      get() {
        return this.$store.state.settings.queryTemplate.sensors;
      },
    },
    selectedSearchTriplePattern: {
      set(value) {
        this.$store.commit("setSelectedSearchTriplePatternTemplate", value);
      },
      get() {
        return this.$store.state.settings.selectedSearchTriplePatternTemplate;
      },
    },
    triplePatternSubject: {
      set(value) {
        this.$store.commit("setSearchTriplePattern", {
          key: "subject",
          value: value,
        });
      },
      get() {
        return this.$store.state.settings.searchTriplePattern.subject;
      },
    },
    triplePatternPredicate: {
      set(value) {
        this.$store.commit("setSearchTriplePattern", {
          key: "predicate",
          value: value,
        });
      },
      get() {
        return this.$store.state.settings.searchTriplePattern.predicate;
      },
    },
    triplePatternObject: {
      set(value) {
        this.$store.commit("setSearchTriplePattern", {
          key: "object",
          value: value,
        });
      },
      get() {
        return this.$store.state.settings.searchTriplePattern.object;
      },
    },
  },
  mounted() {
    // On document ready, initialize triple pattern fields from Vuex
    const thisComponent = this;
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        // run code here
        thisComponent.triplePatternSubjectData = thisComponent.triplePatternSubject;
        thisComponent.triplePatternPredicateData = thisComponent.triplePatternPredicate;
        thisComponent.triplePatternObjectData = thisComponent.triplePatternObject;
        thisComponent.selectedSearchTriplePatternData = thisComponent.selectedSearchTriplePattern;
      }
    };
  },
  watch: {
    // Sync selected search triple pattern with UI controls
    selectedSearchTriplePattern: function () {
      this.selectedSearchTriplePatternData = this.selectedSearchTriplePattern;
    },
    selectedSearchTriplePatternData: function () {
      // Update triple pattern fields when template changes
      let selectedTemplate = null;
      if (
        this.$store.state.settings.searchTriplePatternTemplate[
        this.selectedSearchTriplePatternData
        ]
      ) {
        selectedTemplate =
          this.$store.state.settings.searchTriplePatternTemplate[
          this.selectedSearchTriplePatternData
          ];
      }

      if (selectedTemplate != null) {
        this.triplePatternSubjecData = selectedTemplate.subject;
        this.triplePatternPredicateData = selectedTemplate.predicate;
        this.triplePatternObjectData = selectedTemplate.object;
      }
    },
  },
  created() {
  },
  methods: {
    // Function to download user selection data as a JSON file.
    downloadAsFile(filename, obj) {
      var element = window.document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(obj))
      );
      element.setAttribute("download", filename + "_" + Date.now() + ".json");

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
    },
    // File upload handler to load saved data
    uploadFile(event) {
      document.getElementById("loadDataModalClose").click();
      //console.log(event.target.files[0]);
      let file = event.target.files[0];

      // Create a new FileReader() object
      let reader = new FileReader();

      reader.readAsText(file);

      reader.onload = (event) => {
        // console.log(event.target.result);
        try {
          const obj = JSON.parse(event.target.result);

          let text =
            "The file was successfully uploaded.\nThis will override all of your inputs\nDo you want to continue?";
          if (confirm(text) == true) {
            this.$store.commit("setExample", { value: null, newState: obj });
          }
        } catch (ex) {
          alert(
            "This is not valid file. Please make sure you select the correct file."
          );
        }
      };
      this.$refs.dataFileUpload.value = null;
    },
    // Toggle customization panel visibility
    showHideCustomizationBtn() {
      this.showSearchCustomizationPanel = !this.showSearchCustomizationPanel;
    },
    // Change sort direction
    changeSort() {
      if (this.sortByDir == "desc") {
        this.sortByDir = "asc";
      } else {
        this.sortByDir = "desc";
      }
    },
    hideShowForestQB() {
      this.displayForestQB = !this.displayForestQB;
    },
    hideShowAdvanceView() {
      this.displayAdvanceView = !this.displayAdvanceView;
    },
    reset() {
      let text =
        "Resetting means your inputs will be deleted.\nDo you want to continue?";
      if (confirm(text) == true) {
        this.$store.commit("setExample", { value: null });
      }
    },
    async insertSelectSensors() {
      if (this.selectSensorCheckboxes.length == 0) {
        window.alert("Please select at least one sensor");
      } else {
        console.log(this.queryResult["head"]["vars"]);

        const head = this.queryResult["head"]["vars"];
        let results = this.queryResult["results"]["bindings"];

        let nameDict = {}; //make sure if there is a duplicate name to add numberings.

        for (let i = 0; i < this.selectSensorCheckboxes.length; i++) {
          //[head[0]] we are assuming the first predicate will always be the main one.
          //prepare the data and default behaviour.
          const option = await this.prepareObservableOption(
            results[this.selectSensorCheckboxes[i]],
            {
              key: head[0],
              nameDict: nameDict,
              colorIndex: i,
            }
          );

          this.searchValue.push(option);
        }

        this.selectSensorCheckboxes = [];
      }
    },
    closeSelectSensorsModel() {
      this.selectSensorCheckboxes = [];
    },
    triplePatternUpdate() {
      const curr = console.log("triplePatternUpdate");
      this.constructedTriplePattern =
        "SELECT * WHERE { " +
        this.$refs.triplePatternSubject.value +
        " " +
        this.$refs.triplePatternPredicate.value +
        " " +
        this.$refs.triplePatternObject.value +
        " }";
    },
    saveSettingsChanges() {
      this.settingsEndpointURL = this.$refs.settingsEndpointURL.value;
      this.settingsSparqlParserURL = this.$refs.settingsSparqlParserURL.value;
      this.settingsSensors = this.$refs.settingsSensors.value + " ";
      //this.settingsPredicatesSearch = this.$refs.settingsPredicatesSearch.value;

      this.triplePatternSubject = this.$refs.triplePatternSubject.value;
      this.triplePatternPredicate = this.$refs.triplePatternPredicate.value;
      this.triplePatternObject = this.$refs.triplePatternObject.value;
      this.selectedSearchTriplePattern = this.selectedSearchTriplePatternData;
      //notify others that settings did change
      this.$root.$emit("settingsDidChange");
    },
    cancelSettingsChanges() {
      this.$refs.settingsEndpointURL.value = this.settingsEndpointURL;
      this.$refs.settingsSparqlParserURL.value = this.settingsSparqlParserURL;
      this.$refs.settingsSensors.value = this.settingsSensors;
      //this.$refs.settingsPredicatesSearch.value = this.settingsPredicatesSearch;

      this.$refs.triplePatternSubject.value = this.triplePatternSubject;
      this.$refs.triplePatternPredicate.value = this.triplePatternPredicate;
      this.$refs.triplePatternObject.value = this.triplePatternObject;
      this.selectedSearchTriplePatternData = this.selectedSearchTriplePattern;
    },
    setExample: async function (value) {
      // set the example
      // Confirm with the user before proceeding
      const confirmationMessage =
        "An example was selected!\nThis will override all of your inputs.\nDo you want to continue?";
      if (confirm(confirmationMessage)) {
        // Commit the example value to the Vuex store
        this.$store.commit("setExample", {
          value: value || null, // Assign value or null if value is null/undefined
        });

        // Wait for 1 second before proceeding
        await wait(1000);

        // Call getResults to proceed with the example
        await this.getResults();
      } else {
        // If user cancels, reset selectedExample to null
        this.selectedExample = null;
      }
    },
    async getSparql() {
      // Ensure the cancel token is initialized
      if (!this.cancelTokenSource) {
        this.cancelTokenSource = axios.CancelToken.source();
      }
      // Get sparql by sending the queryJSON to be converted to sparql on the server.
      // Clear the old SPARQL query
      this.sparqlQuery = "";
      try {
        //this.isLoading = true;
        // Make the request to generate the SPARQL query
        let data = (
          await axios.post(
            this.$store.state.settings.getSparqlURL,
            this.queryJSON,
            {
              cancelToken: this.cancelTokenSource.token, // Properly include the cancel token
            }
          )
        ).data;

        // Check if the response contains the SPARQL query
        if (data && data.query) {
          this.sparqlQuery = data.query;
        } else {
          throw new Error("Invalid response from server: SPARQL query not found.");
        }

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;

        // Handle request cancellation separately from other errors
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
          this.errorMsg = "Request was canceled.";
        } else {
          console.error("Error fetching SPARQL query:", error);
          this.errorMsg = error.message || "Failed to generate SPARQL query.";
        }
      }
    },
    async cancelSearch() {
      if (this.cancelTokenSource) {
        // Cancel the request with a custom message
        this.cancelTokenSource.cancel("Search canceled by the user.");
        // Reset the cancel token source to prevent reuse
        this.cancelTokenSource = null;
      }
    },
    async getResults(generateSPARQL = true) {
      // Initialize loading state
      this.queryResult = "loading";
      this.isLoading = true;
      this.errorMsg = undefined;

      // Create a new Axios cancel token to allow request cancellation
      this.cancelTokenSource = axios.CancelToken.source();

      try {
        // If generateSPARQL is true, generate the SPARQL query
        if (generateSPARQL) {
          await this.getSparql();

          if (!this.sparqlQuery || this.sparqlQuery.length == 0) {
            throw new Error(
              "Failed to generate the SPARQL query. Please click 'Search' again to retry."
            );
          }
        } else {
          // If not generating SPARQL, alert the user about manual query usage

          alert(
            "Note: The results will be reflected based on the SPARQL query, not the interface choices. It is better to use the upper search button to generate SPARQL based on your selections."
          );
        }

        // Variable to hold the server response
        let server_response = undefined;

        // Make the request using Vuex action for Axios with proper error handling
        server_response = await this.$store
          .dispatch("axios", {
            method: "post",
            url: this.$store.state.settings.endpointURL,
            data: {
              query: this.sparqlQuery,
            },
            params: null,
            cancelToken: this.cancelTokenSource.token, // Attach the cancel token to the request
            timeout: this.$store.state.settings.timeout, // Set a timeout for the request
          });

        // Log the server response for debugging purposes
        console.log("response -->", server_response.status, server_response.data);

        // Check if the response contains an error message from the server
        if (server_response.data && server_response.data.code && server_response.data.message) {
          // Alert the user about the issue and throw an error to trigger catch block
          window.alert(
            "Query successfully created; however, there's an endpoint issue:\n\n" +
            server_response.data.message
          );
          throw new Error(
            server_response.data.message
          );
        }

        // If no response data is present, throw an error indicating an issue with the server response
        if (!server_response || !server_response.data) {
          throw new Error("No proper server response!");
        }

        // Assign the data received from the server to `queryResult`
        this.queryResult = server_response.data;

        // Conditional logic to determine if the modal should be shown based on query results
        if (
          this.observablesLength === 0 &&
          this.queryJSON.observablesKeys.length === 0 &&
          this.queryResult.head &&
          this.queryResult.head.vars &&
          this.queryResult.head.vars.length > 0 &&
          this.queryResult.results &&
          this.queryResult.results.bindings &&
          this.queryResult.results.bindings.length > 0 &&
          this.queryResult.results.bindings[0][this.queryResult.head.vars[0]] &&
          this.queryResult.results.bindings[0][this.queryResult.head.vars[0]].value
        ) {
          // Show the modal if the above conditions are met
          $("#sensorSelectionModal").modal("show");
        }

        // Set loading state to false as the request has completed successfully
        this.isLoading = false;
      } catch (error) {
        // Handle any errors that occur during the request process
        this.isLoading = false; // Ensure loading state is reset even in case of an error

        // Log the error for debugging purposes
        console.error("error -->", error);

        // Clear the query result as an error occurred
        this.queryResult = "";

        // Check if the error is due to the request being canceled by the user
        if (axios.isCancel(error)) {
          this.errorMsg = "Request was canceled.";
        } else {
          // Otherwise, store the error message for display
          this.errorMsg = error.message || error.toString();
        }
      }
    },
  },
  components: {
    LeafletMap,
    MainSearchBox,
    FilterPanelList,
    Results,
    UpperPicker,
    MapFilter,
    Chatbot,
    EditableSPARQL,
  },
};

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
</script>


<style>
body {
  /*background: #ecf0f1 !important;*/
  background: #e6e6e6 !important;
  margin-bottom: 56px;
}

html {
  position: relative;
  min-height: 100%;
  padding-bottom: 56;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 56;
}

.QBtooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.QBtooltip>img {
  width: 1.1em;
}

.QBtooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.QBtooltip .QBtooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -60px;
}

.QBtooltip .QBtooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.QBtooltip:hover .QBtooltiptext {
  visibility: visible;
}


.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s cubic-bezier(.55, 0, .1, 1);
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
}

.slide-enter-to,
.slide-leave {
  max-height: 500px;
  /* adjust as needed */
}
</style>
