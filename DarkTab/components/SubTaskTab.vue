<template>
  <div>
    <table>
      <thead>
        <td>Tasks</td>
      </thead>
      <tbody>
        <tr
          v-for="(data, i) in $store.state.allTaskData[selectedTypeIndex].tasks"
          v-bind:key="i"
        >
          <td class="task-typ-td">
            <div>{{ data.msg }}</div>
            <button class="task-cls-btn" @click="removeFromList(data)">
              <span>&#10006;</span>
            </button>
          </td>
        </tr>
        <tr>
          <td v-if="!showInputField">
            <button class="default-btn" @click="showInputField = true">
              +
            </button>
          </td>
          <td v-else>
            <taskinput @press-enter="addTask" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Taskinput from "./common/taskinput.vue";
import SubTaskTab from "./SubTaskTab.vue";
export default {
  components: { SubTaskTab, Taskinput },
  props: ["selectedtypeId", "selectedTypeIndex"],
  data() {
    return {
      showInputField: false,
    };
  },
  methods: {
    addTask(data) {
      if (data) {
        console.log(data);
        this.$store.dispatch("addTask", {
          data,
          index: this.selectedTypeIndex,
          typeId: this.selectedtypeId,
        });
      }
      this.showInputField = false;
    },
    removeFromList(data) {
      console.log(data);
      this.$store.dispatch("removeTask", {
        data,
        index: this.selectedTypeIndex,
        typeId: this.selectedtypeId,
      });
    },
  },
};
</script>

<style scoped>
</style>