import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { initialSiteSettings } from '@/data/initialData';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/auth';
import type { SiteSettings } from '@/types';

function toPublicSettings(row: {
  companyName: string;
  tagline: string;
  logoUrl: string;
  email: string;
  phone_bd: string;
  phone_de: string;
  address_bd: string;
  address_de: string;
  socialLinks: Prisma.JsonValue;
  heroSlides: Prisma.JsonValue;
  privacyPolicy: string;
  termsOfService: string;
  footerAboutText: string;
  gdprBadgeText: string;
}): SiteSettings {
  const socialLinks = row.socialLinks && typeof row.socialLinks === 'object' && !Array.isArray(row.socialLinks)
    ? row.socialLinks as SiteSettings['socialLinks']
    : initialSiteSettings.socialLinks;

  return {
    companyName: row.companyName,
    tagline: row.tagline,
    logoUrl: row.logoUrl,
    email: row.email,
    phone_bd: row.phone_bd,
    phone_de: row.phone_de,
    address_bd: row.address_bd,
    address_de: row.address_de,
    socialLinks,
    heroSlides: Array.isArray(row.heroSlides) ? row.heroSlides as unknown as SiteSettings['heroSlides'] : initialSiteSettings.heroSlides,
    privacyPolicy: row.privacyPolicy,
    termsOfService: row.termsOfService,
    footerAboutText: row.footerAboutText,
    gdprBadgeText: row.gdprBadgeText,
  };
}

function boundedString(value: unknown, fallback: string, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : fallback;
}

export async function GET() {
  try {
    const row = await prisma.siteSetting.findUnique({ where: { id: 'singleton' } });
    return NextResponse.json({ success: true, data: row ? toPublicSettings(row) : initialSiteSettings });
  } catch (error) {
    console.error('Could not load site settings:', error);
    return NextResponse.json({ success: true, data: initialSiteSettings, source: 'default' });
  }
}

export async function PUT(request: Request) {
  const authResponse = await requireAdmin(request);
  if (authResponse) return authResponse;

  let body: Partial<SiteSettings>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid request body.' }, { status: 400 });
  }

  try {
    const current = await prisma.siteSetting.findUnique({ where: { id: 'singleton' } });
    const base = current ? toPublicSettings(current) : initialSiteSettings;
    const socialLinks = body.socialLinks && typeof body.socialLinks === 'object'
      ? { ...base.socialLinks, ...body.socialLinks }
      : base.socialLinks;
    const heroSlides = Array.isArray(body.heroSlides) ? body.heroSlides.slice(0, 8) : base.heroSlides;
    const data = {
      companyName: boundedString(body.companyName, base.companyName, 160),
      tagline: boundedString(body.tagline, base.tagline, 300),
      logoUrl: boundedString(body.logoUrl, base.logoUrl, 2048),
      email: boundedString(body.email, base.email, 254),
      phone_bd: boundedString(body.phone_bd, base.phone_bd, 80),
      phone_de: boundedString(body.phone_de, base.phone_de, 80),
      address_bd: boundedString(body.address_bd, base.address_bd, 500),
      address_de: boundedString(body.address_de, base.address_de, 500),
      socialLinks: socialLinks as Prisma.InputJsonValue,
      heroSlides: heroSlides as unknown as Prisma.InputJsonValue,
      privacyPolicy: boundedString(body.privacyPolicy, base.privacyPolicy, 100_000),
      termsOfService: boundedString(body.termsOfService, base.termsOfService, 100_000),
      footerAboutText: boundedString(body.footerAboutText, base.footerAboutText, 10_000),
      gdprBadgeText: boundedString(body.gdprBadgeText, base.gdprBadgeText, 500),
    };

    const saved = await prisma.siteSetting.upsert({
      where: { id: 'singleton' },
      create: { id: 'singleton', ...data },
      update: data,
    });
    return NextResponse.json({ success: true, data: toPublicSettings(saved) });
  } catch (error) {
    console.error('Could not save site settings:', error);
    return NextResponse.json({ success: false, message: 'Failed to save site settings.' }, { status: 500 });
  }
}
