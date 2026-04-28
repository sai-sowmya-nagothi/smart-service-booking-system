import Login from "./Login";
import Dashboard from "./Dashboard";
import Bookings from "./Bookings";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./Signup";

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/bookings" element={<Bookings/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;