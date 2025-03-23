import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import { AerialPerspective, Atmosphere } from '@takram/three-atmosphere/r3f';
import { Clouds } from '@takram/three-clouds/r3f';
import { PointerLockControls } from '@react-three/drei';
import * as THREE from 'three';
import { Noise } from './Perlin';

// Constants
const chunkSize = 32;
const loadDistance = 2;
const unloadDistance = 3;

// Terrain Height Function
function getTerrainHeight(x, z) {
  let height = 0;
  height += Noise.perlin(x / 20, z / 20) * 10;
  height += Noise.perlin(x / 10, z / 10) * 5;
  height += Noise.perlin(x / 50, z / 50) * 20;
  return height - 10;
}

// Grass Material
const bladeGeometry = new THREE.PlaneGeometry(0.1, 0.5, 1, 1);
const bladeMaterial = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0.0 } },
  vertexShader: `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec4 worldPos = modelMatrix * vec4(position, 1.0);
      float wind = sin(time * 2.0 + worldPos.x * 0.1 + worldPos.z * 0.1) * 0.05;
      vec3 pos = position;
      if (pos.y > 0.0) {
        pos.x += wind;
        pos.z += wind * 0.5;
      }
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      vec3 baseColor = vec3(0.0, 0.8, 0.2);
      float tipFade = smoothstep(0.7, 1.0, vUv.y);
      gl_FragColor = vec4(baseColor * (1.0 - tipFade * 0.3), 1.0);
    }
  `,
  side: THREE.DoubleSide,
});

// Water Material
const waterMaterial = new THREE.ShaderMaterial({
  uniforms: { time: { value: 0.0 } },
  vertexShader: `
    uniform float time;
    varying vec2 vUv;
    void main() {
      vec3 pos = position;
      pos.y += sin(time * 1.5 + pos.x * 0.2 + pos.z * 0.2) * 0.1 +
               cos(time * 1.0 + pos.z * 0.15) * 0.05;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
      vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    void main() {
      vec3 waterColor = vec3(0.1, 0.3, 0.7);
      float wave = sin(vUv.x * 10.0 + vUv.y * 5.0);
      gl_FragColor = vec4(waterColor + wave * 0.05, 0.7);
    }
  `,
  transparent: true,
  side: THREE.DoubleSide,
});

// TerrainChunk Component
function TerrainChunk({ i, j }) {
  const geometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(chunkSize, chunkSize, 32, 32);
    geom.rotateX(-Math.PI / 2);
    const vertices = geom.attributes.position.array;
    for (let k = 0; k < vertices.length; k += 3) {
      const x = vertices[k] + i * chunkSize;
      const z = vertices[k + 2] + j * chunkSize;
      vertices[k + 1] = getTerrainHeight(x, z);
    }
    geom.computeVertexNormals();
    return geom;
  }, [i, j]);

  const material = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    for (let x = 0; x < 256; x++) {
      for (let y = 0; y < 256; y++) {
        const noiseVal = Noise.perlin(x / 50, y / 50);
        const color = `rgb(${Math.floor(139 * (0.8 + noiseVal * 0.2))},
                          ${Math.floor(69 * (0.8 + noiseVal * 0.2))},
                          ${Math.floor(19 * (0.8 + noiseVal * 0.2))})`;
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    return new THREE.MeshStandardMaterial({ map: texture, roughness: 0.8 });
  }, []);

  const grassInstances = useMemo(() => {
    const count = 2000;
    const instancedMesh = new THREE.InstancedMesh(bladeGeometry, bladeMaterial, count);
    const dummy = new THREE.Object3D();
    let instanceIdx = 0;
    for (let x = -16; x <= 16; x += 0.15) {
      for (let z = -16; z <= 16; z += 0.15) {
        const worldX = x + i * chunkSize;
        const worldZ = z + j * chunkSize;
        const density = Noise.perlin(worldX / 15, worldZ / 15);
        if (density < 0.4) continue;
        const height = getTerrainHeight(worldX, worldZ);
        if (height < 0) continue;
        if (instanceIdx >= count) break;
        dummy.position.set(worldX, height, worldZ);
        dummy.rotation.y = Math.random() * Math.PI * 2;
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(instanceIdx++, dummy.matrix);
      }
    }
    instancedMesh.instanceMatrix.needsUpdate = true;
    return instancedMesh;
  }, [i, j]);

  const hasWater = useMemo(() => {
    for (let x = -16; x <= 16; x += 1) {
      for (let z = -16; z <= 16; z += 1) {
        const worldX = x + i * chunkSize;
        const worldZ = z + j * chunkSize;
        if (getTerrainHeight(worldX, worldZ) < 0) return true;
      }
    }
    return false;
  }, [i, j]);

  const waterMesh = useMemo(() => {
    if (hasWater) {
      const waterGeom = new THREE.PlaneGeometry(chunkSize, chunkSize);
      waterGeom.rotateX(-Math.PI / 2);
      const water = new THREE.Mesh(waterGeom, waterMaterial);
      water.position.set(0, 0, 0);
      return water;
    }
    return null;
  }, [hasWater]);

  return (
    <group position={[i * chunkSize, 0, j * chunkSize]}>
      <mesh geometry={geometry} material={material} castShadow receiveShadow />
      <primitive object={grassInstances} castShadow receiveShadow />
      {waterMesh && <primitive object={waterMesh} receiveShadow />}
    </group>
  );
}

