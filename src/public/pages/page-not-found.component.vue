<script>
export default {
  name : "page-not-found",
  title: "Page not found",
  data() {
    return {
      unavailableRoute: null
    }
  },
  created(){
    this.unavailableRoute= "ruta ";
  }
}
</script>
<template>
  <div class="w-full">
    <h1> Page not found
    </h1>
    <p>
      The path {{unavailableRoute}} is not available.
    </p>

  </div>
</template>