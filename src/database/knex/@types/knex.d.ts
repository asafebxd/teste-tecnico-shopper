import { IRecords } from "../../models";

declare module "knex/types/tables" {
    interface Tables {
        records: IRecords;
    }
}
