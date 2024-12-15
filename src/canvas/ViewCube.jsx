import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';


// Define face view values
const FaceViewValue = {
  ISOMETRIC: 'ISOMETRIC',
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  FRONT: 'FRONT',
  BACK: 'BACK',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  TOPRIGHT: 'TOPRIGHT',
  TOPLEFT: 'TOPLEFT',
  TOPFRONT: 'TOPFRONT',
  TOPBACK: 'TOPBACK',
  FRONTLEFT: 'FRONTLEFT',
  FRONTRIGHT: 'FRONTRIGHT',
  FRONTBOTTOM: 'FRONTBOTTOM',
  BACKBOTTOM: 'BACKBOTTOM',
  LEFTBACK: 'LEFTBACK',
  LEFTBOTTOM: 'LEFTBOTTOM',
  RIGHTBACK: 'RIGHTBACK',
  RIGHTBOTTOM: 'RIGHTBOTTOM',
  TOPFRONTLEFT: 'TOPFRONTLEFT',
  TOPFRONTRIGHT: 'TOPFRONTRIGHT',
  BOTTOMBACKLEFT: 'BOTTOMBACKLEFT',
  BOTTOMBACKRIGHT: 'BOTTOMBACKRIGHT',
  FRONTLEFTBOTTOM: 'FRONTLEFTBOTTOM',
  FRONTRIGHTBOTTOM: 'FRONTRIGHTBOTTOM',
  BACKTOPLEFT: 'BACKTOPLEFT',
  BACKTOPRIGHT: 'BACKTOPRIGHT',
  CLOCKWISEROTATION: 'CLOCKWISEROTATION',
  ANTICLOCKWISEROTATION: 'ANTICLOCKWISEROTATION',
  NONE: 'NONE',
};

// Update camera based on face view
const updateCameraPosition = (camera, faceView, dimensions, boundingBox) => {
  const { width, height, depth } = dimensions;
  const { minX, minY, minZ } = boundingBox;
  const distance = 500; // Example distance, adjust as needed

  switch (faceView) {
    case FaceViewValue.ISOMETRIC:
      camera.position.set(minX + width / 2 + distance, minY + height / 2 + distance, minZ + depth / 2 + distance);
      break;
    case FaceViewValue.TOP:
      camera.position.set(minX + width / 2, minY + height / 2 + distance, minZ + depth / 2);
      camera.up.set(0, 0, -1);
      break;
    case FaceViewValue.BOTTOM:
      camera.position.set(minX + width / 2, minY + height / 2 - distance, minZ + depth / 2);
      camera.up.set(0, 0, 1);
      break;
    case FaceViewValue.FRONT:
      camera.position.set(minX + width / 2, minY + height / 2, minZ + depth / 2 + distance);
      break;
    case FaceViewValue.BACK:
      camera.position.set(minX + width / 2, minY + height / 2, minZ + depth / 2 - distance);
      break;
    case FaceViewValue.LEFT:
      camera.position.set(minX + width / 2 - distance, minY + height / 2, minZ + depth / 2);
      break;
    case FaceViewValue.RIGHT:
      camera.position.set(minX + width / 2 + distance, minY + height / 2, minZ + depth / 2);
      break;
    // Add additional cases for other face views as needed
    default:
      break;
  }

  camera.lookAt(new THREE.Vector3(minX + width / 2, minY + height / 2, minZ + depth / 2));
  camera.updateProjectionMatrix();
};


