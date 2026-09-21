import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { initialInquiries } from '@/data/initialData';

// GET all inquiries (Admin CMS)
export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const dbInquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' }
      });
      if (dbInquiries && dbInquiries.length > 0) {
        return NextResponse.json({ success: true, source: 'postgresql', data: dbInquiries });
      }
    }
  } catch (error) {
    console.warn('PostgreSQL not accessible for inquiries GET:', error);
  }

  return NextResponse.json({ success: true, source: 'fallback', data: initialInquiries });
}

// POST new inquiry (Contact forms / Client inquiries)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, firstName, lastName, email, company, service, projectType, budget, message, phone, phoneNumber, targetMarket } = body;

    const resolvedFirst = firstName || (name ? name.trim().split(' ')[0] : 'Client');
    const resolvedLast = lastName || (name && name.trim().split(' ').length > 1 ? name.trim().split(' ').slice(1).join(' ') : 'Inquirer');
    const resolvedEmail = (email || '').trim().toLowerCase();
    const resolvedPhone = phoneNumber || phone || '+49 000 000000';

    if (!resolvedEmail || !message) {
      return NextResponse.json(
        { success: false, message: 'Email and message are required' },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const created = await prisma.inquiry.create({
        data: {
          id: `inq-${Date.now()}`,
          firstName: resolvedFirst,
          lastName: resolvedLast,
          email: resolvedEmail,
          phoneNumber: resolvedPhone,
          company: company ? company.trim() : null,
          projectType: projectType || service || 'Full Stack & MERN',
          budget: budget || '€5,000 - €15,000',
          currency: 'EUR',
          timezone: 'CET (UTC+1)',
          ndaRequested: false,
          targetMarket: targetMarket || 'Germany',
          message: (message || '').trim(),
          status: 'new',
        }
      });

      return NextResponse.json({
        success: true,
        message: 'Inquiry received and saved to database.',
        data: created
      }, { status: 201 });
    }

    // Demo fallback
    const fallbackInquiry = {
      id: `inq-${Date.now()}`,
      name: `${resolvedFirst} ${resolvedLast}`,
      email: resolvedEmail,
      country: targetMarket || 'Germany',
      company: company || null,
      service: projectType || service || 'Full Stack & MERN',
      budget: budget || '€5,000 - €15,000',
      message: message || '',
      phone: resolvedPhone,
      date: new Date().toISOString().split('T')[0],
      status: 'new' as const,
    };

    return NextResponse.json({
      success: true,
      message: 'Inquiry received.',
      data: fallbackInquiry
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record inquiry' },
      { status: 500 }
    );
  }
}
