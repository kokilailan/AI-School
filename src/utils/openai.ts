interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generateAIResponse = async (
  userMessage: string,
  lessonTitle: string,
  lessonContext: string
): Promise<string> => {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    return "I'm sorry, the AI service is not configured. Please check back later.";
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a friendly and helpful AI tutor for students learning about "${lessonTitle}". 
            Lesson context: ${lessonContext}
            
            Your role is to:
            - Explain concepts in simple, age-appropriate ways
            - Be encouraging and patient
            - Use examples and analogies
            - Ask questions to check understanding
            - Keep responses concise but thorough
            - Adapt to elementary/middle school level`
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response. Please try again.";
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    return "I'm having trouble connecting right now. Let me try a simpler explanation instead.";
  }
};
