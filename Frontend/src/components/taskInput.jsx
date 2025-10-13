import { use, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function TaskInput(){
    
    return (
        <>
        <div className="w-1/2 mx-auto bg-white rounded-xl shadow-lg p-8 my-4">
            <div className="flex flex-col md:flex-row gap-6 items-end">
            <div className="flex-1">
                <label className="block text-gray-700 font-semibold mb-2">
                Title
                </label>
                <input
                type="text"
                placeholder="Enter title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                />
            </div>
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
                Submit
            </button>
            </div>
        </div>
        
        </>
    )
}