import axios from "axios";
import { useRef, useState } from "react";

export function TaskCard({ taskId, title, description , createdAt,updatedAt , deleteTask, updatingTask }) {
  const [IsEditing, setIsEditing] = useState(false);
  const [IsDeleted, setIsDeleted] = useState(false);

  const updatedTitleRef = useRef();
  const updatedDescriptionRef = useRef();

  return (
    <>
      <div className="flex border border-gray-700 rounded-lg p-4 bg-stone-800 shadow-sm mt-2 w-1/2 mx-auto">
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-cyan-400 text-lg">⚡</span>
        </div>
        <div className="flex  justify-between pl-3">
          <div className="flex-1 w-[400px]">
            {IsEditing ? (
              <>
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 mb-2 text-sm"
                  placeholder="Edit Title"
                  ref={updatedTitleRef}
                />
                <input
                  type="text"
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded px-3 py-1 text-sm"
                  placeholder="Edit Description"
                  ref={updatedDescriptionRef}
                />
              </>
            ) : (
              <>
                <div className="task-content">
                  <h6 className="font-semibold text-white mb-1">{title}</h6>
                  <hr className="my-1 border-gray-600" />
                  <p className="text-gray-300 text-sm break-words">
                    {description}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col ml-4">
            <small className="text-gray-400 text-xs whitespace-nowrap">
              createdAt - {createdAt}
            </small>
            <small className="text-gray-400 text-xs whitespace-nowrap">
              updatedAt - {updatedAt}
            </small>
          </div>

          <div className="ml-4">
            <div className="action-buttons">
              {IsEditing ? (
                <>
                  <button
                    className="save-btn border border-green-400 text-green-400 hover:bg-green-900 px-3 py-1 rounded text-sm mr-2"
                    onClick={() => {
                      setIsEditing(false);
                      updatingTask(taskId,updatedTitleRef.current.value,updatedDescriptionRef.current.value);
                      updatedTitleRef.current.value = "";
                      updatedDescriptionRef.current.value = "";
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="cancel-btn border border-gray-400 text-gray-400 hover:bg-gray-700 px-3 py-1 rounded text-sm"
                    onClick={() => {
                      setIsEditing(false);
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn border border-cyan-400 text-cyan-400 hover:bg-cyan-900 px-3 py-1 rounded text-sm mr-2"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    Edit
                  </button>
                  {IsDeleted ? <button  disabled 
                    className="delete-btn border border-grey-400 text-grey-400 hover:bg-grey-900 px-3 py-1 rounded text-sm  "
                    onClick={() => {
                      deleteTask(taskId);
                    }}
                  >
                    Delete
                  </button> : 
                  <button   
                    className="delete-btn border border-red-400 text-red-400 hover:bg-red-900 px-3 py-1 rounded text-sm  "
                    onClick={() => {
                        setIsDeleted(true);
                      deleteTask(taskId);
                    }}
                  >
                    Delete
                  </button>
              }
                </>
              )}
            </div>
            <div className="save-buttons hidden"></div>
          </div>
        </div>
      </div>
    </>
  );
}
