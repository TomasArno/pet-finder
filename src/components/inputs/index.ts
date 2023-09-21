customElements.define(
  "inputs-comp",
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
        .form {
            display: flex;
            flex-direction: column;
            row-gap: 70px;
            align-items: center;
        }

        .input-container {
            display: flex;
            flex-direction: column;
            row-gap: 10px;
        }

        .input {
            padding: 0 15px;
            height: 40px;
            border-radius: 10px;

            font-size: 15px;
        }

        .submit-btn {
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

    addListeners() {}

    render() {
      this.shadow.innerHTML = `
        <form class="form" >
            <div class="input-container">
                <input placeholder="Email" autocomplete="email" class="input" name="email" type="email" required />
            </div>
            <button type=submit class="submit-btn">Acceder</button>
        </form>
        `;

      this.addStyles();
      this.addListeners();
    }
  }
);
