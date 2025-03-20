import {
  COLL_INACT_COUNTRIES,
  COLL_INACT_CURRENCY,
  DB_NAME,
  ERROR_MESSAGES,
} from '~constant/index';
import {
  ActionEnum,
  IInactiveCountries,
  IInactiveCurrencies,
  TableEnum,
} from '~interface/index';
import clientPromise from '~lib/mongo';

export async function PATCH(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const { table, action, value } = await request.json();

    if (!table || !action || !value) {
      return new Response(
        JSON.stringify({ error: ERROR_MESSAGES.TABLE_ACTION_VALUE_REQUIRED }),
        { status: 400 }
      );
    }

    let collectionName;
    let updateKey: 'countries' | 'currencies';

    switch (table) {
      case TableEnum.COUNTRIES:
        collectionName = COLL_INACT_COUNTRIES;
        updateKey = 'countries';
        break;
      case TableEnum.CURRENCY:
        collectionName = COLL_INACT_CURRENCY;
        updateKey = 'currencies';
        break;
      default:
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.INVALID_TABLE }),
          { status: 400 }
        );
    }

    const collection = db.collection<IInactiveCountries | IInactiveCurrencies>(
      collectionName
    );

    if (action === ActionEnum.ADD) {
      await collection.updateOne(
        { _id: collectionName as 'inactiveCountries' | 'inactiveCurrencies' },
        { $addToSet: { [updateKey]: value } }
      );
    } else if (action === ActionEnum.REMOVE) {
      await collection.updateOne(
        { _id: collectionName as 'inactiveCountries' | 'inactiveCurrencies' },
        { $pull: { [updateKey]: value } }
      );
    } else {
      return new Response(
        JSON.stringify({ error: ERROR_MESSAGES.INVALID_ACTION }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(ERROR_MESSAGES.FAILED_UPDATE_INACTIVE, error);
    return new Response(
      JSON.stringify({ error: ERROR_MESSAGES.FAILED_UPDATE_INACTIVE }),
      { status: 500 }
    );
  }
}
