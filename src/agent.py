import os
import json

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.schema import HumanMessage
from dotenv import load_dotenv

load_dotenv()

llm = ChatGoogleGenerativeAI(
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    model="gemini-3.6-flash",
    temperature=0.5
)


class WaterIntakeAgent:

    def __init__(self):
        self.history = []

    def analyze_intake(self, intake_ml):

        prompt = f"""
You are a professional hydration assistant.

The user has consumed {intake_ml} ml of water today.

Analyze their hydration status and give practical advice.

Return ONLY valid JSON in exactly this format:

{{
    "hydration_status": "Good / Moderate / Low",
    "summary": "A short explanation of their current hydration status.",
    "recommendation": "A practical recommendation for the user.",
    "next_action": "Tell the user what they should do next."
}}

Do not use Markdown.
Do not add extra text outside the JSON.
"""

        response = llm.invoke(
            [HumanMessage(content=prompt)]
        )

        try:
            return json.loads(response.content)

        except json.JSONDecodeError:

            return {
                "hydration_status": "Analysis Available",
                "summary": response.content,
                "recommendation": "Continue drinking water regularly throughout the day.",
                "next_action": "Keep tracking your water intake."
            }


if __name__ == "__main__":

    agent = WaterIntakeAgent()

    intake = 1500

    feedback = agent.analyze_intake(intake)

    print(f"Hydration Analysis: {feedback}")