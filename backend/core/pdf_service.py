from io import BytesIO

from django.http import FileResponse

from reportlab.pdfgen import canvas


def generate_record_pdf(record):

    buffer = BytesIO()

    pdf = canvas.Canvas(buffer)

    pdf.setTitle("Registro INVIMA")

    y = 800

    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawString(50, y, "Registro INVIMA")

    y -= 40

    pdf.setFont("Helvetica", 12)

    pdf.drawString(
        50,
        y,
        f"Empresa: {record.company.name}"
    )

    y -= 25

    pdf.drawString(
        50,
        y,
        f"Formato: {record.template.name}"
    )

    y -= 25

    pdf.drawString(
        50,
        y,
        f"Fecha: {record.created_at.strftime('%Y-%m-%d %H:%M')}"
    )

    y -= 40

    pdf.setFont("Helvetica-Bold", 13)
    pdf.drawString(50, y, "Datos")

    y -= 30

    pdf.setFont("Helvetica", 12)

    for key, value in record.data.items():

        pdf.drawString(
            60,
            y,
            f"{key}: {value}"
        )

        y -= 25

    pdf.save()

    buffer.seek(0)

    return buffer