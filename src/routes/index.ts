import { Router } from "express";
import {
    confirmController,
    measureController,
    uploadController,
    imagesController,
} from "../controllers";

const routes = Router();

routes.get("/", (_, res) => {
    return res.send("Working Properly!");
});

routes.post("/upload", uploadController.uploadImage);
routes.patch("/confirm", confirmController.confirmMeasure);
routes.get("/:customer_code/list", measureController.getMeasure);
routes.get("/images/:measure_uuid", imagesController.getImages);

export { routes };
