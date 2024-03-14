#!/usr/bin/env node
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Konwersja import.meta.url do ścieżki pliku
const __filename = fileURLToPath(import.meta.url);
// Użycie path.dirname do uzyskania ścieżki do katalogu bieżącego pliku
const __dirname = path.dirname(__filename);

// Serwowanie statycznych plików zbudowanej aplikacji React
app.use(express.static(path.join(__dirname, "lib")));

// Obsługa każdego innego requestu przez index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "lib", "index.html"));
});

const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`Otwórz postman: http://localhost:${port}`);
});
