import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import cookieParser from "cookie-parser";

import { config } from "./src/settings/config.js";
import { authRouter } from "./src/routes/auth.routes.js";
import { productRouter } from "./src/routes/products.routes.js";
import { categoryRouter } from "./src/routes/categories.routes.js";
import { commentRouter } from "./src/routes/comments.routes.js";
import { startConnection } from "./src/settings/database.js";
import { visualRouter } from "./src/routes/visual.routes.js";
import { messageRouter } from "./src/routes/message.routes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    }),
);

app.use(helmet());

app.use(morgan("dev"));

app.use(cookieParser());

app.set("view engine", "ejs");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const viewPath = path.join(__dirname, "src", "views");
const publicPath = path.join(__dirname, "src", "public");
const jsPath = path.join(__dirname, "src", "js");

app.set("views", viewPath);
app.use(express.static(publicPath));
app.use("/js", express.static(jsPath));

// Configurar la directiva Content-Security-Policy para poder ver el iframne
app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "frame-src 'self' https://www.google.com/",
    );
    next();
});

//--------Rutas para visualizaciones---------//
app.use("/", visualRouter);

//--------Rutas para datos---------//
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);

app.use("/api/contact", messageRouter);

app.listen(config.port, async () => {
    await startConnection({
        uri: config.mongo,
        database: config.database,
    });
    console.log(
        "Server is running on port: http://localhost:" + config.port,
    );
});
