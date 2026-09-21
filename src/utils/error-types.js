/* Custom error types */

const ErrorTypes = {

    // Database

    DatabaseError : class extends Error {
        constructor(msg) { super(msg); this.name = 'DatabaseError'; }
    },

    DuplicateEntryError : class extends Error {
        constructor(msg) { super(msg); this.name = 'DuplicateEntryError'; }
    },

}

export default ErrorTypes;