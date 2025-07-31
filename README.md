# 💕 AI Girlfriend Chat App

A modern AI-powered chat app built with **React Native + Expo**, where users can talk to a personalized virtual girlfriend. The AI adapts based on user input, offering flirty, emotionally intelligent conversations with animated avatars and a smooth UI.

---

## ✨ Features

- 🤖 Real-time AI chat using [OpenRouter AI API](https://openrouter.ai/)  
- 👩 Personalized girlfriend with name, personality & interests
- 🖼️ Random avatar images or emoji fallback
- 💬 Typing indicator (like WhatsApp)
- 💅 Clean, modern pink-and-white themed UI
- 📱 iOS and Android support (with Dynamic Island & notch-safe layout)

---

## 📦 Tech Stack

- **React Native** + **Expo**
- **OpenRouter API** (chat completions) [AI model - Z.AI: GLM 4.5 Air (free)]
- **AsyncStorage** (optional future use)
- **Custom avatars** in `assets/avatars/`

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/ai-girlfriend-chat.git
cd ai-girlfriend-chat
```

### 2. Install dependencies

```
npm install
```

### 3. Add your API key
In ChatScreen.js, replace:

```
const API_KEY = "YOUR_API_KEY_HERE";
```

with your OpenRouter AI key.

### 4. Run the app

```
npx expo start
```

Scan the QR code to open it on your phone.

## 📁 Project Structure

```
.
├── App.js                # Main entry & navigation
├── assets/
│   ├── logo.png
│   └── avatars/          # Add your avatar images here
├── pages/
│   ├── SplashScreen.js
│   ├── InputScreen.js
│   └── ChatScreen.js
```

## 📝 License
This project is licensed under the MIT License.

## 👤 Author
Built by R.Maunick — feel free to fork, contribute, or reach out!













