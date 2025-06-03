# ForestQB (Version 1) - Forest Query Builder
> **Note:** LLM (Large Language Model) integration is **not** available in this version.
> For LLM support and newer features, please see [main branch](https://github.com/i3omar/ForestQB/).

[<img src="https://drive.google.com/uc?id=1G01R6SdQze5EkeYl9gqzCyIxNo73PQ7L" width="60%">](https://youtube.com/watch?v=0tyDlCxKMRk)





## Introduction
ForestQB, or the Forest Query Builder, is a cutting-edge toolkit designed to enhance the exploration and application of observational Linked Data (LD) within the field of wildlife research and conservation. Aimed at non-experts, ForestQB simplifies the process of formulating queries from RDF triplestores by integrating a graphical user interface (GUI) with a conversational user interface (CUI). This makes observational LD accessible to users without expertise in RDF or SPARQL.

Developed from insights gained through ethnographic studies with wildlife researchers, ForestQB improves accessibility to SPARQL endpoints and facilitates the exploration of observational LD, thereby playing a crucial role in wildlife conservation efforts.

For more details, please refer to our published paper: [https://doi.org/10.1145/3675759](https://doi.org/10.1145/3675759).

## Key Features
- **User-Friendly Interface:** Combines a GUI with a CUI to simplify the query building process.
- **Accessibility:** Makes observational Linked Data accessible to non-experts.
- **Tailored for Conservation:** Designed specifically for wildlife research and conservation contexts.
- **Validated by Research:** User experiments confirm efficiency and user-friendliness.

## Demo
Explore how ForestQB works through our interactive demo and a detailed walkthrough video:
- **Demo Link:** [Try ForestQB here](https://forestqb.i3omar.com/)
- **Demo Video:** [Watch the demo on YouTube](https://youtube.com/watch?v=0tyDlCxKMRk)

### Dataset
To access the dataset used for developing and testing ForestQB, please visit the following link:
- [ForestQB Dataset](https://github.com/i3omar/ForestRDF)

### Rasa Model
For more information about the conversational model used in ForestQB, visit the Rasa model page:
- [ForestBot (Version 1) - Rasa Model](https://github.com/i3omar/ForestBot/tree/v1)

## Getting Started
### Prerequisite: API Setup

Before running the ForestQB app, you **must install and run the ForestQB API** backend.
You can find the API and setup instructions here: [https://github.com/i3omar/ForestQB-API](https://github.com/i3omar/ForestQB-API)

### Setup Instructions

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


## Citation

If you use this code or dataset in your research, please cite our paper:

```bibtex
@article{10.1145/3675759,
author = {Mussa, Omar and Rana, Omer and Goossens, Benoit and Orozco Ter wengel, Pablo and Perera, Charith},
title = {ForestQB: Enhancing Linked Data Exploration through Graphical and Conversational UIs Integration},
year = {2024},
issue_date = {September 2024},
publisher = {Association for Computing Machinery},
address = {New York, NY, USA},
volume = {2},
number = {3},
url = {https://doi.org/10.1145/3675759},
doi = {10.1145/3675759},
journal = {ACM J. Comput. Sustain. Soc.},
month = sep,
articleno = {32},
numpages = {33},
keywords = {Linked data, SPARQL, RDF, query builder, visual queryin}
}

```
## Contact
For more information or queries regarding ForestQB, please [contact us](https://orcid.org/0000-0001-8614-6550).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
