// ROUTER INITIALIZATION

import { Router } from "./router";

// STATE INITIALIZATION

import { state } from "./state";

// PAGES INITIALIZATION

import "./pages/welcome";
import "./pages/how-works";
import "./pages/auth";
import "./pages/lost-pets";
import "./pages/profile";
import "./pages/modify-email";
import "./pages/modify-pass";
import "./pages/reports";

// COMPONENTS INITIALIZATION

import "./components/header";
import "./components/card";
import "./components/inputs";

(async () => {
  const res = await state.authFetch(`${process.env.API_BASE_URL}/api/users/me`);

  if (res.status == 200) {
    const { userId } = await res.json();

    const cs = state.getState();
    state.setState({ ...cs, userId });

    Router.go("/lost-pets");
  } else {
    Router.go("/auth/signup");
    state.deleteJwtTokenInLocalStorage();
  }
})();
