import { Router } from "express";
import { endRoutesController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
    return res.send("Working Properly!");
});

router.post("/upload", endRoutesController.uploadImage);

router.get("/image/:id", (req, res) => {
    const image = Buffer.from(
        "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",
        "base64"
    );

    res.writeHead(200, {
        "content-type": "image/png",
        "content-length": image.length,
    });

    res.end(image);
});

// router.patch("/confirm", async (req: Request, res: Response) => {
//     try {
//         const { measure_uuid, confirmed_value } = req.body;

//         if (!measure_uuid || !confirmed_value) {
//             return res
//                 .status(StatusCodes.BAD_REQUEST)
//                 .json({ error: "INVALID_DATA" });
//         }

//         const userRead = false;
//         if (userRead) {
//             return res
//                 .status(StatusCodes.CONFLICT)
//                 .json({ error: "DOUBLE_REPORT" });
//         }

//         res.status(StatusCodes.ACCEPTED).json("OK");
//     } catch (error) {
//         console.error("Error during image processing:", error);
//         res.status(StatusCodes.BAD_GATEWAY).json({
//             error: "Internal Server Error",
//         });
//     }
// });

export { router };
