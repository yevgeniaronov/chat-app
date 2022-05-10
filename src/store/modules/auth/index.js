import api from "@/api";
import { SIGN_UP } from "./consts";

export default {
  state: {
    authUserId: "",
  },
  actions: {
    [SIGN_UP]: ({ commit }, { name }) => {
      return new Promise((resolve, rej) => {
        api
          .post(`users`, { name })
          .then(({ userId }) => {
            commit(SIGN_UP, userId);
            resolve(userId);
          })
          .catch((err) => {
            rej(err);
          });
      });
    },
  },
  getters: {
    authUserId: (state) =>
      state.authUserId || localStorage.getItem("app-authUserId"),
    isAuth: (state, getters) => !!getters.authUserId,
  },
  mutations: {
    [SIGN_UP]: (state, userId) => {
      state.authUserId = userId;
      localStorage.setItem("app-authUserId", userId);
    },
  },
};
