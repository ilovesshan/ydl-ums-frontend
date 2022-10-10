interface IServiceConfig {
  devBaseUrl:String,
  devTimeout:number,
  prodBaseUrl: String,
  prodTimeout: number,
}

const ServiceConfig : IServiceConfig = {
  devBaseUrl:"http://localhost/usm",
  devTimeout: 5000,
  
  prodBaseUrl:"http://ilovesshan.com/ums",
  prodTimeout: 5000,
}

export default ServiceConfig;