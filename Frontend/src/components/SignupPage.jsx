import { Link } from "react-router";
import { useRef , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";


export function SignupPage(){
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    console.log("signup token = ", token)
    useEffect( ()=>{
        if(token){
            navigate("/dashboard");
        }
    },[])


    const firstNameRef = useRef();
    const ageRef = useRef();
    const genderRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    function addingUserIntoDB(){
        let firstname = firstNameRef.current.value;
        let age = ageRef.current.value;
        let gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : undefined;
        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        console.log(firstname , age , gender , username , email , password);

        if(firstname && age && gender && username && email && password){
            axios({
                method : "POST",
                url : "http://localhost:4000/signup",
                data : {
                    firstname,age,gender,username,email,password
                },
                headers : {
                    "ngrok-skip-browser-warning": "true",
                },
            })
            .then(function(response){
                console.log("response SignupPage = ",response);
                alert(response.data.message);
                navigate("/login");
            })
            .catch(function(error){
                console.log("error SignupPage = ",error);
                alert(error.response.data)
            })
        } else {
            alert ("Enter every field properly Frontend")
        }
    }    

    return (
        <>
        <div className="flex justify-center mt-11">
            <div className="w-full max-w-4xl bg-white p-8 border-l-4 border-l-green-500 shadow-lg">
                <div className="mb-8">
                    <h2 className="text-4xl font-light text-gray-800">Sign up</h2>
                    <p className="text-gray-500 mt-1">Create your account</p>
                </div>
                
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label for="firstName6" className="block text-sm text-gray-600 mb-1">First Name</label>
                                <input ref={firstNameRef}  type="text" name="firstName" id="firstName6" placeholder="First Name" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label for="age6" className="block text-sm text-gray-600 mb-1">Age</label>
                                <input ref={ageRef}  type="text" id="age6" placeholder="Enter Age(number above 0)" name="Age" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-3">Gender</label>
                                <div className="flex space-x-6">
                                    <label className="flex items-center cursor-pointer">
                                        <input ref={genderRef}  type="radio" name="gender" value="Male" className="mr-2 text-green-500"/>
                                        <span className="text-gray-700">Male</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer">
                                        <input ref={genderRef}  type="radio" name="gender" value="Female" className="mr-2 text-green-500"/>
                                        <span className="text-gray-700">Female</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Username</label>
                                <input ref={usernameRef}  type="text" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Email</label>
                                <input ref={emailRef} type="email" placeholder="xyz@gmail.com" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-600 mb-1">Password</label>
                                <input ref={passwordRef}  type="text" placeholder="Enter Your Password" className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:outline-none focus:border-green-500 transition-colors bg-transparent"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-10">
                        <button onClick={()=>{addingUserIntoDB()}}
                         type="submit"
                        className="w-1/3 bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-none transition-colors uppercase tracking-wide">Submit</button>
                    </div>
                    <div className="text-center mt-4">
                        <div className="success-message text-green-600 "></div>
                        <div className="error-message text-red-600 hidden"></div>
                    </div>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">Already have an account? 
                            <Link to="/login"  className="text-blue-700 hover:text-blue-700 underline">Login</Link>
                        </p>
                        <Link to="/" className="text-blue-600 underline cursor-pointer">Homepage</Link>
                    </div>
                
            </div>
        </div>
        </>
    )
}