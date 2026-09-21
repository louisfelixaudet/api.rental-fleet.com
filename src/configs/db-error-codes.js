export const DB_ERROR_CODES = Object.freeze({

  // ─── Connector Codes (err.code) ───────────────────────────────────────────

  POOL_TIMEOUT:         45028,                       // 45028 - couldn't acquire connection in time : ER_POOL_TIMEOUT
  QUERY_TIMEOUT:        'ER_TIMEOUT',                // 45010 - query exceeded queryTimeout
  CONN_CLOSED:          'ER_CONNECTION_ALREADY_CLOSED', // 45001 - used connection after .end()
  POOL_CLOSED:          'ER_POOL_ALREADY_CLOSED',    // 45005 - used pool after .end()
  SOCKET_CLOSED:        'ER_SOCKET_UNEXPECTED_CLOSE',// 45009 - connection dropped unexpectedly
  INITIAL_TIMEOUT:      'ER_INITIAL_TIMEOUT',        // 45012 - timed out during handshake

  // ─── Server errno (err.errno) ─────────────────────────────────────────────

  // Authentication & Access
  ACCESS_DENIED:        1045, // ER_ACCESS_DENIED_ERROR   - wrong user/password
  DB_ACCESS_DENIED:     1044, // ER_DBACCESS_DENIED_ERROR - no access to database
  BAD_DB:               1049, // ER_BAD_DB_ERROR          - database doesn't exist
  HOST_NOT_ALLOWED:     1130, // ER_HOST_NOT_PRIVILEGED   - host blocked

  // Query & Schema
  SYNTAX_ERROR:         1064, // ER_PARSE_ERROR           - SQL syntax error
  UNKNOWN_TABLE:        1146, // ER_NO_SUCH_TABLE         - table doesn't exist
  UNKNOWN_COLUMN:       1054, // ER_BAD_FIELD_ERROR       - column doesn't exist
  COLUMN_COUNT:         1136, // ER_WRONG_VALUE_COUNT     - column/value mismatch

  // Constraints
  DUPLICATE:            1062, // ER_DUP_ENTRY             - unique/primary key violation
  DATA_TOO_LONG:        1406, // ER_DATA_TOO_LONG         - value exceeds column length
  WRONG_VALUE:          1292, // ER_TRUNCATED_WRONG_VALUE - invalid value for column type
  FK_PARENT:            1451, // ER_ROW_IS_REFERENCED_2   - FK block on delete/update
  FK_CHILD:             1452, // ER_NO_REFERENCED_ROW_2   - FK ref doesn't exist on insert

  // Server State
  DEADLOCK:             1213, // ER_LOCK_DEADLOCK         - deadlock, safe to retry
  LOCK_TIMEOUT:         1205, // ER_LOCK_WAIT_TIMEOUT     - lock wait exceeded
  TOO_MANY_CONN:        1040, // ER_TOO_MANY_CONNECTIONS  - server connection limit
  SERVER_SHUTDOWN:      1053, // ER_SERVER_SHUTDOWN       - server going down

});