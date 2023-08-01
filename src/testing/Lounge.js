import { Link } from "react-router-dom";

const Lounge = () => {
  return (
    <section className="bg-Slate-700 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-green-700">The Lounge</h1>
      <p className="text-white-700">
        Admins and Editors and Users can hang out here.
      </p>
      <div className="flex-grow mt-8">
        <Link
          to="/home"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-200"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default Lounge;
