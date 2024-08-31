/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Knex } from "../../database/knex";

export const getMeasure = async (req: Request, res: Response) => {
    try {
        const { measure_type } = req.query;
        const { customer_code } = req.params;

        if (
            !measure_type ||
            !["WATER", "GAS"].includes(measure_type as string)
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error_code: "INVALID_TYPE",
                error_description: "Measure type not permitted",
            });
        }

        const measures = await Knex("records")
            .select(
                "measure_uuid",
                "measure_datetime",
                "measure_type",
                "has_confirmed"
            )
            .where("customer_code", customer_code)
            .where("measure_type", measure_type);

        if (measures.length === 0) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error_code: "MEASURED_NOT_FOUND",
                error_description: "No measure found that match filters",
            });
        }

        return res.status(StatusCodes.OK).json({
            customer_code,
            measures: measures.map((measure) => ({
                ...measure,
                image_url: `/images/${measure.measure_uuid}`,
            })),
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error finding measure.",
        });
    }
};
