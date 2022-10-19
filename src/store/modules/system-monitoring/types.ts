
interface IAccessLog {
  list: any[]
}

interface IOnlineUser {
  list: any[]
}


interface ISystemMonitoring {

  accessLog: IAccessLog,

  onlineUser: IAccessLog,
}

export {  ISystemMonitoring }
