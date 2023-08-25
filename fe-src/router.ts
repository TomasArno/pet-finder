import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/auth/login", component: "auth-page" },
  { path: "/auth/signin", component: "auth-page" },
  { path: "/lost-pets", component: "lost-page" },
  { path: "/how-work", component: "how-work-page" },
]);

export { Router };
