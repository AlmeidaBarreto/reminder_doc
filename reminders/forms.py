from django import forms

from .models import Document


class DocumentRegisterForm(forms.ModelForm):

    class Meta:

        model = Document

        fields = [
            "title",
            "owner_name",
            "owner_email",
            "issue_date",
            "expiration_date",
            "reminder_lead_days",
        ]

        widgets = {

            "issue_date": forms.DateInput(
                format="%Y-%m-%d",
                attrs={
                    "type": "date",
                    "id": "id_issue_date",
                }
            ),

            "expiration_date": forms.DateInput(
                format="%Y-%m-%d",
                attrs={
                    "type": "date",
                    "id": "id_expiration_date",
                }
            ),

            "reminder_lead_days": forms.NumberInput(
                attrs={
                    "min": "1",
                    "id": "id_reminder_lead_days",
                }
            ),
        }


    def clean(self):

        cleaned_data = super().clean()

        issue_date = cleaned_data.get("issue_date")
        expiration_date = cleaned_data.get("expiration_date")


        # Only compare when both dates have been entered
        if issue_date and expiration_date:

            # Expiration date must be after issue date
            if expiration_date <= issue_date:

                self.add_error(
                    "expiration_date",
                    "Expiration date must be after the issue date."
                )


        return cleaned_data