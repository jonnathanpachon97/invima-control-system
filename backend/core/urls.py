from rest_framework.routers import DefaultRouter
from .views import (
    CompanyViewSet,
    FormTemplateViewSet,
    RecordViewSet
)

router = DefaultRouter()

router.register(r'companies', CompanyViewSet)
router.register(r'form-templates', FormTemplateViewSet)
router.register(r'records', RecordViewSet)

urlpatterns = router.urls