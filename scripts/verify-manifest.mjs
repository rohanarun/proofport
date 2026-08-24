import assert from "node:assert/strict";
import { manifest } from "../src/manifest.mjs";
import { validateInput } from "../src/validation.mjs";

assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.release.backendRelease, "v0.4.0");
assert.equal(manifest.release.backendCommit, "4ff94afc860109e683c56c3acffedb8a6c233e03");
assert.equal(manifest.release.backendSourceSnapshotSha256, "df03dff119034858ec0a25b1171226ff3539d015318c15b5a2359eab49118dcf");
assert.ok(manifest.actions.length > 0);
assert.ok(manifest.actions.every((action) => action.moduleId === manifest.module.id));
assert.equal(new Set(manifest.actions.map((action) => action.id)).size, manifest.actions.length);
assert.equal(new Set(manifest.actions.map((action) => action.productMcpToolName)).size, manifest.actions.length);
assert.ok(manifest.actions.every((action) => action.inputSchema?.type === "object" && action.inputSchema.additionalProperties === false));
for (const action of manifest.actions) validateInput(action.inputSchema, action.exampleInput, "actions." + action.id + ".exampleInput");
process.stdout.write(manifest.product.name + ": " + manifest.actions.length + " pinned typed actions verified.\n");
