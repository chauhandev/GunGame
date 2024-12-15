import React, { useState } from 'react'
import { BoxGeometry, DodecahedronGeometry, SphereGeometry, TorusGeometry, TorusKnotGeometry } from 'three';

const MagicObject = ({position}) => {
  const [count,setCount] = useState(0);

  const geometries =[new BoxGeometry(1,1,1),
    new SphereGeometry(1,32,32),
    new DodecahedronGeometry(1),
    new TorusKnotGeometry(1),
    new TorusGeometry(1)
  ]
  return (
    <mesh position={position} onPointerDown={()=> {
        console.log("click")
        setCount((count + 1) % geometries.length)
        }}
        geometry={geometries[count]}
        >
        <meshStandardMaterial color ={"lime"} wireframe/>  

    </mesh>
  )
}

export default MagicObject
