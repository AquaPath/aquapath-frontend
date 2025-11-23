<script>
const defaultStyle = {width: '400px'}

export default {
  name: "create-and-edit",
  props: {
    entity: {
      type: Object,
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    },
    entityName: {
      type: String,
      default: ""
    },
    edit: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'default'
    }
   },
  emits: ['save-action-requested', 'cancel-action-requested'],
  methods: {
    getHeaderTitle(){
      return `${this.edit ? 'Edit' : `New`} ${this.entityName}`;
    },
    getSubmitLabel() {
      return this.edit ? 'Update' : 'Create';
    },
    onSave(){
      console.log("OnSave todo bien");
      this.$emit('save-action-requested', this.entity);
    },
    onCancel(){
      this.$emit('cancel-action-requested');
    },
    getDialogStyle(){
      let dialogStyle = defaultStyle;
      dialogStyle = this.size === 'standard' ? {width: '600px'} : dialogStyle;
      dialogStyle = this.size === 'large' ? {width: '900px'} : dialogStyle;
      return dialogStyle;
    }
  }
}
</script>

<template>
  <pv-Dialog v-bind:visible="visible" :modal="true" :style="getDialogStyle()" class="p-fluid" :header="entityName">
      <template #header>
        <div class="flex justify-content-start">
          <div>{{getHeaderTitle()}}</div>
        </div>
      </template>
      <slot name="content"></slot>
      <template #footer>
        <div class="flex justify-content-end">
          <pv-Button type="button" :label="getSubmitLabel()" class="p-button-text" icon="pi pi-check" @click="onSave"/>
          <pv-Button type="button" label="Cancel" severity="secondary" class="p-button-text" icon="pi pi-times" @click="onCancel"/>
        </div>
      </template>
  </pv-Dialog>
</template>
<style scoped></style>