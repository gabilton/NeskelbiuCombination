import { Link } from "react-router-dom";

const Editor = () => {
  return (
    <section className="bg-Slate-700 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-green-500">Editors Page</h1>
      <p className="text-lg text-white mb-6">
        You must have Admin or Editor role.
      </p>
      <div className="flex-grow">
        <Link
          to="/home"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Home
        </Link>
      </div>
    </section>
  );
};

export default Editor;
