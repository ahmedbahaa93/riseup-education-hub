import { supabase } from '@/integrations/supabase/client';

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface WelcomeEmailData {
  firstName: string;
  email: string;
}

export interface CourseEnrollmentEmailData {
  firstName: string;
  courseName: string;
  instructorName: string;
  startDate?: string;
}

export interface CertificateEmailData {
  firstName: string;
  courseName: string;
  certificateUrl: string;
}

export interface PasswordResetEmailData {
  firstName: string;
  resetUrl: string;
}

export const emailTemplates = {
  welcome: (data: WelcomeEmailData): EmailTemplate => ({
    to: data.email,
    subject: 'Welcome to RaiseUP - Your Learning Journey Begins!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to RaiseUP!</h1>
        </div>
        <div style="padding: 40px 20px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${data.firstName}!</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Thank you for joining RaiseUP, your premier destination for professional training and development.
          </p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
            You now have access to our comprehensive library of courses designed to advance your career and skills.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/courses" 
               style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Explore Courses
            </a>
          </div>
          <p style="color: #475569; line-height: 1.6;">
            If you have any questions, feel free to contact our support team.
          </p>
        </div>
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © 2024 RaiseUP. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Welcome to RaiseUP, ${data.firstName}! Thank you for joining our platform. Explore our courses at ${window.location.origin}/courses`
  }),

  courseEnrollment: (data: CourseEnrollmentEmailData): EmailTemplate => ({
    to: data.email,
    subject: `Course Enrollment Confirmed - ${data.courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669, #047857); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Enrollment Confirmed!</h1>
        </div>
        <div style="padding: 40px 20px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${data.firstName}!</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Congratulations! You have successfully enrolled in <strong>${data.courseName}</strong>.
          </p>
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #059669;">
            <h3 style="color: #1e293b; margin-top: 0;">Course Details:</h3>
            <p style="margin: 5px 0;"><strong>Course:</strong> ${data.courseName}</p>
            <p style="margin: 5px 0;"><strong>Instructor:</strong> ${data.instructorName}</p>
            ${data.startDate ? `<p style="margin: 5px 0;"><strong>Start Date:</strong> ${data.startDate}</p>` : ''}
          </div>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/dashboard" 
               style="background: #059669; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Access Course
            </a>
          </div>
        </div>
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © 2024 RaiseUP. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Enrollment confirmed for ${data.courseName}. Access your course at ${window.location.origin}/dashboard`
  }),

  certificate: (data: CertificateEmailData): EmailTemplate => ({
    to: data.email,
    subject: `Certificate of Completion - ${data.courseName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #7c3aed, #6d28d9); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Congratulations!</h1>
        </div>
        <div style="padding: 40px 20px; background: #f8fafc;">
          <h2 style="color: #1e293b; margin-bottom: 20px;">Hello ${data.firstName}!</h2>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 20px;">
            Congratulations on successfully completing <strong>${data.courseName}</strong>!
          </p>
          <p style="color: #475569; line-height: 1.6; margin-bottom: 30px;">
            Your certificate of completion is now ready for download.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${data.certificateUrl}" 
               style="background: #7c3aed; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Download Certificate
            </a>
          </div>
          <p style="color: #475569; line-height: 1.6;">
            Share your achievement on LinkedIn and showcase your new skills to your network!
          </p>
        </div>
        <div style="background: #1e293b; padding: 20px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © 2024 RaiseUP. All rights reserved.
          </p>
        </div>
      </div>
    `,
    text: `Congratulations on completing ${data.courseName}! Download your certificate: ${data.certificateUrl}`
  })
};

export const sendEmail = async (template: EmailTemplate): Promise<void> => {
  try {
    // In a real implementation, you would use a service like:
    // - Supabase Edge Functions with Resend/SendGrid
    // - AWS SES
    // - Mailgun
    // - SendGrid directly
    
    console.log('Sending email:', template);
    
    // For now, we'll simulate sending the email
    // In production, replace this with actual email service integration
    
    // Example with Supabase Edge Function:
    // const { error } = await supabase.functions.invoke('send-email', {
    //   body: template
    // });
    
    // if (error) throw error;
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Email sent successfully to:', template.to);
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendWelcomeEmail = async (data: WelcomeEmailData): Promise<void> => {
  const template = emailTemplates.welcome(data);
  await sendEmail(template);
};

export const sendCourseEnrollmentEmail = async (data: CourseEnrollmentEmailData): Promise<void> => {
  const template = emailTemplates.courseEnrollment(data);
  await sendEmail(template);
};

export const sendCertificateEmail = async (data: CertificateEmailData): Promise<void> => {
  const template = emailTemplates.certificate(data);
  await sendEmail(template);
};