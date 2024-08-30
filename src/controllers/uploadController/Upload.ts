import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { Knex } from "../../database/knex";
import { analyzeImage } from "../../services/geminiService";

const uploadSchema = yup.object().shape({
    image: yup.string().required("Image required"),
    customer_code: yup.string().required("Customer Code required"),
});

// Controller para upload da imagem
export const uploadImage = async (req: Request, res: Response) => {
    try {
        // Validação dos dados da requisição
        await uploadSchema.validate(req.body, { abortEarly: false });

        const { image, customer_code } = req.body;

        // const measure_value = await analyzeImage(image)
        // const measure_type = await analyzeImage(image)

        // const measure_time = await analyzeImage(image);
        // const measure_uuid = await analyzeImage(image);

        const measure_value = await analyzeImage(image);
        const measure_type = determineMeasureType(measure_value);

        const measure_time = new Date();
        const measure_uuid = uuidv4();

        await Knex("records").insert({
            image,
            customer_code,
            measure_time,
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
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error processing image",
        });
    }
};

// Funções simuladas

const determineMeasureType = (value: number): "WATER" | "GAS" => {
    return value > 500 ? "GAS" : "WATER";
};
