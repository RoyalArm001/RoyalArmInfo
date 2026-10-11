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

## 2. Մոդելների Մանրամասն Բնութագրեր & GitHub Աղբյուրներ

### 1. Meta Llama 3.3 70B Instruct
- **GitHub Ռեպոզիտորիա**: https://github.com/meta-llama/llama-models
- **Հեղինակ**: Meta AI
- **Լիցենզիա**: Meta Llama 3.3 Community License (թույլատրվում է կոմերցիոն և հետազոտական օգտագործում)
- **Հիմնական Հնարավորություններ**: Գերազանց բազմալեզու պատասխաններ (հայերեն, անգլերեն, ռուսերեն), բարդ հարցերի վերլուծություն, ծրագրավորում։
- **Անվճար ID OpenRouter-ում**: `meta-llama/llama-3.3-70b-instruct:free`
- **Անվճար ID Groq-ում**: `llama-3.3-70b-versatile`

### 2. DeepSeek-R1 (Open Reasoning)
- **GitHub Ռեպոզիտորիա**: https://github.com/deepseek-ai/DeepSeek-R1
- **Հեղինակ**: DeepSeek AI
- **Լիցենզիա**: MIT License (100% ազատ բաց կոդ)
- **Հիմնական Հնարավորություններ**: Տրամաբանական խորը դատողություններ (CoT — Chain of Thought), մաթեմատիկական հաշվարկներ, ալգորիթմների լուծումներ։
- **Անվճար ID OpenRouter-ում**: `deepseek/deepseek-r1:free`
- **Անվճար ID Groq-ում**: `deepseek-r1-distill-llama-70b`

### 3. Qwen 2.5 Coder 32B Instruct
- **GitHub Ռեպոզիտորիա**: https://github.com/QwenLM/Qwen2.5-Coder
- **Հեղինակ**: Qwen Team / Alibaba Cloud
- **Լիցենզիա**: Apache License 2.0
- **Հիմնական Հնարավորություններ**: Ծրագրավորման առաջատար մոդել (TypeScript, JavaScript, Python, C++, Delphi, SQL, HTML/CSS)։ Լավագույն կոդի գեներացիա և դեբագինգ։
- **Անվճար ID OpenRouter-ում**: `qwen/qwen-2.5-coder-32b-instruct:free`

### 4. Mistral Small 24B (2501)
- **GitHub Ռեպոզիտորիա**: https://github.com/mistralai/mistral-src
- **Հեղինակ**: Mistral AI
- **Լիցենզիա**: Apache License 2.0
- **Հիմնական Հնարավորություններ**: Գերարագ ինֆերենս, ճշգրիտ հրահանգների կատարում, տեքստերի վերամշակում։
- **Անվճար ID OpenRouter-ում**: `mistralai/mistral-small-24b-instruct-2501:free`

### 5. Ollama (100% Տեղային և Անվճար Լոկալ Կապ)
- **GitHub Ռեպոզիտորիա**: https://github.com/ollama/ollama
- **Հեղինակ**: Ollama Team
- **Լիցենզիա**: MIT License
- **Հնարավորություններ**: Ձեր համակարգչի վրա (localhost) աշխատացնել ցանկացած մոդել (Llama, DeepSeek, Qwen, Mistral, Phi) առանց ինտերնետի, առանց API բանալու, 100% գաղտնի։
- **Միացում**: Սահմանել `OPENAI_BASE_URL=http://localhost:11434/v1` և `OPENAI_API_KEY=ollama`

---

## 3. Ինչպես Միացնել Անվճար Պրովայդերները RoyalArm AI-ում

RoyalArm AI սերվերը աշխատում է OpenAI-համատեղելի ստանդարտ արձանագրությամբ։ Անվճար մոդելներ միացնելու համար կարող եք օգտագործել հետևյալ տարբերակները `.env.local`-ում.

