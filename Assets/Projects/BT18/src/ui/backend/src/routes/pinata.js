import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Upload file to Pinata
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const formData = new FormData();
    formData.append("file", req.file.buffer, req.file.originalname);

    const result = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      maxBodyLength: "Infinity",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET,
      },
    });

    return res.status(200).json({
      message: "File uploaded successfully",
      ipfsHash: result.data.IpfsHash,
    });
  } catch (err) {
    console.error("Error uploading to Pinata:", err.response?.data || err.message);
    res.status(500).json({
      message: "Failed to upload file to Pinata",
      error: err.response?.data || err.message,
    });
  }
});

// Upload JSON metadata to Pinata
router.post("/json", async (req, res) => {
  try {
    const metadata = req.body;
    if (!metadata) return res.status(400).json({ message: "Missing JSON body" });

    const result = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", metadata, {
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET,
      },
    });

    return res.status(200).json({
      message: "JSON uploaded successfully",
      ipfsHash: result.data.IpfsHash,
    });
  } catch (err) {
    console.error("Error uploading JSON to Pinata:", err.response?.data || err.message);
    res.status(500).json({
      message: "Failed to upload JSON to Pinata",
      error: err.response?.data || err.message,
    });
  }
});

export default router;
