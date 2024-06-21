import React from 'react';

export default function ImageModal({ show, imageSrc, onClose }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
            <div className="relative bg-white rounded-lg overflow-hidden p-4 max-w-md mx-auto">
                <img
                    src={imageSrc}
                    alt="Proof"
                    className="max-w-full max-h-64 object-contain"
                />
                <div className="flex justify-center mt-4">
                    <button
                        onClick={onClose}
                        className="focus:outline-none text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
