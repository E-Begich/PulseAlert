import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center">
        <img src={require('./logo.svg')} className="w-32 h-32 animate-spin" alt="logo" />
        <p className="text-lg mt-4">
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="text-blue-500 hover:underline"
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

