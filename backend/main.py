import logging
import os
import smtplib
import sqlite3
from email.message import EmailMessage
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = Path(__file__).resolve().parent
DB_FILE = BASE_DIR / "portfolio.db"
ENV_FILE = BASE_DIR / ".env"
logger = logging.getLogger(__name__)


def load_local_env():
    if not ENV_FILE.exists():
        return

    for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#") or "=" not in stripped:
            continue

        key, value = stripped.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


load_local_env()

app = FastAPI()

# Allow CORS for local React app
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def init_db():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

class ContactForm(BaseModel):
    name: str
    email: str
    message: str


def send_contact_email(form: ContactForm):
    username = os.getenv("SMTP_USERNAME", "").strip()
    password = os.getenv("SMTP_PASSWORD", "").strip()

    if not username or not password:
        return False, "Message saved, but email notifications are not configured yet."

    recipient = os.getenv("CONTACT_TO_EMAIL", username).strip()
    smtp_host = os.getenv("SMTP_HOST", "smtp.gmail.com").strip()
    smtp_port = int(os.getenv("SMTP_PORT", "587"))

    email = EmailMessage()
    email["Subject"] = f"Portfolio message from {form.name}"
    email["From"] = username
    email["To"] = recipient
    email["Reply-To"] = form.email
    email.set_content(
        f"Name: {form.name}\n"
        f"Email: {form.email}\n\n"
        f"Message:\n{form.message}\n"
    )

    try:
        with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as smtp:
            smtp.starttls()
            smtp.login(username, password)
            smtp.send_message(email)
    except (OSError, smtplib.SMTPException):
        logger.exception("Unable to send portfolio contact email notification.")
        return False, "Message saved, but email delivery failed. Please email me directly."

    return True, "Thank you. Your message has been emailed successfully."


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Portfolio API is running!"}

@app.post("/contact")
def submit_contact(form: ContactForm):
    try:
        conn = sqlite3.connect(DB_FILE)
        c = conn.cursor()
        c.execute("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", 
                  (form.name, form.email, form.message))
        conn.commit()
        conn.close()
        email_sent, message = send_contact_email(form)
        return {
            "status": "success" if email_sent else "saved",
            "email_sent": email_sent,
            "message": message,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
