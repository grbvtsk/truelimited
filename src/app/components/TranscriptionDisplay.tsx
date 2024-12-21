import React from "react";
import {TranscriptionPropsStr} from "@/interfaces/transcriptions.interfaces";


const TranscriptionDisplay: React.FC<TranscriptionPropsStr> = ({ transcription }) => {
    return (
        transcription ? (
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-6">
                <h2 className="text-xl font-semibold mb-4">Transcription:</h2>
                <p className="text-gray-300 whitespace-pre-wrap break-words">
                    {transcription}
                </p>
            </div>
        ) : null
    );
};


export default TranscriptionDisplay;
