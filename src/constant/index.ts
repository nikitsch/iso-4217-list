export const DB_NAME = process.env.DB_NAME || '';
export const COLL_ISO_COUNTRIES = process.env.COLL_ISO_COUNTRIES || '';
export const COLL_INACT_COUNTRIES = process.env.COLL_INACT_COUNTRIES || '';
export const COLL_INACT_CURRENCY = process.env.COLL_INACT_CURRENCY || '';

export const ERROR_MESSAGES = {
  FAILED_FETCH_COUNTRIES: 'Failed to fetch countries data',
  FAILED_FETCH_INACTIVE: 'Failed to fetch inactive data',
  FAILED_UPDATE_INACTIVE: 'Failed to update inactive data',
  TABLE_ACTION_VALUE_REQUIRED: 'Table, action, and value are required',
  TABLE_REQUIRED: 'Table is required',
  INVALID_ACTION: 'Invalid action',
  INVALID_TABLE: 'Invalid table',
  UNKNOWN_TABLE: 'Unknown table',
};

export const NO_DATA_TITLE = 'No data available :(';
