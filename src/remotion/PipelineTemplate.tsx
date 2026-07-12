import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface PipelineProps {
  hook: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  greenHighlight?: string;
}

export const PipelineTemplate = ({
  hook, step1, step2, step3, step4, greenHighlight = ""
}: PipelineProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing : Découpage pour 12 secondes (360 frames)
  const activeStage = frame < 60 ? 0 : frame < 140 ? 1 : frame < 220 ? 2 : frame < 300 ? 3 : 4;

  const spr1 = spring({ fps, frame: frame - 60, config: { damping: 12 } });
  const spr2 = spring({ fps, frame: frame - 140, config: { damping: 12 } });
  const spr3 = spring({ fps, frame: frame - 220, config: { damping: 12 } });
  const spr4 = spring({ fps, frame: frame - 300, config: { damping: 12 } });

  const renderText = (text: string) => {
    if (!greenHighlight || !text.includes(greenHighlight)) return text;
    const parts = text.split(new RegExp(`(${greenHighlight})`, "g"));
    return parts.map((p, i) => p === greenHighlight ? <span key={i} style={{ color: "#00FF66", textShadow: "0 0 15px #00FF66" }}>{p}</span> : p);
  };

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000", color: "#fff", fontFamily: "system-ui, sans-serif", justifyContent: "center", alignItems: "center", padding: "40px" }}>
      <div style={{ position: "absolute", top: "8%", width: "90%", textAlign: "center" }}>
        <h1 style={{ fontSize: "52px", fontWeight: 900, color: "#fff", letterSpacing: "-2px", lineHeight: "1.2" }}>{hook}</h1>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "25px", marginTop: "80px" }}>
        {frame >= 60 && (
          <div style={{ transform: `scale(${spr1})`, backgroundColor: activeStage === 1 ? "#0e7490" : "#111827", padding: "22px", borderRadius: "12px", border: activeStage === 1 ? "2px solid #00E5FF" : "2px solid #1f2937", transition: "all 0.1s" }}>
            <p style={{ fontSize: "28px", fontWeight: "800", margin: 0, color: activeStage === 1 ? "#fff" : "#64748b" }}>{renderText(step1)}</p>
          </div>
        )}
        {frame >= 140 && (
          <div style={{ transform: `scale(${spr2})`, backgroundColor: activeStage === 2 ? "#0e7490" : "#111827", padding: "22px", borderRadius: "12px", border: activeStage === 2 ? "2px solid #00E5FF" : "2px solid #1f2937", transition: "all 0.1s" }}>
            <p style={{ fontSize: "28px", fontWeight: "800", margin: 0, color: activeStage === 2 ? "#fff" : "#64748b" }}>{renderText(step2)}</p>
          </div>
        )}
        {frame >= 220 && (
          <div style={{ transform: `scale(${spr3})`, backgroundColor: activeStage === 3 ? "#0e7490" : "#111827", padding: "22px", borderRadius: "12px", border: activeStage === 3 ? "2px solid #00E5FF" : "2px solid #1f2937", transition: "all 0.1s" }}>
            <p style={{ fontSize: "28px", fontWeight: "800", margin: 0, color: activeStage === 3 ? "#fff" : "#64748b" }}>{renderText(step3)}</p>
          </div>
        )}
        {frame >= 300 && (
          <div style={{ transform: `scale(${spr4})`, backgroundColor: activeStage === 4 ? "#0e7490" : "#111827", padding: "22px", borderRadius: "12px", border: activeStage === 4 ? "2px solid #00E5FF" : "2px solid #1f2937", transition: "all 0.1s" }}>
            <p style={{ fontSize: "28px", fontWeight: "800", margin: 0, color: activeStage === 4 ? "#fff" : "#64748b" }}>{renderText(step4)}</p>
          </div>
        )}
      </div>

      <div style={{ position: "absolute", bottom: "8%", color: "#334155", fontWeight: "800", fontSize: "1.3rem" }}>@angleformation</div>
    </AbsoluteFill>
  );
};
