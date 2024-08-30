import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const model = genAI.getGenerativeModel({
    // Choose a Gemini model.
    model: "gemini-1.5-pro",
});

export const analyzeImage = async (imageBase64: string) => {
    try {
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: "image/png",
                    data: imageBase64.replace(
                        /^data:image\/(png|jpg|jpeg);base64,/,
                        ""
                    ),
                },
            },
            {
                text: "return values that correspond as  customer_code,  measure_time, measure_type, measure_value, measure_uuid,",
            },
        ]);

        //Output the generated text to the console
        console.log(result.response.text());

        const measureValue = parseFloat(result.response.text());
        return measureValue;
    } catch (error) {
        console.error("Erro ao integrar com a API do Google Gemini:", error);
        throw new Error("Erro ao processar a imagem.");
    }
};
