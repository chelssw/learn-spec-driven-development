interface ChatMessage {
  role: "copilot" | "user";
  content: string;
}

export default function SimulatorChat({
  messages,
  agentLabel = "C",
  agentColor = "bg-[#1e3a5f]",
}: {
  messages: ChatMessage[];
  agentLabel?: string;
  agentColor?: string;
}) {
  return (
    <div className="space-y-3">
      {messages.map((msg, i) => (
        <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
              msg.role === "copilot" ? agentColor : "bg-[#2da44e]"
            }`}
          >
            {msg.role === "copilot" ? agentLabel : "You"}
          </div>
          <div
            className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === "copilot"
                ? "bg-white border border-gray-200 text-gray-800 rounded-tl-sm"
                : "bg-[#2da44e] text-white rounded-tr-sm"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
}
