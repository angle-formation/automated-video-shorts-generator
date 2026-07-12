import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface AuroraGlassProps {
  hook: string;
  title: string;
  description: string;
  statLabel: string;
  statValue: string;
  // Options de personnalisation dynamiques
  hookColor: string;
  titleColor: string;
  descriptionColor: string;
  statValueColor: string;
  auroraColor1: string;
  auroraColor2: string;
  titleFontSize: number;
  descFontSize: number;
}

export const AuroraGlassTemplate = ({
  hook, title, description, statLabel, statValue,
  hookColor = "#38bdf8",
  titleColor = "#ffffff",
  descriptionColor = "#94a3b8",
  statValueColor = "#00FF66",
  auroraColor1 = "#4f46e5",
  auroraColor2 = "#06b6d4",
  titleFontSize = 75,
  descFontSize = 35
}: AuroraGlassProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cardEntrance = spring({ fps, frame, config: { damping: 15, stiffness: 70 } });
  
  // Animation orbitale fluide en tâche de fond
  const auroraX = Math.sin(frame * 0.03) * 120;
  const auroraY = Math.cos(frame * 0.02) * 150;

  const textY = interpolate(frame, [20, 50], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#020208", color: "#ffffff", fontFamily: "system-ui, sans-serif", justifyContent: "center", alignItems: "center", overflow: "hidden", padding: "50px" }}>
      
      {/* COUCHES DE DÉGRADÉS LIQUID AMBIENT */}
      <div style={{
        position: "absolute", width: "650px", height: "650px", borderRadius: "50%",
        background: `radial-gradient(circle, ${auroraColor1} 0%, rgba(0,0,0,0) 70%)`,
        transform: `translate(${auroraX}px, ${auroraY}px)`, top: "5%", left: "-15%", filter: "blur(90px)", opacity: 0.45
      }} />
      <div style={{
        position: "absolute", width: "550px", height: "550px", borderRadius: "50%",
        background: `radial-gradient(circle, ${auroraColor2} 0%, rgba(0,0,0,0) 70%)`,
        transform: `translate(${-auroraX}px, ${-auroraY}px)`, bottom: "10%", right: "-15%", filter: "blur(100px)", opacity: 0.35
      }} />

      {/* PANNEAU DE VERRE DÉPOLI DESIGN */}
      <div style={{
        width: "100%", padding: "45px 30px", borderRadius: "28px",
        backgroundColor: "rgba(255, 255, 255, 0.02)",
        backdropFilter: "blur(25px)", WebkitBackdropFilter: "blur(25px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
        transform: `scale(${cardEntrance})`,
        zIndex: 10
      }}>
        
        <span style={{ fontSize: "0.85rem", fontWeight: "800", color: hookColor, letterSpacing: "3px", textTransform: "uppercase", display: "block", marginBottom: "18px" }}>
          {hook}
        </span>

        <div style={{ transform: `translateY(${textY}px)`, opacity: textOpacity }}>
          <h2 style={{ fontSize: `${titleFontSize}px`, fontWeight: "850", letterSpacing: "-1.5px", lineHeight: "1.15", marginBottom: "20px", color: titleColor }}>
            {title}
          </h2>
          <p style={{ fontSize: `${descFontSize}px`, color: descriptionColor, lineHeight: "1.45", fontWeight: "400" }}>
            {description}
          </p>
        </div>

        {frame >= 90 && (
          <div style={{
            marginTop: "35px", paddingTop: "30px", borderTop: "1px solid rgba(255,255,255,0.06)",
            transform: `scale(${spring({ fps, frame: frame - 90, config: { damping: 10 } })})`
          }}>
            <span style={{ fontSize: "0.8rem", fontWeight: "700", color: "#475569", letterSpacing: "1px" }}>{statLabel}</span>
            <div style={{ fontSize: "3.2rem", fontWeight: "900", color: statValueColor, marginTop: "5px", textShadow: `0 0 20px ${statValueColor}44`, letterSpacing: "-1px" }}>
              {statValue}
            </div>
          </div>
        )}

      </div>

      <div style={{ position: "absolute", bottom: "6%", color: "#334155", fontWeight: "700", fontSize: "1.1rem", zIndex: 10 }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
