import { Router } from "./router";

export const state = {
  data: {
    userId: "",
    email: "",
    myPets: [],
    petSelected: {},
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

  deleteState() {
    for (const prop in this.data) {
      this.data[prop] = "";
    }
  },

  logOut() {
    this.deleteJwtTokenInLocalStorage();
    this.deleteState();
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

  parsePetArray(petArray, location = "lost-pets"): string {
    return petArray
      .map((pet) => {
        return `<card-comp pageLocation='${location}' petId='${pet.id}' petName='${pet.name}' petImg='${pet.imgURL}'></card-comp>`;
      })
      .join(" ");
  },

  suscribe(cb: () => void) {
    this.listeners.push(cb);
  },
};
