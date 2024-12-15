import React from 'react';
import { Canvas } from '@react-three/fiber';
import {PerspectiveCamera ,OrthographicCamera } from '@react-three/drei'

const ViewController = (props) => {
  return (
    <div className="absolute flex gap-2 p-1 m-4 top-0 right-0" style={{ width: '140px', height: '140px', zIndex: 999999 }}>
    <Canvas style={{background:"red"}}>
      <ambientLight />
      <ViewCube onFaceClick={props.handleFaceClick} />
      {usePerspective ? (
      <PerspectiveCamera position={[0, 0, 10]} makeDefault />
    ) : (
      <OrthographicCamera  position={[0, 0, 10]} makeDefault zoom={50} />
    )}
      {/* <ViewCubeCameraSynchronizer rotationState={rotationState} />   */}
    </Canvas>
  </div>
  )
}

export default ViewController
