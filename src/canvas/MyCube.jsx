import { Canvas ,useThree } from '@react-three/fiber'
import React, { Suspense ,useRef ,useEffect} from 'react'
import ViewCube from './ViewCube'
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei'

const Setup = {
  CAM: {
    DISTANCE: 100
  },
  WIDTH: 1000,
  HEIGHT: 800,
  ASPECT_RATIO: 1000 / 800,
  ORTH_NEAR_PLANE: 0.1,
  ORTH_FAR_PLANE: 1000,
  VIEWSIZE: 10
};

const CameraSetup = () => {
  const cameraRef = useRef();
  const { size } = useThree();  
  const aspectRatio = size.width / size.height;  
  useEffect(() => {
    if (cameraRef.current) {
      console.log(size,aspectRatio)
      const camera = cameraRef.current;
      camera.left = -size.width / 2;
      camera.right = size.width / 2;
      camera.top = size.height / 2;
      camera.bottom = size.height / -2;
      camera.near = 0.1;
      camera.far = 1000;
      camera.zoom = aspectRatio*3;  
    }
  }, [aspectRatio]);

  return (
    <OrthographicCamera
      ref={cameraRef}
      makeDefault
      position={[500, 500, 500]}
    />
  );
};


const MyCube = () => {

  return (
    <Canvas style={{ height: '100vh' }}>
      <Suspense fallback={null}>
        <ViewCube />
        <ambientLight />
        <OrbitControls />
        <CameraSetup />
      </Suspense>
    </Canvas>
  )
}

export default MyCube
