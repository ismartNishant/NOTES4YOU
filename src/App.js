
import { useState } from 'react';
import './App.css';

function App() {
  const [val, setVal] = useState('');

  const some = (e) => {
    setVal(e.target.value)
  }

  return (
    <div className="App">
    
    </div>
  );
}

export default App;
