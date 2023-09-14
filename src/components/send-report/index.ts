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

      h2 {
        font-size: 20px;
      }
      
      .scrolldown-menu_content {
      
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 10px;
      }
      
      @media (min-width: 375px) {
        .menu_content {
          font-size: 25px;
        }
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

    addListeners() {
      const closeBtnEl = this.shadow.querySelector(
        ".close-panel"
      ) as HTMLDivElement;

      closeBtnEl.addEventListener("click", () => {
        this.style.display = "none";
      });

      console.log(state.getState());
    }

    render() {
      this.shadow.innerHTML = `  
      <div class= "scrolldown-menu">
        <h2>Reportar mascota</h2>
        <div class="close-panel">X</div>

      
        <div class= "scrolldown-menu_content">
          <button type="submit" class="publish-btn button">Envíar aviso</button>
        </div>
      </div>
      
        `;
      this.addStyles();
      this.addListeners();
    }
  }
);
