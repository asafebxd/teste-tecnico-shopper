import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Knex } from "../../database/knex";

export const getMeasure = async (req: Request, res: Response) => {
    try {
        const measures = await Knex("records").select("*");

        return res.status(StatusCodes.OK).json(measures);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Erro ao buscar as medidas.",
        });
    }
};
