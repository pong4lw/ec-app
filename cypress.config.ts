import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "zot6wz",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

//npx cypress run --record --key zot6wz