import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const variables = {};

/**
 * Helper to safely add a key to the global variables object
 */
function assignVariable(key, value) {
  if (Object.hasOwn(variables, key)) {
    throw new Error(`Name collision! Variable "${key}" is already defined.`);
  }
  variables[key] = value;
}

async function loadAllVariables() {
  try {
    const entries = await fs.readdir(__dirname, { withFileTypes: true });

    // Filter directories only, skip those starting with "_"
    const dirs = entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('_'))
      .map(entry => entry.name);

    if (dirs.length === 0) {
      console.warn("⚠️ No valid sub-directories found.");
      return;
    }

    for (const dir of dirs) {
      const dirPath = path.join(__dirname, dir);
      const allFiles = await fs.readdir(dirPath);
      const jsFiles = allFiles.filter(file => file.endsWith(".js") || file.endsWith(".mjs"));

      if (jsFiles.length === 0) {
        console.info(`ℹ️ Directory "${dir}" is empty. Skipping...`);
        continue;
      }

      for (const file of jsFiles) {
        const filePath = path.join(dirPath, file);

        try {
          const moduleNamespace = await import(pathToFileURL(filePath).href);

          for (const [name, value] of Object.entries(moduleNamespace)) {
            if (name === '__esModule') continue;

            if (name === 'default') {
              // If default export is an object, unpack its properties
              if (value && typeof value === 'object' && !Array.isArray(value)) {
                for (const [subKey, subValue] of Object.entries(value)) {
                  if (subKey === '__esModule') continue;
                  assignVariable(subKey, subValue);
                }
              }
            } else {
              // Handle named exports (export const foo = 'bar')
              assignVariable(name, value);
            }
          }
        } catch (err) {
          console.error(`❌ Error in [${dir}/${file}]:`, err.message);
        }
      }
    }
  } catch (err) {
    console.error("❌ Critical failure during loading:", err);
  }
}

await loadAllVariables();

export { variables };