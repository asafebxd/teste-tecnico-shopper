import { knex } from "knex";
import { development, production, test } from "./Environment";

const getEnvironment = () => {
    switch (process.env.NODE_ENV) {
        case "production":
            return production;
        case "test":
            return test;
        case "dev":
            return development;

        default:
            throw new Error(
                "NODE_ENV must have on of these values (production, test, development)"
            );
    }
};

export const Knex = knex(getEnvironment());
