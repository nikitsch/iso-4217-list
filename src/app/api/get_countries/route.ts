import { COLL_ISO_COUNTRIES, DB_NAME, ERROR_MESSAGES } from '~constant/index';
import clientPromise from '~lib/mongo';

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
    console.error(ERROR_MESSAGES.FAILED_FETCH_COUNTRIES, error);

    return new Response(
      JSON.stringify({ error: ERROR_MESSAGES.FAILED_FETCH_COUNTRIES }),
      {
        status: 500,
      }
    );
  }
}
