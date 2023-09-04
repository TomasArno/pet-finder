import { Router } from "../../router";

customElements.define(
  "lost-page",
  class LostPetsPage extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
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

    render() {
      this.shadow.innerHTML = `
      <header-comp></header-comp>
      
      <main class="main">
        <div class="carousell">
          <card-comp></card-comp>
        </div>
      </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
