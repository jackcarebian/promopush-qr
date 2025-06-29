import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// Explicitly use the GOOGLE_API_KEY from environment variables.
// The googleAI() plugin does this automatically, but being explicit
// makes it clearer that a single key is used for all AI operations.
export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GOOGLE_API_KEY})],
  model: 'googleai/gemini-2.0-flash',
});
