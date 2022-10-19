
interface IAccessLog {
  list: any[],
  total: number,
}

interface IOnlineUser {
  list: any[]
  total: number,
}


interface ISystemMonitoring {

  accessLog: IAccessLog,

  onlineUser: IAccessLog,
}

export { ISystemMonitoring }
