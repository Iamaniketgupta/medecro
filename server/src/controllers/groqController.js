import { check, validationResult } from 'express-validator';
import Groq from 'groq-sdk';

const groqApiKey = "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";
if (!groqApiKey) {
  console.error('Error: Missing GROQ_API_KEY in .env file');
  process.exit(1);
}
const groq = new Groq({ apiKey: groqApiKey });

async function getGroqData(prompt) {
  try {
    const result = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama3-8b-8192',
    });
    return result.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error calling Groq AI API:', error);
    throw error;
  }
}

export const groqMedBot = [
  check('prompt').not().isEmpty().withMessage('Nothing in Prompt'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, message: errors.array()[0] });
    }
    let { prompt } = req.body;
    prompt = `take this medical query for me and please act as a medbot for my website keep answers to the point, humanly and as brief as possible without any bold text or formatting just simple text: ${prompt}`;
    try {
      const result = await getGroqData(prompt);
      return res.status(200).send(result);
    } catch (error) {
      console.error('Error calling Groq AI API:', error);
      return res.status(500).json({ status: false, message: 'An internal server error occurred.' });
    }
  }
];

export const groqMedSummarise = [
  check('prompt').not().isEmpty().withMessage('Nothing in Prompt'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: false, message: errors.array()[0] });
    }
    let { prompt } = req.body;
    prompt = `
      Please summarize the following medical report in the simplest way possible for a patient with no medical knowledge. Ensure the summary is clear, concise, and free of any medical jargon, bold text, or formatting. Follow this format:
    1. **Title of Report**: Clearly state the type of medical report (e.g., Blood Report, Kidney Report).
    Also The Person to whome the report belong and the doctor or hospital or lab who have written the report if known optional
    2. **Summary of Key Findings**: Provide a straightforward explanation of the main findings from the report. Avoid using any complex medical terms.
    3. **Detailed Breakdown**:
       - **Finding 1**: Explain this finding in simple terms.
       - **Finding 2**: Provide a plain-language explanation for this finding.
       - Continue this format for each major finding or section.
    4. **Recommendations**: Clearly state any recommendations or next steps. Use simple language to ensure the patient understands what actions they might need to take.
    5. **Explanation of Terms**: If the report includes any medical terms or units, explain each term in the simplest terms possible. For example, if the report mentions “cholesterol levels,” explain what cholesterol is and why the levels matter.
    Provide this summary in plain text: ${prompt}
    `;
    try {
      const result = await getGroqData(prompt);
      return res.status(200).json({ status: true, summary: result });
    } catch (error) {
      console.error('Error calling Groq AI API:', error);
      return res.status(500).json({ status: false, message: 'An internal server error occurred.' });
    }
  }
];
