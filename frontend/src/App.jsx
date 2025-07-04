import { BrowserRouter,Routes,Route } from "react-router-dom"
import Signup from './pages/signup'
import Signin from "./pages/signin"
import Dashboard from "./pages/dashboard"
import Transfer from "./pages/transfer"
function App() {

  return (
    <div >
        <BrowserRouter>
            <Routes>
               <Route path="/" element={<Signup/>}></Route>
               <Route path="/signin" element={<Signin/>}></Route> 
               <Route path="/dashboard" element={<Dashboard/>}></Route>
               <Route path="/send" element={<Transfer/>}></Route> 
            </Routes>
        </BrowserRouter>
    </div>
  )
}


export default App
