import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure:     true,
});

const app = express();
app.use(cors({ origin: ["http://localhost:5173"], credentials: false }));
app.get("/api/sign", (req, res) => {
  try {
    const timestamp = Math.floor(Date.now() / 1000);
    const folder = "chatapp/avatars";
    const eager = "c_fill,g_auto,w_300,h_300,q_auto:good,f_auto/r_max";
    const paramsToSign = {
      timestamp,
      folder,
      eager,
      
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    );

    return res.json({
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      timestamp,
      folder,
      eager,
      signature,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create signature" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Cloudinary signer listening on http://localhost:${port}`)
);
