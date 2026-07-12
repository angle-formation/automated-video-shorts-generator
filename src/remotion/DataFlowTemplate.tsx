import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DataFlowProps {
  dfHook: string;
  dfStep1: string;
  dfStep2: string;
  dfStep3: string;
}

export const DataFlowTemplate = ({
  dfHook = "ANATOMIE D'UNE REQUÊTE LLM 🧠",
  dfStep1 = "1. Embedding du Prompt utilisateur",
  dfStep2 = "2. Recherche sémantique (Vector DB)",
  dfStep3 = "3. Payload enrichi envoyé au LLM"
}: DataFlowProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Découpage temporel strict (0-3s : Hook | 3-8s : S1 | 8-13s : S2 | 13-18s : S3)
  const currentStage = frame < 90 ? 0 : frame < 240 ? 1 : frame < 390 ? 2 : 3;

  const spring1 = spring({ fps, frame: frame - 90, config: { damping: 12 } });
  const spring2 = spring({ fps, frame: frame - 240, config: { damping: 12 } });
  const spring3 = spring({ fps, frame: frame - 390, config: { damping: 12 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#030712", color: "#ffffff", fontFamily: "system-ui, sans-serif", justifyContent: "center", alignItems: "center" }}>
      
      {/* HOOK PERMANENT EN HAUT */}
      <div style={{ position: "absolute", top: "10%", width: "90%", textAlign: "center" }}>
        <h1 style={{ fontSize: "50px", fontWeight: 900, color: "#00E5FF", letterSpacing: "-1px" }}>{dfHook}</h1>
        <div style={{ height: "4px", width: "100px", backgroundColor: "#00E5FF", margin: "20px auto 0", borderRadius: "2px" }} />
      </div>

      {/* PIPELINE SÉQUENTIEL VERTICAL */}
      <div style={{ width: "85%", display: "flex", flexDirection: "column", gap: "40px", marginTop: "100px" }}>
        
        {/* ÉTAPE 1 */}
        {frame >= 90 && (
          <div style={{ 
            transform: `scale(${spring1})`, backgroundColor: currentStage === 1 ? "#0e7490" : "#1f2937",
            padding: "25px", borderRadius: "12px", border: currentStage === 1 ? "2px solid #00E5FF" : "2px solid transparent",
            boxShadow: currentStage === 1 ? "0 0 25px rgba(0,229,255,0.3)" : "none", transition: "all 0.15s ease"
          }}>
            <p style={{ fontSize: "32px", fontWeight: "700", color: currentStage === 1 ? "#fff" : "#9ca3af" }}>{dfStep1}</p>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {frame >= 240 && (
          <div style={{ 
            transform: `scale(${spring2})`, backgroundColor: currentStage === 2 ? "#0e7490" : "#1f2937",
            padding: "25px", borderRadius: "12px", border: currentStage === 2 ? "2px solid #00E5FF" : "2px solid transparent",
            boxShadow: currentStage === 2 ? "0 0 25px rgba(0,229,255,0.3)" : "none", transition: "all 0.15s ease"
          }}>
            <p style={{ fontSize: "32px", fontWeight: "700", color: currentStage === 2 ? "#fff" : "#9ca3af" }}>{dfStep2}</p>
          </div>
        )}

        {/* ÉTAPE 3 */}
        {frame >= 390 && (
          <div style={{ 
            transform: `scale(${spring3})`, backgroundColor: currentStage === 3 ? "#0e7490" : "#1f2937",
            padding: "25px", borderRadius: "12px", border: currentStage === 3 ? "2px solid #00E5FF" : "2px solid transparent",
            boxShadow: currentStage === 3 ? "0 0 25px rgba(0,229,255,0.3)" : "none", transition: "all 0.15s ease"
          }}>
            <p style={{ fontSize: "32px", fontWeight: "700", color: currentStage === 3 ? "#fff" : "#9ca3af" }}>{dfStep3}</p>
          </div>
        )}

      </div>

      {/* BRANDING */}
      <div style={{ position: "absolute", bottom: "8%", color: "#334155", fontWeight: "800", fontSize: "1.3rem" }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
