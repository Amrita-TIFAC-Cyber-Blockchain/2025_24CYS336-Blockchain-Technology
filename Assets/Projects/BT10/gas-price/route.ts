
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.ETHERSCAN_API_KEY;



  try {
    const response = await fetch(
      `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${apiKey}`,
      {
        next: {
          revalidate: 30, // Revalidate every 30 seconds
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Etherscan API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== '1') {
      throw new Error(`Etherscan API error: ${data.message} - ${data.result}`);
    }

    return NextResponse.json(data.result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error('Failed to fetch gas prices from Etherscan:', errorMessage);
    // Fallback to mock data on error to prevent the component from breaking
    return NextResponse.json({
      SafeGasPrice: '10',
      ProposeGasPrice: '12',
      FastGasPrice: '15',
    });
  }
}
