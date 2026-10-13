from django.core.management.base import BaseCommand

from reminders.tasks import check_expiring_documents


class Command(BaseCommand):
    help = "Check all documents for reached reminder dates and send emails."

    def handle(self, *args, **options):
        sent_count = check_expiring_documents()
        self.stdout.write(
            self.style.SUCCESS(f"Done. {sent_count} reminder email(s) sent.")
        )
