import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));

router.setRoutes([
  { path: "/", component: "welcome-page" },
  { path: "/how-work", component: "how-work-page" },
  { path: "/auth/login", component: "auth-page" },
  { path: "/auth/signup", component: "auth-page" },
  { path: "/lost-pets", component: "lost-page" },
  { path: "/profile", component: "profile-page" },
  { path: "/profile/email", component: "modify-email-page" },
  { path: "/profile/password", component: "modify-password-page" },
  { path: "/reports", component: "reports-page" },
  { path: "/reports/create", component: "pet-panel-page" },
  { path: "/reports/edit", component: "pet-panel-page" },
]);

export { Router };
