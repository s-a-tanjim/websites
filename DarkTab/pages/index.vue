<template>
  <div>
    <client-only>
      <clock />
      <div class="task-manager-container">
        <div style="text-align: center">
          <h3>Task Manager</h3>
        </div>
        <task-tab />
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("initialCall");
  },
};
</script>
<style scoped>
.task-manager-container {
  margin: 60px auto;
  max-width: 80%;
}
</style>
