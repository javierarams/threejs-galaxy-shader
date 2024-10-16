import { useState } from 'react';
import './App.css';
import CanvasComponent from './components/Canvas';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CanvasComponent />
    </>
  );
}

export default App;
