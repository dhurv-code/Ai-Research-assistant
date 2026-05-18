import os
import requests

from dotenv import load_dotenv

load_dotenv()


RESEND_API_KEY = os.getenv(
    "RESEND_API_KEY"
)

RESEND_FROM = os.getenv(
    "RESEND_FROM",
    "onboarding@resend.dev"
)


class EmailService:

    @staticmethod
    def send_reset_email(
        to_email:str,
        reset_token:str
    ):

        print(
            "RESEND:",
            RESEND_API_KEY
        )


        if not RESEND_API_KEY:

            raise Exception(
                "RESEND_API_KEY not configured on the server"
            )


        reset_link=(
            f"http://localhost:5173/reset-password?token={reset_token}"
        )


        url=(
            "https://api.resend.com/emails"
        )


        data={

            "from":
            RESEND_FROM,

            "to":
            to_email,

            "subject":
            "Password reset for AI Research Assistant",

            "html":
            f"""
            <p>
            Click below:
            </p>

            <a href="{reset_link}">
            Reset Password
            </a>
            """

        }


        headers={

            "Authorization":
            f"Bearer {RESEND_API_KEY}",

            "Content-Type":
            "application/json"

        }


        resp=requests.post(

            url,

            json=data,

            headers=headers

        )


        print(
            resp.text
        )


        if resp.status_code>=400:

            raise Exception(

                f"Failed: {resp.text}"

            )


        return True