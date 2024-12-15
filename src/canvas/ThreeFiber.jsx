import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, TransformControls, PerspectiveCamera, OrthographicCamera } from '@react-three/drei';
import Model from './Model';
import Box from './Box';
import Sphere from './Sphere';
import ViewCube from './ViewCube';
import { Quaternion, Euler, Vector3    } from 'three';

const ThreeScene = () => {
  const [target, setTarget] = useState(null);
  const [mode, setMode] = useState('translate');
  const [usePerspective, setUsePerspective] = useState(true);
  const [rotationState, setRotationState] = useState({ rotation: { x: 0, y: 0, z: 0 } });
  const orbitControlsRef = useRef();
  const mainCameraRef = useRef();
  
  const RotateCamera = ({ mainCameraRef }) => {
    useFrame((state) => {
      if (mainCameraRef.current) {
        const { mouse } = state;

        // Calculate rotation angles based on mouse position
        const rotationX = mouse.y * Math.PI/4; // Rotate around the X axis
        const rotationY = mouse.x * Math.PI/4; // Rotate around the Y axis
  
        // Create a quaternion for the desired rotation
        const euler = new Euler(rotationX, rotationY, 0, 'XYZ');
        const quat = new Quaternion().setFromEuler(euler);
  
        // Update the camera's quaternion
        mainCameraRef.current.quaternion.copy(quat);
  
        // Ensure the camera's projection matrix is updated
        mainCameraRef.current.updateProjectionMatrix();
      }
    });
  
    return null;
  };

  return (
    <>
      {/* <div className="absolute bg-gray-500 flex gap-2 p-1 m-4 rounded" style={{ zIndex: 999999 }}>
        <button className="hover:bg-slate-700 p-2 rounded" onClick={() => setMode('translate')}>Translate</button>
        <button className="hover:bg-slate-700 p-2 rounded" onClick={() => setMode('rotate')}>Rotate</button>
        <button className="hover:bg-slate-700 p-2 rounded" onClick={() => setMode('scale')}>Scale</button>
        <button className="hover:bg-slate-700 p-2 rounded" onClick={()=>setUsePerspective(!usePerspective)}>
          {usePerspective ? 'Use Orthographic Camera' : 'Use Perspective Camera'}
        </button>
      </div> */}
      <Canvas style={{ width: '100%', height: '100vh' }}>
        <color attach="background" args={["#E2E5EE"]} />
        <ambientLight intensity={0.5} />
        <directionalLight color="red" position={[0, 0, 5]} />
        {usePerspective ? (
          <PerspectiveCamera ref={mainCameraRef} position={[0, 0, 5]} makeDefault />
        ) : (
          <OrthographicCamera ref={mainCameraRef} position={[0, 0, 5]} makeDefault zoom={50} />
        )}
        {/* <Model key="model1" model="spiderman.glb" position={[0, 0, 0]} setTarget={setTarget} /> */}
        <Box position={[0,0,0]} />
        {/* <TransformControls object={target} mode={mode} /> */}
        <OrbitControls enableDamping dampingFactor={0.05} ref={orbitControlsRef}
         maxAzimuthAngle={Math.PI / 4} // Maximum azimuthal angle (90 degrees)
         minAzimuthAngle={-Math.PI / 4} // Minimum azimuthal angle (-90 degrees)
         maxPolarAngle={Math.PI / 4} // Maximum polar angle (90 degrees)
         minPolarAngle={0}  />
        <RotateCamera mainCameraRef ={mainCameraRef}/>
      </Canvas>
    </>
  );
};

export default ThreeScene;
