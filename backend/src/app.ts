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
app.use(cors(CorsOptions));

// -------------routes imported---------------
import testRouter from "./routes/test.routes";
import userRouter from "./routes/user.routes";

// ------------routes used---------------
app.use("/api/v1/test", testRouter);
app.use("/api/v1/user", userRouter);

export default app;
