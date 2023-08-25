// ROUTER INITIALIZATION

import { Router } from "./router";

// PAGES INITIALIZATION

import "./pages/welcome";
import "./pages/auth";
import "./pages/lost-pets";
import "./pages/how-works";

// COMPONENTS INITIALIZATION

import "./components/header";
import "./components/card";

(() => {
  Router.go("/auth/login");
})();
