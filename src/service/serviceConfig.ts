interface IServiceConfig {
  devProxyBaseUrl:string,
  devBaseUrl:string,
  devTimeout:number,
  prodProxyBaseUrl:string,
  prodBaseUrl: string,
  prodTimeout: number,
}

const ServiceConfig : IServiceConfig = {
  devProxyBaseUrl:"/api/ums",
  devBaseUrl:"http://localhost/usm",
  devTimeout: 8000,
  
  prodProxyBaseUrl:"/api/ums",
  prodBaseUrl:"http://ilovesshan.com/ums",
  prodTimeout: 5000,
}

export default ServiceConfig;