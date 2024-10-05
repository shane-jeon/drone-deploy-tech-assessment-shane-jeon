import React from "react";
// import { useState, useEffect } from "react";
import Table from "./components/Table";
import Form from "./components/Form";

import "./index.css";
import { QueryFormData } from "./components/Form";

function App() {
  function handleSubmit(formData: QueryFormData) {
    console.log(formData);
  }

  return (
    <div className="app">
      <div className="mx-10">
        <Table />
        <div className="mt-8 flex justify-center">
          <Form onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
