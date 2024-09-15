export default {
  setLocalStorage(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  getLocalStorage(key) {
    const value = window.localStorage.getItem(key);
    if (value) return JSON.parse(value);
  },
  removeLocalStorage(key) {
    window.localStorage.removeItem(key);
  },
  clearLocalStorage() {
    window.localStorage.clear();
  },
  setSessionStorage(key, value) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  },
  getSessionStorage(key) {
    const value = window.sessionStorage.getItem(key);
    if (value) return JSON.parse(value);
  },
  removeSessionStorage(key) {
    window.sessionStorage.removeItem(key);
  },
  clearSessionStorage() {
    window.sessionStorage.clear();
  },
  clearBoth() {
    this.clearLocalStorage();
    this.clearSessionStorage();
  },
};
//  new storageCache();
