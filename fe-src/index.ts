// ROUTER INITIALIZATION

import { Router } from "./router";

// PAGES INITIALIZATION

import "./pages/welcome";

// COMPONENTS INITIALIZATION

import "./components/header";
import "./components/card";

(() => {
  Router.go("/");
  console.log("holas");
})();
