import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const router = express.Router();

const config = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAI(config);

router.route('/').post(async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await openai.images.generate({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      });
      console.log(response);
  
      if (response.data && response.data.length > 0 && response.data[0].b64_json) {
        const image = response.data[0].b64_json;
        res.status(200).json({ photo: image });
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });  

export default router;