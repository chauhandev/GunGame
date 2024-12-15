import React from 'react';
import { PerspectiveCamera,OrthographicCamera } from '@react-three/drei';

function Camera({usePerspective}) {
    return (
      <>
        {usePerspective ? (
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} near={0.1} far={1000} />
        ) : (
          <OrthographicCamera makeDefault position={[0, 0, 10]} near={0.1} far={1000} zoom={50} />
        )}
      </>
    );
  }

  export default Camera;