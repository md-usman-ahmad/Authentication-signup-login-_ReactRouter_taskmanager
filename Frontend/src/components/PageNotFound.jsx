import { useNavigate } from "react-router";
export function PageNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="page3"
        className="page flex-col justify-center items-center my-20"
      >
        <div className="text-center max-w-2xl mx-auto px-8">
          <h1 className="text-9xl font-thin text-gray-800 mb-8">404</h1>
          <div className="w-24 h-1 bg-gray-800 mx-auto mb-8"></div>
          <h2 className="text-3xl font-light text-gray-700 mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            We couldn't find what you were looking for. Perhaps you can find
            what you need from our homepage.
          </p>
          <button
            onClick={()=>{
              navigate("/")
            }}
            className="bg-gray-800 text-white font-medium py-4 px-12 hover:bg-gray-700 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </>
  );
}
