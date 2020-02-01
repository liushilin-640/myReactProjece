const localStorage =window.localStorage;
export function setItem(key,value){
  value = JSON.stringify(value);
  localStorage.setItem(key,value)
}
export function getItem(key){
  const value = localStorage.getItem(key);
  return JSON.parse(value)
}
export function removeItem(key){
  localStorage.removeItem(key)
}