import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './component/home/home';
import Login from './component/login/login';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
