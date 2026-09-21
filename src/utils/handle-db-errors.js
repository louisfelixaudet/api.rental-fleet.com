import ErrorTypes from './error-types.js';
import { DB_ERROR_CODES } from '#configs';
export function handleDBError(err) {

  switch (err.errno) {

    // DB Server problem
    case DB_ERROR_CODES.POOL_TIMEOUT:          throw new ErrorTypes.DatabaseError();

    // POST error
    case DB_ERROR_CODES.DUPLICATE:             throw new ErrorTypes.DuplicateEntryError();    
    
  }

  switch (err.code) {
    
  }

  if (err.fatal) throw new ErrorTypes.DatabaseError();

  throw err; // unexpected — let it bubble up
}