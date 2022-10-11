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
    return JSON.parse(window.sessionStorage.getItem(key) || "");
  },

  remove(key: string): void {
    return window.sessionStorage.removeItem(key);
  }
}