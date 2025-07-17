export async function GET() {
  // const payload = await getPayload({ config });

  // You can use payload here to interact with your collections
  // For example: const users = await payload.find({ collection: 'users' })

  return Response.json({ message: 'Hello, World!' });
}
