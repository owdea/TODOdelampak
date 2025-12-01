import './App.css'
import useAuth from "./hooks/useAuth.js";
import AuthButtons from "./components/authButtons.jsx";

function App() {

    return (
    <div className={"h-screen flex justify-center items-center flex-col"}>
      <h1 className={""}>Working on it</h1>
      <h1 className={"pb-2"}>See?</h1>
      <span></span>
        <AuthButtons/>
    </div>
  )
}

export default App
