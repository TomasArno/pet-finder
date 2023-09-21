import { Router } from "../../router";
import { State } from "../../state";

customElements.define(
  "pet-panel-page",
  class PetPanel extends HTMLElement {
    petName: string;
    lngLostPet: number;
    latLostPet: number;
    imageURL?: string;

    constructor() {
      super();
    }

    connectedCallback() {
      this.render();
    }

    addStyles() {
      const stylesEl = document.createElement("style");

      stylesEl.innerHTML = `
      .menu {
        background-color: rgb(1, 15, 96);
        color: white;

        display: flex;
        justify-content: center;
      
        position: fixed;
        overflow: scroll;
        
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      @media (min-height: 1036px) {
        .menu {
          overflow: unset;
        }
      }
      
      .menu_content {
        padding: 15px 0;
        width: 70%;
        max-width: 550px;

        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 50px;

        font-size: 10px;
        font-weight: 400;
        text-align: center;
        letter-spacing: 0em;
      }
      
      @media (min-width: 375px) {
        .menu_content {
          font-size: 25px;
        }
      }

      .titles-container {
        width: 300px; 
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }

      .sub-title {
        font-size: 14px;
      }

      .fields-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        row-gap: 33px;
      }

      .input {
        padding: 0 15px;
        height: 40px;
        border-radius: 10px;
        font-size: 15px;
      }

      .img-zone {
        background: #d1d1d14f;
        width: 100%;
        min-height: 150px;
        max-height: 200px;
        border-radius: 10px;
      }

      .dz-details, .dz-size, .dz-filename, .dz-progress, .dz-error-message, .dz-success-mark, .dz-error-mark {
        display: none !important;
      }

      .map {
        background: #d1d1d14f;
        width: 100%;
        height: 250px;
        border-radius: 10px;
      }

      .map-control-container {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
      }

      .button {
        background-color: rebeccapurple;
        border-color: rebeccapurple;
        border-radius: 10px;
        color: rgb(255, 255, 255);
        height: 40px;
        width: 220px;
        font-size: 15px;
    }`;

      this.appendChild(stylesEl);
    }

    initMap() {
      window.mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
      return new window.mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
      });
    }

    sendUbiSelected(callback) {
      const searchBtnEl = this.querySelector(
        ".search-btn"
      ) as HTMLButtonElement;

      const locationInputEl = this.querySelector(
        ".search-input"
      ) as HTMLInputElement;

      searchBtnEl.addEventListener("click", () => {
        if (locationInputEl.value) {
          const mapboxClient = new MapboxClient(process.env.MAPBOX_TOKEN);

          mapboxClient.geocodeForward(
            locationInputEl.value,
            {
              country: "ar",
              autocomplete: true,
              language: "es",
            },
            (err, data, res) => {
              if (!err) callback(data.features);
            }
          );
        }
      });
    }

    addDropzone() {
      const dropArea = this.querySelector(".drop-area") as HTMLDivElement;
      if (dropArea) {
        const myDropzone = new window.Dropzone(dropArea, {
          url: "/falsa",
          autoProcessQueue: false,
          maxFiles: 1,
          addRemoveLinks: true,
          dictRemoveFile: "Eliminar",
          thumbnailWidth: 230,
        });

        myDropzone.on("thumbnail", (file) => {
          this.imageURL = file.dataURL;
        });
      }
    }

    addMapbox() {
      const map = this.initMap();

      if (this.lngLostPet && this.latLostPet) {
        const petCoords = [this.lngLostPet, this.latLostPet];

        const marker = new window.mapboxgl.Marker()
          .setLngLat(petCoords as any)
          .addTo(map);

        map.setCenter(petCoords as any);
        map.setZoom(14);
      }

      this.sendUbiSelected((results) => {
        const firstResult = results[0];

        if (firstResult) {
          const marker = new window.mapboxgl.Marker()
            .setLngLat(firstResult.geometry.coordinates)
            .addTo(map);

          this.lngLostPet = firstResult.geometry.coordinates[0];
          this.latLostPet = firstResult.geometry.coordinates[1];

          map.setCenter(firstResult.geometry.coordinates);
          map.setZoom(14);
        } else {
          console.log("Unknown place");
        }
      });
    }

    async sendData() {
      let petId = "";
      let method = "POST";

      if (window.location.pathname == "/reports/edit") {
        petId = State.getState.petSelected["id"];
        method = "PUT";
      }

      const res = await State.authFetch(
        `${process.env.API_BASE_URL}/api/pets/${petId}`,
        {
          method: `${method}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: this.petName,
            lat: this.latLostPet,
            lng: this.lngLostPet,
            imgURL: this.imageURL,
          }),
        }
      );

      if (res.status != 200 && res.status != 201) {
        const { error } = await res.json();
        console.log(error);
      } else {
        const data = res.json();

        data.then((pet) => {
          console.log(pet);
          Router.go("/reports");
        });
      }
    }

    async pullPetData() {
      const { imgURL, name, lat, lng } = State.getState.petSelected;

      this.petName = name;
      this.imageURL = imgURL;
      this.latLostPet = lat;
      this.lngLostPet = lng;
    }

    addListeners() {
      const closeMenuEl = this.querySelector(".close-menu") as HTMLDivElement;
      const inputNameEl = this.querySelector(".input-name") as HTMLInputElement;

      const publishBtnEl = this.querySelector(
        ".publish-btn"
      ) as HTMLButtonElement;

      closeMenuEl.addEventListener("click", () => {
        Router.go("/reports");
      });

      publishBtnEl.addEventListener("click", async () => {
        this.petName = inputNameEl.value;

        if (
          this.latLostPet &&
          this.lngLostPet &&
          this.imageURL &&
          this.petName
        ) {
          this.sendData();
        }
      });
    }

    render() {
      this.pullPetData();

      let title = "";
      let subTitle = "";
      let imgZone = "";

      if (window.location.pathname == "/reports/create") {
        title = "Reportar Mascota";
        subTitle =
          "Ingresá la siguiente información para realizar el reporte de la mascota";
        imgZone = "<div class='drop-area img-zone'></div>";
      } else {
        title = "Editar Mascota";
        imgZone = `<img class="img-zone" src="${this.imageURL}" />`;
      }

      this.innerHTML = `
          <div class= "menu">
            <div class= "menu_content">
              <div class="titles-container">
                <h2>${title}</h2>
                <h5 class="sub-title">${subTitle}</h5>
              </div>
                
              <div class="fields-container">
                <input value="${
                  this.petName || ""
                }" placeholder="Nombre" class="input-name input" type="text"/>
                
                ${imgZone}

                <div id="map" class="map"></div>

                <div class="map-control-container">
                  <input type="search" placeholder="Ubicacion" class="search-input input" name="input" />
                  <input type="button" value="Buscar" class="search-btn button"/>
                </div>

                <button type="submit" class="publish-btn button">Reportar mascota</button>
                <button class="close-menu button">Cancelar reporte</button>
              </div>
            </div>
          </div>
          `;

      this.addStyles();
      this.addListeners();
      this.addDropzone();
      this.addMapbox();
    }
  }
);
