import React ,{ useEffect, useRef} from 'react'
import { Environment, OrbitControls, PerspectiveCamera ,CameraControls , useGLTF, PresentationControls, ContactShadows, Html, OrthographicCamera } from '@react-three/drei'
import { useFrame,useThree } from '@react-three/fiber'
import * as THREE from 'three'
import MagicObject from './MagicObject'
import Gun from './Gun'

import { useSelector, useDispatch } from 'react-redux';
import {addTarget,removeTarget} from '../store/gameSlice'
import Target from './Target'

const Three = ({setCrosshairVisiblility}) => {
    const { camera } = useThree();
    const cameraControlRef = useRef(null);
    useFrame((state)=>{
        const {x,y} = state.mouse;
        camera.rotation.y = -x * 0.5;
        camera.rotation.x = y * 0.25;
    })

    //game related 
    const dispatch = useDispatch();
    const { targets, gameOver } = useSelector(state => state.game);
  
    useEffect(() => {
      const interval = setInterval(() => {
        if (!gameOver) {
          dispatch(addTarget());
        }
      }, 1000); // Add a new target every second
  
      return () => clearInterval(interval);
    }, [dispatch, gameOver]);
  
    const handleTargetClick = (id) => {
      if (gameOver) return;
      dispatch(removeTarget(id));
    };

    return (
        <>
            <PerspectiveCamera makeDefault position={[ 0, 2, 10 ]} />
            <mesh rotation={[ -Math.PI/2, 0, 0 ]}>
                <planeGeometry args={[ 20, 20, 2 ]} />
                <meshStandardMaterial color="rgb(21 60 117 / 80%)" />
            </mesh>
            <directionalLight position={[ 0, 2, 10 ]} />
            <Environment background>
                <mesh scale={100}>
                    {/* <sphereGeometry args={[ 1, 32, 32 ]} /> */}
                    <sphereGeometry args={[ 1, 1, 1 ]} />
                    <meshBasicMaterial color="lightblue" side={THREE.BackSide} />
                </mesh>
            </Environment>


            {/* <CameraControls makeDefault ref ={cameraControlRef}
             enableRotate={true}
             enableZoom={true}
             minAzimuthAngle={Math.PI /4 }
             maxAzimuthAngle={Math.PI / 2}
             minPolarAngle={Math.PI /4 }
             maxPolarAngle={Math.PI / 2}
             /> */}
            {/* <MagicObject position={[4,2,-2]}/> */}

              <Gun setCrosshairVisiblility ={setCrosshairVisiblility} />

              {targets.map(target => (
                <Target
                    key={target.id}
                    position={target.position}
                    onClick={() => handleTargetClick(target.id)}
                    color ={target.color}   
                    
                />
                ))}
               
        </>
    )
}

export default Three
