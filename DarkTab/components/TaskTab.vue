<template>
  <div class="flex-container">
    <div class="task-type-container">
      <table>
        <thead>
          <td>Categories</td>
        </thead>
        <tbody>
          <tr v-for="(data, i) in $store.state.allTaskData" v-bind:key="i">
            <td
              class="task-typ-td"
              :class="{ 'selected-task-typ': data.id == selectedType }"
            >
              <div @click="selectTaskType(data.id, i)">{{ data.msg }}</div>
              <button
                class="task-cls-btn"
                :class="{ 'selected-task-typ': data.id == selectedType }"
                @click="removeFromList(data)"
              >
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
              <taskinput @press-enter="addTaskType" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="task-container">
      <div v-if="selectedType != null">
        <sub-task-tab
          :selectedtypeId="selectedType"
          :selectedTypeIndex="selectedTypeIndex"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Taskinput from "./common/taskinput.vue";
import SubTaskTab from "./SubTaskTab.vue";
export default {
  components: { SubTaskTab, Taskinput },
  data() {
    return {
      selectedType: null,
      selectedTypeIndex: null,
      showInputField: false,
    };
  },
  methods: {
    addTaskType(data) {
      if (data) {
        this.$store.dispatch("addTaskType", data);
      }
      this.showInputField = false;
    },
    selectTaskType(id, index) {
      this.selectedType = id;
      this.selectedTypeIndex = index;
    },
    removeFromList(data) {
      let id = data.id;
      this.$store.dispatch("removeTaskType", data);
      if (id == this.selectedType) {
        this.selectedType = null;
        this.selectedTypeIndex = null;
      }
    },
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
}
.task-type-container {
  flex: 1;
}
.task-type-container{
  width: 40%;
}
.task-container {
  width: 60%;
}
.task-typ-td div{
  padding: 10px;
}
</style>