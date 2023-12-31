import { Router } from "../../router";
import { State } from "../../state";

customElements.define(
  "reports-page",
  class ReportsPage extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    addStyles() {
      const stylesEl = document.createElement("style");

      stylesEl.innerHTML = `       
        .main {
          padding: 20px 0;
          background-color: grey;
          height: calc(100% - 50px);
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 20px;
        }

        .main_titles-container {
          text-align: center;
          display: flex;
          flex-direction: column;
          row-gap: 13px;
        }

        @media (min-width: 1023px) {
          .main_titles-container {
            font-size: 15px;
          }
        }

        .carousell {
          overflow: scroll;
          overflow-x: hidden;
          width: 100%;
          height: 86%;
          display:flex;
          flex-direction: column;
          align-items: center;
          row-gap: 25px;
        }

        @media (min-width: 1023px) {
          .carousell {
            flex-wrap: wrap;
            flex-direction: row;
            column-gap: 25px;
            justify-content: center;
            align-items: flex-start;
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
        
        @media (min-width: 1023px) {
          .button {
            height: 55px;
            width: 250px;
            font-size: 20px;
          }
      }
      
      `;

      this.appendChild(stylesEl);
    }

    addListeners() {
      const buttonEl = this.querySelector(
        ".open-menu-btn"
      ) as HTMLButtonElement;

      buttonEl.addEventListener("click", (e) => {
        Router.go("/reports/create");
      });
    }

    async fetchPetData() {
      const { userId } = State.getState;

      const res = await State.authFetch(
        `${process.env.API_BASE_URL}/api/pets/${userId}`
      );

      const data = await res.json();
      const cs = State.getState;

      State.setState = {
        ...cs,
        myPets: data,
      };

      return data;
    }

    async render() {
      let subtitleEl = "";

      const allMyPets = await this.fetchPetData();

      console.log(allMyPets);

      let parsedPetArray = State.parsePetArray(allMyPets, "myPets");

      if (!parsedPetArray) {
        subtitleEl = "Aún no reportaste mascotas perdidas";
      }

      this.innerHTML = `
        <header-comp></header-comp>
  
        <main class="main">
          <div class="main_titles-container">
            <h1>Mis Mascotas Reportadas</h1>
            <h4 class="main_subtitle">${subtitleEl}</h4>
          </div>
          
          <div class="carousell">
            ${
              parsedPetArray ||
              "<img style='margin:auto' src='https://res.cloudinary.com/dy4or1hqa/image/upload/v1694145574/undraw_post_re_mtr4_1_ortb8r.svg'/>"
            }
          </div>
          <button class="open-menu-btn button">Publicar Reporte</button>
        </main>
        `;

      this.addStyles();
      this.addListeners();
    }
  }
);
