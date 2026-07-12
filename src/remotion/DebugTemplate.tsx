import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface DebugProps {
  dbHook: string;
  dbBadCode: string;
  dbGoodCode: string;
  dbMetric: string;
}

export const DebugTemplate = ({
  dbHook = "ARRÊTEZ D'INGÉRER VOS DONNÉES EN BLOC ❌",
  dbBadCode = "fs.readFileSync('huge_data.json');",
  dbGoodCode = "fs.createReadStream('huge_data.json');",
  dbMetric = "-92% CPU USAGE"
}: DebugProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Timing (0-3s : Hook | 3-8s : Bad Code | 8-15s : Good Code + Impact)
  const badSpring = spring({ fps, frame: frame - 90, config: { damping: 12, mass: 0.6 } });
  const goodSpring = spring({ fps, frame: frame - 240, config: { damping: 11, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0f19", color: "#ffffff", fontFamily: "monospace", padding: "40px" }}>
      
      {/* HOOK SANS-SERIF PERCUTANT */}
      <div style={{ width: "100%", textAlign: "center", marginTop: "60px", fontFamily: "system-ui, sans-serif" }}>
        <h1 style={{ fontSize: "48px", fontWeight: 900, color: "#f1f5f9", lineHeight: "1.2" }}>{dbHook}</h1>
      </div>

      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "30px", marginTop: "80px" }}>
        
        {/* BLOC ROUGE : AVANT / BAD */}
        {frame >= 90 && (
          <div style={{ transform: `scale(${badSpring})`, backgroundColor: "#451a03", border: "2px solid #ef4444", borderRadius: "12px", padding: "30px 20px", position: "relative" }}>
            <span style={{ position: "absolute", top: "10px", right: "15px", color: "#ef4444", fontWeight: "bold", fontSize: "1.2rem" }}>⚠️ KRASH / SLOW</span>
            <p style={{ color: "#f87171", fontSize: "1.4rem", margin: 0 }}>{`- ${dbBadCode}`}</p>
          </div>
        )}

        {/* BLOC VERT : APRÈS / GOOD */}
        {frame >= 240 && (
          <div style={{ transform: `scale(${goodSpring})`, backgroundColor: "#022c22", border: "2px solid #00FF66", borderRadius: "12px", padding: "30px 20px", position: "relative", boxShadow: "0 0 30px rgba(0,255,102,0.15)" }}>
            <span style={{ position: "absolute", top: "10px", right: "15px", color: "#00FF66", fontWeight: "bold", fontSize: "1.2rem" }}>⚡ OPTIMISÉ</span>
            <p style={{ color: "#34d399", fontSize: "1.4rem", margin: 0 }}>{`+ ${dbGoodCode}`}</p>
          </div>
        )}

      </div>

      {/* METRIQUE FINALE RAPIDE */}
      {frame >= 270 && (
        <div style={{ textAlign: "center", marginTop: "60px", fontFamily: "system-ui, sans-serif" }}>
          <h2 style={{ fontSize: "75px", fontWeight: 900, color: "#00FF66", textShadow: "0 0 20px rgba(0,255,102,0.4)" }}>{dbMetric}</h2>
        </div>
      )}

      {/* BRANDING */}
      <div style={{ position: "absolute", bottom: "6%", left: "0", right: "0", textAlign: "center", color: "#334155", fontWeight: "800", fontSize: "1.3rem", fontFamily: "system-ui" }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
