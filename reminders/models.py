from datetime import timedelta

from django.db import models
from django.utils import timezone


class Document(models.Model):
    title = models.CharField(max_length=255)
    owner_name = models.CharField(max_length=255, blank=True)
    owner_email = models.EmailField()
    issue_date = models.DateField()
    expiration_date = models.DateField()
    reminder_lead_days = models.PositiveIntegerField(
        default=7,
        help_text="How many days before expiration to send the reminder."
    )
    notified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["expiration_date"]

    def __str__(self):
        return f"{self.title} (expires {self.expiration_date})"

    @property
    def reminder_date(self):
        """The date on which a reminder should be sent."""
        return self.expiration_date - timedelta(days=self.reminder_lead_days)

    @property
    def is_expired(self):
        return self.expiration_date < timezone.localdate()

    @property
    def days_until_expiration(self):
        return (self.expiration_date - timezone.localdate()).days


class Notification(models.Model):
    document = models.ForeignKey(
        Document, on_delete=models.CASCADE, related_name="notifications"
    )
    sent_at = models.DateTimeField(auto_now_add=True)
    email_to = models.EmailField()
    success = models.BooleanField(default=True)
    error_message = models.TextField(blank=True)

    class Meta:
        ordering = ["-sent_at"]

    def __str__(self):
        status = "OK" if self.success else "FAILED"
        return f"[{status}] {self.document.title} -> {self.email_to} @ {self.sent_at:%Y-%m-%d %H:%M}"

    
