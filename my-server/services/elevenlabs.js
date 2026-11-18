const apiKey = process.env.ELEVENLABS_API_KEY;
if (!apiKey) throw new Error("ELEVENLABS_API_KEY is not set");

export async function synthesize(text, voiceId, modelId = "eleven_flash_v2_5") {
  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`,
    {
      method: "POST",
      headers: { "xi-api-key": apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: modelId }),
    }
  );
  if (!res.ok) throw new Error(`ElevenLabs error ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}