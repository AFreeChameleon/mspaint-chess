import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChessBoard from './components/ChessBoard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChessBoard />
      </div>
    </Provider>
  );
}

export default App;