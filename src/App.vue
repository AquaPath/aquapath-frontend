<script>
//import FooterContent from './public/components/footer-content.component.vue';
import LanguageSwitcher from "./public/components/language-switcher.component.vue";
export default {
  name: 'App',
  components: {
    LanguageSwitcher,
    //FooterContent
  },
  data() {
    return {
      items: [
        {label: 'option.dashboard', to: '/dashboard'},
        {label: 'option.analytics', to: '/analytics'},
        {label: 'option.reports', to: '/reports'},

      ]
    }
  },
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-Toolbar class="bg-primary px-4 py-2 flex justify-between">
      <template #start>
        <div class="flex items-center gap-2">
          <!--<img src="/logo.png" alt="logo" style="height: 24px" /> -->
          <h3 class="font-bold text-white">Aqua Path</h3>
        </div>
      </template>
      <template #center>
        <div class="flex-column">
          <pv-Button v-for="item in items" :key="item.label" as-child v-slot="slotProps">
            <router-link :to="item.to" :class="slotProps['class']">{{$t(item.label)}}</router-link>
          </pv-Button>
        </div>
      </template>
      <template #end>
        <language-switcher></language-switcher>
      </template>
    </pv-Toolbar>

  </header>
  <main>
    <router-view></router-view>
  </main>
  <!--<footer>
    <footer-content></footer-content>
  </footer>
  -->
</template>
<style scoped>

.my-toolbar {
  background-color: #0055aa;
}
body {
  font-family: system-ui, Arial, sans-serif;
  background-color: #f4f7ff;
  color: #1e293b;
  display: block !important;
}
/* Evitar que todo quede centrado */
#app {
  width: 100%;
  margin: 0;
  padding: 0;
  text-align: left;
}

/* NAVBAR AZUL COMO LA IMAGEN */
header {
  background-color: #1e3a8a;
  color: white;
  padding: 1rem 1rem;


}

.nav-links a {
  color: white;
  margin-left: 1.5rem;
  font-weight: 500;
  text-decoration: none;
}

/* Barra azul */
.p-toolbar {
  background-color: #1e3a8a !important;
  padding: 0.8rem 1rem;
}

/* Contenedor del logo (Aqua Path) */
.nav-logo {
  background-color: #2bbf9c;
  padding: 8px 18px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
}

/* Botones del navbar */
.p-button {
  background: transparent !important;
  border: none !important;
  color: white !important;
  font-weight: 500;
}

/* Router links */
.router-link-active {
  text-decoration: underline;
}

</style>