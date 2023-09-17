import { state } from "../../state";

customElements.define(
  "send-alert-comp",
  class SendAlertComp extends HTMLElement {
    shadow: ShadowRoot;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
      this.render();
    }

    addStyles() {
      const stylesEl = document.createElement("style");

      stylesEl.innerHTML = `
      .scrolldown-menu {
        background-color: rgb(1, 15, 96);
        color: white;
        border-radius: 10px;
        
        width: 400px;
        height: 500px;

        position: absolute;

        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        
        top: 25%;
        left: calc(50% - 200px);
      }

      @media (min-height: 1036px) {
        .scrolldown-menu {
          overflow: unset;
        }
      }

      .close-panel {
        padding: 0 6px;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
      }

      h2 {
        font-size: 20px;
      }

      .form{
        display: flex;
        flex-direction: column;
        row-gap: 23px;
      }

      .input {
        padding: 0 15px;
        height: 40px;
        border-radius: 10px;
        font-size: 15px;
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
      `;

      this.shadow.append(stylesEl);
    }

    sendEmail(petData: {
      fullname: string;
      phoneNumber: string;
      description: string;
    }) {
      const { petSelected } = state.getState();

      const res = state.authFetch(
        `${process.env.API_BASE_URL}/api/pets/${petSelected.id}/report`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...petData,
          }),
        }
      );
      res.then((data) => data.json()).then((algo) => console.log(algo));
    }

    addListeners() {
      const closeBtnEl = this.shadow.querySelector(
        ".close-panel"
      ) as HTMLDivElement;

      closeBtnEl.addEventListener("click", () => {
        this.style.display = "none";
      });

      const formEl = this.shadow.querySelector(".form") as HTMLFormElement;

      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
        this.sendEmail({
          fullname: formEl.fullname.value,
          phoneNumber: formEl.phoneNumber.value,
          description: formEl.description.value,
        });

        this.style.display = "none";
      });
    }

    render() {
      this.shadow.innerHTML = `  
      <div class= "scrolldown-menu">
        <div class="close-panel">X</div>      
        <h2>Reportar mascota</h2>
        <form class="form" id ="form">
          <input placeholder="Nombre" type="text" class="input" name="fullname" required/>
          <input placeholder="Teléfono" type="number" class="input" name="phoneNumber" required/>
          <textarea placeholder="¿Dónde lo viste?" class="input" name="description" required></textarea>
        </form>
        <button form="form" type="submit" class="publish-btn button">Envíar aviso</button>
      </div>`;
      this.addStyles();
      this.addListeners();
    }
  }
);
