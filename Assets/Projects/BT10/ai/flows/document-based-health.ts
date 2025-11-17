'use server';

/**
 * @fileOverview This flow analyzes a user-provided medical document to assess health risks.
 *
 * @exports `assessHealthFromDocument` - A function to trigger the document-based health assessment flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { assessHealthRisk } from './health-risk-assessment';
import { contextualizedPreventativeActions } from './contextualized-preventative-actions';
import { ExtractedHealthDataSchema, DocumentAssessmentInputSchema } from '@/lib/schemas';
import type { DocumentAssessmentInput, ContextualizedPreventativeActionsOutput } from '@/lib/types';


const extractionPrompt = ai.definePrompt({
    name: 'extractHealthDataFromDocument',
    input: { schema: DocumentAssessmentInputSchema },
    output: { schema: ExtractedHealthDataSchema },
    prompt: `You are an expert medical data extraction tool. Analyze the following medical document and extract the specified health metrics. If a metric is not present, make a reasonable inference or use a common default.

Document:
{{media url=documentDataUri}}

Extract the required fields to populate the health data schema.`
});


/**
 * The main flow for document-based health assessment.
 */
const documentBasedAssessmentFlow = ai.defineFlow(
  {
    name: 'documentBasedAssessmentFlow',
    inputSchema: DocumentAssessmentInputSchema,
    outputSchema: z.custom<ContextualizedPreventativeActionsOutput>(),
  },
  async (input) => {
    // Step 1: Extract structured data from the document
    const { output: extractedData } = await extractionPrompt(input);

    if (!extractedData) {
        throw new Error("Failed to extract health data from the document.");
    }

    // Step 2: Run the existing health risk assessment with the extracted data
    const initialAssessment = await assessHealthRisk(extractedData);

    // Step 3: Get contextualized results
    const healthDataString = `
- Age: ${extractedData.age}
- Gender: ${extractedData.gender}
- BMI: ${extractedData.bmi}
- Blood Pressure: ${extractedData.systolicBloodPressure}/${extractedData.diastolicBloodPressure} mmHg
- Cholesterol: ${extractedData.cholesterol} mg/dL
- Smoker: ${extractedData.smokingStatus ? 'Yes' : 'No'}
- Family History of Heart Disease: ${extractedData.familyHistoryOfHeartDisease ? 'Yes' : 'No'}
    `;

    const contextualizedResult = await contextualizedPreventativeActions({
        healthData: healthDataString.trim(),
        aiModelPrediction: initialAssessment.riskAssessment,
    });

    return contextualizedResult;
  }
);


/**
 * Assesses a user's health risks based on an uploaded document.
 * @param input - The user's medical document as a data URI.
 * @returns A promise that resolves to a HealthAssessmentResult object.
 */
export async function assessHealthFromDocument(input: DocumentAssessmentInput): Promise<ContextualizedPreventativeActionsOutput> {
  return documentBasedAssessmentFlow(input);
}
