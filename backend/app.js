import fs from "node:fs/promises";
import bodyParser from "body-parser";
import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("images"));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/places", async (req, res) => {
  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent);
  res.status(200).json({ places: placesData });
});

app.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");
  const placesData = JSON.parse(fileContent);
  res.status(200).json({ places: placesData });
});

app.put("/user-places", async (req, res) => {
  const places = req.body.places;
  await fs.writeFile("./data/user-places.json", JSON.stringify(places));
  res.status(200).json({ message: "User places updated" });
});

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/* function getEndPoint(app, fileName) {
  app.get(`${fileName}`, async (req, res) => {
    const fileContent = await fs.readFile(`./data/${fileName}.json`);
    const placesData = JSON.parse(fileContent);
    res.status(200).json({ places: placesData });
  });
}

getEndPoint(app, 'places');
getEndPoint(app, 'user-places'); */