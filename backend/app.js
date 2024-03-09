import express from "express";
import fs from "fs";
import path from "path";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.static("images"));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

// Endpoint to GET data from places.json
app.get("/places", (req, res) => {
  fs.readFile(
    path.join(__dirname, "backend", "data", "places.json"),
    (err, data) => {
      if (err) {
        console.error("Error reading places.json:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(JSON.parse(data));
    }
  );
});

// Endpoint to GET data from user-places.json
app.get("/user-places", (req, res) => {
  fs.readFile(
    path.join(__dirname, "backend", "data", "user-places.json"),
    (err, data) => {
      if (err) {
        console.error("Error reading user-places.json:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.json(JSON.parse(data));
    }
  );
});

// Endpoint to PUT data into user-places.json
app.put("/user-places", (req, res) => {
  const newData = req.body;
  fs.writeFile(
    path.join(__dirname, "backend", "data", "user-places.json"),
    JSON.stringify(newData),
    (err) => {
      if (err) {
        console.error("Error writing to user-places.json:", err);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
      res.status(200).json({ message: "Data updated successfully" });
    }
  );
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
