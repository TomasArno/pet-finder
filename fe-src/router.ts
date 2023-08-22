import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/lost-pets", component: "welcome-page" },
  { path: "/how-work", component: "welcome-page" },
]);

export { Router };
