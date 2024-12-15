import React,{useState , useRef} from 'react';
import {useFrame} from '@react-three/fiber'

function Sphere(props) {
    const [hovered, setHovered] = useState(false);
    // useCursor(hovered);
    const ref = useRef();
     useFrame((state,delta)=>{
      let speed = hovered ? 0.4 : 1
      ref.current.rotation.y +=delta*speed;
      console.log()
     })
    return (
      <mesh 
        {...props} 
        ref ={ref}
        // onClick={} 
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry />
        <meshStandardMaterial  color={hovered ? "red" : "blue"} wireframe/>
      </mesh>
    );
  }

  export default Sphere;