import { Router } from "../../router";
import { state } from "../../state";

customElements.define(
  "card-comp",
  class Card extends HTMLElement {
    //#region Attributes
    shadow = this.attachShadow({ mode: "open" });
    petId: string;
    petName: string;
    petImg: string;
    pageLocation: string;
    //#endregion

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
          border-radius: 10px;
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
          border-radius: 10px 10px 0 0;
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
        }`;

      this.shadow.appendChild(stylesEl);
    }

    findPetSelected() {
      const cs = state.getState();

      const { myPets } = state.getState();

      for (const pet of myPets) {
        if (pet.id == this.petId) {
          state.setState({
            ...cs,
            petSelected: pet,
          });

          break;
        }
      }
    }

    addListeners() {
      const cardEl = this.shadow.querySelector(".card") as HTMLDivElement;

      const dynamicPetButtonEl = this.shadow.querySelector(
        ".report-button"
      ) as HTMLButtonElement;

      dynamicPetButtonEl.addEventListener("click", (e) => {
        this.findPetSelected();

        if (this.pageLocation == "myPets") {
          Router.go("/reports/edit");
        } else {
          const sendAlertCompEl = document.createElement("send-alert-comp");
          sendAlertCompEl.classList.add("send-alert");

          cardEl.append(sendAlertCompEl);

          const customElementSendAlert = this.shadow.querySelector(
            ".send-alert"
          ) as HTMLElement;

          const menuEl = customElementSendAlert.shadowRoot
            .childNodes[1] as HTMLElement;

          menuEl.style.display = "flex";
        }
      });
    }

    render() {
      this.petId = this.getAttribute("petId");
      this.petName = this.getAttribute("petName");
      this.petImg = this.getAttribute("petImg");
      this.pageLocation = this.getAttribute("pageLocation");

      let reportBtnCont = "Reportar";

      if (this.pageLocation == "myPets") reportBtnCont = "Editar";

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
          <button class="report-button">${reportBtnCont}</button>
        </div>
      </div>`;

      this.addStyles();
      this.addListeners();
    }
  }
);
