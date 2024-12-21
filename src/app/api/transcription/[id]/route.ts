import connectMongo from '../../db/connect';
import Transcription from "@/app/models/transcription";

export async function DELETE(req, context){
    await connectMongo();
    const { id } = await context.params;
    try {
        const deletedTranscription = await Transcription.findByIdAndDelete(id)
        return new Response(JSON.stringify(deletedTranscription), { status: 200 });
    }catch (error){
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500,});
    }

}
