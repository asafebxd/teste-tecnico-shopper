import { Knex } from "knex";
import path from "path";

export const development: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, "..", "..", "..", "database.sqlite3"),
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations"),
    },
};

export const test: Knex.Config = {
    ...development,
    connection: ":memory:",
};

export const production: Knex.Config = {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname, "..", "..", "..", "database.sqlite3"),
    },
    migrations: {
        directory: path.resolve(__dirname, "..", "migrations"),
    },
};
