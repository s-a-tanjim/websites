export const state = () => ({
  allTaskData: []
})

export const mutations = {
  setInitialTaskData: (state, data) => {
    state.allTaskData = data;
  },
  addTaskType: (state, data) => {
    state.allTaskData.push(data);
  },
  removeTaskType: (state, x) => {
    state.allTaskData.splice(x, 1);
  },
  addTask(state, data) {
    state.allTaskData[data.index].tasks.push(data.data);
  },
  removeTask(state, data) {
    state.allTaskData[data.index].tasks.splice(data.data, 1);
  }

}

export const actions = {
  async initialCall({
    commit,
    dispatch
  }) {
    let data = await dispatch("indexedDB/getTaskDataFromIndexedDB", null, {
      root: true
    });
    commit("setInitialTaskData", data);

  },
  addTaskType({
    commit,
    dispatch
  }, data) {
    var x = {
      msg: data,
      id: (new Date()).getTime(),
      tasks: [],
    };
    commit("addTaskType", x);
    dispatch("indexedDB/functionCaller", {
      func: "addTaskType",
      data: x
    }, {
      root: true
    });
  },
  removeTaskType({
    state,
    commit,
    dispatch
  }, data) {
    let x = state.allTaskData.indexOf(data);
    if (x > -1) {
      dispatch("indexedDB/functionCaller", {
        func: "removeTaskType",
        data: data.id
      }, {
        root: true
      });
      commit("removeTaskType", x)
      return true;
    }
    return false
  },
  addTask({
    state,
    commit,
    dispatch
  }, data) {
    var x = {
      msg: data.data,
      id: (new Date()).getTime(),
    };
    dispatch("indexedDB/functionCaller", {
      func: "addTask",
      data: {
        data: x,
        index: data.index,
        typeId: data.typeId
      }
    }, {
      root: true
    });
    commit("addTask", {
      data: x,
      index: data.index
    })
  },
  removeTask({
    state,
    commit,
    dispatch
  }, data) {
    let x = state.allTaskData[data.index].tasks.indexOf(data.data);
    if (x > -1) {
      dispatch("indexedDB/functionCaller", {
        func: "removeTask",
        data
      }, {
        root: true
      });

      commit("removeTask", {
        data: x,
        index: data.index
      })
      return true;
    }
    return false
  }
}
