import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
const elevenlabs = new ElevenLabsClient();
const audio = await elevenlabs.textToSpeech.convert(
  "JBFqnCBsd6RMkjVDRZzb", // "George" - browse voices at elevenlabs.io/app/voice-library
  {
    text: "He that dwells in the secret place of the most High shall abide under the shadow of the Almighty.",
    modelId: "eleven_v4",
    outputFormat: "mp3_44100_128",
  }
);
await play(audio);