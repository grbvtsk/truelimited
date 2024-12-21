import connectMongo from '../db/connect';
import UserSchema from '../../models/user'
import {currentUser} from "@clerk/nextjs/server";

export async function GET() {
    try {
        await connectMongo();
        const user = await currentUser()
        const name =  user?.username

        if (!name) {
            return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
        }

        const users = await UserSchema.find({ name });
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error }), { status: 500 });
    }
}


