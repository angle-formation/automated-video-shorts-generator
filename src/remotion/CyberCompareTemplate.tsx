import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export interface CyberCompareProps {
  title: string;
  subtitle: string;
  label1: string;
  value1: string;
  label2: string;
  value2: string;
  winner: "1" | "2";
  metricName: string;
}

export const CyberCompareTemplate = ({
  title = "CRITICAL METRIC BENCHMARK",
  subtitle = "SYSTEM ARCHITECTURE DUEL // JUNE 2026",
  label1 = "MONOLITHIC PIPELINE",
  value1 = "2450 MS",
  label2 = "EVENT-DRIVEN AGENTS",
  value2 = "120 MS",
  winner = "2",
  metricName = "LATENCY DEFICIT"
}: CyberCompareProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- ANIMATIONS À HAUTE VÉLOCITÉ (SNAP INTERVALLAIRE) ---
  const titleSnap = spring({ fps, frame, config: { mass: 0.2, stiffness: 180, damping: 8 } });
  const gridEntrance = spring({ fps, frame: frame - 40, config: { mass: 0.3, stiffness: 120, damping: 10 } });
  
  // Phase de verrouillage de cible (Frame 90 = 3 secondes strictes)
  const lockFrame = frame - 90;
  const lockSpring = spring({ fps, frame: lockFrame, config: { mass: 0.1, stiffness: 220, damping: 7 } });

  const is1 = winner === "1";

  // Calcul des transformations d'impact
  const border1 = lockFrame > 0 && is1 ? "4px solid #00FF66" : "2px solid #1e293b";
  const border2 = lockFrame > 0 && !is1 ? "4px solid #00FF66" : "2px solid #1e293b";

  const opacity1 = lockFrame > 0 && !is1 ? interpolate(lockSpring, [0, 1], [1, 0.15]) : 1;
  const opacity2 = lockFrame > 0 && is1 ? interpolate(lockSpring, [0, 1], [1, 0.15]) : 1;

  // Effet de clignotement d'alerte lors du verrouillage
  const flash = lockFrame > 0 && lockFrame < 15 && Math.floor(lockFrame / 3) % 2 === 0 ? 0.3 : 1;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", color: "#ffffff", fontFamily: "monospace", padding: "50px", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
      
      {/* GRILLE DE SUBDIVISION TECHNIQUE ARRIÈRE-PLAN */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(21, 28, 46, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(21, 28, 46, 0.25) 1px, transparent 1px)",
        backgroundSize: "40px 40px", opacity: 0.8
      }} />

      {/* BLOC TITRE AGGRESSIF / MAJUSCULES */}
      <div style={{ transform: `scale(${titleSnap})`, textAlign: "left", width: "100%", position: "absolute", top: "10%", padding: "0 20px", borderLeft: "5px solid #00E5FF" }}>
        <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "#00E5FF", letterSpacing: "4px" }}>
          // {subtitle}
        </span>
        <h1 style={{ fontSize: "52px", fontWeight: "900", color: "#ffffff", letterSpacing: "-2px", marginTop: "10px", lineHeight: "1.0" }}>
          {title.toUpperCase()}
        </h1>
      </div>

      {/* ARÈNE DE COMPARISON BRUTALISTE (SQUARE CORNERS) */}
      {frame >= 40 && (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "30px", transform: `scale(${gridEntrance})`, marginTop: "80px" }}>
          
          <div style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#4b5563", letterSpacing: "3px", textAlign: "center" }}>
            TARGET METRIC: {metricName.toUpperCase()}
          </div>

          {/* SÉQUENCE OPTION 1 */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "35px 25px", border: border1, backgroundColor: is1 && lockFrame > 0 ? "#011c11" : "#05070f",
            opacity: opacity1 * (is1 ? flash : 1), borderRadius: "0px", position: "relative"
          }}>
            <div>
              <div style={{ color: "#4b5563", fontSize: "1rem", fontWeight: "800" }}>[ MODULE_ALPHA ]</div>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#f8fafc", marginTop: "5px" }}>{label1.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: "45px", fontWeight: "900", color: is1 && lockFrame > 0 ? "#00FF66" : "#ef4444" }}>
              {value1}
            </div>
            {lockFrame > 0 && !is1 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(239,68,68,0.05)", color: "#ef4444", fontSize: "3rem", fontWeight: "900" }}>DISCARDED //</div>
            )}
          </div>

          {/* SÉQUENCE OPTION 2 */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "35px 25px", border: border2, backgroundColor: !is1 && lockFrame > 0 ? "#011c11" : "#05070f",
            opacity: opacity2 * (!is1 ? flash : 1), borderRadius: "0px", position: "relative"
          }}>
            <div>
              <div style={{ color: "#4b5563", fontSize: "1rem", fontWeight: "800" }}>[ MODULE_BRAVO ]</div>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#f8fafc", marginTop: "5px" }}>{label2.toUpperCase()}</div>
            </div>
            <div style={{ fontSize: "45px", fontWeight: "900", color: !is1 && lockFrame > 0 ? "#00FF66" : "#ef4444" }}>
              {value2}
            </div>
            {lockFrame > 0 && is1 && (
              <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "rgba(239,68,68,0.05)", color: "#ef4444", fontSize: "3rem", fontWeight: "900" }}>DISCARDED //</div>
            )}
          </div>

        </div>
      )}

      {/* METRIQUE CRITIQUE EN BAS DE RÉTENTION MASSIVE */}
      {lockFrame > 0 && (
        <div style={{
          position: "absolute", bottom: "16%", width: "100%", padding: "15px",
          backgroundColor: "#00FF66", color: "#000", textAlign: "center",
          fontWeight: "900", fontSize: "1.4rem", letterSpacing: "4px",
          transform: `scale(${lockSpring})`
        }}>
          CRITICAL ADVANTAGE OPTIMIZED // LOCKED
        </div>
      )}

      {/* BRANDING DÉTERMINÉ */}
      <div style={{ position: "absolute", bottom: "6%", color: "#1e293b", fontWeight: "900", fontSize: "1.4rem", letterSpacing: "3px" }}>
        SYS_LOG // @ANGLEFORMATION
      </div>
    </AbsoluteFill>
  );
};
