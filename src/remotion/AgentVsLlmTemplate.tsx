import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AgentVsLlmProps {
  hookText: string;
  llmName: string;
  llmCost: string;
  llmLatency: string;
  llmAccuracy: string;
  agentName: string;
  agentCost: string;
  agentLatency: string;
  agentAccuracy: string;
}

export const AgentVsLlmTemplate = ({
  hookText = "1 LLM GÉANT VS 5 MICRO-AGENTS IA",
  llmName = "GPT-5 / CLAUDE 4",
  llmCost = "ÉLEVÉ",
  llmLatency = "2.4s",
  llmAccuracy = "81%",
  agentName = "ARCHI MULTI-AGENTS (5x Locaux)",
  agentCost = "-80%",
  agentLatency = "0.6s",
  agentAccuracy = "94%"
}: AgentVsLlmProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- CONFIGURATION DE L'APPARITION VISUELLE EN STACCATO ---
  // On crée des déclencheurs de ressort décalés pour imiter le rythme d'un BIP
  const springRow1 = spring({ fps, frame: frame - 60, config: { damping: 12, stiffness: 100 } });
  const springRow2 = spring({ fps, frame: frame - 90, config: { damping: 12, stiffness: 100 } });

  // Apparition successive des colonnes (Coût -> Latence -> Précision)
  const showStat1 = frame >= 120; // 4.0s
  const showStat2 = frame >= 145; // 4.8s
  const showStat3 = frame >= 170; // 5.6s

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "system-ui, -apple-system, sans-serif", justifyContent: "center", alignItems: "center", padding: "40px" }}>
      
      {/* PHASE 1 : HOOK BRUT (0s - 2s) */}
      {frame < 60 && (
        <div style={{ width: "90%", textAlign: "center" }}>
          <h1 style={{ fontSize: "70px", fontWeight: 900, lineHeight: "1.1", letterSpacing: "-3px" }}>
            {hookText}
          </h1>
        </div>
      )}

      {/* PHASE 2 : LE TABLEAU COMPARATIF DYNAMIQUE (2s - 10s) */}
      {frame >= 60 && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "40px", zIndex: 10 }}>
          
          <h2 style={{ fontSize: "36px", fontWeight: 800, textAlign: "center", color: "#4b5563", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px" }}>
            Benchmark Architecture
          </h2>

          {/* LIGNE 1 : LE MONOLITHE GÉANT */}
          <div style={{ transform: `scale(${springRow1})`, opacity: frame >= 60 ? 1 : 0, backgroundColor: "#0f172a", borderRadius: "16px", border: "1px solid #1e293b", padding: "25px", display: "flex", flexDirection: "column", gap: "15px" }}>
            <div style={{ color: "#94a3b8", fontWeight: "800", fontSize: "1.3rem", letterSpacing: "-0.5px" }}>{llmName}</div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", textAlign: "center" }}>
              <div style={{ opacity: showStat1 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#475569", fontSize: "0.85rem", fontWeight: "700" }}>COÛT</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#f87171" }}>{llmCost}</div>
              </div>
              <div style={{ opacity: showStat2 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#475569", fontSize: "0.85rem", fontWeight: "700" }}>LATENCE</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#f87171" }}>{llmLatency}</div>
              </div>
              <div style={{ opacity: showStat3 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#475569", fontSize: "0.85rem", fontWeight: "700" }}>PRÉCISION</div>
                <div style={{ fontSize: "1.6rem", fontWeight: "900", color: "#94a3b8" }}>{llmAccuracy}</div>
              </div>
            </div>
          </div>

          {/* LIGNE 2 : L'ALTERNATIVE MULTI-AGENTS DISRUPTIVE */}
          <div style={{ transform: `scale(${springRow2})`, opacity: frame >= 90 ? 1 : 0, backgroundColor: "#022c22", borderRadius: "16px", border: "2px solid #00FF66", padding: "25px", display: "flex", flexDirection: "column", gap: "15px", boxShadow: "0 0 35px rgba(0,255,102,0.15)" }}>
            <div style={{ color: "#34d399", fontWeight: "900", fontSize: "1.3rem", letterSpacing: "-0.5px" }}>{agentName}</div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", textAlign: "center" }}>
              <div style={{ opacity: showStat1 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#065f46", fontSize: "0.85rem", fontWeight: "700" }}>COÛT</div>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: "#00FF66", textShadow: "0 0 10px rgba(0,255,102,0.3)" }}>{agentCost}</div>
              </div>
              <div style={{ opacity: showStat2 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#065f46", fontSize: "0.85rem", fontWeight: "700" }}>LATENCE</div>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: "#00FF66" }}>{agentLatency}</div>
              </div>
              <div style={{ opacity: showStat3 ? 1 : 0, transition: "opacity 0.05s ease" }}>
                <div style={{ color: "#065f46", fontSize: "0.85rem", fontWeight: "700" }}>PRÉCISION</div>
                <div style={{ fontSize: "2rem", fontWeight: "900", color: "#00FF66" }}>{agentAccuracy}</div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* FOOTER BRANDING */}
      <div style={{ position: "absolute", bottom: "8%", color: "#334155", fontWeight: "800", fontSize: "1.3rem", letterSpacing: "1px" }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
