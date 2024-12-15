import Canvas  from './canvas';
import ThreeFiber  from './canvas/ThreeFiber';
import Customizer from './pages/Customizer'
import Home from './pages/Home'
import MyGame from './canvas/MyGame'
import MyCube from './canvas/MyCube'
import TempCanvas from './canvas/TempCanvas';


function App() {

  return (
    <>
    <main className="app transition-all ease-in">
        {/* <ThreeFiber/> */}
      <MyGame/>
    {/* <MyCube/> */}
    {/* <TempCanvas/> */}
    </main>
    </>
  )
}

export default App
