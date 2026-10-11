# RoyalArm AI — Open Source Models & Release Tracker

> **Բաց Կոդով AI Մոդելներ, Լիցենզիաներ և Թողարկումների Պատմություն (Changelog)**  
> Curated by Sipan Danielyan & RoyalArm Engineering (`https://royalarm.uk`)

Այս փաստաթուղթը պարունակում է RoyalArm AI հարթակում ինտեգրված և աջակցվող բոլոր անվճար ու բաց կոդով (Open-Source) AI մոդելների տեղեկատվությունը, դրանց պաշտոնական GitHub ռեպոզիտորիաները, լիցենզիաները, համատեքստի չափերը և թողարկումների պատմությունը։

---

## 1. Անվճար & Բաց Կոդով AI Մոդելների Աղյուսակ (GitHub Models)

| Մոդել | Պաշտոնական GitHub | Լիցենզիա | Կոնտեքստ (Tokens) | Պարամետրեր | Անվճար Մատակարար / Կապ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Meta Llama 3.3 70B** | [meta-llama/llama-models](https://github.com/meta-llama/llama-models) | Llama 3.3 Community License | 128,000 | 70B Dense | OpenRouter Free (`:free`), Groq Free, Ollama |
| **DeepSeek-R1** | [deepseek-ai/DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1) | MIT License | 128,000 | 671B MoE (37B active) | OpenRouter Free (`:free`), Groq, Ollama |
| **DeepSeek-V3** | [deepseek-ai/DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3) | MIT License | 128,000 | 671B MoE | OpenRouter, DeepSeek API, Ollama |
| **Qwen 2.5 Coder 32B** | [QwenLM/Qwen2.5-Coder](https://github.com/QwenLM/Qwen2.5-Coder) | Apache 2.0 | 128,000 | 32.5B Dense | OpenRouter Free (`:free`), Ollama |
| **Mistral Small 24B** | [mistralai/mistral-src](https://github.com/mistralai/mistral-src) | Apache 2.0 | 32,768 | 24B Dense | OpenRouter Free (`:free`), Groq, Ollama |
| **Microsoft Phi-4** | [microsoft/Phi-4](https://github.com/microsoft/Phi-4) | MIT License | 16,384 | 14B Dense | Ollama, Hugging Face, Azure |
| **Ollama Local AI** | [ollama/ollama](https://github.com/ollama/ollama) | MIT License | 32,768 - 128k | 1B - 70B Local | `http://localhost:11434/v1` (100% Անցանց) |
| **Arm AI Free (GPT-4.1-mini)** | [OpenAI API](https://platform.openai.com) | Proprietary API Tier | 1,048,576 | N/A | OpenAI Server Endpoint |

---

## 2. Ինչպես Միացնել Անվճար Պրովայդերները RoyalArm AI-ում

RoyalArm AI սերվերը աշխատում է OpenAI-համատեղելի ստանդարտ արձանագրությամբ։ Անվճար մոդելներ միացնելու համար կարող եք օգտագործել հետևյալ տարբերակները `.env.local`-ում.

### Տարբերակ Ա. OpenRouter Անվճար Տիեր (OpenRouter Free)
```env
OPENAI_API_KEY=sk-or-v1-ձեր_բանալին
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_FREE_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

### Տարբերակ Բ. Groq Cloud Անվճար Տիեր
```env
OPENAI_API_KEY=gsk_ձեր_groq_բանալին
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_FREE_MODEL=llama-3.3-70b-versatile
```

### Տարբերակ Գ. Լոկալ Ollama (Առանց Գումարի և Անցանց)
```env
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_FREE_MODEL=llama3.2
```

---

## 3. Խոսակցական Ձայնային Մոդուլացիա (Voice Modulation)

- **Տոնայնություն (Pitch)**: 0.6x — 1.6x կարգավորում
- **Արագություն (Speed / Rate)**: 0.7x — 1.5x կարգավորում
- **Պրեսետներ**: 🌿 Բնական, 💻 ՏՏ Պրոֆեսիոնալ, 🎓 Ուսուցիչ/Տյուտոր, 🌌 Տիեզերական, 🤖 AI Synth

---

## 4. Մոդելների Թարմացումների Պատմություն (Model Releases & Changelog)

| Ամսաթիվ | Մոդել / Թարմացում | Փոփոխությունների Մանրամասներ |
| :--- | :--- | :--- |
| **2026-10-11** | **Meta Llama 3.3 70B** | Ավելացվել է OpenRouter Free & Groq աջակցություն, 128k context, հայերենի բարելավված ադապտացիա։ |
| **2026-10-11** | **DeepSeek-R1** | Ինտեգրվել է MIT բաց կոդով տրամաբանական reasoning մոդելը։ |
| **2026-10-11** | **Qwen 2.5 Coder 32B** | Ավելացվել է ծրագրավորողների մասնագիտացված մոդելը (Apache 2.0)։ |
| **2026-10-11** | **Voice Modulation v2.0** | Ներդրվել է ձայնի տոնայնության, արագության սլայդերներ և 5 խոսակցական պրոֆիլներ։ |
| **2026-10-11** | **RoyalArm Store Search Linkage** | AI համակարգային պրոմպտը ուսուցանվել է RoyalArm ծրագրերի կատալոգին (`/shop?search=...`)։ |
| **2026-09-15** | **GPT-4.1-mini & GPT-4o-mini** | Հիմնական տեքստային չաթի մոդելներ 1M կոնտեքստի աջակցությամբ։ |
