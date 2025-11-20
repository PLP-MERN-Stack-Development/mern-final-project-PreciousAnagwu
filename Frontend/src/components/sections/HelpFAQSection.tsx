// components/FAQChat.tsx
import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function FAQChat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // 1️⃣ Send question to backend
      await fetch("http://localhost:5000/api/faqs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      // 2️⃣ Simulate AI instant response
      const simulatedResponse = await new Promise<string>((resolve) =>
        setTimeout(() => resolve(`Lovable Climate AI🌿: Hello Climate hero! We'll respond to you shortly, Thank you for your patience.`), 800)
      );

      const botMessage: Message = { sender: "bot", text: simulatedResponse };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Error sending your question. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <Button onClick={() => setOpen(true)} className="fixed bottom-6 right-6 z-50">
        Help / FAQ
      </Button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-end md:items-center z-50">
          <Card className="w-full max-w-md p-4 relative flex flex-col h-[500px]">
            <button
              className="absolute top-3 right-3 text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              <X />
            </button>

            <h2 className="text-xl font-bold mb-4">Help / FAQ Chat</h2>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end"
                      : "bg-gray-100 text-gray-800 self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <textarea
                placeholder="Ask your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="flex-1 resize-none border rounded p-2"
              />
              <Button onClick={handleSend} disabled={loading}>
                {loading ? "..." : "Send"}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
