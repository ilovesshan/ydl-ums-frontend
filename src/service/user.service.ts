import service from "./service";


export function selectList(){
  return service({
    method: "get",
    url:"/test",
  });
}