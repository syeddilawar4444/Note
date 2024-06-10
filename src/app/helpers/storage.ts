

type Storage = {
  key:string;
  value?:any;
}
  // To set an item in local Storage
  export const setLocalStorageItem = ({key, value}:Storage) => {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
  };
  
  // To get an item from local Storage
  export const getLocalStorageItem = (key:string) => {
    if (typeof window !== 'undefined') {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  };
  
  // To remove an item from local Storage
  export const removeLocalStorageItem = ({key}:Storage) => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  };
  
  // To clear all items from local Storage
  export const clearAllLocalStorageItems = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
    }
  };
  