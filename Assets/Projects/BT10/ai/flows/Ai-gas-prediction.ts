'use server';

/**
 * @fileOverview A Genkit flow to predict the next block's gas price using Gemini.
 */

import { ai } from '@/ai/genkit';
import { PredictGasPriceInputSchema, PredictGasPriceOutputSchema } from '@/lib/schemas';
import type { PredictGasPriceInput, PredictGasPriceOutput } from '@/lib/types';


const predictGasPricePrompt = ai.definePrompt({
  name: 'predictGasPricePrompt',
  input: { schema: PredictGasPriceInputSchema },
  output: { schema: PredictGasPriceOutputSchema },
  prompt: `You are a financial analyst specializing in Ethereum gas price prediction.
    Analyze the current gas prices from different sources and predict the most likely gas price in Gwei for the very next block.
    Provide only a single numerical value for the predicted price.

    Current Etherscan Prices (Gwei):
    - Safe: {{{etherscan.SafeGasPrice}}}
    - Standard: {{{etherscan.ProposeGasPrice}}}
    - Fast: {{{etherscan.FastGasPrice}}}

    Current Infura RPC Price (Gwei): {{{infura.gasPrice}}}

    Based on this data, what is your prediction for the next block's gas price in Gwei?
    `,
});

const predictGasPriceFlow = ai.defineFlow(
  {
    name: 'predictGasPriceFlow',
    inputSchema: PredictGasPriceInputSchema,
    outputSchema: PredictGasPriceOutputSchema,
  },
  async (input) => {
    const { output } = await predictGasPricePrompt(input);
    return output!;
  }
);

export async function predictGasPrice(
  input: PredictGasPriceInput
): Promise<PredictGasPriceOutput> {
  return predictGasPriceFlow(input);
}
