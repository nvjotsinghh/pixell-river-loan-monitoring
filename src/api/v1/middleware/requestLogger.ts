import morgan from "morgan";
import fs from "fs";
import path from "path";

const logDir = path.join(process.cwd(), "src", "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

const accessLogStream = fs.createWriteStream(
  path.join(logDir, "access.log"),
  { flags: "a" }
);

export const httpLogger = morgan("combined", { stream: accessLogStream });
export const consoleLogger = morgan("dev");