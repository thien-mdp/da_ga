import React from 'react';
import Home from './pages/Home';
import { Provider } from "react-redux";
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className='w-full h-full min-h-screen p-12 bg-teal-50'>
        <Home />
      </div>
    </Provider>
  );
}

export default App;