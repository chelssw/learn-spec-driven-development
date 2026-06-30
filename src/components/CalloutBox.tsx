import type { ReactNode } from "react";

type Variant = "tip" | "note" | "warning" | "key";

const styles: Record<Variant, { border: string; bg: string; icon: string; label: string }> = {
  tip:     { border: "border-[#2da44e]", bg: "bg-green-50",  icon: "✓", label: "Tip" },
  note:    { border: "border-[#1e3a5f]", bg: "bg-blue-50",   icon: "i", label: "Note" },
  warning: { border: "border-amber-500",  bg: "bg-amber-50",  icon: "!", label: "Warning" },
  key:     { border: "border-purple-500", bg: "bg-purple-50", icon: "★", label: "Key Point" },
};

interface CalloutBoxProps {
  variant?: Variant;
  title?: string;
  children: ReactNode;
}

export default function CalloutBox({ variant = "note", title, children }: CalloutBoxProps) {
  const s = styles[variant];
  return (
    <div className={`my-5 border-l-4 ${s.border} ${s.bg} rounded-r-lg px-4 py-3`}>
      <p className="font-semibold text-sm mb-1 text-gray-700">
        {title ?? s.label}
      </p>
      <div className="text-sm text-gray-700">{children}</div>
    </div>
  );
}
