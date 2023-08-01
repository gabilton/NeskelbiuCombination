import { Link } from "react-router-dom";
import Users from "../components/Users";

const Admin = () => {
  return (
    <section className="bg-Slate-700 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-700">Admins Page</h1>
      <div className="flex flex-col items-center space-y-4">
        {/* Your content here, e.g.,  */}
        <br />
        <Users />
        <br />
      </div>
      <div className="flex-grow mt-8">
        <Link
          to="/home"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition duration-200"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default Admin;
