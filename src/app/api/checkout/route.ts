// app/api/checkout/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { generateCartPDF } from '../utils/generatePDF';




interface CartProduct {
    id: number;
    name: string;
    cartInfo: {
        quantity: number;
        price: number;
    };
    price: {
        unit: string;
    };
}

interface OrderSummary {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

interface CheckoutRequest {
    cartProducts: CartProduct[];
    orderSummary: OrderSummary;
}
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

export async function POST(request: Request) {
    try {

        const data = await request.json();

        const { cartProducts, orderSummary } = data as CheckoutRequest;

        // Generate PDF
        const pdfBuffer = await generateCartPDF(cartProducts, orderSummary);
        console.log("pdfBuffer", pdfBuffer)
        // Send email to admin
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: process.env.ADMIN_EMAIL,
            subject: 'Новый заказ',
            html: `
        <h2>Новый заказ получен</h2>
        <p>Дата: ${new Date().toLocaleDateString('ru-RU')}</p>
        <h3>Сводка заказа:</h3>
        <ul>
          <li>Подытог: ${orderSummary.subtotal.toFixed(2)} ₽</li>
          <li>Доставка: ${orderSummary.shipping.toFixed(2)} ₽</li>
          <li>НДС (20%): ${orderSummary.tax.toFixed(2)} ₽</li>
          <li>Итого: ${orderSummary.total.toFixed(2)} ₽</li>
        </ul>
        <h3>Товары:</h3>
        <ul>
          ${cartProducts.map(product => `
            <li>
              ${product.name} - ${product.cartInfo.quantity} ${product.price.unit}
              (${(product.cartInfo.price * product.cartInfo.quantity).toFixed(2)} ₽)
            </li>
          `).join('')}
        </ul>
      `,
            attachments: [
                {
                    filename: 'order.pdf',
                    content: pdfBuffer as Buffer,
                },
            ],
        });

        // Return PDF buffer for client download
        return new NextResponse(JSON.stringify({
            success: true,
            pdfBuffer: (pdfBuffer as Buffer).toString('base64')
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return new NextResponse(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}