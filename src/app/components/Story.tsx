import React, {useEffect} from "react";
import axios from "axios";
import {StoryProps} from "@/interfaces/stories.interfaces";

const Story: React.FC<StoryProps>  = ({story,setStory})=>{

    useEffect(() => {
        axios.get("/api/transcription")
            .then(res=>{
                setStory(res.data)
            })
    }, []);

    const handleDelete = (id)=>{
        axios.delete(`/api/transcription/${id}`)
            .then(()=>{
                setStory(prevState => prevState.filter(tran=>tran._id !== id))
            })
    }


    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Story of Transcriptions</h2>
            <div className="space-y-4">
                {story.map((el) => (
                    <div
                        key={el._id}
                        className="relative p-3 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 duration-300"
                    >
                        <p className="break-words mr-5">{el.transcriptionContent}</p>

                        <button
                            onClick={() => handleDelete(el._id)}
                            className="absolute top-1 right-2 text-4xl text-gray-400 hover:text-red-500 transition duration-200"
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>


    )
}

export default Story
