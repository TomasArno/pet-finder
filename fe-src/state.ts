export const state = {
  data: {
    userId: "",
  },
  listeners: [],

  setJwtTokenInLocalStorage(token: string) {
    localStorage.setItem("token", token);
  },

  deleteJwtTokenInLocalStorage() {
    localStorage.removeItem("token");
  },

  async authFetch(input: string, options = {}) {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      options["headers"] ||= {};
      options["headers"]["Authorization"] = `bearer ${savedToken}`;
    }
    return await fetch(input, options);
  },

  getState() {
    return this.data;
  },

  setState(state) {
    this.data = state;

    console.log(state);

    for (const cb of this.listeners) {
      cb();
    }
  },

  suscribe(cb: () => {}) {
    this.listeners.push(cb);
  },
};
