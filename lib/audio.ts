// Audio playback utilities
// Supports both Web Speech API (free, offline) and Google Cloud TTS (high quality)

// ============================================
// CONFIGURATION
// ============================================

type TTSProvider = "web-speech" | "google-cloud";

// Set this to "google-cloud" once you add your API key
const TTS_PROVIDER: TTSProvider = "google-cloud";

// Google Cloud TTS API endpoint (client-side - for demo only)
// For production, create an API route to hide your API key
const GOOGLE_TTS_API = "https://texttospeech.googleapis.com/v1/text:synthesize";

// ============================================
// WEB SPEECH API (Free, works offline)
// ============================================

const HINDI_VOICE_NAMES = [
  "Google हिन्दी",
  "hi-IN",
  "Hindi",
  "Microsoft Hemant",
  "Microsoft Kalpana",
];

let cachedVoice: SpeechSynthesisVoice | null = null;

function getHindiVoice(): SpeechSynthesisVoice | null {
  if (cachedVoice) return cachedVoice;

  if (typeof window === "undefined" || !window.speechSynthesis) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  for (const name of HINDI_VOICE_NAMES) {
    const voice = voices.find(
      (v) =>
        v.name.includes(name) || v.lang.includes("hi") || v.lang === "hi-IN"
    );
    if (voice) {
      cachedVoice = voice;
      return voice;
    }
  }

  return voices[0] || null;
}

export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };

    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 1000);
  });
}

function speakWithWebSpeech(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: unknown) => void;
  }
): void {
  if (typeof window === "undefined" || !window.speechSynthesis) {
    options?.onError?.(new Error("Speech synthesis not available"));
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  const voice = getHindiVoice();

  if (voice) {
    utterance.voice = voice;
  }

  utterance.rate = options?.rate ?? 0.8;
  utterance.pitch = options?.pitch ?? 1;
  utterance.volume = options?.volume ?? 1;
  utterance.lang = "hi-IN";

  utterance.onend = () => options?.onEnd?.();
  utterance.onerror = (event) => options?.onError?.(event);

  window.speechSynthesis.speak(utterance);
}

// ============================================
// GOOGLE CLOUD TTS (High quality)
// ============================================

async function speakWithGoogleCloud(
  text: string,
  options?: {
    onEnd?: () => void;
    onError?: (error: unknown) => void;
  }
): Promise<void> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY;

  if (!apiKey) {
    console.warn("Google TTS API key not found, falling back to Web Speech");
    speakWithWebSpeech(text, options);
    return;
  }

  try {
    const response = await fetch(`${GOOGLE_TTS_API}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: { text },
        voice: {
          languageCode: "hi-IN",
          name: "hi-IN-Wavenet-A", // Female Hindi voice
          // Other options: hi-IN-Wavenet-B (Male), hi-IN-Wavenet-C (Male), hi-IN-Wavenet-D (Female)
        },
        audioConfig: {
          audioEncoding: "MP3",
          speakingRate: 0.85, // Slightly slower for learning
          pitch: 0,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Google TTS error: ${response.status}`);
    }

    const data = await response.json();
    const audioContent = data.audioContent;

    // Play the audio
    const audio = new Audio(`data:audio/mp3;base64,${audioContent}`);
    audio.onended = () => options?.onEnd?.();
    audio.onerror = (e) => options?.onError?.(e);
    await audio.play();
  } catch (error) {
    console.error("Google TTS error:", error);
    // Fallback to Web Speech API
    speakWithWebSpeech(text, options);
  }
}

// ============================================
// PUBLIC API
// ============================================

export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: unknown) => void;
  }
): void {
  if (TTS_PROVIDER === "google-cloud") {
    speakWithGoogleCloud(text, options);
  } else {
    speakWithWebSpeech(text, options);
  }
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

export function isSpeechAvailable(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export async function initAudio(): Promise<void> {
  await loadVoices();
}

// Clean pronunciation text (remove slashes, focus on primary term)
export function cleanPronunciationText(text: string): string {
  const parts = text.split("/");
  return parts[0].trim();
}

// Speak a Fiji Hindi term
export function speakFijiHindi(
  fijiHindiText: string,
  callbacks?: {
    onEnd?: () => void;
    onError?: (error: unknown) => void;
  }
): void {
  const cleanText = cleanPronunciationText(fijiHindiText);
  speakText(cleanText, {
    rate: 0.7, // Slower for learning
    ...callbacks,
  });
}

// ============================================
// ALTERNATIVE: ElevenLabs (Best quality)
// ============================================

/*
To use ElevenLabs instead:

1. Sign up at https://elevenlabs.io
2. Get your API key
3. Add to .env.local: NEXT_PUBLIC_ELEVENLABS_API_KEY=your_key
4. Use their Hindi voice ID

Example implementation:

async function speakWithElevenLabs(text: string): Promise<void> {
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/VOICE_ID`,
    {
      method: "POST",
      headers: {
        "xi-api-key": process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    }
  );

  const audioBlob = await response.blob();
  const audio = new Audio(URL.createObjectURL(audioBlob));
  await audio.play();
}
*/
