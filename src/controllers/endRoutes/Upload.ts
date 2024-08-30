import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { StatusCodes } from "http-status-codes";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import * as yup from "yup";
import knex from "knex";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");

// const model = genAI.getGenerativeModel({
//     // Choose a Gemini model.
//     model: "gemini-1.5-pro",
// });

// const result = await model.generateContent([
//     {
//         inlineData: {
//             mimeType: "image/png",
//             data: image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
//         },
//     },
//     {
//         text: "Return the customer_code, measure_datetime and measture_type.",
//     },
// ]);

// Output the generated text to the console
// console.log(result.response.text());

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

        // Simulação da análise da imagem pela API Gemini AI Vision (substituir pela integração real)
        const measure_value = simulateGeminiAnalysis(image);
        const measure_type = determineMeasureType(measure_value);

        // Criando o registro no banco de dados
        const measure_time = new Date();
        const measure_uuid = uuidv4();

        await knex("records").insert({
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const simulateGeminiAnalysis = (image: string): number => {
    return Math.floor(Math.random() * 1000);
};

const determineMeasureType = (value: number): "WATER" | "GAS" => {
    return value > 500 ? "GAS" : "WATER";
};
