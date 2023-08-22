customElements.define(
  "header-comp",
  class Header extends HTMLElement {
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

      .header {
        background-color: rgb(55, 55, 55);
        width: 100%;
        height: 50px;
      
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
      }
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const menuEl = this.shadow.querySelector(
        ".header_menu-container"
      ) as HTMLButtonElement;

      menuEl.addEventListener("click", (e) => {});
    }

    render() {
      const logoImg = require("../../images/logo.svg");
      const menuImg = require("../../images/menu.svg");

      this.shadow.innerHTML = `
        <header class="header">
            <div class="header_logo-container">
                <img class="header_logo-img" src="${logoImg}" alt="logo.svg" />
            </div>

            <div class="header_menu-container">
                <img src="${menuImg}" alt="logo.svg" />
            </div>
        </header>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
