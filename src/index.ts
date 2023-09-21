// ROUTER INITIALIZATION

import { Router } from "./router";

// STATE INITIALIZATION

import { State } from "./state";

// PAGES INITIALIZATION

import "./pages/welcome";
import "./pages/auth";
import "./pages/lost-pets";
import "./pages/profile";
import "./pages/modify-email";
import "./pages/modify-pass";
import "./pages/my-reports";
import "./pages/pet-panel";

// COMPONENTS INITIALIZATION

import "./components/header";
import "./components/card";
import "./components/inputs";
import "./components/send-report";

(async () => {
  Router.go("/");

  const res = await State.authFetch(`${process.env.API_BASE_URL}/api/users/me`);

  const cs = State.getState;

  if (res.status == 200) {
    const { userId, email } = await res.json();

    State.setState = { ...cs, userId, email };
    State.getCurrentLocation(() => Router.go("/lost-pets"));
  } else {
    State.deleteUserInfo();
    Router.go("/");
  }
})();
