'use server';

/**
 * @fileOverview Provides a health risk assessment based on user-provided health data.
 *
 * @remarks
 * This flow accepts user health data as input, utilizes an LLM with tool use to analyze the data
 * and provide a risk assessment, and suggests preventative actions based on the identified risk factors.
 *
 * @exports `assessHealthRisk` - A function to trigger the health risk assessment flow.
 */

import {ai} from '@/ai/genkit';
import type { HealthRiskAssessmentInput, HealthRiskAssessmentOutput } from '@/lib/types';
import { HealthRiskAssessmentInputSchema, HealthRiskAssessmentOutputSchema } from '@/lib/schemas';


/**
 * Tool to evaluate a patients health risks, given patient history
 */
const assessHealthRiskTool = ai.defineTool(
  {
    name: 'assessHealthRiskTool',
    description: 'Assesses the health risks of a user based on their health data, providing an overall risk assessment and suggesting preventative actions.',
    inputSchema: HealthRiskAssessmentInputSchema,
    outputSchema: HealthRiskAssessmentOutputSchema,
  },
  async (input) => {
    return assessHealthRiskFlow(input);
  }
);


const healthRiskAssessmentPrompt = ai.definePrompt({
  name: 'healthRiskAssessmentPrompt',
  prompt: `You are an AI health assistant that can assess the health risks of a user based on their health data.

  Given the following health data:
  - Age: {{{age}}}
  - Gender: {{{gender}}}
  - BMI: {{{bmi}}}
  - Systolic Blood Pressure: {{{systolicBloodPressure}}}
  - Diastolic Blood Pressure: {{{diastolicBloodPressure}}}
  - Cholesterol: {{{cholesterol}}}
  - Smoking Status: {{{smokingStatus}}}
  - Family History of Heart Disease: {{{familyHistoryOfHeartDisease}}}

  Assess the user's overall health risks, and then suggest preventative actions the user can take to mitigate these risks.
  Ensure the suggested actions are clear, actionable and appropriate for the individual.
  Return the risk assessment and suggested actions in the following format:
  \nRisk Assessment: <overall risk assessment>\n\nSuggested Actions: <preventative actions>`,
  input: {schema: HealthRiskAssessmentInputSchema},
  output: {schema: HealthRiskAssessmentOutputSchema},
});


const assessHealthRiskFlow = ai.defineFlow(
  {
    name: 'assessHealthRiskFlow',
    inputSchema: HealthRiskAssessmentInputSchema,
    outputSchema: HealthRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await healthRiskAssessmentPrompt(input);
    return output!;
  }
);

/**
 * Assesses a user's health risks based on input data and returns a risk assessment and suggested actions.
 * @param input - The user's health data.
 * @returns A promise that resolves to a HealthRiskAssessmentOutput object containing the risk assessment and suggested actions.
 */
export async function assessHealthRisk(input: HealthRiskAssessmentInput): Promise<HealthRiskAssessmentOutput> {
  return assessHealthRiskFlow(input);
}
