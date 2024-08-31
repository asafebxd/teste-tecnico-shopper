/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Knex } from "../../database";

const getImages = async (req: Request, res: Response) => {
    try {
        const imageResult = await Knex("records")
            .select("image")
            .where("measure_uuid", req.params.measure_uuid)
            .first();

        res.writeHead(200, {
            "content-type": "image/png",
            "content-length": imageResult?.image.length,
        });

        res.end(imageResult?.image);
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: "Error finding measure.",
        });
    }
};

export { getImages };
