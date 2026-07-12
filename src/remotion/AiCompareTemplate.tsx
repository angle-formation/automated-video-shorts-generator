import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export interface AiCompareProps {
  title: string;
  description: string;
  icon1: string; // Base64 ou URL string
  icon2: string; // Base64 ou URL string
  winner: "1" | "2";
  label1: string;
  label2: string;
}

export const AiCompareTemplate = ({
  title = "SÉLECTION DU MEILLEUR LLM 2026",
  description = "Benchmark deep-dive sur l'extraction de schémas JSON complexes.",
  icon1,
  icon2,
  winner = "1",
  label1 = "Modèle A",
  label2 = "Modèle B"
}: AiCompareProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- MATRICES D'ANIMATIONS RYTHMIQUES ---
  const headerSpring = spring({ fps, frame, config: { damping: 14 } });
  const iconsEntrance = spring({ fps, frame: frame - 45, config: { damping: 12 } });
  
  // Déclenchement de la décision à la frame 100 (3.3 secondes)
  const decisionFrame = frame - 100;
  const decisionSpring = spring({ fps, frame: decisionFrame, config: { damping: 10, stiffness: 90 } });

  // Calcul des états d'échelle et d'opacité selon le gagnant choisi
  const isWinner1 = winner === "1";
  
  const scaleIcon1 = decisionFrame > 0 
    ? (isWinner1 ? interpolate(decisionSpring, [0, 1], [1, 1.15]) : interpolate(decisionSpring, [0, 1], [1, 0.85]))
    : 1;

  const scaleIcon2 = decisionFrame > 0 
    ? (!isWinner1 ? interpolate(decisionSpring, [0, 1], [1, 1.15]) : interpolate(decisionSpring, [0, 1], [1, 0.85]))
    : 1;

  const opacityIcon1 = decisionFrame > 0 && !isWinner1 ? interpolate(decisionSpring, [0, 1], [1, 0.2]) : 1;
  const opacityIcon2 = decisionFrame > 0 && isWinner1 ? interpolate(decisionSpring, [0, 1], [1, 0.2]) : 1;

  // Icônes par défaut en SVG Data URI si l'utilisateur n'a pas téléversé d'image
  const defaultIcon1 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2300E5FF'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>";
  const defaultIcon2 = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23a855f7'><path d='M11 15h2v2h-2zm0-8h2v6h-2zm1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.3 0-8-3.7-8-8s3.7-8 8-8 8 3.7 8 8-3.7 8-8 8z'/></svg>";

  return (
    <AbsoluteFill style={{ backgroundColor: "#02040a", color: "#ffffff", fontFamily: "system-ui, sans-serif", padding: "50px", justifyContent: "center", alignItems: "center" }}>
      
      {/* HEADER D'ACCROCHE */}
      <div style={{ transform: `scale(${headerSpring})`, textAlign: "center", width: "100%", position: "absolute", top: "10%" }}>
        <h1 style={{ fontSize: "50px", fontWeight: 950, background: "linear-gradient(to right, #ffffff, #94a3b8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-2px", lineHeight: "1.2" }}>
          {title}
        </h1>
        <p style={{ fontSize: "24px", color: "#475569", marginTop: "15px", fontWeight: "500", padding: "0 30px" }}>
          {description}
        </p>
      </div>

      {/* ARÈNE DU COMBAT D'ICÔNES (TIERS CENTRAL) */}
      {frame >= 45 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", width: "100%", transform: `scale(${iconsEntrance})`, zIndex: 10, marginTop: "60px" }}>
          
          {/* COMPARATEUR GAUCHE : ICON 1 */}
          <div style={{ 
            display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
            transform: `scale(${scaleIcon1})`, opacity: opacityIcon1, transition: "opacity 0.1s ease"
          }}>
            <div style={{
              width: "240px", height: "240px", borderRadius: "40px", backgroundColor: "#0f172a",
              border: isWinner1 && decisionFrame > 0 ? "4px solid #00FF66" : "2px solid #1e293b",
              boxShadow: isWinner1 && decisionFrame > 0 ? "0 0 40px rgba(0,255,102,0.4)" : "none",
              display: "flex", justifyContent: "center", alignItems: "center", padding: "40px"
            }}>
              <img src={icon1 || defaultIcon1} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "20px" }} alt="Icon 1" />
            </div>
            <span style={{ fontSize: "28px", fontWeight: "800", color: isWinner1 && decisionFrame > 0 ? "#00FF66" : "#f1f5f9" }}>{label1}</span>
            {isWinner1 && decisionFrame > 0 && (
              <div style={{ backgroundColor: "#00FF66", color: "#000", fontWeight: "900", padding: "6px 20px", borderRadius: "99px", fontSize: "1.1rem", transform: `scale(${decisionSpring})` }}>GAGNANT 🏆</div>
            )}
          </div>

          {/* COMPARATEUR DROITE : ICON 2 */}
          <div style={{ 
            display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
            transform: `scale(${scaleIcon2})`, opacity: opacityIcon2, transition: "opacity 0.1s ease"
          }}>
            <div style={{
              width: "240px", height: "240px", borderRadius: "40px", backgroundColor: "#0f172a",
              border: !isWinner1 && decisionFrame > 0 ? "4px solid #00FF66" : "2px solid #1e293b",
              boxShadow: !isWinner1 && decisionFrame > 0 ? "0 0 40px rgba(0,255,102,0.4)" : "none",
              display: "flex", justifyContent: "center", alignItems: "center", padding: "40px"
            }}>
              <img src={icon2 || defaultIcon2} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "20px" }} alt="Icon 2" />
            </div>
            <span style={{ fontSize: "28px", fontWeight: "800", color: !isWinner1 && decisionFrame > 0 ? "#00FF66" : "#f1f5f9" }}>{label2}</span>
            {!isWinner1 && decisionFrame > 0 && (
              <div style={{ backgroundColor: "#00FF66", color: "#000", fontWeight: "900", padding: "6px 20px", borderRadius: "99px", fontSize: "1.1rem", transform: `scale(${decisionSpring})` }}>GAGNANT 🏆</div>
            )}
          </div>

        </div>
      )}

      {/* FOOTER IMMUTABLE */}
      <div style={{ position: "absolute", bottom: "8%", color: "#334155", fontWeight: "800", fontSize: "1.3rem" }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
