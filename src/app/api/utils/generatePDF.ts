import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generateCartPDF = async (
    cartProducts: any[],
    orderSummary: {
        subtotal: number;
        shipping: number;
        tax: number;
        total: number;
    }
) => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Add a blank page to the document
    const page = pdfDoc.addPage([600, 800]); // Width: 600, Height: 800

    // Load a standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Helper to draw text
    const drawText = (text: string, x: number, y: number, fontSize: number = 12) => {
        page.drawText(text, {
            x,
            y,
            size: fontSize,
            font,
            color: rgb(0, 0, 0), // Black
        });
    };

    // Define starting Y position
    let yPosition = 750;

    // Header
    drawText('Заказ', 250, yPosition, 20);
    yPosition -= 40;

    // Date
    drawText(`Дата: ${new Date().toLocaleDateString('ru-RU')}`, 50, yPosition);
    yPosition -= 30;

    // Products Table Header
    drawText('Товары:', 50, yPosition, 14);
    yPosition -= 20;

    // List products
    cartProducts.forEach((product, index) => {
        drawText(`${index + 1}. ${product.name}`, 50, yPosition);
        yPosition -= 20;

        drawText(`   Количество: ${product.cartInfo.quantity} ${product.price.unit}`, 70, yPosition);
        yPosition -= 20;

        drawText(`   Цена за единицу: ${product.cartInfo.price} ₽`, 70, yPosition);
        yPosition -= 20;

        drawText(`   Итого: ${(product.cartInfo.price * product.cartInfo.quantity).toFixed(2)} ₽`, 70, yPosition);
        yPosition -= 30;

        // Ensure there is enough space for the next product, or create a new page
        if (yPosition < 100) {
            page.drawText('(continued on next page)', { x: 50, y: yPosition });
            yPosition = 750;
            pdfDoc.addPage([600, 800]);
        }
    });

    // Order Summary
    drawText('Сводка заказа:', 50, yPosition, 14);
    yPosition -= 20;

    drawText(`Подытог: ${orderSummary.subtotal.toFixed(2)} ₽`, 50, yPosition);
    yPosition -= 20;

    drawText(`Доставка: ${orderSummary.shipping.toFixed(2)} ₽`, 50, yPosition);
    yPosition -= 20;

    drawText(`НДС (20%): ${orderSummary.tax.toFixed(2)} ₽`, 50, yPosition);
    yPosition -= 20;

    drawText(`Итого: ${orderSummary.total.toFixed(2)} ₽`, 50, yPosition);
    yPosition -= 30;

    // Serialize the PDFDocument to bytes
    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
};
