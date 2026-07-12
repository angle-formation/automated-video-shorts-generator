import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface CodeDiffProps {
  hook: string;
  badLabel: string;
  badCode: string;
  goodLabel: string;
  goodCode: string;
  metric: string;
}

export const CodeDiffTemplate = ({
  hook, badLabel, badCode, goodLabel, goodCode, metric
}: CodeDiffProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badSpr = spring({ fps, frame: frame - 60, config: { damping: 12 } });
  const goodSpr = spring({ fps, frame: frame - 180, config: { damping: 11 } });
  const metricSpr = spring({ fps, frame: frame - 210, config: { damping: 10, stiffness: 120 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#070a13", color: "#ffffff", fontFamily: "monospace", padding: "40px", justifyContent: "center" }}>
      <div style={{ width: "100%", textAlign: "center", marginBottom: "40px", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "46px", fontWeight: 900, color: "#f1f5f9", lineHeight: "1.2", letterSpacing: "-1px" }}>{hook}</h1>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "25px" }}>
        {frame >= 60 && (
          <div style={{ transform: `scale(${badSpr})`, backgroundColor: "#451a03", border: "2px solid #ef4444", borderRadius: "12px", padding: "25px 20px", position: "relative" }}>
            <span style={{ position: "absolute", top: "8px", right: "15px", color: "#ef4444", fontFamily: "system-ui", fontWeight: "bold", fontSize: "0.9rem" }}>{badLabel}</span>
            <p style={{ color: "#f87171", fontSize: "1.3rem", margin: 0, whiteSpace: "pre-wrap" }}>{badCode}</p>
          </div>
        )}

        {frame >= 180 && (
          <div style={{ transform: `scale(${goodSpr})`, backgroundColor: "#022c22", border: "2px solid #00FF66", borderRadius: "12px", padding: "25px 20px", position: "relative", boxShadow: "0 0 25px rgba(0,255,102,0.15)" }}>
            <span style={{ position: "absolute", top: "8px", right: "15px", color: "#00FF66", fontFamily: "system-ui", fontWeight: "bold", fontSize: "0.9rem" }}>{goodLabel}</span>
            <p style={{ color: "#34d399", fontSize: "1.3rem", margin: 0, whiteSpace: "pre-wrap" }}>{goodCode}</p>
          </div>
        )}
      </div>

      {frame >= 210 && (
        <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "system-ui, sans-serif", transform: `scale(${metricSpr})` }}>
          <h2 style={{ fontSize: "70px", fontWeight: 900, color: "#00FF66", textShadow: "0 0 20px rgba(0,255,102,0.4)" }}>{metric}</h2>
        </div>
      )}

      <div style={{ position: "absolute", bottom: "6%", left: 0, right: 0, textAlign: "center", color: "#334155", fontWeight: "800", fontSize: "1.3rem", fontFamily: "system-ui" }}>@angleformation</div>
    </AbsoluteFill>
  );
};
