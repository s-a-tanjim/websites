export const state = () => ({
  DB_NAME: "darktabdb",
  DB_VERSION: 1,
  indexedDdexedDB: null,
  dataBase: null
})

export const mutations = {
  setIndexedDB: (state) => {
    state.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
  },
  setDB: (state, data) => {
    state.dataBase = data;
  }
}

export const actions = {
  async functionCaller({
    commit,
    dispatch,
    state
  }, data) {
    try {
      if (!state.indexedDB) {
        commit("setIndexedDB")
        if (!state.indexedDB) {
          console.log(`Your browser doesn't support IndexedDB`);
          return;
        }
      }
      await dispatch(data.func, data.data)
      /*
      commit("setJWTInfo", {
        JWTToken: idToken,
      }, {
        root: true
      });
      */
    } catch (err) {
      console.log('Error while storing data! ', err)
    }
  },
  async getDB({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {

      let request = window.indexedDB.open(state.DB_NAME, state.DB_VERSION);

      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };

      request.onsuccess = e => {
        commit("setDB", e.target.result);
        resolve(e.target.result);
      };

      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore("allTasks", {
          autoIncrement: true,
          keyPath: 'id'
        });
      };
    });
  },
  async getTaskDataFromIndexedDB({
    dispatch
  }) {
    let db = await dispatch("getDB");

    return new Promise(resolve => {

      let trans = db.transaction(['allTasks'], 'readonly');
      trans.oncomplete = () => {
        resolve(allTaskData);
      };

      let store = trans.objectStore('allTasks');
      let allTaskData = [];

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          allTaskData.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },
  async addTaskType({
    dispatch
  }, data) {
    let db = await dispatch("getDB");

    return new Promise((resolve) => {

      let trans = db.transaction(['allTasks'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('allTasks');
      store.put(data);
    })
  },
  async removeTaskType({
    dispatch
  }, data) {
    let db = await dispatch("getDB");

    return new Promise(resolve => {

      let trans = db.transaction(['allTasks'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };
      let store = trans.objectStore('allTasks');
      store.delete(data);
    });
  },
  async addTask({
    dispatch
  }, data) {
    let db = await dispatch("getDB");

    return new Promise(resolve => {
      let trans = db.transaction(['allTasks'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('allTasks');

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          if (cursor.value.id == data.typeId) {
            let x = cursor.value;
            x.tasks.push(data.data);
            cursor.update(x);
          }
          cursor.continue();
        }
      };
    });
  },
  async removeTask({
    dispatch
  }, data) {
    console.log(data);
    let db = await dispatch("getDB");

    return new Promise(resolve => {
      let trans = db.transaction(['allTasks'], 'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('allTasks');

      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          if (cursor.value.id == data.typeId) {
            let x = cursor.value;
            let find = x.tasks.find(val => val.id == data.data.id)
            let delIndex = x.tasks.indexOf(find);
            x.tasks.splice(delIndex, 1);
            cursor.update(x);
          }
          cursor.continue();
        }
      };
    });
  }
}
