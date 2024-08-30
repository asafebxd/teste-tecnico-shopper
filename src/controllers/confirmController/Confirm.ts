import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Knex } from "../../database/knex";

const confirmSchema = yup.object().shape({
    measure_uuid: yup.string().required("Measure UUID required"),
    confirmed_value: yup.number().required("Confirmed value required"),
});

export const confirmMeasure = async (req: Request, res: Response) => {
    try {
        await confirmSchema.validate(req.body, { abortEarly: false });

        const { measure_uuid, confirmed_value } = req.body;

        const measure = await Knex("records").where({ measure_uuid }).first();

        if (!measure) {
            return res.status(StatusCodes.NOT_FOUND).json({
                error_code: "MEASURE_NOT_FOUND",
                error_description: "Measure could not be found",
            });
        }

        if (measure.has_confirmed) {
            return res.status(StatusCodes.CONFLICT).json({
                error_code: "CONFIRMATION_DUPLICATE",
                error_description: "Measure already confirmed",
            });
        }

        await Knex("records").where({ measure_uuid }).update({
            measure_value: confirmed_value,
            has_confirmed: true,
        });

        return res.status(StatusCodes.OK).json({ succes: true });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                erros: error.errors,
            });
        }

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error confirming measure",
        });
    }
};
