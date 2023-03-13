import { useState } from "react";
const API_KEY = "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";
const SQLGenerator = ({combinedString}) => {
  const [SQLQueryStatement, setSQLQueryStatement] = useState("");

  async function GenerateQuery(chatMessages) {
    const userMessage = {
      role: "user",
      content: chatMessages,
    };

    const systemMessage = {
      role: "system",
      content: "Make a SQL Schema without preamble"
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
        const stringQuery = data.choices[0].message.content
          .replace(/\n/g, "");
        setSQLQueryStatement(stringQuery);
      });
  }

  return (
    <>
      <button onClick={() => {GenerateQuery(combinedString)}}>Generate SQL Schema</button>
      <p>Query: {SQLQueryStatement}</p>
    </>
  );
};

export default SQLGenerator;
