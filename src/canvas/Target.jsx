import React, { useRef ,useState }  from 'react';
import { useFrame } from '@react-three/fiber';

const Target = ({ position, onClick ,color}) => {
  const targetRef = useRef();
  const [clicked, setClicked] = useState(false);

  useFrame(() => {
    if (targetRef.current) {
      targetRef.current.rotation.y += 0.01;
    }
    if(clicked){
      targetRef.current.scale.set(0.25);
    }
  });
  
  function handleClick(){
   setClicked(true);
   onClick();
  }
  return (
    <mesh
      ref={targetRef}
      position={position}
      onClick={handleClick}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default Target;
