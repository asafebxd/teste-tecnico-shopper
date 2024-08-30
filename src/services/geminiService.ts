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
                text: `
                Extract the following details from this meter image:
                - image_link: The link to the uploaded image
                - customer_code: The code of the customer
                - measure_time: The time of the measurement
                - measure_type: The type of the measurement (WATER or GAS)
                - measure_value: The numeric value of the measurement
                - measure_uuid: A unique identifier for the measurement
                `,
            },
        ]);

        //Output the generated text to the console
        console.log(result.response.text());

        const measureValue = parseFloat(result.response.text());
        return measureValue;

        // const parseResponse = (responseText: string) => {
        //     const lines = responseText.split('\n').map(line => line.trim());
        //     const extractedValues = {
        //       image_link: lines.find(line => line.startsWith('image_link:'))?.split(': ')[1] || '',
        //       customer_code: lines.find(line => line.startsWith('customer_code:'))?.split(': ')[1] || '',
        //       measure_time: lines.find(line => line.startsWith('measure_time:'))?.split(': ')[1] || '',
        //       measure_type: lines.find(line => line.startsWith('measure_type:'))?.split(': ')[1] || '',
        //       measure_value: parseFloat(lines.find(line => line.startsWith('measure_value:'))?.split(': ')[1] || '0'),
        //       measure_uuid: lines.find(line => line.startsWith('measure_uuid:'))?.split(': ')[1] || ''
        //     };

        //     ;
        //   };
    } catch (error) {
        console.error("Error integraring the google", error);
        throw new Error("Error durring image process");
    }
};
