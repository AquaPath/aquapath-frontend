<script>
export default {
  name : "language-switcher",
  data() {
    return {
      languages: [],
    }
  },
  created() {
    this.languages = this.$i18n.availableLocales;
  }
}
</script>
<template>
  <pv-SelectButton v-model="$i18n.locale" :options="languages">
  </pv-SelectButton>

</template>