from django.urls import path

from . import views

app_name = "reminders"

urlpatterns = [
    path("", views.DocumentListView.as_view(), name="document_list"),
    path("register/", views.DocumentRegisterView.as_view(), name="document_register"),
    path("<int:pk>/", views.DocumentDetailView.as_view(), name="document_detail"),
    path("documents/<int:pk>/edit/", views.DocumentUpdateView.as_view(), name="document_edit"  ),
    path("documents/<int:pk>/delete/", views.DocumentDeleteView.as_view(), name="document_delete"),
]
