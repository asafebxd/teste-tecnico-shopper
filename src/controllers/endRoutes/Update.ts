import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import * as yup from "yup";

// const genAI = new GoogleGenerativeAI(process.env.API_KEY ?? "");

// const model = genAI.getGenerativeModel({
//     // Choose a Gemini model.
//     model: "gemini-1.5-pro",
// });

interface IUpload {
    image: string;
    customer_code: string;
    meaure_datetime: Date;
    measure_type: string;
}

// const baseValidation64 = (str: string): boolean => {
//     const regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
//     return regex.test(str);
// };

const bodyValidation: yup.Schema<IUpload> = yup.object().shape({
    image: yup.string().required(),
    customer_code: yup.string().required(),
    meaure_datetime: yup.date().required(),
    measure_type: yup.string().required(),
});

export const uploadBodyValidator: RequestHandler = async (req, res, next) => {
    try {
        await bodyValidation.validate(req.body, { abortEarly: false });
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const errors: Record<string, string> = {};
        yupError.inner.forEach((error) => {
            if (!error.path) return;

            errors[error.path] = error.message;
        });

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors,
        });
    }
    return next();
};

export const upload = async (req: Request, res: Response) => {
    const image = req.body.image;

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

    const extractedValue = "12345";
    const measureUuid = "some-unique-uuid";

    res.status(StatusCodes.ACCEPTED).json({
        image_url: image,
        measure_value: extractedValue,
        measure_uuid: measureUuid,
    });

    return res.send(req.body);
};
