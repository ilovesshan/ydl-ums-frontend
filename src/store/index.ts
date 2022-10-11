import {createStore } from "vuex"
import type {Store } from "vuex"

import type { IRootState } from "./types"

import authModule from "./modules/auth";

const store:Store<IRootState> = createStore<IRootState>({
  state:{
    version:"0.0.1",
  },
  modules: {
    auth: authModule
  },
})
export default store;