from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CompanyViewSet,
    FormTemplateViewSet,
    RecordViewSet,
    download_record_pdf,
    download_records_excel,
    dashboard_stats
)

router = DefaultRouter()

router.register(r'companies', CompanyViewSet)
router.register(
    r'form-templates',
    FormTemplateViewSet,
    basename='form-templates'
)
router.register(
    r'records',
    RecordViewSet,
    basename='records'
)

urlpatterns = [

    path('', include(router.urls)),

    path(
        "records/<int:pk>/pdf/",
        download_record_pdf
    ),

    path(
        "records/export/excel/",
        download_records_excel
    ),

    path(
        "dashboard/stats/",
        dashboard_stats
    ),
]