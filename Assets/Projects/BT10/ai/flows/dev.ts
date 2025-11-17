'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/contextualized-preventative-actions.ts';
import '@/ai/flows/health-risk-assessment.ts';
import '@/ai/flows/document-based-health-assessment.ts';
import '@/ai/flows/predict-gas-price.ts';
