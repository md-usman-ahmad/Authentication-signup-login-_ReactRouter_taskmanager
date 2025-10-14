import { use, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function TaskInput({addingATaskIntoDB}){
    const [TaskInput,setTaskInput] = useState(false);


    const titleRef = useRef();
    const descriptionRef = useRef();


    return (
        <>
        {TaskInput && <h1 className="text-3xl font-semibold text-center mx-10 text-gray-800 tracking-wide">➕Adding Task into Database</h1>}
        {!TaskInput && 
        <div className="w-1/2 mx-auto bg-white rounded-xl shadow-lg p-8 mt-4">
            <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">
                Title
                </label>
                <input
                type="text"
                placeholder="Enter title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ref={titleRef}
                />
            </div>
            <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">
                Description
                </label>
                <input
                type="text"
                placeholder="Enter description..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                ref={descriptionRef}
                />
            </div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
                onClick={() => {
                setTaskInput(true);
                addingATaskIntoDB(
                    titleRef.current.value,
                    descriptionRef.current.value
                );
                setTimeout( ()=>{
                    setTaskInput(false);
                },6000)
                titleRef.current.value = "";
                descriptionRef.current.value = "";
                }}
            >
                Submit
            </button>
            </div>
        </div>
        }
        
        </>
    )
}