import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");

const model = genAI.getGenerativeModel({
    // Choose a Gemini model.
    model: "gemini-pro-vision",
    generationConfig: {
        temperature: 0.4,
        topP: 1,
        topK: 32,
        maxOutputTokens: 4096,
    },
});

export const analyzeImage = async (imageBase64: string): Promise<number> => {
    try {
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "image/jpeg",
                                data: imageBase64.replace(
                                    /^data:image\/(png|jpg|jpeg|webp);base64,/,
                                    ""
                                ),
                            },
                        },
                        {
                            text: "Retorne o valor do consumo atual. Retorne apenas o valor que esta na imagem, nao retorne nenhuma instrucao alem do valor numerico",
                        },
                    ],
                },
            ],
        });

        const response = await result.response;
        const measureValue = parseFloat(response.text());
        return measureValue;
    } catch (error) {
        console.error("Error integraring the google", JSON.stringify(error));
        return 0;
    }
};
