import { Request, Response } from "express";
import { Knex } from "../../database/knex";

export const listRecords = async (req: Request, res: Response) => {
    try {
        const records = await Knex("records").select("*");
        res.status(200).json(records);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
};

export const filterRecords = async (req: Request, res: Response) => {
    try {
        const { customer_code, measure_type, start_time, end_time } = req.query;

        const query = Knex("records").select("*");

        if (customer_code) {
            query.where("customer_code", customer_code);
        }

        if (measure_type) {
            query.where("measure_type", measure_type);
        }

        if (start_time && end_time) {
            query.whereBetween("measure_time", [
                new Date(start_time as string),
                new Date(end_time as string),
            ]);
        }

        const records = await query;
        res.status(200).json(records);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch records" });
    }
};
