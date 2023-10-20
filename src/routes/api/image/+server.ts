import { key } from '../../../utils'
export async function GET(params) {
    return new Response(JSON.stringify({message: 'Hello world'}))
}

export async function POST({request}) {
    // get image from request
    const image = await request.text()
    // decode base64 & conver to blob
    const blob = Buffer.from(image, 'base64')
    const response = await query(blob)
    return new Response(JSON.stringify({message: response}))
}


async function query(blob: Buffer) {
	const data = blob;
	const response = await fetch(
		"https://api-inference.huggingface.co/models/microsoft/trocr-large-handwritten",
		{
			headers: { Authorization: "Bearer "+key },
			method: "POST",
			body: data,
		}
	);
	const result = await response.json();
	return result;
}
