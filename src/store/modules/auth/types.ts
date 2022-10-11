
export interface User {
  username:String,
  token:String,
  userDetail: any,
}

export interface AuthState{
  user: User,
}