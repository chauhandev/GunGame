import React, { useRef ,useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF ,useAnimations} from '@react-three/drei';

const Gun = ({setCrosshairVisiblility}) => {
  const { scene ,animations} = useGLTF('../assets/gun.gltf');
  const gunRef = useRef();
  useFrame((state) => {
    if (gunRef.current) {
        const {x,y} = state.pointer;
        gunRef.current.rotation.y = -x ;
        gunRef.current.rotation.x = y ;
    }
  }); 
  return <group  position={[0,1.5,8]}  ref={gunRef}  scale={0.8}
                onPointerEnter={ ()=>setCrosshairVisiblility(false)} 
                onPointerLeave={()=>setCrosshairVisiblility(true)}>
      <pointLight color={"red"} angle={45} distance={100} position={[0,0,-4]} intensity={1}/>
      <primitive object={scene}  rotation={[ 0, Math.PI/2, 0 ]}/>;
  </group>
};

export default Gun;
