const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  webServer: {
    command: "python3 -m http.server 8080",
    port: 8080,
    reuseExistingServer: true,
  },
  use: {
    baseURL: "http://localhost:8080",
  },
});
