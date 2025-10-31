'use client';

import { Loader2, Send, Sparkles, X } from "lucide-react";
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

import ChatbotButton from "@/components/chatbot-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface StreamState {
  controller: AbortController | null;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "assistant-welcome",
    role: "assistant",
    content: "안녕하세요! 인프런 강의 추천이나 기능 안내가 필요하시면 무엇이든 말씀해주세요.",
  },
];

function createId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const streamStateRef = useRef<StreamState>({ controller: null });
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setHasUnread(false);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: open ? "smooth" : "auto" });
  }, [messages, open]);

  useEffect(() => {
    return () => {
      streamStateRef.current.controller?.abort();
    };
  }, []);

  const historyForRequest = useCallback(
    () =>
      messages.map((message) => ({
        role: message.role === "assistant" ? "model" : "user",
        parts: [{ text: message.content }],
      })),
    [messages],
  );

  const handleToggle = useCallback(() => {
    console.log("[chat:toggle]", { next: !open });
    setOpen((prev) => !prev);
  }, [open]);

  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  }, []);

  const appendToAssistant = useCallback((delta: string) => {
    setMessages((prev) => {
      const next = [...prev];
      const lastIndex = next.length - 1;
      const last = next[lastIndex];

      if (!last || last.role !== "assistant") {
        return next;
      }

      next[lastIndex] = { ...last, content: last.content + delta };
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const trimmed = input.trim();
      if (!trimmed || isSending) {
        return;
      }

      setErrorMessage(null);

      const historyPayload = historyForRequest();
      console.log("[chat:send]", { message: trimmed, historyLength: historyPayload.length });

      const userMessage: Message = { id: createId(), role: "user", content: trimmed };
      const assistantPlaceholder: Message = { id: `${userMessage.id}-assistant`, role: "assistant", content: "" };

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      setInput("");
      setIsSending(true);

      const controller = new AbortController();
      streamStateRef.current.controller?.abort();
      streamStateRef.current.controller = controller;

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: trimmed,
            history: historyPayload,
          }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          throw new Error(`요청 실패 (status: ${response.status})`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let isCompleted = false;

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const segments = buffer.split("\n\n");
          buffer = segments.pop() ?? "";

          for (const segment of segments) {
            const lines = segment.split("\n");

            for (const rawLine of lines) {
              const line = rawLine.trim();

              if (!line.startsWith("data:")) {
                continue;
              }

              const data = line.slice(5).trimStart();

              if (data === "[DONE]") {
                isCompleted = true;
                break;
              }

              if (data === "[ERROR]") {
                throw new Error("스트리밍 중 오류가 발생했습니다.");
              }

              if (data.length === 0) {
                continue;
              }

              console.log("[chat:stream_chunk]", { length: data.length });

              appendToAssistant(data);

              if (!open) {
                setHasUnread(true);
              }
            }

            if (isCompleted) {
              break;
            }
          }

          if (isCompleted) {
            break;
          }
        }

        if (buffer.trim().length > 0 && !isCompleted) {
          const fallbackLines = buffer.split("\n");
          for (const rawLine of fallbackLines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) {
              continue;
            }

            const data = line.slice(5).trimStart();
            if (data && data !== "[DONE]") {
              appendToAssistant(data);
              if (!open) {
                setHasUnread(true);
              }
            }
          }
        }
      } catch (error) {
        console.error("[chat:error]", error);
        setMessages((prev) => {
          const next = [...prev];
          const lastIndex = next.length - 1;
          const last = next[lastIndex];

          if (last && last.role === "assistant") {
            next[lastIndex] = {
              ...last,
              content: last.content || "일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
            };
          }

          return next;
        });
        setErrorMessage("응답을 받아오지 못했어요. 네트워크 상태를 확인한 후 다시 시도해주세요.");
      } finally {
        setIsSending(false);
        streamStateRef.current.controller = null;
      }
    },
    [appendToAssistant, historyForRequest, input, isSending, open],
  );

  const placeholder = useMemo(() => (isSending ? "답변 생성 중..." : "메시지를 입력해주세요"), [isSending]);

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex flex-col items-end gap-4 md:bottom-6 md:right-6">
      {open ? (
        <div className="pointer-events-auto w-[min(100vw-2rem,22rem)] rounded-3xl border border-gray-200 bg-white shadow-2xl md:w-[24rem]">
          <div className="flex flex-col gap-4 p-4 md:p-6">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-900">인프런 AI 상담</span>
                  <span className="text-xs text-gray-500">Gemini 2.5 Flash</span>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleToggle}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" aria-hidden />
                <span className="sr-only">챗봇 닫기</span>
              </Button>
            </header>

            <section className="flex h-80 flex-col gap-4 rounded-2xl bg-gray-50 p-4 md:h-96">
              <div className="flex-1 overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
                  {messages.map((message) => (
                    <article
                      key={message.id}
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                        message.role === "user"
                          ? "self-end bg-blue-600 text-white"
                          : "self-start bg-white text-gray-900",
                      )}
                      aria-live={message.role === "assistant" ? "polite" : undefined}
                    >
                      {message.content || (isSending ? "답변을 불러오는 중입니다..." : " ")}
                    </article>
                  ))}
                  <div ref={endRef} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder={placeholder}
                  disabled={isSending}
                  className="h-11"
                  aria-label="메시지 입력"
                />
                <Button type="submit" className="h-11" disabled={isSending}>
                  {isSending ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                      생성 중...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="h-4 w-4" aria-hidden />
                      전송
                    </span>
                  )}
                </Button>
              </form>

              {errorMessage ? <p className="text-xs text-red-500">{errorMessage}</p> : null}
            </section>
          </div>
        </div>
      ) : null}

      <ChatbotButton
        aria-expanded={open}
        isOpen={open}
        hasNotification={hasUnread}
        onClick={handleToggle}
        className="pointer-events-auto"
      />
    </div>
  );
}

