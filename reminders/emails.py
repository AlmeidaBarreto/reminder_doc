import logging

from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string

from .models import Notification

logger = logging.getLogger(__name__)


def send_expiration_reminder(document):
    """
    Send a reminder email for a single Document and record the
    outcome as a Notification, whether it succeeds or fails.
    """
    subject = f"Reminder: '{document.title}' expires on {document.expiration_date}"
    message = render_to_string(
        "reminders/emails/expiration_notice.html",
        {"document": document},
    )

    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[document.owner_email],
            fail_silently=False,
        )
        Notification.objects.create(
            document=document,
            email_to=document.owner_email,
            success=True,
        )
        document.notified = True
        document.save(update_fields=["notified"])
        return True

    except Exception as exc:
        logger.exception("Failed to send reminder for document %s", document.pk)
        Notification.objects.create(
            document=document,
            email_to=document.owner_email,
            success=False,
            error_message=str(exc),
        )
        return False
