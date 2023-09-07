import { Router } from "../../router";
import { state } from "../../state";

customElements.define(
  "lost-page",
  class LostPetsPage extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      state.suscribe(() => {
        this.render();
      });

      const updateState = state.getState();
      state.setState(updateState);
    }

    addStyles() {
      const stylesEl = document.createElement("style");

      stylesEl.innerHTML = `

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      .main {
        background-color: grey;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .carousell {
        height: 95%;
        display:flex;
        flex-direction: column;
        row-gap: 25px;
        overflow: scroll;

      }
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      //   const sendUbiBtn = this.shadow.querySelector(
      //     ".send-ubi"
      //   ) as HTMLButtonElement;
      //   const howWorkBtn = this.shadow.querySelector(
      //     ".how-work"
      //   ) as HTMLButtonElement;
      //   sendUbiBtn.addEventListener("click", (e) => {
      //     Router.go("/lost-pets");
      //   });
      //   howWorkBtn.addEventListener("click", (e) => {
      //     Router.go("/how-work");
      //   });
    }

    async fetchPetData() {
      const res = await state.authFetch(`${process.env.API_BASE_URL}/api/pets`);

      return await res.json();
    }

    async render() {
      const allPets = await this.fetchPetData();
      const parsedPetArray = state.parsePetArray(allPets);

      this.shadow.innerHTML = `
      <header-comp></header-comp>
      
      <main class="main">
        <div class="carousell">
          ${parsedPetArray}
        </div>
      </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
