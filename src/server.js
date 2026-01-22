import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Server OK");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
