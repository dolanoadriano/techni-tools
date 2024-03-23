import express from "express";
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "lib")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "lib", "index.html"));
});

const workspaceFilePath = path.join(
  // eslint-disable-next-line no-undef
  process.cwd(),
  ".technipostman",
  "workspace.json"
);

async function readWorkspace() {
  try {
    const data = await fs.readFile(workspaceFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading workspace:", error);
    return { requesters: [] };
  }
}

async function saveWorkspace(data) {
  try {
    await fs.writeFile(
      workspaceFilePath,
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error saving workspace:", error);
    throw new Error("Failed to save workspace.");
  }
}

async function ensureWorkspaceFileExists() {
  try {
    const directoryPath = path.dirname(workspaceFilePath);
    // Najpierw sprawdź, czy istnieje katalog
    await fs.mkdir(directoryPath, { recursive: true });
    console.log("Sprawdzono/utworzono katalog dla workspace.json.");

    try {
      // Następnie sprawdź, czy plik workspace.json istnieje w tym katalogu
      await fs.access(workspaceFilePath);
      console.log("Plik workspace.json już istnieje.");
    } catch {
      // Jeśli plik nie istnieje, utwórz go z domyślną zawartością
      console.log("Plik workspace.json nie istnieje, tworzenie...");
      await saveWorkspace({ requesters: [] });
    }
  } catch (error) {
    console.error(
      "Błąd podczas sprawdzania/tworzenia katalogu lub pliku workspace.json:",
      error
    );
    throw error; // Rzucenie wyjątku zatrzyma dalsze uruchamianie serwera w przypadku błędu
  }
}

ensureWorkspaceFileExists().catch(console.error);

app.get("/workspace/requesters", async (req, res) => {
  const workspace = await readWorkspace();
  res.status(200).json(workspace.requesters);
});

app.post("/workspace/requesters", async (req, res) => {
  const newRequester = req.body;
  const workspace = await readWorkspace();
  workspace.requesters.push(newRequester);
  await saveWorkspace(workspace);
  res.status(201).json(newRequester);
});

app.put("/workspace/requesters/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const workspace = await readWorkspace();
  const index = workspace.requesters.findIndex(
    (requester) => requester.id === id
  );

  if (index !== -1) {
    workspace.requesters[index] = updateData;
    await saveWorkspace(workspace);
    res.status(200).json(workspace.requesters[index]);
  } else {
    res.status(404).json({ message: "Requester not found" });
  }
});

app.patch("/workspace/requesters/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const workspace = await readWorkspace();
  const index = workspace.requesters.findIndex(
    (requester) => requester.id === id
  );

  if (index !== -1) {
    workspace.requesters[index] = {
      ...workspace.requesters[index],
      ...updateData,
    };
    await saveWorkspace(workspace);
    res.status(200).json(workspace.requesters[index]);
  } else {
    res.status(404).json({ message: "Requester not found" });
  }
});

app.delete("/workspace/requesters/:id", async (req, res) => {
  const { id } = req.params;
  const workspace = await readWorkspace();
  const newRequesters = workspace.requesters.filter(
    (requester) => requester.id !== id
  );

  if (workspace.requesters.length !== newRequesters.length) {
    await saveWorkspace({ ...workspace, requesters: newRequesters });
    res.status(204).send();
  } else {
    res.status(404).json({ message: "Requester not found" });
  }
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
