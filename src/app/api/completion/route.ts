import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { prompt, methods }: { prompt: string; methods: string[] } =
    await req.json();

  const config = `You will be given a Prisma schema and will respond with code for a rest api for the endpoints to interact with the schema.
      The Prisma schema will be provided in the following format:
      type User {
        id: ID!
        name: String!
        email: String!
        password: String!
      }
      The endpoints you must create are: ${
        methods.length > 0 ? methods.join(", ") : "GET, POST, PUT, DELETE"
      }
      IMPORTANT: You must respond with code that can be copied and pasted into a schema.route.ts file. Import the router from express this way: import { Router } from "express", and export the router. Use EcmaScript modules. Don't generate markdown`;

  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    temperature: 0.75,
    maxTokens: 1000,
    frequencyPenalty: 1,
    messages: [
      {
        role: "system",
        content: config,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return result.toDataStreamResponse();
}
