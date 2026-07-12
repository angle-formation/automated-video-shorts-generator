import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export interface Scene {
  text: string;
  highlight: string;
  step: number;
}

export interface VideoProps {
  hookText: string;
  hookHighlight: string;
  coreText: string;
  coreHighlight: string;
  archText: string;
  archHighlight: string;
  loopText: string;
  loopHighlight: string;
}

export const MyTemplate = ({
  hookText, hookHighlight,
  coreText, coreHighlight,
  archText, archHighlight,
  loopText, loopHighlight
}: VideoProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- CONFIGURATION DU TIMING STRICT (600 FRAMES = 20 SECONDES) ---
  let activeText = "";
  let activeHighlight = "";
  let currentStep = 0;
  let localFrame = frame;

  if (frame < 75) {
    // 0s -> 2.5s : Le Hook
    activeText = hookText || "PROMPT LLM : 0.4s CHRONO ⚡";
    activeHighlight = hookHighlight || "0.4s";
    currentStep = 1;
    localFrame = frame;
  } else if (frame >= 75 && frame < 300) {
    // 2.5s -> 10s : Le Remplissage Core
    activeText = coreText || "VOTRE REQUÊTE NE VA PAS DIRECTEMENT AU MODÈLE.";
    activeHighlight = coreHighlight || "PAS DIRECTEMENT";
    currentStep = 2;
    localFrame = frame - 75;
  } else if (frame >= 300 && frame < 510) {
    // 10s -> 17s : L'Étude de cas / Architecture Data Flow
    activeText = archText || "TRANSFORMATION EN VECTOR EMBEDDING PUIS ROUTAGE API.";
    activeHighlight = archHighlight || "VECTOR EMBEDDING";
    currentStep = 3;
    localFrame = frame - 300;
  } else {
    // 17s -> 20s : La Boucle (Loop) pour relancer le Hook
    activeText = loopText || "VOILÀ CE GUI SE PASSE QUAND LE...";
    activeHighlight = loopHighlight || "CE QUI SE PASSE";
    currentStep = 4;
    localFrame = frame - 510;
  }

  // Animation cinétique "Pop" instantanée par mot ou phrase (sans fondu lent)
  const popSpring = spring({ fps, frame: localFrame, config: { damping: 10, mass: 0.3, stiffness: 100 } });
  
  // Séparation du texte pour isoler et colorer dynamiquement le mot-clé
  const parts = activeText.split(new RegExp(`(${activeHighlight})`, "g"));

  return (
    <AbsoluteFill style={{ backgroundColor: "#090d16", color: "#ffffff", justifyContent: "center", alignItems: "center" }}>
      
      {/* STRUCTURE GRAPHIQUE COMPACTE : DATA FLOW INDICATOR */}
      <div style={{ position: "absolute", top: "15%", display: "flex", gap: "25px", zIndex: 5 }}>
        {[1, 2, 3, 4].map((step) => (
          <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", opacity: currentStep === step ? 1 : 0.25, transition: "opacity 0.15s ease" }}>
            <div style={{
              width: "50px", height: "50px", borderRadius: "12px", 
              backgroundColor: currentStep === step ? "#00FF66" : "#1e293b",
              color: currentStep === step ? "#000" : "#fff",
              display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "900", fontSize: "1.2rem",
              boxShadow: currentStep === step ? "0 0 20px #00FF66" : "none"
            }}>
              {step === 1 && "🪝"}
              {step === 2 && "📦"}
              {step === 3 && "⚙️"}
              {step === 4 && "🔄"}
            </div>
            <div style={{ height: "4px", width: "40px", backgroundColor: currentStep === step ? "#00FF66" : "#1e293b", marginTop: "10px", borderRadius: "2px" }} />
          </div>
        ))}
      </div>

      {/* ZONE DE SÉCURITÉ STRICTE (TIERS CENTRAL DE L'ÉCRAN) */}
      <div style={{
        width: "90%",
        height: "33%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        transform: `scale(${popSpring})`,
        padding: "0 20px",
        zIndex: 10
      }}>
        <h1 style={{ 
          fontSize: "72px", 
          fontWeight: 900, 
          lineHeight: "1.2", 
          fontFamily: "'Inter', 'Montserrat', sans-serif",
          letterSpacing: "-2px"
        }}>
          {parts.map((part, i) => 
            part === activeHighlight ? (
              <span key={i} style={{ color: "#00FF66", textShadow: "0 0 15px rgba(0,255,102,0.4)" }}>{part}</span>
            ) : (
              <span key={i}>{part}</span>
            )
          )}
        </h1>
      </div>

      {/* BRANDING EXCLUSIF EN BAS DE PAGE */}
      <div style={{ 
        position: "absolute", 
        bottom: "12%", 
        color: "#475569", 
        fontWeight: "800", 
        fontSize: "1.3rem", 
        letterSpacing: "1px",
        fontFamily: "'Inter', sans-serif",
        textTransform: "none" // Maintient les minuscules du handle
      }}>
        @angleformation
      </div>
    </AbsoluteFill>
  );
};
