import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface StackItem {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export interface MetricStackProps {
  hook: string;
  title: string;
  item1Label: string; item1Val: string; isHigh1?: boolean;
  item2Label: string; item2Val: string; isHigh2?: boolean;
  item3Label: string; item3Val: string; isHigh3?: boolean;
  footerMetric?: string;
}

export const MetricStackTemplate = ({
  hook, title, item1Label, item1Val, isHigh1, item2Label, item2Val, isHigh2, item3Label, item3Val, isHigh3, footerMetric
}: MetricStackProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s1 = spring({ fps, frame: frame - 50, config: { damping: 12 } });
  const s2 = spring({ fps, frame: frame - 110, config: { damping: 12 } });
  const s3 = spring({ fps, frame: frame - 170, config: { damping: 12 } });
  const sf = spring({ fps, frame: frame - 230, config: { damping: 10, stiffness: 100 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#02040a", color: "#fff", fontFamily: "system-ui, sans-serif", padding: "40px", justifyContent: "center" }}>
      <div style={{ position: "absolute", top: "8%", width: "90%", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "-1.5px", lineHeight: "1.2" }}>{hook}</h1>
        <h2 style={{ fontSize: "28px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginTop: "20px", letterSpacing: "2px" }}>{title}</h2>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "20px", marginTop: "60px" }}>
        {frame >= 50 && (
          <div style={{ transform: `scale(${s1})`, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: isHigh1 ? "#022c22" : "#0f172a", padding: "25px", borderRadius: "12px", border: isHigh1 ? "2px solid #00FF66" : "1px solid #1e293b" }}>
            <span style={{ fontSize: "24px", fontWeight: "700", color: "#94a3b8" }}>{item1Label}</span>
            <span style={{ fontSize: "28px", fontWeight: "900", color: isHigh1 ? "#00FF66" : "#fff" }}>{item1Val}</span>
          </div>
        )}
        {frame >= 110 && (
          <div style={{ transform: `scale(${s2})`, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: isHigh2 ? "#022c22" : "#0f172a", padding: "25px", borderRadius: "12px", border: isHigh2 ? "2px solid #00FF66" : "1px solid #1e293b" }}>
            <span style={{ fontSize: "24px", fontWeight: "700", color: "#94a3b8" }}>{item2Label}</span>
            <span style={{ fontSize: "28px", fontWeight: "900", color: isHigh2 ? "#00FF66" : "#fff" }}>{item2Val}</span>
          </div>
        )}
        {frame >= 170 && (
          <div style={{ transform: `scale(${s3})`, display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: isHigh3 ? "#022c22" : "#0f172a", padding: "25px", borderRadius: "12px", border: isHigh3 ? "2px solid #00FF66" : "1px solid #1e293b" }}>
            <span style={{ fontSize: "24px", fontWeight: "700", color: "#94a3b8" }}>{item3Label}</span>
            <span style={{ fontSize: "28px", fontWeight: "900", color: isHigh3 ? "#00FF66" : "#fff" }}>{item3Val}</span>
          </div>
        )}
      </div>

      {frame >= 230 && footerMetric && (
        <div style={{ textAlign: "center", marginTop: "50px", transform: `scale(${sf})` }}>
          <div style={{ fontSize: "75px", fontWeight: "900", color: "#00FF66", textShadow: "0 0 25px rgba(0,255,102,0.4)" }}>{footerMetric}</div>
        </div>
      )}

      <div style={{ position: "absolute", bottom: "6%", left: 0, right: 0, textAlign: "center", color: "#334155", fontWeight: "800", fontSize: "1.3rem" }}>@angleformation</div>
    </AbsoluteFill>
  );
};
