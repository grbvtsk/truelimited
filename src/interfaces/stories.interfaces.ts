import React from "react";
import {TranscriptionObj} from "@/interfaces/transcriptions.interfaces";

export interface StoryProps {
    story: TranscriptionObj[];
    setStory: React.Dispatch<React.SetStateAction<TranscriptionObj[]>>;
}
