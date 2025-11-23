<script>
import {FilterMatchMode} from '@primevue/core/api';
export default {
  name: "data-manager",
  inheritAttrs: false,
  props:{
    title: {type: {singular:'' , plural:''},
          required: true
        },
    items: {type: Array, required: true},
    dynamic: {type: Boolean, default: false},
    columns: {type: Array, default: []},
  },
  emits: ['new-item-requested','delete-item-requested', 'edit-item-requested',
    'delete-selected-items-requested'],
  data () {
    return {
      selectedItems: [],
      filters: null
    }
  },
  methods: {
    newItem() {
      this.$emit('new-item-requested');
    },
    editItem(item) {
      this.$emit('edit-item-requested', item);
    },
    confirmDeleteItem(item) {
      console.log("confirm Delete item");
      this.$confirm.require({
        message: `Are you sure you want to delete this ${this.title.singular}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-item-requested', item),
        reject:       () => {}
      })
    },
    confirmDeleteSelected()
    {
      this.$confirm.require({
        message:      `Are you sure you want to delete the selected ${this.title.plural}?`,
        header:       'Confirmation',
        icon:         'pi pi-exclamation-triangle',
        rejectClass:  'p-button-secondary p-button-outlined',
        rejectLabel:  'Cancel',
        acceptLabel:  'Delete',
        acceptClass:  'p-button-danger',
        accept:       () => this.$emit('delete-selected-items-requested', this.selectedItems),
        reject:       () => {}
      });
    },
    exporttoCsv(){
      this.$refs.dt.exportCSV();
    }
  },
  created() {
    this.filters = {global: {value: null, matchMode: FilterMatchMode.CONTAINS}};
  }
}
</script>
<template>
  <h3>Manager {{title.plural}}</h3>
  <pv-Toolbar class="mb-4">
    <template #start>
      <pv-Button class="mr-2" icon="pi pi-plus" label="New" severity="success" @click ="newItem"></pv-Button>
      <pv-Button class="mr-2" icon="pi pi-trash" label="Delete" severity="danger"
                 :disabled="!selectedItems || !selectedItems.length"
                 @click="confirmDeleteSelected"></pv-Button>
    </template>
    <template #end>
      <pv-Button  class="mr-2" icon="pi pi-download" label="Export" severity="help" @click="exporttoCsv($event)"></pv-Button>
    </template>
  </pv-Toolbar>

  <pv-data-table ref="dt"
                 v-model:selection="selectedItems"
                 :filters="filters"
                 :paginator="true"
                 :rows="10"
                 :rows-per-page-options="[5,10,10]"
                 :value="items"
    current-page-report-template="Showing {first} to {last} of {totalRecords} ${{title.plural}}"
                 data-key="id"
                 paginator-template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown">
    <pv-column :exportable="false" selection-mode="multiple" style="width: 3rem"/>
    <slot name="custom-columns"></slot>
    <pv-column v-if="dynamic" v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"/>
    <pv-column :exportable="false" style="min-width:8rem">
      <template #body="slotProps">
        <pv-Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editItem(slotProps.data)"/>
        <pv-Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteItem(slotProps.data)"/>
      </template>
    </pv-column>
  </pv-data-table>

</template>
<style scoped>
</style>