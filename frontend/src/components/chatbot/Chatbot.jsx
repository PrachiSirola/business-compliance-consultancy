import { useEffect, useId, useRef, useState } from "react";
import { CONFIG, SYSTEM_PROMPT, CB_ICON, localReply } from "./chatbotConfig";
import { apiPost } from "../../lib/api";

function CbSvg({ paths, className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: paths }}
    />
  );
}

/**
 * Small inline form shown inside a bot message so a visitor can leave their
 * contact details without typing free text. Submits to the backend as a
 * "Chatbot"-sourced enquiry, so it shows up in the Admin Dashboard exactly
 * like a contact-form enquiry.
 */
function LeadCaptureForm({ transcript, onDone }) {
  const [values, setValues] = useState({ name: "", phone: "", email: "" });
  const [state, setState] = useState("idle"); // idle | sending | done | error

  async function submit(e) {
    e.preventDefault();
    if (!values.name.trim()) return;
    setState("sending");
    try {
      await apiPost("/api/enquiries", {
        source: "Chatbot",
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        message: transcript,
      });
      setState("done");
      onDone();
    } catch (_err) {
      setState("error");
    }
  }

  if (state === "done") {
    return <p style={{ margin: 0 }}>Thanks — Deepika will reach out shortly!</p>;
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, marginTop: 6 }}>
      <input
        className="cb-lead-input"
        placeholder="Name"
        value={values.name}
        onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
        required
      />
      <input
        className="cb-lead-input"
        placeholder="Phone"
        value={values.phone}
        onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
      />
      <input
        className="cb-lead-input"
        placeholder="Email"
        type="email"
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
      />
      <button className="btn btn--primary" type="submit" disabled={state === "sending"} style={{ padding: "9px 16px", fontSize: ".88rem" }}>
        {state === "sending" ? "Sending…" : "Share details"}
      </button>
      {state === "error" && (
        <span style={{ color: "var(--danger)", fontSize: ".82rem" }}>
          Couldn't send that — please try the contact form instead.
        </span>
      )}
    </form>
  );
}

/**
 * Suits Assistant chat widget.
 *  - mode="floating": launcher bubble + slide-up panel, present on every page.
 *  - mode="embed": the inline panel embedded on the Contact page.
 * Each instance keeps its own conversation history (an intentional
 * improvement over the original vanilla-JS version, where a floating +
 * embedded instance on the same page shared one global history/DOM id).
 */
export default function Chatbot({ mode = "floating" }) {
  const embed = mode === "embed";
  const uid = useId();
  const logId = `cb-log-${uid}`;

  const [open, setOpen] = useState(embed);
  const [built, setBuilt] = useState(embed);
  const [messages, setMessages] = useState([]); // {role, kind:'text'|'leadform', html}
  const [chips, setChips] = useState([]);
  const [typing, setTyping] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const historyRef = useRef([]); // {role, content} sent to the backend
  const leadPromptedRef = useRef(false);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, typing]);

  function greet() {
    setMessages([
      {
        role: "bot",
        html: `Hi! I'm the ${CONFIG.assistantName}. I can help with company & LLP registration, FEMA/FDI, trademark, compliance and more. What are you working on?`,
      },
    ]);
    setChips(CONFIG.quickReplies);
  }

  // Build (greet) on first open.
  useEffect(() => {
    if (built) {
      if (embed) greet();
      return;
    }
    if (open && !built) {
      setBuilt(true);
      greet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, built]);

  async function send(text) {
    setMessages((m) => [...m, { role: "user", html: text.replace(/</g, "&lt;") }]);
    historyRef.current.push({ role: "user", content: text });
    setChips([]);
    setTyping(true);

    let reply;
    try {
      const res = await fetch(CONFIG.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: historyRef.current }),
      });
      if (!res.ok) throw new Error("bad status");
      const data = await res.json();
      reply = (data.reply || data.text || "").trim();
      if (!reply) throw new Error("empty");
    } catch (_err) {
      await new Promise((r) => setTimeout(r, 500));
      reply = localReply(text);
    }

    setTyping(false);
    setMessages((m) => [...m, { role: "bot", html: reply }]);
    historyRef.current.push({ role: "assistant", content: reply });

    if (!leadPromptedRef.current && historyRef.current.length >= 4) {
      leadPromptedRef.current = true;
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            role: "bot",
            kind: "leadform",
            html: `If you'd like Deepika to follow up, share your details below — or use the <a href="${CONFIG.bookingUrl}">contact form</a>. No pressure either way.`,
          },
        ]);
      }, 700);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const v = inputVal.trim();
    if (!v) return;
    setInputVal("");
    send(v);
  }

  const panel = (
    <>
      <div className="cb-head">
        <span className="cb-head__av">
          <CbSvg paths={CB_ICON.spark} />
        </span>
        <span>
          <span className="cb-head__t">{CONFIG.assistantName}</span>
          <span className="cb-head__s">Online — replies in seconds</span>
        </span>
        {!embed && (
          <button className="cb-close" aria-label="Close chat" onClick={() => setOpen(false)}>
            <CbSvg paths={CB_ICON.close} />
          </button>
        )}
      </div>
      <div className="cb-log" id={logId} ref={logRef}>
        {messages.map((m, i) =>
          m.kind === "leadform" ? (
            <div key={i} className="cb-msg cb-msg--bot">
              <div dangerouslySetInnerHTML={{ __html: m.html }} />
              <LeadCaptureForm
                transcript={historyRef.current.map((h) => `${h.role}: ${h.content}`).join("\n")}
                onDone={() => {}}
              />
            </div>
          ) : (
            <div
              key={i}
              className={"cb-msg cb-msg--" + m.role}
              dangerouslySetInnerHTML={{ __html: m.html }}
            />
          )
        )}
        {typing && (
          <div className="cb-typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
      </div>
      <div className="cb-chips">
        {chips.map((c) => (
          <button
            key={c}
            className="cb-chip"
            type="button"
            onClick={() => {
              setChips([]);
              send(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <form className="cb-form" autoComplete="off" onSubmit={onSubmit}>
        <input
          placeholder="Ask about registration, FEMA, trademark…"
          aria-label="Message"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button className="cb-send" type="submit" aria-label="Send">
          <CbSvg paths={CB_ICON.send} />
        </button>
      </form>
    </>
  );

  if (embed) {
    return (
      <div className="cb-panel cb-embed" aria-label="Suits Assistant chat">
        {panel}
      </div>
    );
  }

  return (
    <>
      <button
        className="cb-launch"
        aria-label="Chat with Suits Assistant"
        style={{ display: open ? "none" : "grid" }}
        onClick={() => setOpen(true)}
      >
        <span className="cb-launch__dot"></span>
        <CbSvg paths={CB_ICON.chat} />
      </button>
      <div className={"cb-panel" + (open ? " open" : "")}>{built && panel}</div>
    </>
  );
}
