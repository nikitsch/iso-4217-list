import clientPromise from '~lib/mongo';

const DB_NAME = process.env.DB_NAME || '';
const COLL_ISO_COUNTRIES = process.env.COLL_ISO_COUNTRIES || '';
const ERROR_MESSAGE = 'Failed to fetch ISO Countries data';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const isoCountries = await db
      .collection(COLL_ISO_COUNTRIES)
      .find({})
      .toArray();

    return new Response(JSON.stringify({ isoCountries }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(ERROR_MESSAGE, error);

    return new Response(JSON.stringify({ error: ERROR_MESSAGE }), {
      status: 500,
    });
  }
}
