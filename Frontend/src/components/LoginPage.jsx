import { use } from "react";
import { Link, useNavigate } from "react-router"
import { useRef , useEffect } from "react";
import axios from "axios";

export function LoginPage(){
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    console.log("login token = ", token)
    useEffect( ()=>{
        if(token){
            navigate("/dashboard");
        }
    },[])

    const usernameRef = useRef();
    const passwordRef = useRef();

    function logging(){
        let username = usernameRef.current.value;
        let password = passwordRef.current.value;
        console.log(username , password);

            if(username && password){
                axios.post("http://localhost:4000/login",{username,password})
                .then((response)=>{
                    console.log("response = ",response); 
                    alert(response.data.message);
                    localStorage.setItem("token" , response.data.token);
                    navigate("/dashboard")
                })
                .catch((error)=>{
                    console.log("error = ",error);
                    alert(error.response.data.message);
                })
            } else{
                alert ("Enter every field properly Frontend")
            }
    }

    return (
        <>  
        <div className="flex justify-center mt-20">
            <div className="w-full max-w-md bg-white p-8 border-l-4 border-l-blue-500 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-4xl font-light text-gray-800">Login</h2>
                    <p className="text-gray-500 mt-1">Log into Your Account</p>
                </div>
                    <div className="space-y-6">
                        <div>
                            <label for="loginUsername1" className="block text-sm text-gray-600 mb-1">Username</label>
                            <input ref={usernameRef}  type="text" name="username" id="loginUsername1" required className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"/>
                        </div>
                        <div>
                            <label for="loginPassword1" className="block text-sm text-gray-600 mb-1">Password</label>
                            <input ref={passwordRef}  type="text" name="password" id="loginPassword1" required className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"/>
                        </div>
                        <div className="pt-4">
                            <button onClick={()=>{logging()}}  type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-none transition-colors uppercase tracking-wide">Login</button>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <div className="success-message text-green-600 "></div>
                        <div className="error-message text-red-600 hidden"></div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Dont have an account? 
                            <Link to="/signup"  className="text-blue-700 hover:text-blue-700 underline">Signup</Link>
                        </p>
                        <Link to="/" className="text-blue-600 underline cursor-pointer">Homepage</Link>
                    </div>
            </div>
        </div>
        </>
    )
}