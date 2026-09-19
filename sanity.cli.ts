import { defineCliConfig } from "sanity/cli";

// projectId et dataset ne sont pas secrets (ils sont de toute façon
// visibles côté navigateur) — ce fichier est normalement commité.
export default defineCliConfig({
  api: {
    projectId: "snfevxyb",
    dataset: "production",
  },
});
