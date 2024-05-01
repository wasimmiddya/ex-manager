import dotenv from "dotenv";
import app from "./app"


dotenv.config({
    path: "./.env",
});

// console.log(process.env.PORT);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})