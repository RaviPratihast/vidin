import React from "react";
import { Button } from "../index-component";

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-slate-950/70 px-4">
          <div className="surface-card w-full max-w-md">
            <div className="flex justify-end border-b border-slate-800 px-4 py-3">
              <Button
                onClick={onClose}
                className="h-11 w-11 rounded-lg border border-slate-700 bg-slate-900 px-0 py-0 text-slate-200 hover:bg-slate-800"
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
