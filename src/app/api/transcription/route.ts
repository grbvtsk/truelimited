import connectMongo from '../db/connect';
import Transcription from "@/app/models/transcription";
import {currentUser} from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectMongo();
        const user = await currentUser()
        const userName =  user?.username

        if (!userName) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const transcriptions = await Transcription.find({ userName });
        return new Response(JSON.stringify(transcriptions), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}

export async function POST(req){
    try {
        await connectMongo();
        const body = await req.json();
        const { transcriptionContent } = body;

        const user = await currentUser()
        const userName =  user?.username

        if (!userName) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const newTranscription = await Transcription.create({userName, transcriptionContent})

        return new Response(JSON.stringify(newTranscription), { status: 201 });
    }catch (error){
        console.error("Error creating user:", error);
        return new Response(
            JSON.stringify({ error: 'Failed to create user' }),
            { status: 500 }
        );
    }
}

