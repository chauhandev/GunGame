import React, { Suspense, useState } from 'react'
import {Canvas} from '@react-three/fiber'
import Three from './Three'
import Crosshair from './Crosshair';
import {useSelector ,useDispatch} from 'react-redux'
import { resetGame } from '../store/gameSlice';
const MyGame = (props) => {
   const [crosshairVisibility ,setCrosshairVisiblility] = useState(true);
   const { score, gameOver } = useSelector(state => state.game);
    
   const dispatch = useDispatch();

   const handleReset = () => {
    dispatch(resetGame());
  };

  return (<>
     <Canvas style={{height:"100vh" ,cursor:'none'}}>
          <Suspense fallback= {null}>
            <Three setCrosshairVisiblility ={setCrosshairVisiblility}/>
          </Suspense>
     </Canvas>
     <Crosshair visible={crosshairVisibility}/>
     <div className="absolute top-4 left-4 text-white">
        <h1>Score: {score}</h1>
       
     
      </div>
      { gameOver && <div className='absolute top-1/3 left-2/4 -translate-x-1/2 -translate-y-1/2 rounded '>
        {gameOver && <h2 className='p-2 rounded-3xl'>Game Over!</h2>}
        <button className='bg-cyan-800 p-3 rounded-3xl text-white hover:bg-cyan-900' onClick={handleReset} >Play Again</button>
        </div>
    }
   

  </>
  )
}

export default MyGame
