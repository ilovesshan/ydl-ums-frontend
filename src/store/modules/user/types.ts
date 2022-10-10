
export interface User {
  username:String,
  token:String,
  isLogin: Boolean,
}

export interface UserState{
  user: User,
}