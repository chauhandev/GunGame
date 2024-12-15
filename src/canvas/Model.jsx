import React, { useEffect, useRef ,useState  } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';
import { useDrag } from 'react-use-gesture';
import { useThree ,useFrame } from '@react-three/fiber';

const Model = ({ model, position }) => {
  const [isHovered , setIsHovered] = useState(false)
  const { scene, animations } = useGLTF(`../assets/${model}`);
  const { mixer } = useAnimations(animations, scene);
  const modelRef = useRef();
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  // Clone the scene and set position
  const clonedScene = useRef();
  if (!clonedScene.current) {
    clonedScene.current = clone(scene);
    clonedScene.current.position.set(...position);
  }

  const bind = useDrag(({ offset: [x, y] }) => {
    if (modelRef.current) {
      modelRef.current.position.x = x / aspect;
      modelRef.current.position.y = -y / aspect;
    }
  });

  useEffect(() => {
    const clonedActions = {};
    animations.forEach((clip) => {
      const action = mixer.clipAction(clip, clonedScene.current);
       //action.play();
      clonedActions[clip.name] = action;
    });
    return () => {
      Object.values(clonedActions).forEach((action) => action.stop());
    };
  }, [animations, mixer]);

  useFrame((state,delta)=>{
    let speed = isHovered ? 1 : 0.2
    if(isHovered){
      modelRef.current.rotation.y +=delta*speed;
    //  modelRef.current.scale =2;
    }
  });

  return (
    <primitive ref={modelRef} object={clonedScene.current} {...bind()}
    // onClick={console.log("Clicked")} 
    onPointerOver={() => setIsHovered(true)} 
    onPointerOut={() => setIsHovered(false)}
    />
  );
};

export default Model;
