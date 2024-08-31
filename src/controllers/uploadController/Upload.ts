import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Knex } from "../../database/knex";
import { analyzeImage } from "../../services/geminiService";

const uploadSchema = yup.object().shape({
    image: yup.string().required("Image required"),
    customer_code: yup.string().required("Customer Code required"),
    measure_datetime: yup.date().required("Date time required"),
    measure_type: yup
        .mixed()
        .oneOf(["WATER", "GAS"])
        .required("Measure type required"),
});

export const uploadImage = async (req: Request, res: Response) => {
    try {
        // Validação dos dados da requisição
        await uploadSchema.validate(req.body, { abortEarly: false });

        const { image, customer_code, measure_datetime, measure_type } =
            req.body;

        const measure_value = await analyzeImage(image);
        const measure_uuid = uuidv4();

        await Knex("records").insert({
            image,
            customer_code,
            measure_datetime,
            measure_type,
            measure_value,
            measure_uuid,
        });

        return res.status(StatusCodes.CREATED).json({
            message: "Measure registred succesfully!",
            measure_uuid,
        });
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors: error.errors,
            });
        }
        console.log(error);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error processing image",
        });
    }
};
