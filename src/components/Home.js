import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context 
    // axios to /logout endpoint 
    setAuth({});
    navigate('/login');
  }

  return (
    <section className="bg-Slate-700 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <p className="text-green-600 font-semibold mb-4">You are logged in!</p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          to="/admin"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Go to the Admin page
        </Link>
        <Link
          to="/editor"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-200"
        >
          Go to the Editor page
        </Link>
        <Link
          to="/lounge"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition duration-200"
        >
          Go to the Lounge
        </Link>
      </div>
      <div className="flex-grow mt-8">
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
        >
          Sign Out
        </button>
      </div>
    </section>
  )
}

export default Home;
