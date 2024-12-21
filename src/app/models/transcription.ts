import mongoose from "mongoose";

const transcriptionSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: false
    },
    transcriptionContent: {
        type: String,
        trim: true
    }
});

export default mongoose.models.Transcription || mongoose.model('Transcription',transcriptionSchema)
