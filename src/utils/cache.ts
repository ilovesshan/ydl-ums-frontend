export default {

  saveSessionString(key: string, value: string): void {
    window.sessionStorage.setItem(key, value);
  },

  getSessionString(key: string): string {
    return window.sessionStorage.getItem(key) || "";
  },

  saveSessionObject(key: string, value: any): void {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  
  getSessionObject(key: string): any {
    const data =  window.sessionStorage.getItem(key);
    return data ? JSON.parse(data) :"";
  },

  remove(key: string): void {
    return window.sessionStorage.removeItem(key);
  }
}