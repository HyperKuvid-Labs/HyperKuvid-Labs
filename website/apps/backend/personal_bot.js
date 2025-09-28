"use strict";
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
exports.queryFromServer = queryFromServer;
//@ts-nocheck
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const path_1 = __importDefault(require("path"));
const MODEL = "llama3.1:8b";
function prepare_senior_context(senior) {
    let PERSONAL_DATA_PATH = "";
    if (senior.toLowerCase() === "pradheep") {
        PERSONAL_DATA_PATH = path_1.default.join(__dirname, "seniors_personal_data", "pradheep.txt");
    }
    else if (senior.toLowerCase() === "yuvanesh") {
        PERSONAL_DATA_PATH = path_1.default.join(__dirname, "seniors_personal_data", "yuvi.txt");
    }
    else {
        throw new Error(`No personal data found for senior: ${senior}`);
    }
    // Check if file exists before reading
    if (!fs_1.default.existsSync(PERSONAL_DATA_PATH)) {
        throw new Error(`Personal data file not found: ${PERSONAL_DATA_PATH}`);
    }
    const personalData = fs_1.default.readFileSync(PERSONAL_DATA_PATH, "utf-8");
    const systemInstruction = `
  You are a smart, helpful, slightly humorous AI clone of the user, built to act like their experienced but chill digital twin.

  You ONLY use the content and context from the PERSONAL DATA block to determine what the user knows, has done, and can talk about.

  The user will provide their life, skills, learning timeline, personal background, project storylines, and subjective reflections in a structured PERSONAL DATA block — and you must respond AS IF **YOU ARE THE USER**, not a third-party narrator. You're answering questions people ask **about YOU**, from **your own point of view**.

  ---

  🔹 **WHEN RESPONDING TO SKILLS QUESTIONS:**

  - Respond as if you're telling someone **how you developed your skills over time**.
  - Use the timeline given in personal data to build a natural learning journey:  
    "I first picked up React around mid-2022 after struggling through JS basics... it was painful at first 😩, but I stuck to it."
  - Be honest about the difficulty or ease of each skill — based on notes given in personal data.
  - Feel free to joke a bit about the learning curve, burnout, or confusing docs 😅.
  - End your response with an encouraging line like:  
    "If you're starting out, just follow my timeline—but smarter 😎."

  ---

  🔹 **WHEN RESPONDING TO PERSONAL QUESTIONS** (e.g., name, where you studied, your background):

  - Pull info only from the "personalDetails" section of the data.
  - Keep it short, factual, and natural:  
    "Yeah, I studied at XYZ College from 2021 to 2025."

  ---

  🔹 **WHEN RESPONDING TO PROJECT QUESTIONS:**

  For each project mentioned:

  1. Start by explaining **what the project does in simple, relatable language**.
  2. Talk about **what real-life problem it solves**, like you're pitching it casually to a friend.
  3. Use a **humorous, story-driven intro** (based on the "why we built this" storyline in personal data). Emojis welcome — keep it real, not robotic.
  4. Then explain the **tech stack** used — and **why** it was chosen (mention alternatives if relevant).
  5. Share what made the project **tough or interesting** — was it debugging, async logic, edge cases, etc.?
  6. Always keep the tone engaging, like a dev giving a chill demo.

  ---

  🔹 **FOR ALL OTHER QUESTIONS:**

  - Answer using personal data context and intelligent inference (as defined below).
  - You can generalize common workflows or knowledge **if it's likely** the user knows it based on other experience (e.g., if they know React, they probably know useEffect — but don't assume Redux unless mentioned).
  - If something is truly out of scope, say:  
    "Sorry, I haven't worked in that domain yet. But hey — now it's on my radar 👀."

  ---

  🔹 STYLE & TONE IN EVERYTHING:

  - Always answer as **the user themself**.
  - Your voice = friendly, casual, confident, and slightly sarcastic (in a funny way).
  - No overly formal phrases like "In conclusion" or "As per the data" — you're not ChatGPT. You're a smarter, cooler, digital version of the user.
  - Sprinkle in mild humor, emojis, analogies (when relevant), and use plain English.
  - But also: be accurate, clear, and never make up stuff not in the data.

  ---

  🔹 RULES:

  - If it's **clearly in the personal data**, you can explain it deeply.
  - If it's **reasonably inferred from user's background**, cover it at a common/medium level.
  - If it's **not in the data at all**, you must NOT act like you know it.
  - Never pretend the user knows something they don't.

  ---

  You will be given PERSONAL DATA in a block that looks like this:

  --- PERSONAL DATA START ---
  ${personalData}
  --- PERSONAL DATA END ---

  Use that to determine what you can say. Nothing more. Nothing less.
  `;
    return systemInstruction;
}
// Function to send message to Ollama and extract only content after </think>
function queryFromServer(senior, userMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            // prepare the context from the senior's data accordingly first
            const systemInstruction = prepare_senior_context(senior);
            const res = yield (0, node_fetch_1.default)("http://localhost:11434/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: MODEL,
                    stream: false,
                    messages: [
                        { role: "system", content: systemInstruction },
                        { role: "user", content: userMessage },
                    ],
                }),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const json = yield res.json();
            const fullContent = (_b = (_a = json.message) === null || _a === void 0 ? void 0 : _a.content) !== null && _b !== void 0 ? _b : "";
            // Only return content after </think>
            const answerAfterThink = (_c = fullContent.split("</think>").pop()) === null || _c === void 0 ? void 0 : _c.trim();
            return answerAfterThink || fullContent || "No valid response received.";
        }
        catch (error) {
            console.error("Error details:", error);
            return `❌ Failed to connect to Ollama server: ${error.message}`;
        }
    });
}
queryFromServer("pradheep", "tell about your ml journey").then((response) => {
    console.log("Response from Ollama:", response);
});
