import type { ReactNode, Ref } from "react";

export type RailConversationMessage = {
  id: string;
  side: "character" | "visitor";
  body: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
};

export type RailConversationSceneProps = {
  source: string;
  label: string;
  messagesLabel?: string;
  characterLabel: string;
  character: ReactNode;
  messages: RailConversationMessage[];
  composer: ReactNode;
  background?: ReactNode;
  status?: ReactNode;
  typing?: ReactNode;
  endMarker?: ReactNode;
  messageListRef?: Ref<HTMLDivElement>;
  className?: string;
};

/**
 * A full-height conversation canvas where a character, messages and composer
 * share one scene. The message history owns vertical scrolling so the page
 * behind a takeover stays still. Character art and brand styling come from
 * the consumer; readable messages and the composer always remain in the DOM.
 */
export default function RailConversationScene({
  source,
  label,
  messagesLabel = "Conversation messages",
  characterLabel,
  character,
  messages,
  composer,
  background,
  status,
  typing,
  endMarker,
  messageListRef,
  className,
}: RailConversationSceneProps) {
  return (
    <section
      className={["rail-conversationscene", className].filter(Boolean).join(" ")}
      data-rail-conversationscene={source}
      aria-label={label}
    >
      <div className="rail-conversationscene__viewport">
        {background && <div className="rail-conversationscene__background" aria-hidden="true">{background}</div>}
        <div className="rail-conversationscene__stage" aria-label={characterLabel}>
          {character}
          {status && <div className="rail-conversationscene__status">{status}</div>}
        </div>
        <div
          ref={messageListRef}
          className="rail-conversationscene__messages"
          data-rail-conversation-messages
          role="log"
          aria-label={messagesLabel}
          aria-live="polite"
          tabIndex={0}
        >
          {messages.map((message) => (
            <article key={message.id} className="rail-conversationscene__message" data-rail-side={message.side}>
              <div className="rail-conversationscene__bubble">{message.body}</div>
              {message.meta && <div className="rail-conversationscene__meta">{message.meta}</div>}
              {message.actions && <div className="rail-conversationscene__actions">{message.actions}</div>}
            </article>
          ))}
          {typing && <div className="rail-conversationscene__typing">{typing}</div>}
          {endMarker}
        </div>
      </div>
      <div className="rail-conversationscene__composer">{composer}</div>
    </section>
  );
}
