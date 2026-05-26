from io import BytesIO

from reportlab.lib import colors

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image
)

from reportlab.lib.styles import getSampleStyleSheet

from reportlab.lib.pagesizes import letter


def generate_record_pdf(record):

    buffer = BytesIO()

    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=30
    )

    elements = []

    # Logo empresa
    if record.company.logo:

        logo = Image(
            record.company.logo.path,
            width=120,
            height=60
        )

        elements.append(logo)

        elements.append(Spacer(1, 20))

    styles = getSampleStyleSheet()

    # Título principal
    title = Paragraph(
        "<b>REGISTRO INVIMA</b>",
        styles["Title"]
    )

    elements.append(title)

    elements.append(Spacer(1, 20))

    # Información general
    company = Paragraph(
        f"<b>Empresa:</b> {record.company.name}",
        styles["BodyText"]
    )

    template = Paragraph(
        f"<b>Formato:</b> {record.template.name}",
        styles["BodyText"]
    )

    created = Paragraph(
        f"<b>Fecha:</b> {record.created_at.strftime('%Y-%m-%d %H:%M')}",
        styles["BodyText"]
    )

    elements.append(company)
    elements.append(Spacer(1, 10))

    elements.append(template)
    elements.append(Spacer(1, 10))

    elements.append(created)
    elements.append(Spacer(1, 25))

    # Tabla de datos
    data = [
        ["Campo", "Valor"]
    ]

    for key, value in record.data.items():

        data.append([
            str(key),
            str(value)
        ])

    table = Table(
        data,
        colWidths=[200, 250]
    )

    table.setStyle(TableStyle([

        (
            "BACKGROUND",
            (0, 0),
            (-1, 0),
            colors.HexColor("#2563eb")
        ),

        (
            "TEXTCOLOR",
            (0, 0),
            (-1, 0),
            colors.white
        ),

        (
            "FONTNAME",
            (0, 0),
            (-1, 0),
            "Helvetica-Bold"
        ),

        (
            "BOTTOMPADDING",
            (0, 0),
            (-1, 0),
            12
        ),

        (
            "BACKGROUND",
            (0, 1),
            (-1, -1),
            colors.whitesmoke
        ),

        (
            "GRID",
            (0, 0),
            (-1, -1),
            1,
            colors.grey
        ),

        (
            "FONTNAME",
            (0, 1),
            (-1, -1),
            "Helvetica"
        ),

        (
            "FONTSIZE",
            (0, 0),
            (-1, -1),
            11
        ),

        (
            "BOTTOMPADDING",
            (0, 1),
            (-1, -1),
            10
        ),

    ]))

    elements.append(table)

    elements.append(Spacer(1, 50))

    # Firmas
    firma_operario = Paragraph(
        "Firma Operario: _____________________",
        styles["BodyText"]
    )

    firma_supervisor = Paragraph(
        "Firma Supervisor: __________________",
        styles["BodyText"]
    )

    elements.append(firma_operario)
    elements.append(Spacer(1, 20))

    elements.append(firma_supervisor)

    doc.build(elements)

    buffer.seek(0)

    return buffer