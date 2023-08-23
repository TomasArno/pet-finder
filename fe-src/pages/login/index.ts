import { Router } from "../../router";

customElements.define(
  "login-page",
  class LoginPage extends HTMLElement {
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
        height: 100%;
        padding: 80px 0;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

      }

      .comps-container {
        width: 80%;
        display: flex;
        flex-direction: column;
        row-gap: 70px;
        align-items: center;
      }

      .input-container {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
      }

      .input {
        padding: 0 15px;
        height: 40px;
        border-radius: 10px;

        font-size: 15px;
      }

      .submit-btn {
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
      const sendUbiBtn = this.shadow.querySelector(
        ".send-ubi"
      ) as HTMLButtonElement;

      const howWorkBtn = this.shadow.querySelector(
        ".how-work"
      ) as HTMLButtonElement;

      sendUbiBtn.addEventListener("click", async (e) => {
        const res = await fetch("/nearby-pets");
        const data = await res.json();
        console.log(data);

        // Router.go("/lost-pets");
      });
      howWorkBtn.addEventListener("click", (e) => {
        Router.go("/how-work");
      });
    }

    render() {
      this.shadow.innerHTML = `        
        <main class="main">
            <div class="welcome-container">
                <h1>Iniciar Sesión</h1>
            </div>
            <div class="comps-container">
                <div class="input-container">
                    <input placeholder="Email" class="input" type=text />
                    <input placeholder="Contraseña" class="input" type=password />
                </div>
                <button class="submit-btn">Iniciar Sesión</button>
            </div>
        </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
