import data from './courses.json';

export async function GET() {
  return Response.json(data.courses[0]);
}
