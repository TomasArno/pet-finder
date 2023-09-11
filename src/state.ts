import { Router } from "./router";

export const state = {
  data: {
    userId: "",
    email: "",
  },
  listeners: [],

  setJwtTokenInLocalStorage(token: string) {
    localStorage.setItem("token", token);
  },

  deleteJwtTokenInLocalStorage() {
    localStorage.removeItem("token");
    Router.go("/auth/login");
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

    for (const cb of this.listeners) {
      cb();
    }
  },

  parsePetArray(petArray) {
    return petArray
      .map((pet) => {
        return `<card-comp petName='${pet.name}' petImg='${pet.imgURL}'></card-comp>`;
      })
      .join(" ");
  },

  suscribe(cb: () => void) {
    this.listeners.push(cb);
  },
};
