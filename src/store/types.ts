import type { IAuthState } from "@/store/modules/auth/types"

export interface RootState {
  version: String;
}

export interface IRootState extends RootState{
  auth:IAuthState,
}