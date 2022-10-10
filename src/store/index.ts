import {createStore } from "vuex"
import type {Store } from "vuex"

import type { RootState } from "./types"

import userModule from "./modules/user";

const store:Store<RootState> = createStore<RootState>({
  state:{
    version:"0.0.1",
  },
  modules: {
    user: userModule
  },
})
export default store;