customElements.define(
  "card-comp",
  class Card extends HTMLElement {
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
  
        .card {
          background-color: rgb(55, 55, 55);
          width: 300px;
          height: 250px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          row-gap: 30px;
        }

        .card_img {
          width: 163px;
        }

        .card_info {
          display: flex;
          column-gap: 44px;
          color: white;
        }
        `;

      this.shadow.appendChild(stylesEl);
    }

    addListeners() {
      const reportButtonEl = this.shadow.querySelector(
        ".report-button"
      ) as HTMLButtonElement;

      reportButtonEl.addEventListener("click", (e) => {});
    }

    render() {
      const mainImg = require("../../images/undraw_beach_day_cser 1.svg");

      this.shadow.innerHTML = `
      <div class="card">
        <img class="card_img" src="${mainImg}" alt="logo.svg" />
        <div class="card_info">
          <div class="data-container">
            <h3>Carlos</h3>
            <p>Recoleta, Argentina</p>
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
