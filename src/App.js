import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Kolkasveikia from "./pages/Kolkasveikia";
import { useEffect } from "react";
import Login from "./Authentication/Login";
import Register from './Authentication/Register';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthotized';
import Missing from './components/Missing';
import Home from './components/Home';
import Lounge from './testing/Lounge';
import Admin from './testing/Admin';
import Editor from './testing/Editor';
import NavBar from "./components/NavBar";
import FooterFrame from "./components/FooterFrame";
import GetPosterList from "./posters/GetPosterList";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
        default: break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);




return (
  <div>
    <div className="App">
    <NavBar />
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Kolkasveikia/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/posters" element={<GetPosterList />} />

        {/* We wat to protect these routes */}
          <Route path="/home" element={<Home/>}/>
        
        <Route element={<RequireAuth allowedRoles={['ADMIN', 'MANAGER', 'USER']}/>}>
          <Route path="/lounge" element={<Lounge/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
          <Route path="/admin" element={<Admin/>}/>
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'MANAGER']}/>}>
          <Route path="/editor" element={<Editor/>}/>
        </Route>
        
        {/* catch all */}
        <Route path="*" element={<Missing />} />
         
      </Routes>
      <FooterFrame />
     

    </div>
  </div>
  
);
}

export default App;