
export interface IUser {
  username:String,
  token:String,
  userDetail: any,
}

export interface IPermission {
  roles: string[];
  permissions: string[];
  rolesAndPermissions: any;
}

export interface IAuthState{
  user: IUser,
  permission: IPermission,
}