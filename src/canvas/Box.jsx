import React,{useState , useRef} from 'react';
import {useFrame} from '@react-three/fiber'

function Box(props) {
    const [hovered, setHovered] = useState(false);
    const [translate, setTranslate] = useState(false);
    // useCursor(hovered);
    const ref = useRef();
     useFrame((state,delta)=>{
        if(translate)
         ref.current.position.z= Math.sin(state.clock.elapsedTime )*2;
     })
    return (
      <mesh 
        {...props} 
        ref ={ref}
        onClick={()=>setTranslate(prev => !prev)} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    );
  }

  export default Box;