# Generated by Django 5.1.3 on 2025-02-09 19:47

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("apartments", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Document",
            fields=[
                (
                    "pkid",
                    models.BigAutoField(
                        editable=False, primary_key=True, serialize=False
                    ),
                ),
                (
                    "id",
                    models.UUIDField(default=uuid.uuid4, editable=False, unique=True),
                ),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("title", models.CharField(max_length=255, verbose_name="Title")),
                ("file", models.FileField(upload_to="documents/", verbose_name="File")),
                (
                    "apartment",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="documents",
                        to="apartments.apartment",
                        verbose_name="Apartment",
                    ),
                ),
                (
                    "shared_with",
                    models.ManyToManyField(
                        blank=True,
                        related_name="documents_shared",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Shared With",
                    ),
                ),
                (
                    "uploaded_by",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="documents_uploaded",
                        to=settings.AUTH_USER_MODEL,
                        verbose_name="Uploaded By",
                    ),
                ),
            ],
            options={
                "verbose_name": "Document",
                "verbose_name_plural": "Documents",
                "ordering": ["-created_at", "-updated_at"],
                "abstract": False,
            },
        ),
    ]
