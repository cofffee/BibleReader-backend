import { Router } from "express";
import { synthesize } from "../services/elevenlabs.js";

const router = Router();

router.post("/", async (req, res) => {
  const { text, voiceId = process.env.DEFAULT_VOICE_ID } = req.body;
  if (!text || text.length > 2000) return res.status(400).json({ error: "bad request" });

  try {
    const audio = await synthesize(text, voiceId);
    res.set("Content-Type", "audio/mpeg").send(audio);
  } catch (err) {
    res.status(502).json({ error: "tts failed" });
  }
});

export default router;