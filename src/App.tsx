import React from 'react';
import useStore from '@store/store';
function App() {
  const {bears, increasePopulation, decreasePopulation, removeAllBears} = useStore();
  console.log(`bears: ${bears}`);
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={increasePopulation}>+</button>
      <button onClick={decreasePopulation}>-</button>
      <button onClick={removeAllBears}>clear</button>
    </div>
  );
}

export default App;