// Scene Component
function Scene() {
  const atmosphereRef = useRef();
  const sunLightRef = useRef();
  const { camera } = useThree();
  const [loadedChunks, setLoadedChunks] = useState([]);
  const isTouchDevice = 'ontouchstart' in window;
  const velocity = useRef(new THREE.Vector3());
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const sensitivity = 0.002;
  const lookTouchId = useRef(null);
  const moveTouchId = useRef(null);
  const lookStart = useRef({ x: 0, y: 0 });
  const moveStart = useRef({ x: 0, y: 0 });
  const moveOffset = useRef({ x: 0, y: 0 });
  const keys = useRef({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    isSprinting: false,
    canJump: false,
  });

  // Sun Position
  useEffect(() => {
    if (atmosphereRef.current) {
      atmosphereRef.current.setDate(new Date());
      const sunDirection = atmosphereRef.current.sunDirection;
      sunLightRef.current.position.set(sunDirection.x * 100, sunDirection.y * 100, sunDirection.z * 100);
    }
  }, []);

  // Controls Setup
  useEffect(() => {
    if (!isTouchDevice) {
      const onKeyDown = (event) => {
        switch (event.code) {
          case 'KeyW':
            keys.current.moveForward = true;
            break;
          case 'KeyS':
            keys.current.moveBackward = true;
            break;
          case 'KeyA':
            keys.current.moveLeft = true;
            break;
          case 'KeyD':
            keys.current.moveRight = true;
            break;
          case 'ShiftLeft':
            keys.current.isSprinting = true;
            break;
          case 'Space':
            if (keys.current.canJump) {
              velocity.current.y += 12;
              keys.current.canJump = false;
            }
            break;
        }
      };
      const onKeyUp = (event) => {
        switch (event.code) {
          case 'KeyW':
            keys.current.moveForward = false;
            break;
          case 'KeyS':
            keys.current.moveBackward = false;
            break;
          case 'KeyA':
            keys.current.moveLeft = false;
            break;
          case 'KeyD':
            keys.current.moveRight = false;
            break;
          case 'ShiftLeft':
            keys.current.isSprinting = false;
            break;
        }
      };
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    } else {
      const onTouchStart = (event) => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
          const x = touch.clientX;
          if (x < window.innerWidth / 2 && lookTouchId.current === null) {
            lookTouchId.current = touch.identifier;
            lookStart.current = { x: touch.clientX, y: touch.clientY };
          } else if (x >= window.innerWidth / 2 && moveTouchId.current === null) {
            moveTouchId.current = touch.identifier;
            moveStart.current = { x: touch.clientX, y: touch.clientY };
            moveOffset.current = { x: 0, y: 0 };
          }
        }
      };
      const onTouchMove = (event) => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
          if (touch.identifier === lookTouchId.current) {
            const deltaX = touch.clientX - lookStart.current.x;
            const deltaY = touch.clientY - lookStart.current.y;
            euler.current.y -= deltaX * sensitivity;
            euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x - deltaY * sensitivity));
            camera.quaternion.setFromEuler(euler.current);
            lookStart.current = { x: touch.clientX, y: touch.clientY };
          } else if (touch.identifier === moveTouchId.current) {
            moveOffset.current = { x: touch.clientX - moveStart.current.x, y: touch.clientY - moveStart.current.y };
          }
        }
      };
      const onTouchEnd = (event) => {
        event.preventDefault();
        for (let touch of event.changedTouches) {
          if (touch.identifier === lookTouchId.current) lookTouchId.current = null;
          else if (touch.identifier === moveTouchId.current) {
            moveTouchId.current = null;
            moveOffset.current = { x: 0, y: 0 };
          }
        }
      };
      window.addEventListener('touchstart', onTouchStart);
      window.addEventListener('touchmove', onTouchMove);
      window.addEventListener('touchend', onTouchEnd);
      return () => {
        window.removeEventListener('touchstart', onTouchStart);
        window.removeEventListener('touchmove', onTouchMove);
        window.removeEventListener('touchend', onTouchEnd);
      };
    }
  }, [camera, isTouchDevice]);

  // Animation Loop
  useFrame((state, delta) => {
    // Movement
    if (!isTouchDevice) {
      const speed = keys.current.isSprinting ? 20 : 10;
      const direction = new THREE.Vector3();
      if (keys.current.moveForward) direction.z -= 1;
      if (keys.current.moveBackward) direction.z += 1;
      if (keys.current.moveLeft) direction.x -= 1;
      if (keys.current.moveRight) direction.x += 1;
      if (direction.length() > 0) {
        direction.normalize();
        const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
        forward.y = 0;
        forward.normalize();
        const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
        right.y = 0;
        right.normalize();
        velocity.current.x = (direction.x * right.x + direction.z * forward.x) * speed;
        velocity.current.z = (direction.x * right.z + direction.z * forward.z) * speed;
      } else {
        velocity.current.x = 0;
        velocity.current.z = 0;
      }
    } else if (moveTouchId.current !== null) {
      const forwardSpeed = -moveOffset.current.y * 0.015 * 10;
      const turnSpeed = -moveOffset.current.x * 0.015;
      euler.current.y += turnSpeed * delta;
      camera.quaternion.setFromEuler(euler.current);
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      forward.y = 0;
      forward.normalize();
      velocity.current.x = forward.x * forwardSpeed;
      velocity.current.z = forward.z * forwardSpeed;
    } else {
      velocity.current.x = 0;
      velocity.current.z = 0;
    }

    // Physics
    velocity.current.y -= 9.8 * delta;
    camera.position.x += velocity.current.x * delta;
    camera.position.z += velocity.current.z * delta;
    camera.position.y += velocity.current.y * delta;

    // Terrain Collision
    const terrainHeight = getTerrainHeight(camera.position.x, camera.position.z);
    if (camera.position.y <= terrainHeight + 1.6) {
      camera.position.y = terrainHeight + 1.6;
      velocity.current.y = 0;
      if (!isTouchDevice) keys.current.canJump = true;
    }

    // Chunk Management
    const cameraChunkI = Math.floor(camera.position.x / chunkSize);
    const cameraChunkJ = Math.floor(camera.position.z / chunkSize);
    const newChunks = [];
    for (let di = -loadDistance; di <= loadDistance; di++) {
      for (let dj = -loadDistance; dj <= loadDistance; dj++) {
        const i = cameraChunkI + di;
        const j = cameraChunkJ + dj;
        newChunks.push({ i, j, key: `${i},${j}` });
      }
    }
    setLoadedChunks(newChunks);

    // Update Shaders
    bladeMaterial.uniforms.time.value = state.clock.getElapsedTime();
    waterMaterial.uniforms.time.value = state.clock.getElapsedTime();
  });

  return (
    <Atmosphere ref={atmosphereRef}>
      <directionalLight ref={sunLightRef} intensity={1} castShadow shadow-mapSize={[1024, 1024]} shadow-camera={{ near: 0.5, far: 500, left: -100, right: 100, top: 100, bottom: -100 }} />
      <ambientLight intensity={0.5} />
      <EffectComposer enableNormalPass>
        <Clouds qualityPreset="high" coverage={0.4} />
        <AerialPerspective sky skyIrradiance sunIrradiance />
      </EffectComposer>
      {loadedChunks.map(({ i, j, key }) => (
        <TerrainChunk key={key} i={i} j={j} />
      ))}
      {!isTouchDevice && <PointerLockControls />}
    </Atmosphere>
  );
}

// App Component
export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, getTerrainHeight(0, 0) + 1.6, 5], fov: 75, near: 0.1, far: 1000 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
