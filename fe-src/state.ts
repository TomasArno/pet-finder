export const state = {
  data: {},
  listeners: [],

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
