<template>
  <div>
    <component :is="view" />
  </div>
</template>

<script>
import mainTable from "./components/mainTable.vue";

export default {
  name: "App",
  components: { mainTable },
  data: () => ({
    view: "mainTable"
  })
};
</script>

<style scoped></style>
