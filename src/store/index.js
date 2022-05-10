import { createStore } from "vuex";
import auth from "./modules/auth";
import appShell from "./modules/app-shell";
export default createStore({
  modules: {
    auth,
    appShell,
  },
});
