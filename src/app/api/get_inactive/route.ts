import {
  COLL_INACT_COUNTRIES,
  COLL_INACT_CURRENCY,
  DB_NAME,
  ERROR_MESSAGES,
} from '~constant/index';
import {
  IInactiveCountries,
  IInactiveCurrencies,
  TableEnum,
} from '~interface/index';
import clientPromise from '~lib/mongo';

export async function GET(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const { searchParams } = new URL(request.url);
    const table = searchParams.get('table') as TableEnum;

    if (!table) {
      return new Response(
        JSON.stringify({ error: ERROR_MESSAGES.TABLE_REQUIRED }),
        { status: 400 }
      );
    }

    if (table === TableEnum.COUNTRIES) {
      const inactiveCountries = await db
        .collection<IInactiveCountries>(COLL_INACT_COUNTRIES)
        .findOne({ _id: 'inactiveCountries' });

      return new Response(
        JSON.stringify({ inactiveCountries: inactiveCountries?.countries }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (table === TableEnum.CURRENCY) {
      const inactiveCurrencies = await db
        .collection<IInactiveCurrencies>(COLL_INACT_CURRENCY)
        .findOne({ _id: 'inactiveCurrencies' });

      return new Response(
        JSON.stringify({ inactiveCurrencies: inactiveCurrencies?.currencies }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: ERROR_MESSAGES.UNKNOWN_TABLE }),
      { status: 400 }
    );
  } catch (error) {
    console.error(ERROR_MESSAGES.FAILED_FETCH_INACTIVE, error);

    return new Response(
      JSON.stringify({ error: ERROR_MESSAGES.FAILED_FETCH_INACTIVE }),
      { status: 500 }
    );
  }
}
