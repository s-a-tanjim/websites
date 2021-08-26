<template>
  <form v-on:submit.prevent="$emit('press-enter', inputData)">
    <input
      type="text"
      ref="taskinput"
      v-model="inputData"
      @blur="$emit('blur', inputData)"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      inputData: "",
    };
  },
  mounted() {
    this.$refs.taskinput.focus();
  },
};
</script>

<style>
</style>