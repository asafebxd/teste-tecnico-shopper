"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes");
const server_1 = require("@google/generative-ai/server");
const router = (0, express_1.Router)();
exports.router = router;
const fileManager = new server_1.GoogleAIFileManager((_a = process.env.API_KEY) !== null && _a !== void 0 ? _a : "");
const baseValidation64 = (str) => {
    const regex = /^(?:[A-Z0-9+/]{4})*(?:[A-Z0-9+/]{2}==|[A-Z0-9+/]{3}=)?$/i;
    return regex.test(str);
};
router.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { image, customer_code, measure_datetime, measure_type } = req.body;
        if (!image || !customer_code || !measure_datetime || !measure_type) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: "INVALID_DATA" });
        }
        if (!baseValidation64(image)) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ error: "INVALID_DATA" });
        }
        const userRead = false;
        if (userRead) {
            return res
                .status(http_status_codes_1.StatusCodes.CONFLICT)
                .json({ error: "DOUBLE_REPORT" });
        }
        const uploadResponse = yield fileManager.uploadFile(image, {
            mimeType: "image/jpeg",
            displayName: "Uploaded Meter Reading",
        });
        const extractedValue = "12345";
        const measureUuid = "some-unique-uuid";
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({
            image_url: uploadResponse.file.uri,
            measure_value: extractedValue,
            measure_uuid: measureUuid,
        });
    }
    catch (error) {
        console.error("Error during image processing:", error);
        res.status(http_status_codes_1.StatusCodes.BAD_GATEWAY).json({
            error: "Internal Server Error",
        });
    }
}));
