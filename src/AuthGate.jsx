import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase.js";

const C = {
  bg: "#07070F", card: "#111120", elevated: "#171728",
  border: "#1E1E32", borderHi: "#2A2A44", gold: "#C8A951",
  text: "#E2E2F0", textSec: "#7878A0", textMut: "#404058",
};

export default function AuthGate({ children }) {
  const [session, setSession] = useState(undefined);
  const [email, setEmail]     = useState("");
  const [sent, setSent]       = useState(false);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => listener.subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
        height:"100vh", background:C.bg, color:C.textMut, fontSize:13 }}>
        Loading…
      </div>
    );
  }

  if (session) return children;

  const sendLink = async () => {
    if (!email.trim()) return;
    setLoading(true); setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: window.location.origin },
    });
    setLoading(false);
    if (err) setError(err.message);
    else setSent(true);
  };

  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center",
      height:"100vh", background:C.bg, fontFamily:"-apple-system,'SF Pro Display','Segoe UI',sans-serif" }}>
      <div style={{ width:340, background:C.card, border:`1px solid ${C.borderHi}`,
        borderRadius:16, padding:32, display:"flex", flexDirection:"column", gap:20 }}>

        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:34, height:34, borderRadius:9, background:C.gold,
            display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ color:"#07070F", fontWeight:800, fontSize:15 }}>A</span>
          </div>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:C.text }}>APEX</div>
            <div style={{ fontSize:10, color:C.textMut, letterSpacing:"1px" }}>ZENITH RISE CAPITAL</div>
          </div>
        </div>

        {sent ? (
          <div style={{ textAlign:"center", display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ fontSize:28 }}>📬</div>
            <div style={{ fontSize:14, color:C.text, fontWeight:500 }}>Check your inbox</div>
            <div style={{ fontSize:12, color:C.textSec, lineHeight:1.6 }}>
              Magic link sent to <strong style={{ color:C.gold }}>{email}</strong>.
              Click it to sign in — no password needed.
            </div>
            <button onClick={() => { setSent(false); setEmail(""); }}
              style={{ background:"none", border:`1px solid ${C.border}`, borderRadius:8,
                color:C.textSec, cursor:"pointer", padding:"8px 14px", fontSize:11,
                fontFamily:"inherit", marginTop:4 }}>
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div>
              <div style={{ fontSize:18, fontWeight:300, color:C.text, marginBottom:4 }}>Sign in</div>
              <div style={{ fontSize:12, color:C.textSec }}>
                Enter your email — we'll send a magic link.
              </div>
            </div>

            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendLink()}
              placeholder="your@email.com"
              autoFocus
              autoComplete="off"
              style={{ background:C.elevated, border:`1px solid ${C.border}`, borderRadius:8,
                padding:"11px 14px", fontSize:13, color:C.text, outline:"none",
                fontFamily:"inherit" }}
            />

            {error && (
              <div style={{ fontSize:11, color:"#E85050", background:"#E8505015",
                border:"1px solid #E8505030", borderRadius:6, padding:"8px 12px" }}>
                {error}
              </div>
            )}

            <button
              onClick={sendLink}
              disabled={loading || !email.trim()}
              style={{ background:C.gold, border:"none", borderRadius:8, color:"#07070F",
                cursor: loading || !email.trim() ? "not-allowed" : "pointer",
                padding:"11px 14px", fontSize:13, fontWeight:700, fontFamily:"inherit",
                opacity: loading || !email.trim() ? 0.6 : 1 }}>
              {loading ? "Sending…" : "Send Magic Link →"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
