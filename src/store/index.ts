import { createStore } from "vuex"
import type { Store } from "vuex"

import type { RootState } from "./types"

import authModule from "./modules/auth";
import systemMonitoringModule from "./modules/system-monitoring";

const store: Store<RootState> = createStore<RootState>({
  state: {
    version: "0.0.1",
  },
  modules: {
    auth: authModule,
    systemMonitoring: systemMonitoringModule,
  },
})
export default store;