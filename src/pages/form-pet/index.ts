import { Router } from "../../router";
import { state } from "../../state";

customElements.define(
  "form-pet-page",
  class FormPet extends HTMLElement {
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
        width: 70%;
        max-width: 550px;

        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 60px;

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

      .sub-title {
        font-size: 16px;
        width: 352px;
      }

      .form {
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

      .drop-area {
        background: #d1d1d14f;
        width: 100%;
        min-height: 150px;
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
      mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
      return new mapboxgl.Map({
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

      const myDropzone = new Dropzone(dropArea, {
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

    addMapbox() {
      const map = this.initMap();

      this.sendUbiSelected((results) => {
        const firstResult = results[0];
        if (firstResult) {
          const marker = new mapboxgl.Marker()
            .setLngLat(firstResult.geometry.coordinates)
            .addTo(map);

          this.lngLostPet = firstResult.geometry.coordinates[0];
          this.latLostPet = firstResult.geometry.coordinates[1];

          // fetch(`/nearby-shops?lat=${lat}&lng=${lng}`)
          //   .then((res) => res.json())
          //   .then((results) => {
          //     for (const shop of results) {
          //       const { lat, lng } = shop._geoloc;
          //       new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
          //     }
          // });

          map.setCenter(firstResult.geometry.coordinates);
          map.setZoom(14);
        } else {
          console.log("Unknown place");
        }
      });
    }

    async sendData() {
      const res = await state.authFetch(
        `${process.env.API_BASE_URL}/api/pets`,
        {
          method: "post",
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

      if (res.status != 201) {
        const { error } = await res.json();
        console.log(error);
      } else {
        const data = res.json();
        data.then((pet) => {
          console.log("data", pet);
          Router.go("/reports");
        });
      }
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
        }
        this.sendData();
      });
    }

    render() {
      this.innerHTML = `
          <div class= "menu">
            <div class= "menu_content">
              <h2>Reportar Mascota</h2>
              <h5 class="sub-title">Ingresá la siguiente información para realizar el reporte de la mascota</h5>
                
              <div class="form">
                <input placeholder="Nombre" class="input-name input" type="text"/>
                
                <div class="drop-area"></div>
                
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
