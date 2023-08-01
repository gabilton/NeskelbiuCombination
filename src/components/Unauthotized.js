import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <section className="bg-Slate-700 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-red-700">Unauthorized</h1>
      <p className="text-white-700">You do not have access to the requested page.</p>
      <div className="flex-grow mt-8">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default Unauthorized;
