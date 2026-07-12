import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface SqlVsVectorProps {
  hookText: string;
  sqlLabel: string;
  vectorLabel: string;
  vectorData: string;
  metricTitle: string;
  metricValue: string;
}

export const SqlVsVectorTemplate = ({
  hookText = "Pourquoi votre SQL ne comprend rien à l'IA.",
  sqlLabel = "SQL",
  vectorLabel = "Vector DB",
  vectorData = "[0.12, 0.85, -0.44, 0.92]",
  metricTitle = "RECHERCHE SÉMANTIQUE",
  metricValue = "+400% VITESSE"
}: SqlVsVectorProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- MATRICES D'ANIMATIONS VISUELLES ---
  const tableSpring = spring({ fps, frame: frame - 60, config: { damping: 12, mass: 0.5 } });
  const strikeWidth = spring({ fps, frame: frame - 150, config: { damping: 15, stiffness: 80 } });
  const metricPop = spring({ fps, frame: frame - 160, config: { damping: 10, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "system-ui, sans-serif", justifyContent: "center", alignItems: "center" }}>
      
      {/* PHASE 1 : HOOK TEXT-FIRST (0s - 2s) */}
      {frame < 60 && (
        <div style={{ width: "85%", textAlign: "center", padding: "20px" }}>
          <h1 style={{ fontSize: "65px", fontWeight: 900, lineHeight: "1.2", letterSpacing: "-2px" }}>
            {hookText}
          </h1>
        </div>
      )}

      {/* PHASE 2 & 3 : GRILLE COMPARATIVE CINETIQUE (2s - 10s) */}
      {frame >= 60 && (
        <div style={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", zIndex: 10, transform: `scale(${tableSpring})` }}>
          
          <h2 style={{ fontSize: "35px", fontWeight: 800, marginBottom: "50px", color: "#475569", textTransform: "uppercase", letterSpacing: "3px" }}>
            Analyse de l'Architecture
          </h2>

          <div style={{ width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", position: "relative" }}>
            
            {/* BLOC TRADITIONNEL SURLIGNÉ ET BARRE */}
            <div style={{ backgroundColor: "#0f172a", padding: "35px 20px", borderRadius: "16px", border: "1px solid #1e293b", position: "relative", minHeight: "220px" }}>
              <span style={{ color: "#64748b", fontWeight: "bold", fontSize: "1rem" }}>BASE RELATIONNELLE</span>
              <h3 style={{ fontSize: "55px", fontWeight: 900, marginTop: "15px", color: "#f1f5f9" }}>{sqlLabel}</h3>
              <p style={{ fontFamily: "monospace", color: "#334155", marginTop: "10px", fontSize: "1.3rem" }}>SELECT * FROM storage...</p>
              
              {/* LIGNE DE SUPPRESSION ROUGE INTENSE */}
              {frame >= 150 && (
                <div style={{
                  position: "absolute", top: "50%", left: "5%",
                  height: "8px", backgroundColor: "#ef4444", borderRadius: "4px",
                  width: `${strikeWidth * 90}%`, boxShadow: "0 0 15px #ef4444",
                  transform: "rotate(-5deg)"
                }} />
              )}
            </div>

            {/* BLOC IA DATA STREAM */}
            <div style={{ backgroundColor: "#022c22", padding: "35px 20px", borderRadius: "16px", border: "1px solid #064e3b", minHeight: "220px", boxShadow: "0 0 25px rgba(4,120,87,0.15)" }}>
              <span style={{ color: "#10b981", fontWeight: "bold", fontSize: "1rem" }}>BASE MATRICIELLE</span>
              <h3 style={{ fontSize: "50px", fontWeight: 900, marginTop: "15px", color: "#00FF66" }}>{vectorLabel}</h3>
              <p style={{ fontFamily: "monospace", color: "#059669", marginTop: "15px", fontSize: "1.2rem", wordBreak: "break-all" }}>
                {vectorData}
              </p>
            </div>
          </div>

          {/* PHASE 3 : METRIC IMPACT HIGH CONTRAST */}
          {frame >= 150 && (
            <div style={{ marginTop: "50px", textAlign: "center", transform: `scale(${metricPop})` }}>
              <div style={{ fontSize: "28px", fontWeight: "700", color: "#64748b", marginBottom: "5px" }}>
                {metricTitle}
              </div>
              <div style={{ fontSize: "80px", fontWeight: "900", color: "#00FF66", textShadow: "0 0 20px rgba(0,255,102,0.4)", letterSpacing: "-2px" }}>
                {metricValue}
              </div>
            </div>
          )}
        </div>
      )}

      {/* FOOTER IMMUTABLE DE MARQUE */}
      <div style={{ position: "absolute", bottom: "8%", color: "#334155", fontWeight: "800", fontSize: "1.3rem" }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
