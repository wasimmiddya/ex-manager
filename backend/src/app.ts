import express from "express";
import cors, { CorsOptions } from "cors";

const app = express();

const CorsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
};

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
app.use(cors());

// -------------routes imported---------------
import testRouter from "./routes/test.routes";

// ------------routes used---------------
app.use("/api/v1", testRouter);


export default app;