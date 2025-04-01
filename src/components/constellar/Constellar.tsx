"use client";

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import classNames from "classnames";

interface TeamConstellationProps {
  pointCount?: number;
  className?: string;
}

export const TeamConstellation: React.FC<TeamConstellationProps> = ({
  pointCount = 80,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let dots: THREE.Mesh[] = [];
    let lines: THREE.Line;
    const connections: [number, number][] = [];

    const init = () => {
      scene = new THREE.Scene();

      const width = window.innerWidth;
      const height = window.innerHeight;

      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.set(0, 100, 250); // Above the flat plane
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      // Create flat dots on the XZ plane (like a map)
      const pointGeometry = new THREE.SphereGeometry(1.5, 10, 10);
      const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < pointCount; i++) {
        const x = (Math.random() - 0.5) * 600;
        const z = (Math.random() - 0.5) * 400;
        const y = 0;

        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        scene.add(point);
        dots.push(point);
      }

      // Make constellations: connect dots that are relatively close
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i].position;
          const b = dots[j].position;
          const dist = a.distanceTo(b);

          // Limit how many connections we make for clarity
          if (dist < 100 && Math.random() < 0.1) {
            connections.push([i, j]);
          }
        }
      }

      // Line geometry
      const linePoints: number[] = [];
      for (const [i, j] of connections) {
        const a = dots[i].position;
        const b = dots[j].position;
        linePoints.push(a.x, a.y, a.z, b.x, b.y, b.z);
      }

      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(linePoints, 3)
      );

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x9578c9,
        transparent: true,
        opacity: 0.4,
      });

      lines = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(lines);
    };

    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate scene slowly for parallax effect
      scene.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [pointCount]);

  return (
    <div
      ref={containerRef}
      className={classNames(
        className,
        "fixed top-0 left-0 w-screen h-screen -z-10 bg-transparent"
      )}
    />
  );
};
