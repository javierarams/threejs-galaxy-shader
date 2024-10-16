import { Canvas } from '@react-three/fiber';
import {
  CameraControls,
  OrbitControls,
  RandomizedLight,
} from '@react-three/drei';
import Galaxy from './Galaxy';

function CanvasComponent() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000000',
      }}
    >
      <OrbitControls />
      <Galaxy />
    </Canvas>
  );
}

export default CanvasComponent;
