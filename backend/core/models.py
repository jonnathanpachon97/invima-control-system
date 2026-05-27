# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Company(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=255)

    nit = models.CharField(max_length=50)

    logo = models.ImageField(
        upload_to="company_logos/",
        blank=True,
        null=True
    )

    def __str__(self):
        return self.name


class FormTemplate(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    name = models.CharField(max_length=255)

    description = models.TextField(blank=True)

    schema = models.JSONField(default=list)

    requires_image = models.BooleanField(default=False)

    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Record(models.Model):

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE
    )

    template = models.ForeignKey(
        FormTemplate,
        on_delete=models.CASCADE
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    data = models.JSONField()

    image = models.ImageField(
        upload_to="records/",
        null=True,
        blank=True
    )

    def __str__(self):
        return f"{self.template.name} - {self.created_at}"