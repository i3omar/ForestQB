# ForestQB (Version 1)

This is **version 1** of ForestQB, a Vue.js application designed for querying SPARQL endpoints through a flexible, ontology-driven interface.

> **Note:** LLM (Large Language Model) integration is **not** available in this version.
> For LLM support and newer features, please see version 2.

For more information, visit the main repository: [https://github.com/i3omar/ForestQB](https://github.com/i3omar/ForestQB).


## Prerequisite: API Setup

Before running the ForestQB app, you **must install and run the ForestQB API** backend.
You can find the API and setup instructions here: [https://github.com/i3omar/ForestQB-API](https://github.com/i3omar/ForestQB-API)

## Setup Instructions

1. Clone the repository:
```bash
git clone --branch v1 https://github.com/i3omar/ForestQB.git
cd ForestQB
```

2. Install dependencies:
```bash
npm install
````

3. Compiles and hot-reloads for development:
```bash
npm run serve
```

4. For chatbot functionality, you can run **ForestBot**—the conversational agent for ForestQB.
    - Find setup instructions and code at: [https://github.com/i3omar/ForestBot](https://github.com/i3omar/ForestBot)

---


### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

---

## Settings & Customization

The core configuration for ForestQB is handled inside the Vuex store. The `settings` object controls backend endpoints, query templates, UI toggles, and more.
**You can customize these to match your own SPARQL endpoints or user experience needs.**

### Where to Edit

* All settings are found in the Vuex store file (`src/store.js`) within the `getDefaultState()` function under the `settings` key.

---

### Settings Object

Below are the main settings you’ll find and what each does:

| **Key**                               | **Description**                                                                                                    | **How to Customize**                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `endpointURL`                         | URL of the SPARQL endpoint for data queries. Default Value: `http://localhost:8081/sparql`                                                                      | Change to your SPARQL server address.                            |
| `getSparqlURL`                        | URL used to get parsed SPARQL queries. Default Value: `http://localhost:8081/getSparql`                                                                             | Change to your parser/endpoint as needed.                        |
| `rasaApiURL`                          | URL for your chatbot API (Rasa server, proxied here). Default Value: `http://localhost:8081/forestBot/proxy`                                                              | Change to point to your chatbot’s webhook or proxy server.       |
| `timeout`                             | Request timeout in milliseconds for backend calls.                                                                 | Increase/decrease as needed for slower/faster networks.          |
| `searchTriplePattern`                 | Default SPARQL triple pattern for searches (subject, predicate, object).                                           | Modify for different triple structures (advanced users).         |
| `searchTriplePatternTemplate`         | **TEMPLATES** for different ontologies, i.e., Forest Ontology vs SOSA Ontology.                                    | Add new templates for custom ontologies or change existing ones. |
| `selectedSearchTriplePatternTemplate` | Currently selected template (string, e.g. "SOSA Ontology").                                                        | Set to switch which ontology template is active.                 |
| `queryTemplate`                       | Various SPARQL templates for different query types (findKeywordURI, observedPropertiesBase, sensors, sensor, etc). | Edit to customize or add new query templates.                    |
| `isLoading`                           | Boolean toggle for showing/hiding loading indicators in UI.                                                        | Use to manage loading spinners, etc.                             |
| `errorMsg`                            | Holds any error message to display to the user.                                                                    | Populated when errors happen. You can clear or set as needed.    |
| `observableOptions`                   | Populated array for the observables picker (UI select list).                                                       | Add, remove, or set options as needed for your use case.         |
| `displayForestQB`                     | Show/hide ForestQB component in the UI.                                                                            | Toggle `true`/`false` to show or hide.                           |
| `displayAdvanceView`                  | Show/hide advanced/development UI section.                                                                         | Toggle `true`/`false`.                                           |


## About Version 1

This is the initial release (**v1**) of ForestQB, as published at [https://doi.org/10.1145/3675759](https://doi.org/10.1145/3675759).

>**Note:** LLM (Large Language Model) integration is **not** supported in version 1.
>LLM features are available starting from version 2.

While new features and structural changes have been introduced in version 2 and beyond, the core customization principles described here remain consistent across versions.




## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.