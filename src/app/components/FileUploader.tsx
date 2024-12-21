import React, {useEffect, useState} from "react";
import {FileUploaderProps} from "@/interfaces/fileUploader.interfaces";
import PaidModal from "@/app/components/PaidModal";
import axios from "axios";

const FileUploader: React.FC<FileUploaderProps> = ({ onFileChange, loading, onSubmit, isShow, setIsShow }) => {

    const [isPopupVisible, setPopupVisible] = useState(false);

    const handleButtonClick = async () => {
        setPopupVisible(true);
        const data = await axios.get("/api/users")
        console.log(data.data)
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    useEffect(() => {
        axios.get("/api/users/status")
            .then(res=>{
                setIsShow(res.data.show)
            })
    }, []);

    return (<div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
            <form onSubmit={onSubmit} className="space-y-4">
                <h2 className="text-xl font-semibold text-center">Upload Audio File</h2>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const selectedFile = e.target.files?.[0] || null;
                        onFileChange(selectedFile);
                    }}
                    className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0 file:bg-gray-700 file:text-gray-300 hover:file:bg-gray-600
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
                />
                {isShow?
                    (<button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700 transition duration-200"
                        }`}
                    >
                        {loading ? "Transcribing..." : "Upload & Transcribe"}
                    </button>): (
                        <button type="button" className="bg-green-600 w-full py-2 px-4 rounded-lg font-semibold text-white"
                                onClick={handleButtonClick}>
                            Pay for continue using
                        </button>
                    )
                }
            </form>
            <PaidModal isVisible={isPopupVisible} setPopupVisible={setPopupVisible}
                       onClose={handleClosePopup} setIsPaid={setIsShow}/>
        </div>

    );
};

export default FileUploader;

