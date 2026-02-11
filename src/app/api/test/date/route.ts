export async function GET() {
  return Response.json({
    currentDateTime: new Date().toISOString(),
  });
}
