import connectMongo from "@/app/api/db/connect";
import {currentUser} from "@clerk/nextjs/server";
import UserSchema from "@/app/models/user";
import Transcription from "@/app/models/transcription";

export async function GET() {
    try {
        await connectMongo();
        const user = await currentUser();
        const name = user?.username;
        if (!name) {
            return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400 });
        }

        const existingUser = await UserSchema.findOne({ name });

        const countOfTranscription = await Transcription.countDocuments({ userName: name });

        if((!existingUser||existingUser.isPaid===false) && countOfTranscription===2){
            return new Response(JSON.stringify({ show: false }), { status: 200 });
        }else return new Response(JSON.stringify({ show: true }), { status: 200 });


    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}



export async function POST(req) {
    try {
        await connectMongo();

        const body = await req.json();

        const { isPaid } = body;

        const user = await currentUser()
        const name =  user?.username


        if (!name) {
            return new Response(JSON.stringify({ error: 'Missing username' }), { status: 400 });
        }

        const existingUser = await UserSchema.findOne({ name });

        if (existingUser) {
            return new Response(JSON.stringify({ message: 'User already paid', user: existingUser }), { status: 200 });
        }

        const newUser = await UserSchema.create({name, isPaid})

        return new Response(JSON.stringify({ message: 'User paid successfully', user: newUser }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}
