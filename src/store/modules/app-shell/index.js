import { TOGGLE_GLOBAL_LOADER } from "./consts";

export default {
  state: {
    loadingCounter: 0,
  },
  getters: {
    isLoading: (state) => state.loadingCounter > 0,
  },
  mutations: {
    [TOGGLE_GLOBAL_LOADER]: (state, data) => {
      if (data) {
        state.loadingCounter++;
      } else {
        state.loadingCounter--;
      }
    },
  },
};
