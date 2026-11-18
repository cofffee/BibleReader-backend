import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
app.get("/health", (req, res) => {
	res.json({ status:"ok" });
});


app.post("/echo", (req, res) => {
	res.status(201).json({ received: req.body })
});

app.get("/:name", (req, res) => {
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

export default router;