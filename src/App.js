import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import CheckboxGroup from "./Checkbox";

const API_KEY = "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";

function App() {
  const [typing, setTyping] = useState(false);
  const [features, setFeatures] = useState([]);

  const handleSend = async (message) => {
    // set a typing indicator
    setTyping(true);

    // process message to chatGPT
    await processMessageToChatGPT(message);
  };

  async function processMessageToChatGPT(chatMessages) {
    const userMessage = {
      role: "user",
      content: chatMessages,
    };

    const systemMessage = {
      role: "system",
      content: "The response must be in bullet points without preamble. The bullet points change with *"
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMessage, // always needs to be the first message
        userMessage, // [Message]
      ],
    };

	console.log(apiRequestBody);

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data, "DATAAA");
        console.log(data.choices[0].message.content);
        const arr = data.choices[0].message.content
          .replace(/\n/g, "")
          .split("*")
          .filter((item) => item !== "")
          .map((item) => item.trim());
        setFeatures(arr);
        setTyping(false);
      });
  }

  return (
    <div className="App">
      <div>
        <MainContainer>
          <ChatContainer>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
		<CheckboxGroup features={features}/>
      </div>
    </div>
  );
}

export default App;
