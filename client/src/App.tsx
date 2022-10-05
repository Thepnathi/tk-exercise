import React from 'react';

function App() {

  React.useEffect(() => {
    fetch('http://localhost:8000/api/artist/artist/')
    .then((response) => response.json())
    .then((data) => console.log(data));
  })

  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
