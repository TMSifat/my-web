import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';


const SYSTEM_PROMPT = `You are Crunch Bot, the energetic and friendly AI assistant for CrunchBite Studio, a premium burger joint. 
Your personality is enthusiastic, helpful, and you love talking about delicious food, especially burgers.
Keep your answers concise, engaging, and to the point.
Here is some information about CrunchBite you should know:
- Our signature dishes are the Double Decker Beast and Spicy Chicken Sandwich.
- We have a BOGOF (Buy One Get One Free) offer on Mondays and Fridays.
- The Family Feast XL is currently on a special discount.
- Our average delivery time is 25-35 minutes within the city circle.
- We pride ourselves on handcrafted burgers, fresh ingredients, and flavors that tell a story.
If a user asks something completely unrelated to food or the restaurant, politely steer the conversation back to CrunchBite or let them know you mainly answer questions about the restaurant.`;

export async function POST(request: Request) {
  const getFallbackResponse = async (message: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate thinking time
    
    const input = message.toLowerCase();
    let botResponse = "That sounds interesting! Let me get a human specialist to help you with that, or you can check our contact section. (Note: Add a valid GEMINI_API_KEY to your .env to unlock full AI powers!)";
    
    if (input.includes('menu') || input.includes('food') || input.includes('burger')) {
      botResponse = "You absolutely must try our signature Double Decker Beast or the Spicy Chicken Sandwich! You can find them in the Menu section below.";
    } else if (input.includes('offer') || input.includes('deal') || input.includes('bogof') || input.includes('discount')) {
      botResponse = "We have an amazing BOGOF offer on Mondays and Fridays! Also, don't miss out on the Family Feast XL in our Special Offers section.";
    } else if (input.includes('delivery') || input.includes('time') || input.includes('long')) {
      botResponse = "Our average delivery time is 25-35 minutes within the city circle. Fast and hot, straight to your door!";
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      botResponse = "Hello! I am Crunch Bot. Ready to experience the ultimate crunch? What can I get for you?";
    }
    return botResponse;
  };

  try {
    const { message, history } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

    if (genAI) {
      try {
        // Use Gemini API if key is available
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        
        const chat = model.startChat({
          history: history.map((msg: { sender: string; text: string }) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
          })),
          systemInstruction: {
            role: 'system',
            parts: [{ text: SYSTEM_PROMPT }]
          }
        });

        const result = await chat.sendMessage(message);
        const responseText = result.response.text();

        return NextResponse.json({ response: responseText });
      } catch (geminiError) {
        console.error('Gemini API Error, falling back to mock:', geminiError);
        const fallbackResponse = await getFallbackResponse(message);
        return NextResponse.json({ response: fallbackResponse });
      }
    } else {
      // Fallback advanced mock logic if no API key is provided
      const fallbackResponse = await getFallbackResponse(message);
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}
