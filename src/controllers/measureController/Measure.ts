import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Knex } from "../../database/knex";

export const getMeasure = async (req: Request, res: Response) => {
    try {
        const { customer_code, measure_type, start_date, end_date } = req.query;

        let query = Knex("records").select("*");

        if (customer_code) {
            query = query.where("customer_code", customer_code as string);
        }

        if (measure_type) {
            query = query.where("measure_type", measure_type as string);
        }

        if (start_date && end_date) {
            query = query.whereBetween("measure_time", [
                new Date(start_date as string),
                new Date(end_date as string),
            ]);
        }

        const measures = await query;

        if (measures.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error_code: "MEASURED_NOT_FOUND",
                error_description: "No measure found that match filters",
            });
        }

        return res.status(StatusCodes.OK).json(measures);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erro ao buscar as medidas.",
        });
    }
};
