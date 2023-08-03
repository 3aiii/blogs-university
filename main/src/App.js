import { useContext } from "react";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import SingPost from "./page/singlePost/SingPost";
import Upload from "./page/upload/Upload";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Context } from "./Context/Context";
import Category_selec from "./page/category_selec/Category_selec";
import Mypost from "./page/mypost/Mypost";
import HomeAdv from "./pages-admin/homeAdv/HomeAdv";
import LoginAdv from "./pages-admin/loginAdv/LoginAdv";
import SingalAdv from "./pages-admin/singaladv/SingalAdv";

function App() {
  const { user } = useContext(Context)

  return (
    <Router>
      <Routes>
        <Route 
          path="/"
          element={ user ? <Home/> : <Login/>}/>
      </Routes>
      <Routes>
        <Route
          path="/upload"
          element={user ? <Upload/> : <Login/>}
        />
      </Routes>
      <Routes>
        <Route
          path="/Mypost"
          element= { user ? <Mypost/> : <Login/>}
        />
      </Routes>
      <Routes>
        <Route
          path="/login"
          element= { user ? <Home/> : <Login/>}
        />
      </Routes>
      <Routes>
        <Route
          path="/siglePost/:id"
          element={<SingPost/>}
        />
      </Routes>
      <Routes>
        <Route
          path="/cat/:id"
          element= { user ? <Category_selec/> :<Login/>}
        />
      </Routes>
      {/* Routes ADV account */}
      <Routes>
        <Route
          path="/loginAdv"
          element= { user ? <HomeAdv/> : <LoginAdv/>}
        />
      </Routes>
      <Routes>
        <Route
          path="/HomeAdv"
          element= { user ?  <HomeAdv/> : <LoginAdv/> }
        />
      </Routes>
      <Routes>
        <Route
          path="/siglePostAdv/:id"
          element= { <SingalAdv/> }
        />
      </Routes>
    </Router>
  );
}

export default App;