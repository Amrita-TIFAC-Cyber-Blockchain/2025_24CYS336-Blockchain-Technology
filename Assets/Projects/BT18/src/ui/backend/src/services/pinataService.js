import axios from 'axios';
import FormData from 'form-data';

const PINATA_BASE = process.env.PINATA_BASE_URL || 'https://api.pinata.cloud/pinning';
const PINATA_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET = process.env.PINATA_SECRET;

export async function pinFileToIPFS(buffer, filename) {
  const form = new FormData();
  form.append('file', buffer, { filename });

  const res = await axios.post(`${PINATA_BASE}/pinFileToIPFS`, form, {
    maxContentLength: Infinity,
    maxBodyLength: Infinity,
    headers: {
      ...form.getHeaders(),
      pinata_api_key: PINATA_KEY,
      pinata_secret_api_key: PINATA_SECRET
    }
  });
  return res.data;
}

export async function pinJSONToIPFS(json) {
  const res = await axios.post(`${PINATA_BASE}/pinJSONToIPFS`, json, {
    headers: {
      'Content-Type': 'application/json',
      pinata_api_key: PINATA_KEY,
      pinata_secret_api_key: PINATA_SECRET
    }
  });
  return res.data;
}