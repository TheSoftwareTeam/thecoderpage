import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/*"/>
        <Route path="main"/>
      </Routes>
    </>
  );
}

export default App;
