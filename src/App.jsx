import "./App.css";
import React from "react";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { PrimeReactProvider } from "primereact/api";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ImportExcelComponent from "./components/ImportExcelComponent";
import AtributeMappingComponent from "./components/AtributeMappingComponent";
import DataViewComponent from "./components/DataViewComponent/DataViewComponent";

function App() {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <React.StrictMode>
          <Router>
            <div className="App">
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <ImportExcelComponent />
                      <DataViewComponent />
                    </>
                  }
                />
                <Route path="/attributemapping/:id" element={<AtributeMappingComponent />} />
              </Routes>
            </div>
          </Router>
        </React.StrictMode>
      </Provider>
    </PrimeReactProvider>
  );
}

export default App;
