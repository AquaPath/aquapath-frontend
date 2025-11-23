import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from './i18n.js'
import PrimeVue from 'primevue/config';
import SelectButton from 'primevue/selectbutton';
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

import {
    Card,
    Checkbox,
    Column,
    ConfirmationService,
    ConfirmDialog,
    DataTable,
    DialogService,
    Drawer,
    FileUpload,
    FloatLabel,
    IconField,
    InputIcon,
    InputNumber,
    InputText,
    Menu,
    Rating,
    Row,
    Select,
    Tag,
    Textarea,
    Toast,
    ToastService,
} from "primevue";


import router from "./router/index.js";
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import Material from '@primeuix/themes/material';
import pinia from "./pinia.js";
//import "primevue/resources/themes/aura-light-blue/theme.css";

const app = createApp(App)
app.use(i18n);
app.use(PrimeVue, {theme: { preset: Material}, ripple: true});
app.use(router);
app.use(pinia);
app.use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
app.component('pv-Toolbar', Toolbar);
app.component('pv-Button', Button);
app.component('pv-SelectButton', SelectButton);
app.component('pv-Dialog', Dialog);
app.component('pv-card',           Card)
    .component('pv-column',         Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox',       Checkbox)
    .component('pv-data-table',     DataTable)
    .component('pv-select',         Select)
    .component('pv-file-upload',    FileUpload)
    .component('pv-float-label',    FloatLabel)
    .component('pv-icon-field',     IconField)
    .component('pv-input-icon',     InputIcon)
    .component('pv-input-text',     InputText)
    .component('pv-input-number',   InputNumber)
    .component('pv-menu',           Menu)
    .component('pv-rating',         Rating)
    .component('pv-row',            Row)
    .component('pv-drawer',         Drawer)
    .component('pv-tag',            Tag)
    .component('pv-textarea',       Textarea)
    .component('pv-toast',          Toast)
app.mount('#app')
