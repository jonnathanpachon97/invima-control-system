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

    class Meta:
        model = Record

        fields = [
            "id",
            "company",
            "template",
            "created_at",
            "data",
            "image",
            "status",
            "observation"
        ]

        read_only_fields = ["company"]

    def create(self, validated_data):

        request = self.context["request"]

        company = Company.objects.get(
            user=request.user
        )

        validated_data["company"] = company

        return super().create(validated_data)