from django.shortcuts import render
from django.http import FileResponse
from .pdf_service import generate_record_pdf
from .excel_service import generate_records_excel
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Company, FormTemplate, Record
from .serializers import (
    CompanySerializer,
    FormTemplateSerializer,
    RecordSerializer
)
from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
    JSONParser
)


class CompanyViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class FormTemplateViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = FormTemplateSerializer

    def get_queryset(self):

        company = Company.objects.get(
            user=self.request.user
        )

        return FormTemplate.objects.filter(
            company=company,
            is_active=True
        )

    def destroy(self, request, *args, **kwargs):

        template = self.get_object()

        template.is_active = False

        template.save()

        return Response({
            "message": "Formato desactivado"
        })


class RecordViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser
    ]

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

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def download_records_excel(request):

    company = Company.objects.get(
        user=request.user
    )

    records = Record.objects.filter(
        company=company
    )

    excel_buffer = generate_records_excel(
        records
    )

    return FileResponse(
        excel_buffer,
        as_attachment=True,
        filename="records.xlsx"
    )