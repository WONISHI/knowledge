import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import glossary from "../glossary/index.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadFilesFromDir = () => {
    const jsonDir = path.resolve(__dirname, "../json");
    const files = fs.readdirSync(jsonDir);
    const jsonData = files.map((file) => {
      const filePath = path.resolve(jsonDir, file);
      const content = fs.readFileSync(filePath, "utf-8");
      const items = JSON.parse(content);
  
      return {
        text: glossary[file.split(".").shift()],
        items: items.map((item) => ({
          text: item.text || "未命名",
          link: item.link || "/"
        }))
      };
    });
    return jsonData;
  };
  
