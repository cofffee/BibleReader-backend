import "dotenv/config"; 
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ttsRouter from "./routes/tts.js";

const app = express();
const port = process.env.PORT || 3000
const filesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "files");

app.use(express.json());
app.use("/api/tts", ttsRouter);

app.get("/health", (req, res) => {
	res.json({ status:"ok" });
});

app.get("/files/:name", (req, res) => {
	const { name } = req.params;

	if (path.extname(name) != ".txt") {
		return res.status(404).json({ error: "file not found" });
	}

	res.sendFile(name, { root: filesDir }, (err) => {
		if (err && !res.headersSent) {
			res.status(err.status ?? 500).json({ error: "file not found"})
		}
	});
});
app.post("/echo", (req, res) => {
	res.status(201).json({ received: req.body })
});

app.listen(port, () => {
	console.log(`Listening on http://localhost:${port}`);
});