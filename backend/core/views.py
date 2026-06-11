from django.shortcuts import render
from django.http import FileResponse
from django.db.models import Count
from .pdf_service import generate_record_pdf
from .excel_service import generate_records_excel
from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
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
from .models import (
    Company,
    FormTemplate,
    Record,
    UserProfile
)


def get_company(user):

    try:

        return user.userprofile.company

    except UserProfile.DoesNotExist:

        return None


class CompanyViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class FormTemplateViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = FormTemplateSerializer

    def get_queryset(self):

        company = get_company(
            self.request.user
        )

        return FormTemplate.objects.filter(
            company=company,
            is_active=True
        )

    def destroy(self, request, *args, **kwargs):

        if get_user_role(request.user) != "admin":

            return Response(
                {"detail": "No tiene permisos."},
                status=403
            )

        template = self.get_object()

        template.is_active = False

        template.save()

        return Response({
            "message": "Formato desactivado"
        })
    
    def create(self, request, *args, **kwargs):

        if get_user_role(request.user) != "admin":

            return Response(
                {"detail": "No tiene permisos."},
                status=403
            )

        return super().create(
            request,
            *args,
            **kwargs
        )

    def update(self, request, *args, **kwargs):

        if get_user_role(request.user) != "admin":

            return Response(
                {"detail": "No tiene permisos."},
                status=403
            )

        return super().update(
            request,
            *args,
            **kwargs
        )
    
    def partial_update(self, request, *args, **kwargs):

        if get_user_role(request.user) != "admin":

            return Response(
                {"detail": "No tiene permisos."},
                status=403
            )

        return super().partial_update(
            request,
            *args,
            **kwargs
        )


class RecordViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    parser_classes = [
        MultiPartParser,
        FormParser,
        JSONParser
    ]

    serializer_class = RecordSerializer

    def get_queryset(self):

        company = get_company(
            self.request.user
        )

        return Record.objects.filter(
            company=company
        )
    
    def partial_update(self, request, *args, **kwargs):

        instance = self.get_object()

        # Bloquear registros ya revisados
        if instance.status in ["aprobado", "rechazado"]:

            return Response(
                {
                    "detail":
                    "Este registro ya fue revisado y no puede modificarse."
                },
                status=400
            )

        status = request.data.get("status")

        role = get_user_role(
            request.user
        )

        if (
            status in ["aprobado", "rechazado"]
            and role == "operario"
        ):

            return Response(
                {
                    "detail":
                    "No tiene permisos para aprobar o rechazar registros."
                },
                status=403
            )

        if status in ["aprobado", "rechazado"]:

            instance.reviewed_by = request.user

            from django.utils.timezone import now

            instance.reviewed_at = now()

            instance.save()

        return super().partial_update(
            request,
            *args,
            **kwargs
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def download_record_pdf(request, pk):

    company = get_company(
        request.user
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

    company = get_company(
        request.user
    )

    records = Record.objects.filter(
        company=company
    )

    status = request.GET.get("status")
    start_date = request.GET.get("start_date")
    end_date = request.GET.get("end_date")

    if status and status != "todos":
        records = records.filter(
            status=status
        )

    if start_date:
        records = records.filter(
            created_at__date__gte=start_date
        )

    if end_date:
        records = records.filter(
            created_at__date__lte=end_date
        )

    excel_buffer = generate_records_excel(
        records
    )

    return FileResponse(
        excel_buffer,
        as_attachment=True,
        filename="records.xlsx"
    )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):

    company = get_company(
        request.user
    )

    records = Record.objects.filter(
        company=company
    )

    data = {
        "total": records.count(),
        "aprobados": records.filter(
            status="aprobado"
        ).count(),
        "rechazados": records.filter(
            status="rechazado"
        ).count(),
        "pendientes": records.filter(
            status="pendiente"
        ).count(),
    }

    return Response(data)


def get_user_role(user):

    try:

        return user.userprofile.role

    except UserProfile.DoesNotExist:

        return None
    

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def current_user(request):

    profile = request.user.userprofile

    return Response({
        "username": request.user.username,
        "role": profile.role
    })
