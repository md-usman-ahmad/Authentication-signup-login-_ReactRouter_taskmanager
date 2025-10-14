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

    const loginUsernameRef = useRef();
    const loginPasswordRef = useRef();
    const forgotUsernameRef = useRef();
    const newPasswordRef = useRef();

    function logging(){
        let username = loginUsernameRef.current.value;
        let password = loginPasswordRef.current.value;
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

    function forgotPassword(){
        let username = forgotUsernameRef.current.value;
        let newPassword = newPasswordRef.current.value;
        console.log(username , newPassword);

        axios({
            method : "PATCH",
            url : "http://localhost:4000/login",
            data : {
                username,newPassword
            }
        })
        .then(function(response){
            console.log("forgotPassword response = ",response);
        })
        .catch(function(error){
            console.log("forgotPassword Error = ",error);
        })
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
                            <input ref={loginUsernameRef}  type="text" name="username" id="loginUsername1" required className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"/>
                        </div>
                        <div>
                            <label for="loginPassword1" className="block text-sm text-gray-600 mb-1">Password</label>
                            <input ref={loginPasswordRef}  type="text" name="password" id="loginPassword1" required className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"/>
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
                        <p className="text-gray-600">Forgot Password? 
                        <button type="button" data-modal-target="forgotPassword" data-modal-toggle="forgotPassword" 
                          className="text-blue-600 underline cursor-pointer">change Password</button>
                        </p>
                        <Link to="/" className="text-blue-600 underline cursor-pointer">Homepage</Link>
                    </div>
            </div>
        </div>


        {/* <!-- Forgot Password Modal --> */}
      <div
        id="forgotPassword"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Change Your Password
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="forgotPassword"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="space-y-6 p-6">
                <div>
                    <label className="block text-sm text-white-700 mb-1">Username</label>
                    <input ref={forgotUsernameRef}  type="text" placeholder="Enter Username" className="text-white w-full px-0 py-3 border-0 border-b-2 border-white-200 focus:outline-none focus:border-white-500 transition-colors bg-transparent"/>
                </div>
                <div>
                    <label className="block text-sm text-white-600 mb-1">Password</label>
                    <input ref={newPasswordRef}  type="text" placeholder="Enter New Password" className="text-white w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-white-500 transition-colors bg-transparent"/>
                </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={()=>{
                    forgotPassword();
                }}
                 type="submit"
                className="w-1/3 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-none transition-colors uppercase tracking-wide">New Password</button>
            </div>
          </div>
        </div>
      </div>

        </>
    )
}