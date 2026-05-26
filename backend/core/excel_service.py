from io import BytesIO

from openpyxl import Workbook


def generate_records_excel(records):

    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Registros"

    headers = [
        "ID",
        "Fecha",
        "Formato",
        "Datos"
    ]

    sheet.append(headers)

    for record in records:

        data_text = " | ".join([
            f"{key}: {value}"
            for key, value in record.data.items()
        ])

        sheet.append([
            record.id,
            record.created_at.strftime(
                "%Y-%m-%d %H:%M"
            ),
            record.template.name,
            data_text
        ])

    buffer = BytesIO()

    workbook.save(buffer)

    buffer.seek(0)

    return buffer