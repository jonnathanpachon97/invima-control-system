from django.shortcuts import render
from django.http import FileResponse
from .pdf_service import generate_record_pdf
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
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

    serializer_class = FormTemplateSerializer

    def get_queryset(self):

        company = Company.objects.get(
            user=self.request.user
        )

        return FormTemplate.objects.filter(
            company=company
        )


class RecordViewSet(viewsets.ModelViewSet):

    serializer_class = RecordSerializer

    def get_queryset(self):

        company = Company.objects.get(
            user=self.request.user
        )

        return Record.objects.filter(
            company=company
        )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def download_record_pdf(request, pk):

    company = Company.objects.get(
        user=request.user
    )

    record = Record.objects.get(
        id=pk,
        company=company
    )

    pdf_buffer = generate_record_pdf(record)

    return FileResponse(
        pdf_buffer,
        as_attachment=True,
        filename=f"record_{record.id}.pdf"
    )