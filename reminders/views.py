from django.contrib import messages
from django.shortcuts import redirect, render
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView, ListView, UpdateView, DeleteView

from .forms import DocumentRegisterForm
from .models import Document


class DocumentListView(ListView):
    model = Document
    template_name = "reminders/document_list.html"
    context_object_name = "documents"


class DocumentDetailView(DetailView):
    model = Document
    template_name = "reminders/document_detail.html"
    context_object_name = "document"


class DocumentRegisterView(CreateView):
    model = Document
    form_class = DocumentRegisterForm
    template_name = "reminders/document_form.html"
    success_url = reverse_lazy("reminders:document_list")

    def form_valid(self, form):
        response = super().form_valid(form)
        messages.success(self.request, "Document registered successfully.")
        return response

class DocumentUpdateView(UpdateView):
    model = Document
    form_class = DocumentRegisterForm
    template_name = "reminders/document_form.html"
    success_url = reverse_lazy("reminders:document_list")

    def form_valid(self, form):
        messages.success(
            self.request,
            "Document updated successfully."
        )
        return super().form_valid(form)

class DocumentDeleteView(DeleteView):
    model = Document
    template_name = "reminders/document_confirm_delete.html"
    success_url = reverse_lazy("reminders:document_list")

    def form_valid(self, form):
        messages.success(
            self.request,
            "Document deleted successfully."
        )
        return super().form_valid(form)