import OpenAI from "openai";

export const POST = async (req:any) => {

    const openai = new OpenAI(
        {
            apiKey: process.env.OPENAI_API_KEY,
        }
    );
    try {
        const formData = await req.formData();
        const file = formData.get('audio');

        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
        });



        return new Response(JSON.stringify({ message: 'File uploaded successfully', text: transcription.text }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }catch (e){
        console.log(e)
    }
}
