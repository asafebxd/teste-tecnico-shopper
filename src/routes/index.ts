import { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const router = Router();

const fileManager = new GoogleAIFileManager(process.env.API_KEY ?? "");

const baseValidation64 = (str: string): boolean => {
    const regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
    return regex.test(str);
};

router.post("/upload", async (req: Request, res: Response) => {
    try {
        const { image, customer_code, measure_datetime, measure_type } =
            req.body;

        if (!image || !customer_code || !measure_datetime || !measure_type) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "INVALID_DATA" });
        }

        if (!baseValidation64(image)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "INVALID_DATA" });
        }

        const userRead = false;
        if (userRead) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({ error: "DOUBLE_REPORT" });
        }

        const uploadResponse = await fileManager.uploadFile(image, {
            mimeType: "image/jpeg",
            displayName: "Uploaded Meter Reading",
        });

        const extractedValue = "12345";
        const measureUuid = "some-unique-uuid";

        res.status(StatusCodes.ACCEPTED).json({
            image_url: uploadResponse.file.uri,
            measure_value: extractedValue,
            measure_uuid: measureUuid,
        });
    } catch (error) {
        console.error("Error during image processing:", error);
        res.status(StatusCodes.BAD_GATEWAY).json({
            error: "Internal Server Error",
        });
    }
});

router.patch("/confirm", async (req: Request, res: Response) => {
    try {
        const { measure_uuid, confirmed_value } = req.body;

        if (!measure_uuid || !confirmed_value) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "INVALID_DATA" });
        }

        const userRead = false;
        if (userRead) {
            return res
                .status(StatusCodes.CONFLICT)
                .json({ error: "DOUBLE_REPORT" });
        }

        res.status(StatusCodes.ACCEPTED).json("OK");
    } catch (error) {
        console.error("Error during image processing:", error);
        res.status(StatusCodes.BAD_GATEWAY).json({
            error: "Internal Server Error",
        });
    }
});

export { router };
