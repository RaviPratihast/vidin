import React from "react";
import { Button } from "../index-component";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-black bg-opacity-50 z-50">
          <div className="bg-white shadow-md rounded-lg w-11/12 max-w-md">
            <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
              <h2 className="text-gray-700 font-semibold">Add to Playlist</h2>
              <Button
                onClick={onClose}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            <div className="px-4 py-6">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export { Modal };
