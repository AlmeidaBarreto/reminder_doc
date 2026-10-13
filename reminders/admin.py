from django.contrib import admin

from .models import Document, Notification


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "owner_email",
        "expiration_date",
        "reminder_date",
        "notified",
        "is_expired",
    )
    list_filter = ("notified",)
    search_fields = ("title", "owner_email", "owner_name")


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("document", "email_to", "sent_at", "success")
    list_filter = ("success",)
    readonly_fields = ("sent_at",)
