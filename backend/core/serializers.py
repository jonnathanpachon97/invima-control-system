from rest_framework import serializers
from .models import Company, FormTemplate, Record


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'


class FormTemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = FormTemplate
        fields = "__all__"
        read_only_fields = ["company"]

    def create(self, validated_data):

        request = self.context["request"]

        company = Company.objects.get(
            user=request.user
        )

        validated_data["company"] = company

        return super().create(validated_data)


class RecordSerializer(serializers.ModelSerializer):

    image = serializers.ImageField(
        use_url=True,
        required=False
    )

    template_name = serializers.CharField(
        source="template.name",
        read_only=True
    )

    reviewed_by = serializers.CharField(
        source="reviewed_by.username",
        read_only=True
    )

    created_by = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:
        model = Record

        fields = [
            "id",
            "company",
            "template",
            "template_name",
            "created_at",
            "created_by",
            "data",
            "image",
            "status",
            "observation",
            "reviewed_by",
            "reviewed_at"
        ]

        read_only_fields = [
            "company",
            "created_by",
            "reviewed_by",
            "reviewed_at"
        ]

    def create(self, validated_data):

        request = self.context["request"]

        company = Company.objects.get(
            user=request.user
        )

        validated_data["company"] = company

        validated_data["created_by"] = request.user

        return super().create(validated_data)