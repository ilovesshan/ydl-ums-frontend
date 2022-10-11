
export interface IUser {
  username:String,
  token:String,
  userDetail: any,
}

export interface IAuthState{
  user: IUser,
}