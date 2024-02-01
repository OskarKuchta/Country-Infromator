import express from "express";
import cors from "cors";
import axios from "axios";
import serverless from "serverless-http";
const app = express();
const router = express.Router();

router.use(cors({
    origin: "*"
}));

router.get("/getInfo", async (req, res) => {
    try {
        const url = 'https://restcountries.com/v3.1/all';
        const token = "515|HjL9hXRXZ2glAN81LzlvsN0qJWqeXysN3sQXRG6s";
        const headers = {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-store',
            'Expires': new Date(0).toUTCString(),
            'Pragma': 'no-cache',
        };
        res.set({
            'Cache-Control': 'no-store',
            'Expires': new Date(0).toUTCString(),
            'Pragma': 'no-cache',
        });
        const response = await axios.get(url, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "An error occurred while fetching data from the restcountries API.",
        });
    }
});

app.use('/.netlify/functions/server', router);
export const handler = serverless(app);