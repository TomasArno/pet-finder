// ROUTER INITIALIZATION

import { Router } from "./router";

// STATE INITIALIZATION

import { state } from "./state";

// PAGES INITIALIZATION

import "./pages/welcome";
import "./pages/auth";
import "./pages/lost-pets";
import "./pages/how-works";
import "./pages/profile";
import "./pages/modify-email";
import "./pages/modify-pass";

// COMPONENTS INITIALIZATION

import "./components/header";
import "./components/card";
import "./components/inputs";

(async () => {
  Router.go("/");
  // const res = await state.authFetch("/api/users/me");
  // if (res.status == 200) {
  //   const { userId } = await res.json();
  //   const cs = state.getState();
  //   state.setState({ ...cs, userId });
  //   // Router.go("/lost-pets");
  //   Router.go("/profile");
  // } else {
  //   Router.go("/");
  // }
})();
