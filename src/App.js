import React from "react";
import { Header } from "./component/index-component";

function App() {
  return (
    <div className="App">
      <Header />
      {/* Main content will go here */}
      <div className="p-4">
        <h1 className="text-4xl font-bold text-center mt-20">
          Welcome to vidIn
        </h1>
      </div>
    </div>
  );
}

export default App;
