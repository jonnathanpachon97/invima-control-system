from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    CompanyViewSet,
    FormTemplateViewSet,
    RecordViewSet,
    download_record_pdf
)

router = DefaultRouter()

router.register(r'companies', CompanyViewSet)
router.register(r'form-templates', FormTemplateViewSet)
router.register(r'records', RecordViewSet)

urlpatterns = [

    path('', include(router.urls)),

    path(
        "records/<int:pk>/pdf/",
        download_record_pdf
    ),
]