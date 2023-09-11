import { Router } from "../../router";
import { state } from "../../state";

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

      .header_menu-container {
        cursor: pointer;
      }

      @media (min-width: 768px) {
        .header__menu-desplegable {
          display: none !important;
        }
      }
      
      .menu-desplegado {
        background-color: rgb(1, 15, 96);
        display: none;
      
        position: fixed;
      
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;

        justify-content: space-around;
        flex-direction: column;
        align-items: center;
      }
      
      .close-menu {
        border: 1px solid orange;
        color: white;
        padding: 0 6px;
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
      }
      
      .menu-desplegado__content {
        width: 264px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 60px;

        font-size: 10px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0em;
      }
      
      @media (min-width: 375px) {
        .menu-desplegado__content {
          font-size: 25px;
        }
      }
      
      .menu-desplegado__item {
        color: rgb(255, 255, 254);
        text-decoration: none;
      }

      .logout-btn {
        background-color: rebeccapurple;
        border-color: rebeccapurple;
        border-radius: 10px;
        color: rgb(255, 255, 255);
        height: 40px;
        width: 220px;
      }
      
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const menuEl = this.shadow.querySelector(
        ".header_menu-container"
      ) as HTMLButtonElement;

      const logoutEl = this.shadow.querySelector(
        ".logout-btn"
      ) as HTMLButtonElement;

      const menuDesplegado = this.shadow.querySelector(
        ".menu-desplegado"
      ) as HTMLDivElement;

      const closeMenu = this.shadow.querySelector(
        ".close-menu"
      ) as HTMLDivElement;

      menuEl.addEventListener("click", (e) => {
        menuDesplegado.style.display = "inherit";
        menuEl.style.display = "none";
      });

      closeMenu.addEventListener("click", () => {
        menuDesplegado.style.display = "none";
        menuEl.style.display = "inherit";
      });

      logoutEl.addEventListener("click", () => {
        state.deleteJwtTokenInLocalStorage();
      });
    }

    render() {
      this.shadow.innerHTML = `
        <header class="header">
            <div class="header_logo-container">
                <img class="header_logo-img" src="https://res.cloudinary.com/dy4or1hqa/image/upload/v1693850987/logo_psgazz.svg" alt="logo.svg" />
            </div>

            <div class="header_menu-container">
                <img src="https://res.cloudinary.com/dy4or1hqa/image/upload/v1693850987/menu_mh874y.svg" alt="logo.svg" />
            </div>

            <div class = "menu-desplegado">
              <span class="close-menu">X</span>
              
              <div class = "menu-desplegado__content">
                <span><a class="menu-desplegado__item" href="/profile">Mis datos</a></span>
                <span><a class="menu-desplegado__item" href="/lost-pets">Mascotas reportadas cercanas</a></span>
                <span><a class="menu-desplegado__item" href="/reports">Reportar mascota</a></span>
              </div>

              <button class="logout-btn">Cerrar Sesion</button>

            </div>
        </header>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
