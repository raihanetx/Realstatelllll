import { GoogleGenAI, Type } from "@google/genai";
import type { Property } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const propertySchema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING, description: 'A unique identifier for the property, like a UUID.' },
    address: { type: Type.STRING, description: 'The street address of the property.' },
    city: { type: Type.STRING, description: 'The city where the property is located.' },
    state: { type: Type.STRING, description: 'The state or province.' },
    price: { type: Type.NUMBER, description: 'The listing price of the property as a number.' },
    bedrooms: { type: Type.INTEGER, description: 'The number of bedrooms.' },
    bathrooms: { type: Type.NUMBER, description: 'The number of bathrooms (can be a decimal like 2.5).' },
    sqft: { type: Type.INTEGER, description: 'The total square footage of the property.' },
    description: { type: Type.STRING, description: 'A compelling, one-paragraph description of the property.' },
    imageUrl: { type: Type.STRING, description: 'A placeholder image URL from `https://picsum.photos/800/600`' }
  },
  required: ['id', 'address', 'city', 'state', 'price', 'bedrooms', 'bathrooms', 'sqft', 'description', 'imageUrl']
};

export const generatePropertyListings = async (prompt: string): Promise<Property[]> => {
  try {
    const result = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a realistic list of 8 fictional real estate properties based on the following user query: "${prompt}".
      If the query is generic, like "featured properties", generate a diverse mix of modern homes in desirable, well-known locations (e.g., Miami, FL; Aspen, CO; Malibu, CA).
      For each property, provide all the required details. Ensure the address is believable but fictional. Generate a unique ID for each property. Use a different image from picsum.photos for each property.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: propertySchema
        }
      }
    });

    const jsonText = result.text.trim();
    const properties = JSON.parse(jsonText);
    
    // Add a random picsum url if one wasn't generated properly.
    return properties.map((p: Property) => ({
        ...p,
        imageUrl: `https://picsum.photos/seed/${p.id}/800/600`
    }));

  } catch (error) {
    console.error("Error generating property listings:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
};
