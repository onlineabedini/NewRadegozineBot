// require bots
const app1 = require("./applications/Application1");
const maintenance_bot = require("./applications/maintenance_bot");
// require applications
const dashboard_application = require("./applications/dashboard_application");

function run_bot_apps() {
  let is_bot_ready = true;
  if (is_bot_ready) return app1;
  new maintenance_bot();
}
function run_dashboard_apps() {
  let dashboard = true;
  if (dashboard) new dashboard_application();
}

// run app
async function run_apps() {
  await run_bot_apps();
  await run_dashboard_apps();
}

run_apps();
