import classNames from "classnames";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { CatmullRomCurve3, Vector3 } from "three";

interface ThreeJSGlobeProps {
  rotationSpeed?: number;
  flyingDotCount?: number;
  className?: string;
}

export const ThreeJSGlobe: React.FC<ThreeJSGlobeProps> = ({ className, rotationSpeed = 0.001, flyingDotCount = 25 }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer;
    let dots: Vector3[] = [];

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, 1, 0.1, 2000);
      renderer = new THREE.WebGLRenderer({ antialias: true });
      
      let size = Math.max(window.innerWidth, window.innerHeight);
      size = Math.min(size, 1820);
      renderer.setSize(size, size);

      if (containerRef.current) {
        containerRef.current.appendChild(renderer.domElement);
      }

      const sphereRadius = 250;
      const sphereSegments = 64;
      const sphereGeometry = new THREE.SphereGeometry(sphereRadius, sphereSegments, sphereSegments);

      const positions = sphereGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const vertex = new Vector3(positions[i], positions[i + 1], positions[i + 2]);
        vertex.normalize().multiplyScalar(sphereRadius);
        dots.push(vertex);
      }

      dots = dots.filter((dot) => dot.y < 0);

      const colors = new Float32Array(dots.length * 3);
      const dotMaterial = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
      });

      for (let i = 0; i < dots.length; i++) {
        const intensity = 1 - Math.min(dots[i].distanceTo(camera.position) / 800, 1);
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity;
      }

      const pointsGeometry = new THREE.BufferGeometry().setFromPoints(dots);
      pointsGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const points = new THREE.Points(pointsGeometry, dotMaterial);
      scene.add(points);

      const light = new THREE.PointLight(0xffffff, 1, 1000);
      light.position.set(500, 500, 500);
      scene.add(light);

      camera.position.set(0, -100, 600);
      camera.lookAt(0, 0, 0);

      spawnFlyingDotsContinuously(flyingDotCount);
    };

    const spawnFlyingDotsContinuously = (activeFlyingDots: number) => {
      let activeAnimations = 0;

      const spawnFlyingDot = () => {
        if (activeAnimations < activeFlyingDots) {
          const startIndex = Math.floor(Math.random() * dots.length);
          let endIndex = Math.floor(Math.random() * dots.length);
          while (endIndex === startIndex) {
            endIndex = Math.floor(Math.random() * dots.length);
          }
          const start = dots[startIndex];
          const end = dots[endIndex];

          if (start.y < 0 && end.y < 0) {
            createAnimatedFlyingDot(start, end, () => {
              activeAnimations--;
              spawnFlyingDot();
            });
            activeAnimations++;
          }
        }

        setTimeout(spawnFlyingDot, Math.random() * 1000);
      };

      spawnFlyingDot();
    };

    const createAnimatedFlyingDot = (start: Vector3, end: Vector3, onComplete: () => void) => {
      const midPoint = new Vector3().addVectors(start, end).multiplyScalar(0.5);
      const arcHeight = Math.sin(Math.PI / 2) * start.distanceTo(end) * 0.4;
      const upwardOffset = new Vector3()
        .addVectors(start, end)
        .normalize()
        .multiplyScalar(arcHeight);
      midPoint.add(upwardOffset);

      const curve = new CatmullRomCurve3([start, start.clone(), midPoint, end.clone(), end]);

      const pointGeometry = new THREE.SphereGeometry(2, 16, 16);
      const pointMaterial = new THREE.MeshBasicMaterial({ color: 0x9578c9 });
      const movingPoint = new THREE.Mesh(pointGeometry, pointMaterial);
      scene.add(movingPoint);

      let t = 0;
      const speed = 0.0025;

      const animatePoint = () => {
        if (t <= 1) {
          movingPoint.position.copy(curve.getPointAt(t));
          t += speed;
          requestAnimationFrame(animatePoint);
        } else {
          scene.remove(movingPoint);
          onComplete();
        }
      };

      animatePoint();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += rotationSpeed;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight);
      camera.aspect = 1;
      camera.updateProjectionMatrix();
      renderer.setSize(size, size);
    };

    window.addEventListener("resize", handleResize);

    init();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [rotationSpeed, flyingDotCount]);

  return <div ref={containerRef} className={classNames(className, "overflow-x-hidden", "flex items-center justify-center w-screen")} />;
};
