import { Router } from "../../router";
import { State } from "../../state";

customElements.define(
  "welcome-page",
  class WelcomePage extends HTMLElement {
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
        justify-content: space-around;
      }
      
      .header_logo-img {
        height: 30px;
      }
      
      .welcome-container {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      
        font-size: 20px;
        text-align: center;
      }
      
      .welcome-container p {
        font-size: 25px;
        width: 265px;
      }
      
      .buttons-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }

      .comps-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }
      
      .button {
        background-color: rebeccapurple;
        border-color: rebeccapurple;
        border-radius: 10px;
        color: rgb(255, 255, 255);
        height: 40px;
        width: 220px;
        font-size: 15px;
      }
      
      @media (min-width: 1023px) {
        .button {
          height: 55px;
          width: 250px;
          font-size: 20px;
        }
      }
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const sendUbiBtn = this.shadow.querySelector(
        ".send-ubi"
      ) as HTMLButtonElement;

      sendUbiBtn.addEventListener("click", (e) => {
        State.getCurrentLocation(() => Router.go("/auth/login"));
      });
    }

    render() {
      this.shadow.innerHTML = `
      <header-comp></header-comp>

      <main class="main">
        <div class="main_img-container">
          <img src="https://res.cloudinary.com/dy4or1hqa/image/upload/v1693850987/undraw_beach_day_cser_1_zxqbmr.svg" alt="" />
        </div>

        <div class="welcome-container">
          <h1>Pet Finder App</h1>
          <p>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
        </div>

        <div class="buttons-container">
          <div class="comps-container">
            <button class="send-ubi button">Dar mi ubicación actual</button>
          </div>
        </div>
      </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
