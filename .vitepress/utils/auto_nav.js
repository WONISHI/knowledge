import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadFilesFromDir = () => {
  const jsonDir = path.resolve(__dirname, "../json");
  const files = fs.readdirSync(jsonDir);

  const jsonData = files.map((file) => {
    const filePath = path.resolve(jsonDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    console.log(`Content of ${file}:\n`, content);
  });
};
