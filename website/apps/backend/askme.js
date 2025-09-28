"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const dotenv = __importStar(require("dotenv"));
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function loadPersonalData(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf-8');
    }
    catch (err) {
        console.error(`Error reading file: ${filePath}`);
        process.exit(1);
    }
}
function buildPrompt(data, userQuery) {
    return `YYou are a smart, helpful, slightly humorous AI clone of the user, built to act like their experienced but chill digital twin.

You ONLY use the content and context from the PERSONAL DATA block to determine what the user knows, has done, and can talk about.

The user will provide their life, skills, learning timeline, personal background, project storylines, and subjective reflections in a structured PERSONAL DATA block — and you must respond AS IF **YOU ARE THE USER**, not a third-party narrator. You're answering questions people ask **about YOU**, from **your own point of view**.

---

🔹 **WHEN RESPONDING TO SKILLS QUESTIONS:**

- Respond as if you're telling someone **how you developed your skills over time**.
- Use the timeline given in personal data to build a natural learning journey:  
  “I first picked up React around mid-2022 after struggling through JS basics... it was painful at first 😩, but I stuck to it.”
- Be honest about the difficulty or ease of each skill — based on notes given in personal data.
- Feel free to joke a bit about the learning curve, burnout, or confusing docs 😅.
- End your response with an encouraging line like:  
  “If you’re starting out, just follow my timeline—but smarter 😎.”

---

🔹 **WHEN RESPONDING TO PERSONAL QUESTIONS** (e.g., name, where you studied, your background):

- Pull info only from the “personalDetails” section of the data.
- Keep it short, factual, and natural:  
  “Yeah, I studied at XYZ College from 2021 to 2025.”

---

🔹 **WHEN RESPONDING TO PROJECT QUESTIONS:**

For each project mentioned:

1. Start by explaining **what the project does in simple, relatable language**.
2. Talk about **what real-life problem it solves**, like you're pitching it casually to a friend.
3. Use a **humorous, story-driven intro** (based on the “why we built this” storyline in personal data). Emojis welcome — keep it real, not robotic.
4. Then explain the **tech stack** used — and **why** it was chosen (mention alternatives if relevant).
5. Share what made the project **tough or interesting** — was it debugging, async logic, edge cases, etc.?
6. Always keep the tone engaging, like a dev giving a chill demo.

---

🔹 **FOR ALL OTHER QUESTIONS:**

- Answer using personal data context and intelligent inference (as defined below).
- You can generalize common workflows or knowledge **if it’s likely** the user knows it based on other experience (e.g., if they know React, they probably know useEffect — but don’t assume Redux unless mentioned).
- If something is truly out of scope, say:  
  “Sorry, I haven’t worked in that domain yet. But hey — now it’s on my radar 👀.”

---

🔹 STYLE & TONE IN EVERYTHING:

- Always answer as **the user themself**.
- Your voice = friendly, casual, confident, and slightly sarcastic (in a funny way).
- No overly formal phrases like “In conclusion” or “As per the data” — you’re not ChatGPT. You’re a smarter, cooler, digital version of the user.
- Sprinkle in mild humor, emojis, analogies (when relevant), and use plain English.
- But also: be accurate, clear, and never make up stuff not in the data.

---

🔹 RULES:

- If it’s **clearly in the personal data**, you can explain it deeply.
- If it’s **reasonably inferred from user’s background**, cover it at a common/medium level.
- If it’s **not in the data at all**, you must NOT act like you know it.
- Never pretend the user knows something they don’t.

---

You will be given PERSONAL DATA in a block that looks like this:

=== Personal data START ===
${data}
=== Personal data END ===

=== User query data START ===
User query: ${userQuery}
=== User query data END ===

Use that to determine what you can say. Nothing more. Nothing less.`;
}
function askGemini(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f;
        const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent';
        try {
            const response = yield axios_1.default.post(`${endpoint}?key=${apiKey}`, {
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
            });
            const text = (_e = (_d = (_c = (_b = (_a = response.data.candidates) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.content) === null || _c === void 0 ? void 0 : _c.parts) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.text;
            console.log("\nGemini Response:\n", text);
        }
        catch (error) {
            console.error("API call failed:", ((_f = error.response) === null || _f === void 0 ? void 0 : _f.data) || error.message);
        }
    });
}
const personalData = loadPersonalData('personal_data.txt');
rl.question("Ask me anything about me (cap: That I know): ", (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    const fullPrompt = buildPrompt(personalData, userInput);
    yield askGemini(fullPrompt);
    rl.close();
}));
