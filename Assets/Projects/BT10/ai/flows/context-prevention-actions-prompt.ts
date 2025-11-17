'use server';

/**
 * @fileOverview This flow takes user health data and provides a risk assessment using a pre-trained AI model, with LLM reasoning employed to contextualize risk factors as a tool for suggesting preventative actions.
 *
 * @fileContextualizedPreventativeActions - A function that handles the health risk assessment process.
 * @fileContextualizedPreventativeActionsInput - The input type for the healthRiskAssessment function.
 * @fileContextualizedPreventativeActionsOutput - The return type for the healthRiskAssessment function.
 */

import {ai} from '@/ai/genkit';
import type { ContextualizedPreventativeActionsInput, ContextualizedPreventativeActionsOutput } from '@/lib/types';
import { ContextualizedPreventativeActionsInputSchema, ContextualizedPreventativeActionsOutputSchema } from '@/lib/schemas';


export async function contextualizedPreventativeActions(input: ContextualizedPreventativeActionsInput): Promise<ContextualizedPreventativeActionsOutput> {
  return contextualizedPreventativeActionsFlow(input);
}

const contextualizedPreventativeActionsPrompt = ai.definePrompt({
  name: 'contextualizedPreventativeActionsPrompt',
  input: {schema: ContextualizedPreventativeActionsInputSchema},
  output: {schema: ContextualizedPreventativeActionsOutputSchema},
  prompt: `You are an AI-powered health assistant that analyzes user health data and AI model predictions to provide a comprehensive risk assessment and suggest preventative actions.

  Analyze the following user health data:
  {{healthData}}

  Based on the AI model prediction:
  {{aiModelPrediction}}

  Provide a risk assessment, identify risk factors with clear explanations, and suggest preventative actions tailored to the identified risk factors.

  Ensure the risk assessment and preventative actions are easy to understand and actionable for the user.

  Output the risk assessment, risk factors, and preventative actions in a structured format.

  Here's an example of a great, structured output:
  Risk Assessment: Based on your provided health data and the AI model's prediction, you are at moderate risk of developing cardiovascular disease.

  Risk Factors:
  - High blood pressure: Your blood pressure is consistently above the normal range, increasing your risk of heart attack and stroke.
  - Elevated cholesterol levels: Your cholesterol levels are higher than recommended, contributing to the buildup of plaque in your arteries.
  - Family history: You have a family history of heart disease, which increases your genetic predisposition to the condition.

  Preventative Actions:
  - Lower blood pressure: Adopt a healthy lifestyle by reducing sodium intake, exercising regularly, and managing stress.
  - Reduce cholesterol levels: Follow a heart-healthy diet low in saturated and trans fats, and consider taking cholesterol-lowering medication if recommended by your healthcare provider.
  - Regular check-ups: Schedule regular check-ups with your doctor to monitor your blood pressure, cholesterol levels, and overall cardiovascular health.
`,
});

const contextualizedPreventativeActionsFlow = ai.defineFlow(
  {
    name: 'contextualizedPreventativeActionsFlow',
    inputSchema: ContextualizedPreventativeActionsInputSchema,
    outputSchema: ContextualizedPreventativeActionsOutputSchema,
  },
  async input => {
    const {output} = await contextualizedPreventativeActionsPrompt(input);
    return output!;
  }
);
