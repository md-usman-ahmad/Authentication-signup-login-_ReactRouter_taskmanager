import { Link , useNavigate } from "react-router";
import { useEffect } from "react";

export function HeroSection(){
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    console.log("herosection token = ", token)
    useEffect( ()=>{
        if(token){
            navigate("/dashboard");
        }
    },[])





    return (
        <>
            <div className=" flex items-center justify-center bg-white">
                <div className="text-center max-w-xl px-6">
                <section>
                    <div className="mb-12">
                    <h1 className="text-6xl font-thin text-gray-800 mb-4">Tasks</h1>
                    <div className="w-32 h-0.5 bg-green-500 mx-auto mb-8"></div>
                    <h2 className="text-2xl font-light text-gray-600 leading-relaxed">
                        Please login to create and see your saved tasks
                    </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link to="/login" 
                        className="group relative border-2 border-blue-500 text-blue-500 hover:text-white font-medium px-12 py-4 rounded-none transition-all duration-300 overflow-hidden">
                        <span className="relative z-10">Login</span>
                        <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                    <Link to="/signup"  
                        className="group relative border-2 border-green-500 text-green-500 hover:text-white font-medium px-12 py-4 rounded-none transition-all duration-300 overflow-hidden"
                    >
                        <span className="relative z-10">Sign Up</span>
                        <div className="absolute inset-0 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </Link>
                    </div>
                </section>
                </div>
            </div>
        </>
    )
}