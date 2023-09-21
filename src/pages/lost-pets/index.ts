import { State } from "../../state";

customElements.define(
  "lost-page",
  class LostPetsPage extends HTMLElement {
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
        padding: 20px 0;
        background-color: grey;
        height: calc(100% - 50px);
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 20px;
      }

      .main_titles-container {
        font-size: 20px;
        text-align: center;
        display: flex;
        flex-direction: column;
        row-gap: 13px;
      }

      @media (min-height: 1500px) {
        .main_titles-container {
          font-size: 30px;
        }
      }
      
      .carousell {
        width: 100%;
        height: 95%;
        display:flex;
        flex-direction: column;
        align-items: center;
        row-gap: 25px;
        overflow: scroll;
        overflow-x: hidden;
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
      `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {}

    async fetchPetData() {
      const cs = State.getState;

      const [lat, lng] = cs.currentPosition;

      const res = await State.authFetch(
        `${process.env.API_BASE_URL}/api/pets/${lat}/${lng}`
      );

      if (res.status != 200) {
        res.json().then((data) => console.log(data));
        return null;
      }

      const petsArr = await res.json();

      State.setState = {
        ...cs,
        myPets: petsArr,
      };

      return petsArr;
    }

    async render() {
      let subtitleEl = "";

      const allPets = await this.fetchPetData();
      const parsedPetArray = State.parsePetArray(allPets);

      if (!parsedPetArray) {
        subtitleEl = "Aún no reportaste mascotas perdidas";
      }

      this.shadow.innerHTML = `
      <header-comp></header-comp>
      
      <main class="main">
        <div class="main_titles-container">
              <h1>Mascotas Perdidas Cercanas</h1>
              <h4 class="main_subtitle">${subtitleEl}</h4>
        </div>
        <div class="carousell">
        ${
          parsedPetArray ||
          "<img style='margin:auto' src='https://res.cloudinary.com/dy4or1hqa/image/upload/v1694145574/undraw_post_re_mtr4_1_ortb8r.svg'/>"
        }
        </div>
      </main>
      `;

      this.addStyles();
      this.addListeners();
    }
  }
);
