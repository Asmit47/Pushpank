import { loadEnvFiles } from "./load-env";

loadEnvFiles();

async function main() {
  const { ensureSheets } = await import("../src/lib/server/sheets");
  await ensureSheets();
  console.log("Orders and Pundit Registrations tabs are ready, with status dropdowns.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
