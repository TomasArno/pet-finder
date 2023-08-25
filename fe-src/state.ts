export const state = {
  data: {},
  listeners: [],

  setJwtTokenInLocalStorage(token: string) {
    localStorage.setItem("token", token);
  },

  async authFetch(input: string, options = {}) {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      // Solo hago lo del token si tengo algo guardado
      // si no existe el objeto headers lo creo
      options["headers"] ||= {};
      options["headers"]["Authorization"] = `bearer ${savedToken}`;
      console.log(options);
    }
    return await fetch(input, options);
  },

  getState() {
    return this.data;
  },

  setState(state) {
    this.data = state;

    for (const cb of this.listeners) {
      cb();
    }
  },

  suscribe(cb: () => {}) {
    this.listeners.push(cb);
  },
};
