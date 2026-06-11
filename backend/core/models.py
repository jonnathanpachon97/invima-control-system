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

    STATUS_CHOICES = [
        ("pendiente", "Pendiente"),
        ("aprobado", "Aprobado"),
        ("rechazado", "Rechazado"),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="records"
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

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pendiente"
    )

    observation = models.TextField(
    blank=True,
    default=""
    )

    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_records"
    )

    reviewed_at = models.DateTimeField(
        null=True,
        blank=True
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="created_records"
    )

    def __str__(self):
        return f"{self.template.name} - {self.created_at}"
    

class UserProfile(models.Model):

    ROLE_CHOICES = [
        ("admin", "Administrador"),
        ("supervisor", "Supervisor"),
        ("operario", "Operario"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="employees"
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="operario"
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"