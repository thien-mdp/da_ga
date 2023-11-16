import React from "react";
import { Provider } from "react-redux";
import Loading from "./components/Loading";
import Toast from "./components/Toast";
import Home from "./pages/Home";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Loading />
      <Toast />
      <div className="w-full h-full min-h-screen p-12 bg-[#ffff00]">
        <Home />
      </div>
    </Provider>
  );
}

export default App;
