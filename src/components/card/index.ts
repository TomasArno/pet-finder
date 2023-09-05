import { Router } from "../../router";
import { state } from "../../state";

customElements.define(
  "card-comp",
  class Card extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    petName: string;
    petImg: string;

    constructor() {
      super();
    }

    async connectedCallback() {
      await this.fetchPetData();
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
  
        .card {
          background-color: rgb(55, 55, 55);
          width: 320px;
          height: 194px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          row-gap: 5px;
        }

        .card_img-container {
          width: 100%;
          height: 140px;
        }

        .card_img {
          width: 100%;
          height: 100%;
        }

        .card_info {
          color: white;
          width: 100%;

          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .data-container h3 {
          font-size: 27px;
        }

        .report-button {
          padding: 10px;
          height: 42px; 
        }
        `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const reportButtonEl = this.shadow.querySelector(
        ".report-button"
      ) as HTMLButtonElement;

      reportButtonEl.addEventListener("click", async (e) => {
        const res = await state.authFetch(
          `${process.env.API_BASE_URL}/api/users/test`
        );

        if (res.status == 200) {
          const data = await res.json();

          console.log(data);
        } else {
          const err = await res.json();
          console.error(err);
          Router.go("/auth/login");
        }
      });
    }

    async fetchPetData() {
      const res = await state.authFetch(
        `${process.env.API_BASE_URL}api/pets/1`
      );
      const data = await res.json();

      const { name, imgURL } = data;
      this.petName = name;
      this.petImg = imgURL;
    }

    render() {
      this.shadow.innerHTML = `
      <div class="card">
        <div class ="card_img-container">
          <img class="card_img" src="${
            this.petImg || "Undefined"
          }" alt="pet picture" />
        </div>
        <div class="card_info">
          <div class="data-container">
            <h3>${this.petName || "Undefined"}</h3>
            <p>somewhere, Argentina</p>
          </div>
          <button class="report-button">Reportar</button>
        </div>
      </div>
        `;

      this.addStyles();
      this.addListeners();
    }
  }
);