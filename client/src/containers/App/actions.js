export function initApp(token) {
  return { type: "INIT_APP" , token };
};

export function setMessage(message) {
  return { type: "SET_MESSAGE", message };
};

export function removeMessage(id) {
  return { type: "REMOVE_MESSAGE", id };
};

export function setLoader(id, data) {
  return { type: "SET_LOADER", id, data };
};
