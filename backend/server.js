import express from "express";

const app = express();

app.listen(800, () => {
    console.log("server started at http://localhost:800");
});

