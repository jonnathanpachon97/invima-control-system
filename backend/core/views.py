from django.shortcuts import render
from django.http import FileResponse
from .pdf_service import generate_record_pdf
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


def download_record_pdf(request, pk):

    record = Record.objects.get(id=pk)

    pdf_buffer = generate_record_pdf(record)

    return FileResponse(
        pdf_buffer,
        as_attachment=True,
        filename=f"record_{record.id}.pdf"
    )