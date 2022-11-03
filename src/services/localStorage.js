export const getItemOnStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

export const setItemOnStorage = (key, data) => {
  const dataToSave = JSON.stringify(data);
  localStorage.setItem(key, dataToSave);
};
