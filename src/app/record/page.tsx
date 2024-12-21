"use client"
import React, {useState} from "react";
import axios from "axios";
import FileUploader from "@/app/components/FileUploader";
import TranscriptionDisplay from "@/app/components/TranscriptionDisplay"
import Story from "@/app/components/Story";
import {TranscriptionObj} from "@/interfaces/transcriptions.interfaces";

export default function Home(){
    const [loading, setLoading] = useState<boolean>(false);
    const [transcription, setTranscription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [story, setStory] = useState<TranscriptionObj[]>([]);
    const [isShow, setIsShow] = useState(true);



    const handleTranscription = async (e: React.FormEvent)=>{
        e.preventDefault();
        setLoading(true);
        setTranscription("");
        if (file) {
            const allowedTypes = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4","audio/x-m4a"];

            if (!allowedTypes.includes(file.type)) {
                setTranscription("Only audio files are allowed (e.g., MP3, WAV, OGG, MP4, m4a). Please upload a valid file!");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append("audio", file);

            try {
                const res = await axios.post("/api/transcribe", formData);
                setTranscription(res.data.text);
                await axios.post("/api/transcription",{transcriptionContent: res.data.text})
                const data = await axios.get("/api/transcription")
                setStory(data.data)
                axios.get("/api/users/status").then(res=>{
                        setIsShow(res.data.show)
                    })
            } catch (error) {
                console.error("Error uploading file:", error);
            } finally {
                setLoading(false);
            }
        }else {
            setTranscription("Upload the file ,pls!");
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 h-full bg-gray-900 text-white p-4 overflow-y-auto">
                <Story story={story} setStory={setStory}/>
            </div>
            <div className="w-1/2 h-full bg-gray-800 p-4 flex flex-col items-center">
                <h1 className="text-white text-3xl mb-4">Pls, select an audio file to transcribe</h1>
                <FileUploader onFileChange={setFile} loading={loading} onSubmit={handleTranscription}
                              isShow={isShow} setIsShow={setIsShow}/>
                <TranscriptionDisplay transcription={transcription}/>
            </div>
        </div>
    )
}
