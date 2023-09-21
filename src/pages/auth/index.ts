import { Router } from "../../router";
import { State } from "../../state";

customElements.define(
  "auth-page",
  class AuthPage extends HTMLElement {
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
        padding: 80px 0;
        background-color: grey;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

      }

      .form {
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

    isPageLogin() {
      if (window.location.pathname == "/auth/login") {
        return true;
      } else {
        return false;
      }
    }

    addListeners() {
      const formEl = this.shadow.querySelector(".form") as HTMLFormElement;

      let input: string;

      this.isPageLogin()
        ? (input = "/api/users/login")
        : (input = "/api/users/signup");

      formEl.addEventListener("submit", async (e) => {
        const email = formEl.email.value;
        const password = formEl.password.value;

        e.preventDefault();

        const res = await fetch(process.env.API_BASE_URL + input, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (res.status == 201 || res.status == 200) {
          const { token } = await res.json();
          State.setJwtTokenInLocalStorage(token);

          const response = await State.authFetch(
            `${process.env.API_BASE_URL}/api/users/me`
          );
          const cs = State.getState;

          if (response.status == 200) {
            const { userId, email } = await response.json();

            State.setState = { ...cs, userId, email };

            Router.go("/lost-pets");
          } else {
            Router.go("/auth/login");
          }
        }
      });
    }

    render() {
      let title: string;
      let redirectBtn: string;
      let hrefContent: string;
      let urlHref: string;

      if (this.isPageLogin()) {
        title = "Iniciar Sesión";
        redirectBtn = "¿No tienes cuenta todavía?";
        hrefContent = "Registrate";
        urlHref = "/auth/signup";
      } else {
        title = "Registrarse";
        redirectBtn = "¿Ya tienes una cuenta?";
        hrefContent = "Inicia Sesión";
        urlHref = "/auth/login";
      }

      this.shadow.innerHTML = `        
        <main class="main">
            <div class="welcome-container">
                <h1>${title}</h1>
            </div>

            <form class="form" >
              <div class="input-container">
                <input placeholder="Email" autocomplete="email" class="input" name="email" type="email" required />
                <input placeholder="Contraseña" class="input" name="password" type="password" required />
                <p class="form_signup-redirect">${redirectBtn} <a href="${urlHref}">${hrefContent}</a></p>
              </div>
              <button type=submit class="submit-btn">Acceder</button>
            </form>
        </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