### Տարբերակ Ա. OpenRouter Անվճար Տիեր (OpenRouter Free)
1. Գրանցվեք [OpenRouter](https://openrouter.ai)-ում և վերցրեք ձեր անվճար բանալին։
2. Ձեր `.env.local`-ում նշեք.
```env
OPENAI_API_KEY=sk-or-v1-ձեր_բանալին
OPENAI_BASE_URL=https://openrouter.ai/api/v1
OPENAI_FREE_MODEL=meta-llama/llama-3.3-70b-instruct:free
```

### Տարբերակ Բ. Groq Cloud Անվճար Տիեր (Գերարագ Ինֆերենս)
1. Վերցրեք անվճար բանալի [Groq Console](https://console.groq.com)-ից։
2. Ձեր `.env.local`-ում նշեք.
```env
OPENAI_API_KEY=gsk_ձեր_groq_բանալին
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_FREE_MODEL=llama-3.3-70b-versatile
```

### Տարբերակ Գ. Լոկալ Ollama (Առանց Գումարի և Անցանց)
1. Տեղադրեք Ollama-ն (`https://ollama.com` կամ RoyalArm Store-ից)։
2. Տերմինալում բացեք մոդելը. `ollama run llama3.2`
3. Ձեր `.env.local`-ում նշեք.
```env
OPENAI_API_KEY=ollama
OPENAI_BASE_URL=http://localhost:11434/v1
OPENAI_FREE_MODEL=llama3.2
```

---

## 4. Խոսակցական Ձայնային Մոդուլացիա (Voice Modulation)

RoyalArm AI-ն ներառում է խոսակցական ձայնային մոդուլացիայի համակարգ Web Speech Synthesis հիման վրա.
- **Տոնայնություն (Pitch)**: 0.6x — 1.6x կարգավորում
- **Արագություն (Speed / Rate)**: 0.7x — 1.5x կարգավորում
- **Ներկառուցված Պրեսետներ**:
  * 🌿 **Բնական / Ընկերական**: Pitch 1.05, Rate 1.0 (հարթ և ջերմ առօրյա շփում)
  * 💻 **ՏՏ Պրոֆեսիոնալ**: Pitch 0.92, Rate 1.12 (կոնկրետ, հստակ և արագ)
  * 🎓 **Ուսուցիչ / Տյուտոր**: Pitch 1.00, Rate 0.88 (համբերատար, դանդաղ արտասանություն)
  * 🌌 **Տիեզերական / Calm**: Pitch 0.82, Rate 0.94 (խորը, հանգիստ մեդիտատիվ տոն)
  * 🤖 **AI Synth / Ռոբոտ**: Pitch 1.35, Rate 1.25 (ֆուտուրիստական սինթեզատոր)

---

## 5. Մոդելների Թարմացումների Պատմություն (Model Releases & Changelog)

| Ամսաթիվ | Մոդել / Թարմացում | Փոփոխությունների Մանրամասներ |
| :--- | :--- | :--- |
| **2026-10-11** | **Meta Llama 3.3 70B** | Ավելացվել է OpenRouter Free & Groq աջակցություն, 128k context, հայերենի բարելավված ադապտացիա։ |
| **2026-10-11** | **DeepSeek-R1** | Ինտեգրվել է MIT բաց կոդով տրամաբանական reasoning մոդելը։ |
| **2026-10-11** | **Qwen 2.5 Coder 32B** | Ավելացվել է ծրագրավորողների մասնագիտացված մոդելը (Apache 2.0)։ |
| **2026-10-11** | **Voice Modulation v2.0** | Ներդրվել է ձայնի տոնայնության, արագության սլայդերներ և 5 խոսակցական պրոֆիլներ։ |
| **2026-10-11** | **RoyalArm Store Search Linkage** | AI համակարգային պրոմպտը ուսուցանվել է RoyalArm ծրագրերի կատալոգին (`/shop?search=...`)։ |
| **2026-09-15** | **GPT-4.1-mini & GPT-4o-mini** | Հիմնական տեքստային չաթի մոդելներ 1M կոնտեքստի աջակցությամբ։ |
