import { supabase } from '@/integrations/supabase/client';
import jsPDF from 'jspdf';

export interface CertificateData {
  studentName: string;
  courseName: string;
  completionDate: string;
  instructorName: string;
  certificateId: string;
  courseHours: number;
}

export const generateCertificatePDF = async (data: CertificateData): Promise<Blob> => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Set up the certificate design
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  
  // Background color
  pdf.setFillColor(248, 250, 252);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');
  
  // Border
  pdf.setDrawColor(59, 130, 246);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  
  // Inner border
  pdf.setDrawColor(147, 197, 253);
  pdf.setLineWidth(1);
  pdf.rect(15, 15, pageWidth - 30, pageHeight - 30);
  
  // Header
  pdf.setFontSize(32);
  pdf.setTextColor(30, 41, 59);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CERTIFICATE OF COMPLETION', pageWidth / 2, 40, { align: 'center' });
  
  // Subtitle
  pdf.setFontSize(16);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text('This is to certify that', pageWidth / 2, 55, { align: 'center' });
  
  // Student name
  pdf.setFontSize(28);
  pdf.setTextColor(37, 99, 235);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.studentName, pageWidth / 2, 75, { align: 'center' });
  
  // Course completion text
  pdf.setFontSize(16);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text('has successfully completed the course', pageWidth / 2, 90, { align: 'center' });
  
  // Course name
  pdf.setFontSize(24);
  pdf.setTextColor(30, 41, 59);
  pdf.setFont('helvetica', 'bold');
  pdf.text(data.courseName, pageWidth / 2, 110, { align: 'center' });
  
  // Course details
  pdf.setFontSize(14);
  pdf.setTextColor(71, 85, 105);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Duration: ${data.courseHours} hours`, pageWidth / 2, 125, { align: 'center' });
  pdf.text(`Completion Date: ${data.completionDate}`, pageWidth / 2, 135, { align: 'center' });
  
  // Instructor signature area
  pdf.setFontSize(12);
  pdf.text('Instructor:', 50, 160);
  pdf.text(data.instructorName, 50, 170);
  
  // Certificate ID
  pdf.text('Certificate ID:', pageWidth - 100, 160);
  pdf.text(data.certificateId, pageWidth - 100, 170);
  
  // Footer
  pdf.setFontSize(10);
  pdf.setTextColor(148, 163, 184);
  pdf.text('RaiseUP Professional Training Platform', pageWidth / 2, pageHeight - 20, { align: 'center' });
  pdf.text('www.raiseup.com', pageWidth / 2, pageHeight - 15, { align: 'center' });
  
  return pdf.output('blob');
};

export const uploadCertificate = async (
  certificateBlob: Blob,
  fileName: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(fileName, certificateBlob, {
        contentType: 'application/pdf',
        upsert: false
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('certificates')
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading certificate:', error);
    throw new Error('Failed to upload certificate');
  }
};

export const generateAndStoreCertificate = async (
  enrollmentId: string,
  certificateData: CertificateData
): Promise<string> => {
  try {
    // Generate PDF
    const certificateBlob = await generateCertificatePDF(certificateData);
    
    // Upload to storage
    const fileName = `certificate-${certificateData.certificateId}.pdf`;
    const certificateUrl = await uploadCertificate(certificateBlob, fileName);
    
    // Store certificate record in database
    const { error } = await supabase
      .from('certificates')
      .insert({
        enrollment_id: enrollmentId,
        certificate_number: certificateData.certificateId,
        pdf_url: certificateUrl,
        issued_date: new Date().toISOString()
      });

    if (error) throw error;

    return certificateUrl;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error('Failed to generate certificate');
  }
};

export const downloadCertificate = async (certificateUrl: string, fileName: string): Promise<void> => {
  try {
    const response = await fetch(certificateUrl);
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
    console.error('Error downloading certificate:', error);
    throw new Error('Failed to download certificate');
  }
};