import { useState } from "react";

export default function ChatPage() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askBot = async () => {
    if (!question.trim()) return;
    setAnswer("Thinking... ⏳");

    const res = await fetch("http://localhost:5000/api/chat/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setAnswer(data.answer || "No answer found ❌");
  };

  return (
    <div className="flex items-center justify-center h-[85vh] bg-gray-100 p-6">
      <div className="bg-white shadow-lg p-8 rounded-xl w-[550px]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🤖 Ask Your SOP Bot</h2>

        <textarea
          className="w-full border rounded p-3 mb-4"
          rows="4"
          placeholder="Ask something about SOP..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          onClick={askBot}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg"
        >
          Ask
        </button>

        {answer && (
          <div className="mt-4 p-3 border rounded bg-gray-50 whitespace-pre-line">
            {answer}
          </div>
        )}
      </div>
    </div>
  );
}
