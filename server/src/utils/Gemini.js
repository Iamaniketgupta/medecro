const fs = require('fs');
const { GoogleGenerativeAI } = require("@google/generative-ai");

class Gemini {
    
  static instance = new Gemini();

  
  constructor() {
    if (Gemini.instance) {
      throw new Error('Use Gemini.getInstance() to access the instance of this class');
    }
    this.name = 'Gemini';
  }

  static getInstance() {
    return Gemini.instance;
  }

  
  fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }

  
  async getGeminiTextOutput(prompt, imagePath = null, mimeType = null) {
    console.log("imagepath : " , imagePath)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    let result;
    if (imagePath && mimeType) {
        console.log("imagepath", imagePath);
      const imagePart = this.fileToGenerativePart(imagePath, mimeType);
      result = await model.generateContent([prompt, imagePart]);
      
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Failed to delete file ${imagePath}:`, err);
        } else {
          console.log(`File ${imagePath} deleted successfully.`);
        }
      });
    } else {
      result = await model.generateContent([prompt]);
    }

    return result.response.text();
  }
}


module.exports = Gemini;