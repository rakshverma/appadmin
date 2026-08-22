import React from "react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./store";
import Application from "./Routes";
import Toast from "./components/Toast";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Application />
        <Toast />
      </Provider>
    </div>
  );
}

export default App;
