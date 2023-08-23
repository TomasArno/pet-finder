import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/login", component: "login-page" },
  { path: "/signup", component: "signup-page" },
  { path: "/lost-pets", component: "lost-page" },
  { path: "/how-work", component: "how-work-page" },
]);

export { Router };