function ViewCube() {
  const cubeRef = useRef();
  const hoverRef = useRef();
  const { camera, invalidate } = useThree();  // Access camera and invalidate to force a re-render
  
  const viewCubeDimensions = [70, 70, 70];

  function mainCube() {
    const [length, height, width] = [...viewCubeDimensions];
    const lineColor = 0x313539;
    const ViewCubeGeometry = new THREE.BoxGeometry(length, height, width);
    const EdgeGeometry = new THREE.EdgesGeometry(ViewCubeGeometry, 60);
    const LineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      linewidth: 1,
      opacity: 1,
      transparent: true,
      clipIntersection: true,
    });

    const ViewCubeMain = new THREE.LineSegments(EdgeGeometry, LineMaterial);

    return ViewCubeMain;
  }

  const CubeFaceColor = 0xcccccc;
  const HoverColor = 0xff0000;

  const CornerBox = ({ position, size }) => (
    <mesh position={position}>
      <boxGeometry args={[size, size, size]} />
      <meshLambertMaterial color={CubeFaceColor} transparent opacity={0} />
    </mesh>
  );

  const SideBox = ({ position, args }) => (
    <mesh position={position}>
      <boxGeometry args={args} />
      <meshLambertMaterial color={CubeFaceColor} transparent opacity={0} />
    </mesh>
  );

  const CreateText = ({ position, text, rotation }) => (
    <Text
      position={position}
      fontSize={5} // Adjust font size as needed
      color="red" // Adjust color as needed
      maxWidth={200}
      lineHeight={1}
      letterSpacing={0}
      textAlign="center"
      anchorX="center"
      anchorY="middle"
      opacity={0} // Initially invisible
      rotation={rotation}
    >
      {text}
    </Text>
  );

  const MiddleBox = ({ position, text, rotation, textPosition, sides }) => (
    <group position={position}>
      <mesh>
        <boxGeometry args={sides} />
        <meshLambertMaterial color={CubeFaceColor} transparent opacity={0} />
      </mesh>
      <CreateText position={textPosition} text={text} rotation={rotation} />
    </group>
  );

  const cornerPositions = [
    [30, 30, 30],
    [-30, 30, 30],
    [30, -30, 30],
    [30, 30, -30],
    [-30, -30, 30],
    [-30, 30, -30],
    [30, -30, -30],
    [-30, -30, -30],
  ];

  const sidePositions = [
    // Front-back edges
    [[30, 30, 0], [10, 10, 40]],
    [[30, -30, 0], [10, 10, 40]],
    [[-30, 30, 0], [10, 10, 40]],
    [[-30, -30, 0], [10, 10, 40]],

    // Top-bottom edges
    [[0, 30, 30], [40, 10, 10]],
    [[0, -30, 30], [40, 10, 10]],
    [[0, 30, -30], [40, 10, 10]],
    [[0, -30, -30], [40, 10, 10]],

    // Left-right edges
    [[30, 0, 30], [10, 40, 10]],
    [[-30, 0, 30], [10, 40, 10]],
    [[30, 0, -30], [10, 40, 10]],
    [[-30, 0, -30], [10, 40, 10]],
  ];

  const middleBoxes = [
    { position: [30, 0, 0], sides: [10, 38, 38], text: 'RIGHT', rotation: [0, Math.PI / 2, 0], textPosition: [5.2, -1, 0] },
    { position: [-30, 0, 0], sides: [10, 38, 38], text: 'LEFT', rotation: [0, -Math.PI / 2, 0], textPosition: [-5.2, -1, 0] },
    { position: [0, 30, 0], sides: [38, 10, 38], text: 'TOP', rotation: [-Math.PI / 2, 0, 0], textPosition: [0, 5.2, 0] },
    { position: [0, -30, 0], sides: [38, 10, 38], text: 'BOTTOM', rotation: [Math.PI / 2, 0, 0], textPosition: [0, -5.2, 0] },
    { position: [0, 0, 30], sides: [38, 38, 10], text: 'FRONT', rotation: [0, 0, 0], textPosition: [0, -1, 5.2] },
    { position: [0, 0, -30], sides: [38, 38, 10], text: 'BACK', rotation: [0, -Math.PI, 0], textPosition: [0, -1, -5.2] }
  ];

  const faceTargets = {
    FRONT: [0, 0, 500],
    BACK: [0, 0, -500],
    LEFT: [-500, 0, 0],
    RIGHT: [500, 0, 0],
    TOP: [0, 500, 0],
    BOTTOM: [0, -500, 0],
  };

  const handlePointerDown = (e) => {
    const faceView = e.object.name; // Use the name of the clicked face to determine the view
    const boundingBox = { minX: 0, minY: 0, minZ: 0, width: 100, height: 100, depth: 100 }; 
    updateCameraPosition(camera, faceView, boundingBox, boundingBox);
    invalidate(); // Request a re-render to update the view
  };

  const handlePointerEnter = (e) => {
    const intersected = e.intersections[0].object;
    if (hoverRef.current) {
      hoverRef.current.material.opacity = 0;
      hoverRef.current.material.color.set(CubeFaceColor);
      hoverRef.current = null;
    }
    hoverRef.current = intersected;
    intersected.material.opacity = 0.5;
    intersected.material.color.set(HoverColor);
  };

  const handlePointerLeave = (e) => {
    if (hoverRef.current) {
      hoverRef.current.material.opacity = 0;
      hoverRef.current.material.color.set(CubeFaceColor);
      hoverRef.current = null;
    }
  };

  return (
    <group>
      <primitive ref={cubeRef} object={mainCube()} />
      <group onPointerDown={handlePointerDown} onPointerMove={handlePointerEnter} onPointerLeave={handlePointerLeave}>
        {cornerPositions.map((pos, index) => (
          <CornerBox key={`corner+${index}`} position={pos} size={10} />
        ))}
        {sidePositions.map(([pos, args], index) => (
          <SideBox key={`side+${index}`} position={pos} args={args} />
        ))}
        {middleBoxes.map((box, index) => (
          <MiddleBox key={`middle+${index}`} {...box} />
        ))}
      </group>
    </group>
  );
}

export default ViewCube;
