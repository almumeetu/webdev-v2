import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSessionUser, requireAdmin } from '@/lib/auth';

// GET all inquiries (Admin CMS)
export async function GET() {
  const authResponse = await requireAdmin();
  if (authResponse) return authResponse;
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const dbInquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return NextResponse.json({ success: true, source: 'postgresql', data: dbInquiries }, {
        headers: { 'Cache-Control': 'private, no-store' },
      });
    }
  } catch (error) {
    console.warn('PostgreSQL not accessible for inquiries GET:', error);
  }

  return NextResponse.json({ success: false, message: 'Inquiry service is unavailable.' }, { status: 503 });
}

// POST new inquiry (Contact forms / Client inquiries)
export async function POST(request: Request) {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your_')) {
    return NextResponse.json({ success: false, message: 'Inquiry service is unavailable.' }, { status: 503 });
  }
  try {
    const body = await request.json();
    const {
      name, firstName, lastName, email, company, service, projectType, budget, message,
      phone, phoneNumber, targetMarket, currency, timezone, ndaRequested,
    } = body;

    const cleanName = typeof name === 'string' ? name.trim() : '';
    const resolvedFirst = typeof firstName === 'string' && firstName.trim()
      ? firstName.trim()
      : cleanName.split(/\s+/)[0] || 'Client';
    const resolvedLast = typeof lastName === 'string' && lastName.trim()
      ? lastName.trim()
      : cleanName.split(/\s+/).slice(1).join(' ') || 'Inquirer';
    const resolvedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
    const resolvedPhone = typeof phoneNumber === 'string' ? phoneNumber.trim() : typeof phone === 'string' ? phone.trim() : '';

    if (!resolvedEmail || resolvedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolvedEmail) || typeof message !== 'string' || !message.trim() || message.length > 10_000) {
      return NextResponse.json(
        { success: false, message: 'Email and message are required' },
        { status: 400 }
      );
    }

    const sessionUser = await getSessionUser().catch(() => null);
    const created = await prisma.inquiry.create({
      data: {
        firstName: String(resolvedFirst).slice(0, 120),
        lastName: String(resolvedLast).slice(0, 120),
        email: resolvedEmail,
        phoneNumber: resolvedPhone.slice(0, 80),
        company: typeof company === 'string' && company.trim() ? company.trim().slice(0, 160) : null,
        projectType: String(projectType || service || 'Full Stack & MERN').slice(0, 160),
        budget: String(budget || '€5,000 - €15,000').slice(0, 100),
        currency: typeof currency === 'string' ? currency.slice(0, 40) : 'EUR',
        timezone: typeof timezone === 'string' ? timezone.slice(0, 80) : 'CET (UTC+1)',
        ndaRequested: ndaRequested === true,
        targetMarket: String(targetMarket || 'Germany').slice(0, 80),
        message: message.trim(),
        status: 'new',
        userId: sessionUser?.id,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Inquiry received and saved.',
      inquiry: created,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to record inquiry' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    const allowedStatuses = ['new', 'contacted', 'in_progress', 'completed'];
    if (!id || !allowedStatuses.includes(body?.status)) {
      return NextResponse.json({ success: false, message: 'Valid inquiry ID and status are required.' }, { status: 400 });
    }
    const updated = await prisma.inquiry.update({ where: { id }, data: { status: body.status } });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Could not update inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to update inquiry.' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;
  try {
    const id = new URL(request.url).searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, message: 'Inquiry ID is required.' }, { status: 400 });
    await prisma.inquiry.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Could not delete inquiry:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete inquiry.' }, { status: 500 });
  }
}
