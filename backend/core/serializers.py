from rest_framework import serializers
from .models import Company, FormTemplate, Record


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class FormTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormTemplate
        fields = '__all__'


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = '__all__'