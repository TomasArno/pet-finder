import { Router } from "./router";

export abstract class State {
  private static _data = {
    currentPosition: [0, 0],
    userId: "",
    email: "",
    myPets: [],
    petSelected: {},
  };

  private static listeners: [] = [];

  static setJwtTokenInLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }

  private static deleteJwtTokenInLocalStorage() {
    localStorage.removeItem("token");
  }

  static async authFetch(input: string, options = {}) {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      options["headers"] ||= {};
      options["headers"]["Authorization"] = `bearer ${savedToken}`;
    }
    return await fetch(input, options);
  }

  private static deleteState() {
    for (const prop in this._data) {
      this._data[prop] = "";
    }
  }

  static deleteUserInfo() {
    this.deleteJwtTokenInLocalStorage();
    this.deleteState();
    Router.go("/");
  }

  static getCurrentLocation(cb?: () => void) {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState = {
        ...this.getState,
        currentPosition: [position.coords.latitude, position.coords.longitude],
      };

      cb();
    });
  }

  static get getState() {
    return this._data;
  }

  static set setState(state) {
    this._data = state;

    for (const cb of this.listeners) {
      cb();
    }
  }

  static parsePetArray(petArray, location = "lost-pets"): string {
    if (!petArray) {
      return null;
    } else {
      return petArray
        .map((pet) => {
          return `<card-comp pageLocation='${location}' petId='${pet.id}' petName='${pet.name}' petImg='${pet.imgURL}'></card-comp>`;
        })
        .join(" ");
    }
  }

  static suscribe(cb: () => void) {
    this.listeners.push(cb);
  }
}
