#!/usr/bin/env node
import express from "express";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import z from "zod";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "lib")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "lib", "index.html"));
});

const workspaceFilePath = path.join(
  // eslint-disable-next-line no-undef
  process.cwd(),
  "technipostman",
  "workspace.json"
);

const entry = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  type: z.enum(["text", "file"]),
  checked: z.boolean().optional(),
  readonly: z.boolean().optional(),
});

const requestData = z.object({
  method: z.string(),
  url: z.string(),
  paramEntries: z.array(entry),
  headerEntries: z.array(entry),
  formDataEntries: z.array(entry),
  formUrlencodedEntries: z.array(entry),
  rawBody: z.string().optional(),
  rawBodyLanguage: z.string(),
});

const requester = z.object({
  id: z.string(),
  type: z.string(),
  data: requestData,
});

const workspace = z.object({
  requesters: z.array(requester),
});

const ensureFileContent = async (file, content) => {
  await fs.ensureFile(file);
  const prevContent = await fs.readFile(file, "utf8");
  const isEmpty = prevContent.trim() === "";
  if (isEmpty) await fs.outputFile(file, content);
};

const ensureWorkspace = async (req, res, next) => {
  await ensureFileContent(
    workspaceFilePath,
    JSON.stringify({ requesters: [] })
  );
  next();
};

app.use("/api/workspace", ensureWorkspace);

app.get("/api/workspace", async (req, res) => {
  const data = await fs.readJson(workspaceFilePath);
  return res.status(200).json({ data });
});

app.put(
  "/api/workspace",
  (req, res, next) => {
    const { body } = req;
    const { success, error } = workspace.safeParse(body);
    success ? next() : next(error);
  },
  async (req, res) => {
    const { body } = req;
    await fs.writeJson(workspaceFilePath, body);
    return res.status(200).json({});
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err });
});

/*
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
*/

// eslint-disable-next-line no-undef
const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log(`Otwórz postman: http://localhost:${port}`);
});
