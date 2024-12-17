import fs from 'node:fs/promises';

// import.meta.url: complete path to file. Relative to database.js file
const databasePath = new URL('../db.json', import.meta.url);

// { "users": [...] }
export class Database {

    // # makes the property database private
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
            // use JSON.parse because used JSON.stringfy to write the data
            this.#database = JSON.parse(data);
        }).catch(() => {
            this.#persist();
        })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    select(table) {
        // ?? - if doesn't exist a key inside database,
        // return an empty array
        const data = this.#database[table] ?? [];

        return data;
    }

    insert(table, data) {
        // if already there is an array inside table
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data);
        } else {
            // creates a new array (key) with the item inside
            this.#database[table] = [data];
        }

        this.#persist();

        return data;
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) { // index not found
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
        if (rowIndex > -1) { // index not found
            this.#database[table][rowIndex] = { id, ...data} ;
            this.#persist();
        }
    }
}