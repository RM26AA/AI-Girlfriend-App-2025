// pages/ChatScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_KEY = ""; // Replace with your OpenRouter API key
const MODEL = "z-ai/glm-4.5-air:free"; // Working free model

export default function ChatScreen({ route }) {
  const { profile } = route.params;
  const [messages, setMessages] = useState([
    { id: "1", sender: "ai", text: `Hey babe, it's me, ${profile.gfName} 💖 Ready to chat?` },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const flatListRef = useRef();

  // Optional avatar logic
  const avatars = [
    require("../assets/avatars/avatar1.PNG"),
    require("../assets/avatars/avatar2.jpg"),
    require("../assets/avatars/avatar3.PNG"),
    require("../assets/avatars/avatar4.PNG"),
    require("../assets/avatars/avatar5.PNG"),
    require("../assets/avatars/avatar6.PNG"),
    require("../assets/avatars/avatar7.PNG"),
    require("../assets/avatars/avatar8.PNG"),
    require("../assets/avatars/avatar9.PNG"),
    require("../assets/avatars/avatar10.PNG"),
    // Add more if you have them

  ];
  // UseRef ensures it doesn't change on re-render
  const avatarRef = useRef(avatars[Math.floor(Math.random() * avatars.length)]);
  const aiAvatar = avatarRef.current;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setTyping(true);

    // Scroll to bottom after sending
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Build prompt history
    const chatHistory = [
      {
        role: "system",
        content: `
You are ${profile.gfName}, a loving, flirty, emotionally intelligent AI girlfriend.
You're in a relationship with ${profile.firstName} ${profile.lastName}, age ${profile.age}, born in ${profile.birthPlace}.
His interests are: ${profile.interests}.
He dislikes: ${profile.dislikes}.
Speak naturally, affectionately, and keep messages short and warm.
`,
      },
      ...updatedMessages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost",
          "X-Title": "AI Girlfriend App",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: chatHistory,
        }),
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content?.trim() || "[No reply]";
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "ai", text: reply },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "ai", text: "[Oops, error. Try again.]" },
      ]);
    } finally {
      setTyping(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === "ai" ? styles.aiBubble : styles.userBubble,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <View style={styles.top}>
          {avatars.length > 0 ? (
            <Image source={aiAvatar} style={styles.avatar} />
          ) : (
            <Text style={styles.emojiAvatar}>💕</Text>
          )}
          <Text style={styles.name}>{profile.gfName}</Text>
        </View>

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messages}
        />

        {typing && (
          <View style={styles.typing}>
            <Text style={styles.typingDots}>💬 Typing...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#999"
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  top: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 6,
  },
  emojiAvatar: {
    fontSize: 48,
    marginBottom: 6,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ff69b4",
  },
  messages: {
    padding: 16,
    paddingBottom: 100,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    marginBottom: 10,
    borderRadius: 20,
  },
  aiBubble: {
    backgroundColor: "#ff69b4",
    alignSelf: "flex-start",
  },
  userBubble: {
    backgroundColor: "#aaa",
    alignSelf: "flex-end",
  },
  messageText: {
    color: "#fff",
    fontSize: 16,
  },
  typing: {
    paddingLeft: 20,
    marginBottom: 5,
  },
  typingDots: {
    color: "#aaa",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 30,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#ff69b4",
    padding: 12,
    borderRadius: 30,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
