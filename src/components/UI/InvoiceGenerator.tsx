"use client";

import { jsPDF } from "jspdf";

/**
 * Helper to format date as DD/MM/YYYY
 */
const formatDate = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date();
    const validDate = isNaN(date.getTime()) ? new Date() : date;
    const day = String(validDate.getDate()).padStart(2, '0');
    const month = String(validDate.getMonth() + 1).padStart(2, '0');
    const year = validDate.getFullYear();
    return `${day}/${month}/${year}`;
};

/**
 * Helper to format number to Indian currency format
 */
const formatCurrency = (num: number) => {
    return num.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

/**
 * Helper to convert number to English words in Indian Rupee format
 */
const numberToWords = (num: number): string => {
    const a = [
        '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
        'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'
    ];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    const numToWordsLessThanThousand = (n: number): string => {
        let str = '';
        if (n >= 100) {
            str += a[Math.floor(n / 100)] + ' Hundred ';
            n %= 100;
        }
        if (n >= 20) {
            str += b[Math.floor(n / 10)] + ' ';
            n %= 10;
        }
        if (n > 0) {
            str += a[n] + ' ';
        }
        return str.trim();
    };

    if (num === 0) return 'Zero';

    let result = '';
    let remaining = Math.floor(num);

    if (remaining >= 10000000) {
        result += numToWordsLessThanThousand(Math.floor(remaining / 10000000)) + ' Crore ';
        remaining %= 10000000;
    }

    if (remaining >= 100000) {
        result += numToWordsLessThanThousand(Math.floor(remaining / 100000)) + ' Lakh ';
        remaining %= 100000;
    }

    if (remaining >= 1000) {
        result += numToWordsLessThanThousand(Math.floor(remaining / 1000)) + ' Thousand ';
        remaining %= 1000;
    }

    if (remaining > 0) {
        result += numToWordsLessThanThousand(remaining) + ' ';
    }

    result = result.trim();

    const paisa = Math.round((num - Math.floor(num)) * 100);
    if (paisa > 0) {
        result += 'and ' + numToWordsLessThanThousand(paisa) + ' Paisa ';
    }

    return result ? `Indian Rupee ${result} Only` : 'Indian Rupee Zero Only';
};

export const generateInvoicePDF = async (data: {
    customerName: string;
    invoiceNo: string;
    amount: string;
    description?: string;
    process?: string;
    invoiceDate?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    pin?: string;
    country?: string;
    profile?: any;
    partnerCode?: string;
}) => {
    console.log("Generating Invoice PDF:", data);
    const doc = new jsPDF();
    const customerName = data.customerName || "Logistics Partner";
    
    // Corporate Palette
    const blue = [15, 44, 89]; // ADSP Cobalt Navy
    const orange = [37, 99, 235]; // ADSP Blue Accent
    const lightBlue = [241, 245, 249]; // Slate background tint
    const greyText = [100, 116, 139];

    // ---------------- DRAW LOGO (Vector) ----------------
    // Isometric box symbol representation for ADSP
    doc.setFillColor(blue[0], blue[1], blue[2]);
    doc.rect(15, 15, 12, 12, "F");
    doc.setFillColor(orange[0], orange[1], orange[2]);
    doc.rect(18, 18, 6, 6, "F");
    
    // Text branding
    doc.setTextColor(blue[0], blue[1], blue[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ADSP", 32, 23);
    
    doc.setTextColor(greyText[0], greyText[1], greyText[2]);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("LOGISTIC HUB", 32, 27);

    // ---------------- INVOICE HEADER DETAILS ----------------
    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("TAX INVOICE", 195, 22, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(greyText[0], greyText[1], greyText[2]);
    doc.text("ADSP Logistic Hub India Private Limited", 195, 28, { align: "right" });
    doc.text("CIN: U60230MH2026PTC294328", 195, 33, { align: "right" });

    // ---------------- INVOICE INFO BOX ----------------
    const infoY = 45;
    doc.setFillColor(lightBlue[0], lightBlue[1], lightBlue[2]);
    doc.rect(15, infoY, 180, 42, "F");
    doc.setDrawColor(218, 223, 230);
    doc.rect(15, infoY, 180, 42);

    // Left info column
    doc.setTextColor(blue[0], blue[1], blue[2]);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Invoice No", 20, infoY + 8);
    doc.text("Invoice Date", 20, infoY + 14);
    doc.text("GSTIN", 20, infoY + 20);
    doc.text("PAN", 20, infoY + 26);
    doc.text("State Code", 20, infoY + 32);

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(`: ${data.invoiceNo}`, 50, infoY + 8);
    doc.text(`: ${formatDate(data.invoiceDate)}`, 50, infoY + 14);
    doc.text(": 27AADCA8923K1ZH", 50, infoY + 20);
    doc.text(": AADCA8923K", 50, infoY + 26);
    doc.text(": 27 (Maharashtra)", 50, infoY + 32);

    // Right info column
    doc.setTextColor(blue[0], blue[1], blue[2]);
    doc.setFont("helvetica", "bold");
    doc.text("Place Of Supply", 105, infoY + 8);
    doc.text("Hub Code", 105, infoY + 14);
    doc.text("Contact Support", 105, infoY + 20);

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.text(": Maharashtra (27)", 145, infoY + 8);
    doc.text(`: ${data.partnerCode || "LH-P-2026"}`, 145, infoY + 14);
    doc.text(": support@adsp-hub.in", 145, infoY + 20);

    // ---------------- BILL/SHIP ----------------
    const billShipY = 95;
    doc.setFillColor(blue[0], blue[1], blue[2]);
    doc.rect(15, billShipY, 85, 7, "F");
    doc.rect(105, billShipY, 90, 7, "F");

    doc.setFontSize(9.5);
    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To (Registered Partner)", 18, billShipY + 5);
    doc.text("Ship To (Operational Hub)", 108, billShipY + 5);

    const displayCustName = (customerName || "N/A").toUpperCase();
    const displayEmail = data.email || "N/A";
    const displayCity = (data.city || "N/A").toUpperCase();
    const displayPin = data.pin || "N/A";
    const displayState = (data.state || "N/A").toUpperCase();
    const displayCountry = data.country || "INDIA";

    doc.setTextColor(0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(displayCustName, 18, billShipY + 15);
    doc.text(displayCustName, 108, billShipY + 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(greyText[0], greyText[1], greyText[2]);
    doc.text(displayEmail, 18, billShipY + 21);
    doc.text(displayEmail, 108, billShipY + 21);

    doc.setTextColor(0);
    const cityPinLine = `${displayCity} - ${displayPin}`;
    const stateCountryLine = `${displayState}, ${displayCountry}`;

    doc.text(cityPinLine, 18, billShipY + 29);
    doc.text(cityPinLine, 108, billShipY + 29);

    doc.text(stateCountryLine, 18, billShipY + 35);
    doc.text(stateCountryLine, 108, billShipY + 35);

    const refId = data.profile?.strapiId ?? data.profile?.id;
    const refCode = refId ? `ADSP/HUB/4923-${String(refId).padStart(4, "0")}` : (data.partnerCode || "");

    if (refCode) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(blue[0], blue[1], blue[2]);
        doc.text(`Partner Ref: ${refCode}`, 18, billShipY + 42);
        doc.text(`Partner Ref: ${refCode}`, 108, billShipY + 42);
    }

    // ---------------- GRID TABLE ----------------
    const tY = 145;
    const tH = 12;
    const rH = 12;

    doc.setFillColor(blue[0], blue[1], blue[2]);
    doc.rect(15, tY, 180, tH, "F");
    doc.setDrawColor(200, 200, 200);
    doc.rect(15, tY, 180, tH + rH);

    doc.setTextColor(255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);

    doc.text("#", 17, tY + 8);
    doc.text("Description", 25, tY + 8);
    doc.text("SAC Code", 70, tY + 8);
    doc.text("Qty", 92, tY + 8);
    doc.text("Rate", 108, tY + 8);
    doc.text("CGST (9%)", 130, tY + 8);
    doc.text("SGST (9%)", 155, tY + 8);
    doc.text("Total Amount", 175, tY + 8);

    // Row Data Calculations
    const totalVal = parseFloat(data.amount) || 0;
    const baseRate = totalVal / 1.18; // 18% GST total
    const cgstVal = baseRate * 0.09;
    const sgstVal = baseRate * 0.09;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    const rowY = tY + tH + 8;
    doc.text("1", 17, rowY);
    doc.text(data.process || data.description || "Hub Service Fees", 25, rowY);
    doc.text("996511", 70, rowY);
    doc.text("1.00", 92, rowY);
    doc.text(formatCurrency(baseRate), 108, rowY);
    doc.text(formatCurrency(cgstVal), 130, rowY);
    doc.text(formatCurrency(sgstVal), 155, rowY);
    doc.text(formatCurrency(totalVal), 175, rowY);

    // ---------------- SUMMARY BOX ----------------
    const sumY = 175;
    doc.rect(15, sumY, 180, 50);
    doc.line(115, sumY, 115, sumY + 50);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("Total Amount In Words:", 18, sumY + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(numberToWords(totalVal), 18, sumY + 15, { maxWidth: 90 });

    const lx = 120; const rx = 192;
    doc.setFontSize(9.5);
    doc.text("Sub Total", lx, sumY + 10);
    doc.text("CGST (9%)", lx, sumY + 18);
    doc.text("SGST (9%)", lx, sumY + 26);
    doc.setFont("helvetica", "bold");
    doc.text("Grand Total", lx, sumY + 36);
    doc.text("Amount Paid", lx, sumY + 44);

    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(baseRate), rx, sumY + 10, { align: "right" });
    doc.text(formatCurrency(cgstVal), rx, sumY + 18, { align: "right" });
    doc.text(formatCurrency(sgstVal), rx, sumY + 26, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(formatCurrency(totalVal), rx, sumY + 36, { align: "right" });
    doc.setTextColor(0, 128, 0);
    doc.text(formatCurrency(totalVal), rx, sumY + 44, { align: "right" });

    // ---------------- SIGNATURE ----------------
    doc.setTextColor(0);
    const sigY = 232;
    doc.rect(125, sigY, 60, 36);
    
    // Draw stylized legal script for authorized signatory
    doc.setFont("courier", "bolditalic");
    doc.setFontSize(11);
    doc.text("ADSP Admin", 155, sigY + 15, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text("Digitally Signed", 155, sigY + 24, { align: "center" });
    doc.setFontSize(8);
    doc.text("Authorized Representative", 155, sigY + 30, { align: "center" });

    // ---------------- FOOTER & DECLARATION ----------------
    const footY = sigY + 12;
    doc.setDrawColor(200, 200, 200);
    // Draw empty generic QR scanner box placeholder for neat layout
    doc.rect(18, sigY, 22, 22);
    doc.setFontSize(7.5);
    doc.setFont("helvetica", "bold");
    doc.text("[ SECURE QR ]", 29, sigY + 12, { align: "center" });
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.text("Scan QR to verify details online.\nThis is a computer generated invoice and\ndoes not require physical signature.", 45, sigY + 8);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(greyText[0], greyText[1], greyText[2]);
    doc.text("ADSP LOGISTIC HUB INDIA PRIVATE LIMITED", 15, 276);
    
    doc.save(`${customerName}_Invoice_${data.invoiceNo}.pdf`);
};

export default function DownloadInvoiceButton({ data }: { data: any }) {
    return (
        <button
            onClick={() => generateInvoicePDF(data)}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors"
        >
            Download Invoice
        </button>
    );
}