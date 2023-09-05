import { Router } from "../../router";
import { state } from "../../state";

customElements.define(
  "profile-page",
  class ProfilePage extends HTMLElement {
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
            padding: 80px 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
        }

        .buttons-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 20px;
        }

        .btn {
            background-color: rebeccapurple;
            border-color: rebeccapurple;
            border-radius: 10px;
            color: rgb(255, 255, 255);
            height: 40px;
            width: 220px;
            font-size: 15px;
          }
      
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const emailBtnEl = this.shadow.querySelector(
        ".form_button-email"
      ) as HTMLButtonElement;
      const passBtnEl = this.shadow.querySelector(
        ".form_button-password"
      ) as HTMLButtonElement;
      const logoutBtnEl = this.shadow.querySelector(
        ".form_button-logout"
      ) as HTMLButtonElement;

      emailBtnEl.addEventListener("click", (e) => {
        Router.go("/profile/email");
      });

      passBtnEl.addEventListener("click", (e) => {
        Router.go("/profile/password");
      });

      logoutBtnEl.addEventListener("click", (e) => {
        state.deleteJwtTokenInLocalStorage();
        Router.go("/");
      });
    }

    render() {
      this.shadow.innerHTML = `
      <header-comp></header-comp>

      <main class="main">
        <h1>Mis datos</h1>

        <div class="buttons-container">
            <button class="form_button-email btn" button">Modificar Email</button>
            <button class="form_button-password btn">Modificar Contraseña</button>
        </div>

        <div class="logout-container">
            <button class="form_button-logout btn">Cerrar Sesión</button>
        </div>

      </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
