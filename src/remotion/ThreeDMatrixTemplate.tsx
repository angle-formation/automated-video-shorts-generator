import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring } from "remotion";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface ThreeDMatrixProps {
  title: string;
  subtitle: string;
  metric: string;
  glowColor: string;
  // Options de géométrie et de typographie dynamiques
  titleFontSize: number;
  subtitleFontSize: number;
  metricFontSize: number;
  titleTop: number;
  titleLeft: number;
  metricBottom: number;
  metricLeft: number;
}

export const ThreeDMatrixTemplate = ({
  title = "QUANTUM APIS INFERENCE",
  subtitle = "3D DATA HOP ROUTING ENGINE // v4.0",
  metric = "940 TFLOPS",
  glowColor = "#00FF66",
  titleFontSize = 56,
  subtitleFontSize = 18,
  metricFontSize = 78,
  titleTop = 10,
  titleLeft = 10,
  metricBottom = 10,
  metricLeft = 10
}: ThreeDMatrixProps) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4;
      positions[i + 1] = (Math.random() - 0.5) * 7;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(glowColor),
      size: 0.06,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    return () => {
      renderer.dispose();
    };
  }, [width, height, glowColor]);

  if (pointsRef.current && rendererRef.current && sceneRef.current && cameraRef.current) {
    pointsRef.current.rotation.y = frame * 0.012;
    pointsRef.current.rotation.x = frame * 0.006;
    const pulse = 1 + Math.sin(frame * 0.04) * 0.04;
    pointsRef.current.scale.set(pulse, pulse, pulse);
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  const textEntrance = spring({ frame, fps: 30, config: { damping: 13 } });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000000" }}>
      {/* Canevas WebGL 3D de fond */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />

      {/* Calque HUD avec positionnement géométrique précis */}
      <AbsoluteFill style={{ pointerEvents: "none", fontFamily: "system-ui, monospace" }}>
        
        {/* BLOC TITRE + SOUS-TITRE */}
        <div style={{
          position: "absolute",
          top: `${titleTop}%`,
          left: `${titleLeft}%`,
          width: `${100 - (titleLeft * 2)}%`,
          transform: `scale(${textEntrance})`,
          borderLeft: `4px solid ${glowColor}`,
          paddingLeft: "20px"
        }}>
          <span style={{ fontSize: `${subtitleFontSize}px`, color: "#4b5563", letterSpacing: "3px", fontWeight: "bold", display: "block" }}>
            // {subtitle.toUpperCase()}
          </span>
          <h1 style={{ fontSize: `${titleFontSize}px`, fontWeight: 950, color: "#fff", letterSpacing: "-2px", marginTop: "5px", lineHeight: 1.1 }}>
            {title.toUpperCase()}
          </h1>
        </div>

        {/* BLOC MÉTRIQUE D'IMPACT */}
        {frame >= 60 && (
          <div style={{
            position: "absolute",
            bottom: `${metricBottom}%`,
            left: `${metricLeft}%`,
            width: `${100 - (metricLeft * 2)}%`,
            transform: `scale(${spring({ frame: frame - 60, fps: 30, config: { damping: 10 } })})`
          }}>
            <div style={{ fontSize: "1.1rem", color: "#4b5563", letterSpacing: "2px", fontWeight: "bold" }}>
              COMPUTATIONAL CORE OUTPUT //
            </div>
            <div style={{ fontSize: `${metricFontSize}px`, fontWeight: 950, color: glowColor, textShadow: `0 0 25px ${glowColor}66`, letterSpacing: "-2px", marginTop: "5px", lineHeight: 1.0 }}>
              {metric.toUpperCase()}
            </div>
          </div>
        )}

      </AbsoluteFill>
    </AbsoluteFill>
  );
};
