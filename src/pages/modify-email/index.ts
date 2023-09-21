import { Router } from "../../router";
import { State } from "../../state";

customElements.define(
  "modify-email-page",
  class ModifyEmailPage extends HTMLElement {
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
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
    }

    .form {
      display: flex;
      flex-direction: column;
      row-gap: 140px;
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
      const formEl = this.shadow.querySelector(".form") as HTMLFormElement;

      formEl.addEventListener("submit", async (e) => {
        e.preventDefault();

        const { userId } = State.getState;
        const oldEmail = formEl.oldEmail.value;
        const newEmail = formEl.newEmail.value;

        const res = await State.authFetch(
          `${process.env.API_BASE_URL}/api/users/${userId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              oldEmail,
              newEmail,
            }),
          }
        );

        if (res.status == 200) {
          res
            .json()
            .then((data) => {
              return data;
            })
            .then((msg) => console.log(msg));

          Router.go("/profile");
        }
      });
    }

    render() {
      this.shadow.innerHTML = `
      <header-comp></header-comp>

      <main class="main">
        <h1>Mi Email</h1>

        <form class="form">
          <div class="input-container">
          <input placeholder="Anterior Email" autocomplete="email" class="input" name="oldEmail" type="email" required />
          <input placeholder="Nuevo Email" autocomplete="email" class="input" name="newEmail" type="email" required />
          </div>

          <button type=submit class="submit-btn">Guardar</button>
        </form>

      </main>
    
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
