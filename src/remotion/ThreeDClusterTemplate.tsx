import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ThreeDClusterProps {
  title: string;
  subtitle: string;
  metric: string;
  nodeColor: string;
  lineColor: string;
  titleFontSize: number;
  subtitleFontSize: number;
  metricFontSize: number;
  titleTop: number;
  titleLeft: number;
  metricBottom: number;
  metricLeft: number;
}

export const ThreeDClusterTemplate = ({
  title = "GRAPHRAG KNOWLEDGE KNOT",
  subtitle = "RECURSIVE VECTOR RELATION LINK // v5.2",
  metric = "0.014s CONTEXT",
  nodeColor = "#00E5FF",
  lineColor = "#1e1b4b",
  titleFontSize = 52,
  subtitleFontSize = 16,
  metricFontSize = 75,
  titleTop = 12,
  titleLeft = 10,
  metricBottom = 12,
  metricLeft = 10
}: ThreeDClusterProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 4.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // Création d'un groupe pour contenir les lignes + les points et tourner ensemble
    const clusterGroup = new THREE.Group();

    // 1. Structure des liens (Wireframe Icosahedron complexe)
    const geometry = new THREE.IcosahedronGeometry(1.8, 2);
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(lineColor),
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const wireframe = new THREE.LineSegments(geometry, lineMat);
    clusterGroup.add(wireframe);

    // 2. Structure des nœuds de données ( Halos lumineux sur chaque sommet )
    const pointMat = new THREE.PointsMaterial({
      color: new THREE.Color(nodeColor),
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const nodes = new THREE.Points(geometry, pointMat);
    clusterGroup.add(nodes);

    scene.add(clusterGroup);
    groupRef.current = clusterGroup;

    return () => {
      renderer.dispose();
    };
  }, [width, height, nodeColor, lineColor]);

  // --- RENDU DÉTERMINISTE INDEXÉ SUR LE CODE TIMELINE ---
  if (groupRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
    groupRef.current.rotation.y = -frame * 0.015; // Rotation inverse contrôlée
    groupRef.current.rotation.z = frame * 0.005;
    
    // Effet d'aspiration / Respiration tridimensionnelle
    const dynamicScale = 1 + Math.cos(frame * 0.05) * 0.05;
    groupRef.current.scale.set(dynamicScale, dynamicScale, dynamicScale);

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  const textEntrance = spring({ frame, fps: 30, config: { damping: 14 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Canvas 3D de fond */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Superposition de l'interface typographique */}
      <AbsoluteFill style={{ pointerEvents: "none", fontFamily: "system-ui, monospace" }}>
        
        {/* BLOC TEXTE EN-TÊTE CONFIGURABLE */}
        <div style={{
          position: "absolute",
          top: `${titleTop}%`,
          left: `${titleLeft}%`,
          width: `${100 - (titleLeft * 2)}%`,
          transform: `scale(${textEntrance})`,
          borderLeft: `4px solid ${nodeColor}`,
          paddingLeft: "20px"
        }}>
          <span style={{ fontSize: `${subtitleFontSize}px`, color: "#4b5563", letterSpacing: "3px", fontWeight: "900", display: "block" }}>
            // {subtitle.toUpperCase()}
          </span>
          <h1 style={{ fontSize: `${titleFontSize}px`, fontWeight: 950, color: "#fff", letterSpacing: "-1.5px", marginTop: "5px", lineHeight: 1.15 }}>
            {title.toUpperCase()}
          </h1>
        </div>

        {/* BLOC TEXTE MÉTRIQUE CONFIGURABLE */}
        {frame >= 60 && (
          <div style={{
            position: "absolute",
            bottom: `${metricBottom}%`,
            left: `${metricLeft}%`,
            width: `${100 - (metricLeft * 2)}%`,
            transform: `scale(${spring({ frame: frame - 60, fps: 30, config: { damping: 11 } })})`
          }}>
            <div style={{ fontSize: "1.05rem", color: "#4b5563", letterSpacing: "2px", fontWeight: "bold" }}>
              GRAPH DATABASE INDEX SEARCH //
            </div>
            <div style={{ fontSize: `${metricFontSize}px`, fontWeight: 950, color: nodeColor, textShadow: `0 0 25px ${nodeColor}55`, letterSpacing: "-2.5px", marginTop: "4px", lineHeight: 1.0 }}>
              {metric.toUpperCase()}
            </div>
          </div>
        )}

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
