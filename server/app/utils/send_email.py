import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from app.models import Users
from config.settings import settings


def __send_email_message(msg):
    with smtplib.SMTP_SSL(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        server.login(settings.SMTP_EMAIL, settings.SMTP_PASSWORD)
        server.send_message(msg)


async def send_verification_email(user: Users, verify_code: int) -> None:
    message = MIMEMultipart()
    message['Subject'] = 'Tasdiqlash kodi'
    message['From'] = settings.SMTP_EMAIL
    message['To'] = user.email
    html = f"""\
    <html>
      <body>
      <h1>
      Assalomu alaykum {user.name} 
      </h1>
      <br>
      <h2>
      Sizning tasdiqlash kodingiz👇 
      </h2>
      <br>
      <h1><b><code>{verify_code}</code></b></h1>
      
    </html> 
    """
    message.attach(MIMEText(html, 'html'))
    __send_email_message(message)
