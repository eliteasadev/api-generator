import { openai } from '@ai-sdk/openai';
import { convertToCoreMessages, streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-3.5-turbo'),
    temperature: 0.75,
    maxTokens: 1000,
    frequencyPenalty: 1,
    system: 'Eres un programador experimentado en Nodejs. Responde a las preguntas de los usuarios',
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}