from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .models import Company, FormTemplate, Record
from .serializers import (
    CompanySerializer,
    FormTemplateSerializer,
    RecordSerializer
)


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class FormTemplateViewSet(viewsets.ModelViewSet):
    queryset = FormTemplate.objects.all()
    serializer_class = FormTemplateSerializer


class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer