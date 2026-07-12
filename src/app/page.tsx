"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("engine");

  // MOTEUR THREE.JS CLUSTER GRAPH 3D (Nouveau)
  const [tcTitle, setTcTitle] = useState("GRAPHRAG KNOWLEDGE KNOT");
  const [tcSubtitle, setTcSubtitle] = useState("RECURSIVE VECTOR RELATION LINK // v5.2");
  const [tcMetric, setTcMetric] = useState("0.014s CONTEXT");
  const [tcNodeColor, setTcNodeColor] = useState("#00E5FF");
  const [tcLineColor, setTcLineColor] = useState("#1e1b4b");
  const [tcTitleSize, setTcTitleSize] = useState<number>(52);
  const [tcSubtitleSize, setTcSubtitleSize] = useState<number>(16);
  const [tcMetricSize, setTcMetricSize] = useState<number>(75);
  const [tcTitleTop, setTcTitleTop] = useState<number>(12);
  const [tcTitleLeft, setTcTitleLeft] = useState<number>(10);
  const [tcMetricBottom, setTcMetricBottom] = useState<number>(12);
  const [tcMetricLeft, setTcMetricLeft] = useState<number>(10);

  // MOTEUR THREE.JS MATRIX PARTICULES 3D
  const [tmTitle, setTmTitle] = useState("QUANTUM APIS INFERENCE");
  const [tmSubtitle, setTmSubtitle] = useState("3D DATA HOP ROUTING ENGINE // v4.0");
  const [tmMetric, setTmMetric] = useState("940 TFLOPS");
  const [tmGlowColor, setTmGlowColor] = useState("#00FF66");
  const [tmTitleSize, setTmTitleSize] = useState<number>(56);
  const [tmSubtitleSize, setTmSubtitleSize] = useState<number>(18);
  const [tmMetricSize, setTmMetricSize] = useState<number>(78);
  const [tmTitleTop, setTmTitleTop] = useState<number>(10);
  const [tmTitleLeft, setTmTitleLeft] = useState<number>(10);
  const [tmMetricBottom, setTmMetricBottom] = useState<number>(10);
  const [tmMetricLeft, setTmMetricLeft] = useState<number>(10);

  // Moteur 1 (Libre 20s)
  const [hookText, setHookText] = useState("PROMPT LLM : 0.4s CHRONO ⚡");
  const [hookHighlight, setHookHighlight] = useState("0.4s");
  const [coreText, setCoreText] = useState("VOTRE REQUÊTE NE VA PAS DIRECTEMENT AU MODÈLE.");
  const [coreHighlight, setCoreHighlight] = useState("PAS DIRECTEMENT");
  const [archText, setArchText] = useState("TRANSFORMATION EN VECTOR EMBEDDING PUIS ROUTAGE API.");
  const [archHighlight, setArchHighlight] = useState("VECTOR EMBEDDING");
  const [loopText, setLoopText] = useState("VOILÀ CE QUI SE PASSE QUAND LE...");
  const [loopHighlight, setLoopHighlight] = useState("CE QUI SE PASSE");

  // TEMPLATE BRUTALISTE CYBER COMPARE
  const [cyTitle, setCyTitle] = useState("CRITICAL METRIC BENCHMARK");
  const [cySubtitle, setCySubtitle] = useState("SYSTEM ARCHITECTURE DUEL // JUNE 2026");
  const [cyLabel1, setCyLabel1] = useState("MONOLITHIC PIPELINE");
  const [cyValue1, setCyValue1] = useState("2450 MS");
  const [cyLabel2, setCyLabel2] = useState("EVENT-DRIVEN AGENTS");
  const [cyValue2, setCyValue2] = useState("120 MS");
  const [cyWinner, setCyWinner] = useState<"1" | "2">("2");
  const [cyMetricName, setCyMetricName] = useState("LATENCY DEFICIT");

  // TEMPLATE PREMIUM AURORA GLASS
  const [gHook, setGHook] = useState("L'ÈRE DES SYSTÈMES AUTONOMES");
  const [gTitle, setGTitle] = useState("L'infrastructure invisible");
  const [gDesc, setGDesc] = useState("En 2026, le meilleur code est celui qui s'auto-gère, s'auto-optimise et s'auto-répare.");
  const [gStatL, setGStatL] = useState("DISPONIBILITÉ RÉSEAU");
  const [gStatV, setGStatV] = useState("99.999%");
  const [gHookColor, setGHookColor] = useState("#38bdf8");
  const [gTitleColor, setGTitleColor] = useState("#ffffff");
  const [gDescColor, setGDescColor] = useState("#94a3b8");
  const [gStatValColor, setGStatValColor] = useState("#00FF66");
  const [gAurora1, setGAurora1] = useState("#4f46e5");
  const [gAurora2, setGAurora2] = useState("#06b6d4");
  const [gTitleSize, setGTitleSize] = useState<number>(70);
  const [gDescSize, setGDescSize] = useState<number>(34);

  // MOTEUR DUEL IA COMPARATOR
  const [cTitle, setCTitle] = useState("SÉLECTION DU MEILLEUR LLM 2026 🤖");
  const [cDesc, setCDesc] = useState("Benchmark sur l'extraction de schémas JSON complexes.");
  const [cLabel1, setCLabel1] = useState("OPENAI GPT-5");
  const [cLabel2, setCLabel2] = useState("CLAUDE 4 OPUS");
  const [cWinner, setCWinner] = useState<"1" | "2">("1");
  const [cIcon1Base64, setCIcon1Base64] = useState<string>("");
  const [cIcon2Base64, setCIcon2Base64] = useState<string>("");

  // PIPELINE STATE CONTROL (Cas 2 & 7)
  const [pHook, setPHook] = useState("0 HUMAIN : TRAITER 10 000 LEADS / MIN ⚡");
  const [pS1, setPS1] = useState("→ Webhook Inbound Déclenché");
  const [pS2, setPS2] = useState("→ Extracteur IA en Format JSON Strict");
  const [pS3, setPS3] = useState("→ Scoring Vectoriel des Intentions");
  const [pS4, setPS4] = useState("→ Routage CRM Automatique Exécuté");
  const [pHl, setPHl] = useState("Format JSON Strict");

  // CODE DIFF CONTROL (Cas 3, 6 & 9)
  const [dHook, setDHook] = useState("CETTE LIGNE DE CODE VIDE COMPTE EN BANQUE ❌");
  const [dBadL, setDBadL] = useState("BOUCLE UN-OPTIMIZED");
  const [dBadC, setDBadC] = useState("for prompt in huge_list:\n  response = llm.call(prompt)\n  # Ruine en Token API !");
  const [dGoodL, setDGoodL] = useState("BATCH PROCESSING");
  const [dGoodC, setDGoodC] = useState("chunks = batch_split(huge_list)\nresponses = llm.batch_call(chunks)\n# Économie massive");
  const [dMetric, setDMetric] = useState("-1400$ / MOIS");

  // METRIC STACK CONTROL (Cas 4, 5, 8 & 10)
  const [sHook, setSHook] = useState("RAG VS FENÊTRE DE CONTEXTE DE 2M 📊");
  const [sTitle, setSTitle] = useState("Benchmark Base Doc 500Mo");
  const [sL1, setSL1] = useState("VITESSE D'EXÉCUTION");
  const [sSV1, setSV1] = useState("Instantanée (RAG)");
  const [sL2, setSL2] = useState("COÛT INFRAS");
  const [sSV2, setSV2] = useState("Divisé par 12 (RAG)");
  const [sL3, setSL3] = useState("SETUP PIPELINE");
  const [sSV3, setSV3] = useState("Complexe (RAG)");
  const [sFooter, setSFooter] = useState("RAG GAGNE EN PROD");

  // Global Pipeline States
  const [loading, setLoading] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = (e: React.ChangeEvent<HTMLInputElement>, setBase64: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") setBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRenderSubmit = async () => {
    setLoading(true); setError(null); setVideoUrl(null); setProgress(0);
    setStatusText("Transmission de l'architecture géométrique au worker...");

    let templateId = "PipelineTemplate";
    let payload: any = {};

    if (activeTab === "engine") {
      templateId = "ReelTemplate";
      payload = { templateId, hookText, hookHighlight, coreText, coreHighlight, archText, archHighlight, loopText, loopHighlight };
    } else if (activeTab === "case2" || activeTab === "case7") {
      templateId = "PipelineTemplate";
      payload = { templateId, hook: pHook, step1: pS1, step2: pS2, step3: pS3, step4: pS4, greenHighlight: pHl };
    } else if (activeTab === "case3" || activeTab === "case6" || activeTab === "case9") {
      templateId = "CodeDiffTemplate";
      payload = { templateId, hook: dHook, badLabel: dBadL, badCode: dBadC, goodLabel: dGoodL, goodCode: dGoodC, metric: dMetric };
    } else if (activeTab === "auroraglass") {
      templateId = "AuroraGlassTemplate";
      payload = {
        templateId, hook: gHook, title: gTitle, description: gDesc, statLabel: gStatL, statValue: gStatV,
        hookColor: gHookColor, titleColor: gTitleColor, descriptionColor: gDescColor, statValueColor: gStatValColor,
        auroraColor1: gAurora1, auroraColor2: gAurora2, titleFontSize: gTitleSize, descFontSize: gDescSize
      };
    } else if (activeTab === "cybercompare") {
      templateId = "CyberCompareTemplate";
      payload = { templateId, title: cyTitle, subtitle: cySubtitle, label1: cyLabel1, value1: cyValue1, label2: cyLabel2, value2: cyValue2, winner: cyWinner, metricName: cyMetricName };
    } else if (activeTab === "aicompare") {
      templateId = "AiCompareTemplate";
      payload = { templateId, title: cTitle, description: cDesc, label1: cLabel1, label2: cLabel2, winner: cWinner, icon1: cIcon1Base64, icon2: cIcon2Base64 };
    } else if (activeTab === "threedmatrix") {
      templateId = "ThreeDMatrixTemplate";
      payload = { templateId, title: tmTitle, subtitle: tmSubtitle, metric: tmMetric, glowColor: tmGlowColor, titleFontSize: tmTitleSize, subtitleFontSize: tmSubtitleSize, metricFontSize: tmMetricSize, titleTop: tmTitleTop, titleLeft: tmTitleLeft, metricBottom: tmMetricBottom, metricLeft: tmMetricLeft };
    } else if (activeTab === "threedcluster") {
      templateId = "ThreeDClusterTemplate";
      payload = {
        templateId, title: tcTitle, subtitle: tcSubtitle, metric: tcMetric, nodeColor: tcNodeColor, lineColor: tcLineColor,
        titleFontSize: tcTitleSize, subtitleFontSize: tcSubtitleSize, metricFontSize: tcMetricSize,
        titleTop: tcTitleTop, titleLeft: tcTitleLeft, metricBottom: tcMetricBottom, metricLeft: tcMetricLeft
      };
    } else {
      templateId = "MetricStackTemplate";
      payload = { templateId, hook: sHook, title: sTitle, item1Label: sL1, item1Val: sSV1, isHigh1: true, item2Label: sL2, item2Val: sSV2, isHigh2: true, item3Label: sL3, item3Val: sSV3, footerMetric: sFooter };
    }

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) setCurrentJobId(data.jobId);
      else { setError(data.error); setLoading(false); }
    } catch (err) {
      setError("Worker injoignable."); setLoading(false);
    }
  };

  useEffect(() => {
    if (!currentJobId) return;
    let intId = setInterval(async () => {
      const res = await fetch(`/api/status/${currentJobId}`);
      const data = await res.json();
      if (data.state === "completed") {
        setProgress(100); setVideoUrl(`${data.videoUrl}?t=${Date.now()}`); setLoading(false); setCurrentJobId(null);
        clearInterval(intId);
      } else if (data.state === "failed") {
        setError("Le calcul du worker a échoué."); setLoading(false); setCurrentJobId(null); clearInterval(intId);
      } else if (data.state === "active") {
        setProgress(data.progress || 0); setStatusText(`Traitement FFmpeg en cours : ${data.progress || 0}%`);
      }
    }, 1000);
    return () => clearInterval(intId);
  }, [currentJobId]);

  return (
    <div style={{ backgroundColor: "#020617", color: "#f8fafc", minHeight: "100vh", display: "flex", fontFamily: "system-ui, sans-serif" }}>
      
      {/* SIDEBAR NAVIGATION À 12 SECTEURS */}
      <nav style={{ width: "350px", backgroundColor: "#0f172a", borderRight: "1px solid #1e293b", padding: "25px 15px", display: "flex", flexDirection: "column", gap: "8px", maxHeight: "100vh", overflowY: "auto" }}>
        <div style={{ fontWeight: "900", color: "#00FF66", marginBottom: "20px", fontSize: "1.1rem" }}>📐 STUDIO @ANGLEFORMATION</div>
        {[
          { id: "engine", label: "1. Moteur Libre Séquentiel" },
          { id: "threedcluster", label: "🧬 Graph de Données 3D (Réseau)" },
          { id: "threedmatrix", label: "🔮 Nuage Particules 3D (Matrix)" },
          { id: "cybercompare", label: "⚡ Cyber-Tech Duel (Déterminé)" },
          { id: "auroraglass", label: "💎 Fluid Glassmorphism (Premium)" },
          { id: "aicompare", label: "⚔️ Duel Comparateur IA (Images)" },
          { id: "case2", label: "2. Tri de Leads (Pipeline)" },
          { id: "case3", label: "3. Erreur Budget (Git Diff)" },
          { id: "case6", label: "6. Vector Failure (Git Diff)" },
          { id: "case7", label: "7. Veille Autonome (Pipeline)" },
          { id: "case9", label: "9. Self-Healing Server (Diff)" },
          { id: "case10", label: "10. Fin du SaaS / UI (Stack)" }
        ].map((t) => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ width: "100%", padding: "11px", borderRadius: "6px", border: "none", textAlign: "left", fontSize: "0.85rem", fontWeight: "600", cursor: "pointer", backgroundColor: activeTab === t.id ? "#1e293b" : "transparent", color: activeTab === t.id ? "#00FF66" : "#94a3b8" }}>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ZONE D'ÉDITION ET MONITEUR */}
      <div style={{ flex: 1, padding: "40px", overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: "40px" }}>
          
          <div style={{ backgroundColor: "#0f172a", padding: "30px", borderRadius: "16px", border: "1px solid #1e293b" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "20px", color: "#6366f1" }}>Directives Graphiques & Alignement Textuel</h2>

            {/* FORM CONTEXTUELLE MUTABLE */}
            {activeTab === "engine" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" value={hookText} onChange={(e) => setHookText(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
                <input type="text" value={coreText} onChange={(e) => setCoreText(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
              </div>
            )}

            {activeTab === "threedcluster" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input type="text" value={tcTitle} onChange={(e) => setTcTitle(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
                <input type="text" value={tcSubtitle} onChange={(e) => setTcSubtitle(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
                <input type="text" value={tcMetric} onChange={(e) => setTcMetric(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#00FF66", borderRadius: "6px" }} />
                
                <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.9rem", color: "#6366f1", fontWeight: "bold" }}>⚡ Dimensions Polices Graph (px)</span>
                  <input type="range" min={30} max={90} value={tcTitleSize} onChange={(e) => setTcTitleSize(Number(e.target.value))} />
                  <input type="range" min={12} max={30} value={tcSubtitleSize} onChange={(e) => setTcSubtitleSize(Number(e.target.value))} />
                  <input type="range" min={40} max={110} value={tcMetricSize} onChange={(e) => setTcMetricSize(Number(e.target.value))} />
                </div>

                <div style={{ borderTop: "1px solid #1e293b", paddingTop: "10px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <span style={{ fontSize: "0.9rem", color: "#6366f1", fontWeight: "bold" }}>📐 Coordonnées HUD Graphe (%)</span>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input type="range" min={5} max={45} value={tcTitleTop} onChange={(e) => setTcTitleTop(Number(e.target.value))} />
                    <input type="range" min={5} max={25} value={tcTitleLeft} onChange={(e) => setTcTitleLeft(Number(e.target.value))} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <input type="range" min={5} max={45} value={tcMetricBottom} onChange={(e) => setTcMetricBottom(Number(e.target.value))} />
                    <input type="range" min={5} max={25} value={tcMetricLeft} onChange={(e) => setTcMetricLeft(Number(e.target.value))} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", borderTop: "1px solid #1e293b", paddingTop: "10px" }}>
                  <div><label style={{ fontSize: "0.8rem", color: "#64748b" }}>Couleur Nœuds</label><input type="color" value={tcNodeColor} onChange={(e) => setTcNodeColor(e.target.value)} /></div>
                  <div><label style={{ fontSize: "0.8rem", color: "#64748b" }}>Couleur Filaments</label><input type="color" value={tcLineColor} onChange={(e) => setTcLineColor(e.target.value)} /></div>
                </div>
              </div>
            )}

            {activeTab === "threedmatrix" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <input type="text" value={tmTitle} onChange={(e) => setTmTitle(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
                <input type="text" value={tmSubtitle} onChange={(e) => setTmSubtitle(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
                <input type="text" value={tmMetric} onChange={(e) => setTmMetric(e.target.value)} style={{ width: "100%", padding: "11px", backgroundColor: "#020617", border: "1px solid #334155", color: "#00FF66", borderRadius: "6px" }} />
                <input type="color" value={tmGlowColor} onChange={(e) => setTmGlowColor(e.target.value)} />
              </div>
            )}

            {/* SECTIONS RESTE DES ONGLETS SÉCURISÉES */}
            {activeTab === "cybercompare" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input type="text" value={cyTitle} onChange={(e) => setCyTitle(e.target.value)} style={{ width: "100%", padding: "12px", backgroundColor: "#020617", border: "1px solid #334155", color: "#fff", borderRadius: "6px" }} />
              </div>
            )}

            <button onClick={handleRenderSubmit} disabled={loading} style={{ width: "100%", padding: "16px", borderRadius: "8px", backgroundColor: loading ? "#1e293b" : "#00FF66", color: "#000", fontWeight: "900", border: "none", cursor: loading ? "not-allowed" : "pointer", marginTop: "30px" }}>
              {loading ? "CALCUL DE LA GRILLE 3D..." : "COMPILER LA SÉQUENCE GRAPH 🎬"}
            </button>

            {loading && (
              <div style={{ marginTop: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", fontSize: "0.85rem" }}>
                  <span>{statusText}</span>
                  <span style={{ fontWeight: "bold", color: "#00FF66" }}>{progress}%</span>
                </div>
                <div style={{ width: "100%", height: "6px", backgroundColor: "#1e293b", borderRadius: "99px", overflow: "hidden" }}>
                  <div style={{ width: `${progress}%`, height: "100%", backgroundColor: "#00FF66", transition: "width 0.2s" }} />
                </div>
              </div>
            )}
            {error && <div style={{ marginTop: "20px", padding: "12px", backgroundColor: "#451a03", color: "#fcd34d", borderRadius: "6px" }}>⚠️ {error}</div>}
          </div>

          {/* MONITEUR MASTER 9:16 */}
          <div style={{ width: "360px", height: "640px", backgroundColor: "#0f172a", borderRadius: "24px", overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center", border: "1px solid #1e293b" }}>
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay loop style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ textAlign: "center", padding: "30px", color: "#475569", fontSize: "0.9rem" }}>Studio Monitor (9:16)</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
