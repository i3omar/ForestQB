
<template>
  <span>
    <span v-if="!rows.length == 0">
      <h5 class="card-title">Results Table:</h5>
      <hr />
      <table
        ref="result_table_ref"
        id="result_table"
        class="display compact dataTable"
      >
        <thead>
          <tr>
            <th v-for="col in queryResult.head.vars">{{ col }}</th>
          </tr>
        </thead>
        <!-- <tbody>
        <tr v-for="row in tableRows">
          <td v-for="col in tableCols">{{ row[col.data] }}</td>
        </tr>
      </tbody> -->
      </table>
    </span>
    <div v-else class="d-flex justify-content-center mt-100">
      <span
        >Sorry, no results found. &nbsp;
        <svg
          class="bi bi-emoji-frown"
          fill="currentColor"
          height="16"
          viewBox="0 0 16 16"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
          />
          <path
            d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"
          /></svg
      ></span>
    </div>
  </span>
</template>

<script>
import 'datatables.net';
import 'datatables.net-dt/css/jquery.dataTables.css'; // DataTables CSS

export default {
  name: "ResultsComponent",

  data: function () {
    return {
      cols: [],
      rows: [],
    };
  },

  // beforeMount() {
  //     for (let i=0; i<this.queryResult.head.vars.length; i++){
  //         this.cols.push({data: this.queryResult.head.vars[i]})
  //     }
  //
  //     for (let y = 0; y < this.queryResult.results.bindings.length; y++) {
  //         let row = {};
  //         for (let x=0; x<this.cols.length; x++) {
  //             this.row[this.cols[x].data] = this.queryResult.results.bindings[y][this.cols[x].data].value;
  //         }
  //         this.rows.push(row);
  //     }
  // },
  // watch:{
  //     rows(){
  //         $(document).ready( function () {
  //             $('#table_id').DataTable({
  //                 // data: this.rows
  //             });
  //         }).bind(this);
  //     }
  // },
  mounted() {
    // for (let i=0; i<this.queryResult.head.vars.length; i++){
    //     this.cols.push({data: this.queryResult.head.vars[i]})
    // }
    //
    // for (let y = 0; y < this.queryResult.results.bindings.length; y++) {
    //     let row = {};
    //     for (let x=0; x<cols.length; x++) {
    //         this.row[this.cols[x].data] = this.queryResult.results.bindings[y][this.cols[x].data].value;
    //     }
    //     this.rows.push(row);
    // }
    //console.log("cols ", JSON.stringify(this.tableCols));
    //console.log("rows ", JSON.stringify(this.tableRows));

    // $(document).ready( function () {
    // var tbody = $("#result_table tbody");
    // if (tbody.children().length > 0) {

    for (let y = 0; y < this.queryResult.results.bindings.length; y++) {
      let row = [];
      let rowHasValue = false;
      for (let x = 0; x < this.queryResult.head.vars.length; x++) {
        const tempRow =
          this.queryResult.results.bindings[y][this.queryResult.head.vars[x]];
        if (tempRow && tempRow.value && tempRow.value.length != 0) {
          //Check if it has a value
          row.push(tempRow.value);
          rowHasValue = true;
        } else {
          //Does not have a value, just give it an empty value (this usually happens when using union).
          row.push("");
        }
      }
      if (rowHasValue) {
        this.rows.push(row);
      }
    }

    /**
     *  The $nextTick is necessary to ensure Vue has flushed the new data to the DOM, before re-initializing.
     * src: https://stackoverflow.com/questions/51436441/how-to-refresh-datatables-with-new-data-in-vuejs/51471839
     */
    this.$nextTick(() => {
      const thisComponent = this;

      //  this.rows = [];

      //

      this.dt = $(this.$refs.result_table_ref).DataTable({
        // data: this.rrows,
        // columns: this.ccols,
        dom: "Bfrtip",
        buttons: ["copy", "csv", "excel", "print"],
        data: thisComponent.rows,
        deferRender: true,
        scrollX: true,
        scrollY: 400,
        scrollCollapse: true,
        scroller: true,
      });
    });
  },
  watch: {
    queryResult: function () {
      console.log("watch queryResult");
      const thisComponent = this;
      //$('#result_table').data.reload();
      this.dt.destroy();
      this.$nextTick(() => {
        this.dt = $(this.$refs.result_table_ref).DataTable({
          // data: this.rrows,
          // columns: this.ccols,
          dom: "Bfrtip",
          buttons: ["copy", "csv", "excel", "print"],
          data: thisComponent.rows,
          deferRender: true,
          scrollX: true,
          scrollY: 400,
          scrollCollapse: true,
          scroller: true,
        });
      });
    },
  },

  computed: {
    // tableCols() {
    //   //Get the table headings
    //   for (let i = 0; i < this.queryResult.head.vars.length; i++) {
    //     this.cols.push({ data: this.queryResult.head.vars[i] });
    //   }
    //   return this.cols;
    // },
    // tableRows() {
    //Get the table rows
    // this.rows = [];
    // for (let y = 0; y < this.queryResult.results.bindings.length; y++) {
    //   let row = [];
    //   let rowHasValue = false;
    //   for (let x = 0; x < this.queryResult.head.vars.length; x++) {
    //     const tempRow =
    //       this.queryResult.results.bindings[y][this.queryResult.head.vars[x]];
    //     if (tempRow && tempRow.value && tempRow.value.length != 0) {
    //       //Check if it has a value
    //       row.push(tempRow.value);
    //       rowHasValue = true;
    //     } else {
    //       //Does not have a value, just give it an empty value (this usually happens when using union).
    //       row.push("");
    //     }
    //   }
    //   if (rowHasValue) {
    //     this.rows.push(row);
    //   }
    // }
    // console.log("this.rows", this.rows);
    // return this.rows;
    // },
    queryJSON() {
      return this.$store.getters.getQueryJSON;
    },
    sparqlQuery: {
      set(value) {
        this.$store.commit("setSPARQL", value);
      },
      get() {
        return this.$store.getters.getSPARQL;
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
  },
};
</script>

<style scoped>
</style>
