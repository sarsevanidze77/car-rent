import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

// safer path (Render-friendly)
const cars = JSON.parse(
  fs.readFileSync(path.resolve("cars.json"), "utf-8")
);

app.get("/", (req, res) => {
  res.send("Server works");
});

app.get("/cars", (req, res) => {
  res.json(cars);
});

app.get("/car/:id", (req, res) => {
  const id = req.params.id;

  const car = cars.find((c) => c.id == id);

  if (!car) {
    return res.status(404).send("Car not found");
  }

  res.json(car);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});