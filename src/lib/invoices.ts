
import jsPDF from 'jspdf';
import { supabase } from '@/integrations/supabase/client';

export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }>;
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: string;
  transactionId: string;
}

export const generateInvoicePDF = async (data: InvoiceData): Promise<Blob> => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  
  // Header
  pdf.setFontSize(24);
  pdf.setTextColor(37, 99, 235);
  pdf.setFont('helvetica', 'bold');
  pdf.text('RaiseUP', 20, 30);
  
  pdf.setFontSize(12);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Professional Training Platform', 20, 40);
  pdf.text('123 Training Street', 20, 50);
  pdf.text('Education City, EC 12345', 20, 60);
  pdf.text('info@raiseup.com', 20, 70);
  
  // Invoice title and number
  pdf.setFontSize(28);
  pdf.setTextColor(30, 41, 59);
  pdf.setFont('helvetica', 'bold');
  pdf.text('INVOICE', pageWidth - 20, 30, { align: 'right' });
  
  pdf.setFontSize(12);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Invoice #: ${data.invoiceNumber}`, pageWidth - 20, 45, { align: 'right' });
  pdf.text(`Date: ${data.invoiceDate}`, pageWidth - 20, 55, { align: 'right' });
  pdf.text(`Due Date: ${data.dueDate}`, pageWidth - 20, 65, { align: 'right' });
  
  // Customer information
  pdf.setFontSize(14);
  pdf.setTextColor(30, 41, 59);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Bill To:', 20, 100);
  
  pdf.setFontSize(12);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text(data.customerName, 20, 115);
  pdf.text(data.customerEmail, 20, 125);
  pdf.text(data.customerAddress.street, 20, 135);
  pdf.text(`${data.customerAddress.city}, ${data.customerAddress.state} ${data.customerAddress.zipCode}`, 20, 145);
  pdf.text(data.customerAddress.country, 20, 155);
  
  // Items table header
  const tableTop = 180;
  pdf.setFontSize(12);
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFillColor(37, 99, 235);
  pdf.rect(20, tableTop, pageWidth - 40, 10, 'F');
  
  pdf.text('Description', 25, tableTop + 7);
  pdf.text('Qty', pageWidth - 80, tableTop + 7, { align: 'center' });
  pdf.text('Unit Price', pageWidth - 60, tableTop + 7, { align: 'center' });
  pdf.text('Total', pageWidth - 25, tableTop + 7, { align: 'right' });
  
  // Items
  let currentY = tableTop + 20;
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  
  data.items.forEach((item, index) => {
    if (index % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(20, currentY - 5, pageWidth - 40, 10, 'F');
    }
    
    pdf.text(item.description, 25, currentY);
    pdf.text(item.quantity.toString(), pageWidth - 80, currentY, { align: 'center' });
    pdf.text(`$${item.unitPrice.toFixed(2)}`, pageWidth - 60, currentY, { align: 'center' });
    pdf.text(`$${item.total.toFixed(2)}`, pageWidth - 25, currentY, { align: 'right' });
    
    currentY += 15;
  });
  
  // Totals
  const totalsY = currentY + 20;
  pdf.setFont('helvetica', 'normal');
  pdf.text('Subtotal:', pageWidth - 80, totalsY);
  pdf.text(`$${data.subtotal.toFixed(2)}`, pageWidth - 25, totalsY, { align: 'right' });
  
  pdf.text('Tax:', pageWidth - 80, totalsY + 10);
  pdf.text(`$${data.tax.toFixed(2)}`, pageWidth - 25, totalsY + 10, { align: 'right' });
  
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text('Total:', pageWidth - 80, totalsY + 25);
  pdf.text(`$${data.total.toFixed(2)}`, pageWidth - 25, totalsY + 25, { align: 'right' });
  
  // Payment information
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Payment Method:', 20, totalsY + 50);
  pdf.text(data.paymentMethod, 20, totalsY + 60);
  pdf.text('Transaction ID:', 20, totalsY + 70);
  pdf.text(data.transactionId, 20, totalsY + 80);
  
  // Footer
  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184);
  pdf.text('Thank you for your business!', pageWidth / 2, 280, { align: 'center' });
  
  return pdf.output('blob');
};

export const generateInvoice = async (orderId: string): Promise<string> => {
  try {
    // For now, return a mock invoice URL since the database relationships are complex
    // In a real implementation, you would fetch order data and generate the actual invoice
    const mockInvoiceData: InvoiceData = {
      invoiceNumber: `INV-${orderId.slice(0, 8).toUpperCase()}`,
      invoiceDate: new Date().toLocaleDateString(),
      dueDate: new Date().toLocaleDateString(),
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerAddress: {
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zipCode: '12345',
        country: 'USA'
      },
      items: [{
        description: 'Sample Course',
        quantity: 1,
        unitPrice: 99.99,
        total: 99.99
      }],
      subtotal: 99.99,
      tax: 0,
      total: 99.99,
      paymentMethod: 'Credit Card',
      transactionId: orderId
    };

    // Generate PDF
    const invoiceBlob = await generateInvoicePDF(mockInvoiceData);
    
    // Upload to storage
    const fileName = `invoice-${mockInvoiceData.invoiceNumber}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(fileName, invoiceBlob, {
        contentType: 'application/pdf',
        upsert: true
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('invoices')
      .getPublicUrl(uploadData.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw new Error('Failed to generate invoice');
  }
};

export const downloadInvoice = async (invoiceUrl: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(invoiceUrl);
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading invoice:', error);
    throw new Error('Failed to download invoice');
  }
};
