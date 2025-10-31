import { MessageCircle, X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface ChatbotButtonProps extends ComponentPropsWithoutRef<"button"> {
  isOpen?: boolean;
  hasNotification?: boolean;
}

export default function ChatbotButton({
  className,
  isOpen,
  hasNotification,
  ...props
}: ChatbotButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "relative flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "md:h-16 md:w-16",
        isOpen && "bg-gray-900 hover:bg-gray-800",
        className,
      )}
      aria-label={isOpen ? "챗봇 닫기" : "챗봇 열기"}
      {...props}
    >
      {isOpen ? <X className="h-6 w-6" aria-hidden /> : <MessageCircle className="h-6 w-6" aria-hidden />}
      {hasNotification && !isOpen ? (
        <span className="absolute right-3 top-3 h-3 w-3 rounded-full bg-red-500" aria-hidden />
      ) : null}
    </button>
  );
}

