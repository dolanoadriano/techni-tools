#!/usr/bin/env node
import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "lib")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "lib", "index.html"));
});

app.all("/proxy", async (req, res) => {
  const { method, headers } = req;
  const targetUrl = headers["Postman-Target-Url"] || "/";
  try {
    const response = await axios({
      method,
      url: targetUrl,
      headers: { ...req.headers, host: null },
      responseType: "stream",
    });

    res.status(response.status);

    Object.entries(response.headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    response.data.pipe(res);
  } catch (error) {
    console.error("Błąd podczas przekierowywania żądania:", error);
    res
      .status(error.response ? error.response.status : 500)
      .send("Wystąpił błąd podczas przekierowywania żądania");
  }
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`Otwórz postman: http://localhost:${port}`);
});
