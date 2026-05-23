# Create your models here.
from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=255)
    nit = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class FormTemplate(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class Record(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    template = models.ForeignKey(FormTemplate, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)

    data = models.JSONField()

    def __str__(self):
        return f"{self.template.name} - {self.created_at}"