import logging

from django.utils import timezone

from .emails import send_expiration_reminder
from .models import Document

logger = logging.getLogger(__name__)


def check_expiring_documents():
    """
    The 'Check Dates Daily' step from the flowchart.

    Finds documents whose reminder_date has been reached (or passed)
    and that haven't been notified yet, then sends the email and
    records the notification for each one.
    """
    today = timezone.localdate()

    # reminder_date is a Python property (expiration_date - lead_days),
    # not a DB field, so we filter in Python rather than in the queryset.
    candidates = Document.objects.filter(notified=False)
    due = [doc for doc in candidates if doc.reminder_date <= today]

    sent_count = 0
    for document in due:
        if send_expiration_reminder(document):
            sent_count += 1

    logger.info("Checked %d documents, sent %d reminders.", len(due), sent_count)
    return sent_count
