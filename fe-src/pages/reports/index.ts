// import { state } from "../../state";

customElements.define(
  "reports-page",
  class ReportsPage extends HTMLElement {
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
          padding: 80px 0;
          background-color: grey;
          height: calc(100% - 50px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
      }
    
      @media (min-width: 768px) {
        .header__menu-desplegable {
          display: none !important;
        }
      }
      
      .menu-desplegado {
        background-color: rgb(1, 15, 96);
        color: white;
        display: none;

        justify-content: center;
      
        position: fixed;
      
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
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
        .menu-desplegado__content {
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

      .publish-btn {
        background-color: rebeccapurple;

        height: 40px;
        width: 220px;
        color: rgb(255, 255, 255);
        border-color: rebeccapurple;
        border-radius: 10px;
      }

      .map {
        background: #d1d1d14f;
        width: 100%;
        height: 250px;
        border-radius: 10px;
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

      this.shadow.appendChild(stylesEl);
    }

    initMap() {
      mapboxgl.accessToken = process.env.MAPBOX_TOKEN as string;
      return new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v12",
      });
    }

    initSearchForm(callback) {
      const formElMapbox = this.shadow.querySelector(
        ".search-form"
      ) as HTMLFormElement;

      formElMapbox.addEventListener("submit", (e: any) => {
        e.preventDefault();
        // const mapboxClient = new MapboxClient(process.env.MAPBOX_TOKEN);

        // mapboxClient.geocodeForward(
        //   e.target.input.value,
        //   {
        //     country: "ar",
        //     autocomplete: true,
        //     language: "es",
        //   },
        //   function (err, data, res) {
        //     console.log(data);
        //     if (!err) callback(data.features);
        //   }
        // );
      });
    }

    addListeners() {
      // const formEl = this.shadow.querySelector(".form") as HTMLFormElement;

      // formEl.addEventListener("submit", async (e) => {
      //   e.preventDefault();

      //   // const name = formEl.fullname.value;
      //   // console.log(name);

      //   state.authFetch("/api/pets/");
      // });

      // MENU

      const buttonEl = this.shadow.querySelector(
        ".publish-btn"
      ) as HTMLButtonElement;

      const menuDesplegado = this.shadow.querySelector(
        ".menu-desplegado"
      ) as HTMLDivElement;

      const closeMenu = this.shadow.querySelector(
        ".close-menu"
      ) as HTMLDivElement;

      buttonEl.addEventListener("click", (e) => {
        menuDesplegado.style.display = "flex";
        buttonEl.style.display = "none";

        // closeMenu.addEventListener("click", () => {
        //   menuDesplegado.style.display = "none";
        //   buttonEl.style.display = "initial";
        // });

        // DROPZONE

        const dropArea = this.shadow.querySelector(
          ".drop-area"
        ) as HTMLDivElement;

        let imageURL;

        const myDropzone = new Dropzone(dropArea, {
          url: "/falsa",
          autoProcessQueue: false,
          maxFiles: 1,
          addRemoveLinks: true,
          dictRemoveFile: "Eliminar",
          thumbnailWidth: 230,
        });

        myDropzone.on("thumbnail", (file) => {
          imageURL = file.dataURL;
        });

        // MAPBOX

        const map = this.initMap();

        map.addControl(
          new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
          })
        );

        // this.initSearchForm((results) => {
        //   const firstResult = results[0];
        //   const marker = new mapboxgl.Marker()
        //     .setLngLat(firstResult.geometry.coordinates)
        //     .addTo(map);

        //   const [lng, lat] = firstResult.geometry.coordinates;
        //   // fetch(`/nearby-shops?lat=${lat}&lng=${lng}`)
        //   //   .then((res) => res.json())
        //   //   .then((results) => {
        //   //     for (const shop of results) {
        //   //       const { lat, lng } = shop._geoloc;
        //   //       new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
        //   //     }
        //   // });

        //   map.setCenter(firstResult.geometry.coordinates);
        //   map.setZoom(14);
        // });
      });
    }

    render() {
      this.shadow.innerHTML = `
        <header-comp></header-comp>
  
        <main class="main">
            <h1>Mascotas Reportadas</h1>
            <button class="publish-btn">Publicar Reporte</button>
        </main>
        <div class= "menu-desplegado">
          <div class= "menu-desplegado__content">
            <h2>Reportar Mascota</h2>
            <h5 class="sub-title">Ingresá la siguiente información para realizar el reporte de la mascota</h5>
              
            <form class="form">
              <input class="input" type="text" name="name"/>
              <div class="drop-area"></div>
              <button class="publish-btn button">Agregar foto</button>
              <div id="map" class="map"></div>

              <button type="submit" class="publish-btn button">Reportar mascota</button>
              <button class="publish-btn button">Cancelar reporte</button>
            </form>
          </div>
        </div>
        
        `;

      this.addStyles();
      this.addListeners();
    }
  }
);
