import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import {
  initialProjects,
  initialTeamMembers,
  initialBlogPosts,
  initialInquiries,
  initialServices,
  initialSiteSettings,
  initialTestimonialsData,
} from '../src/data/initialData';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Prisma Database Seeding for WebDev Software Solutions...');

  // 1. Seed Master Admin User
  const adminPasswordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: (process.env.ADMIN_EMAIL || 'admin@webdevsoftware.com').toLowerCase() },
    update: {
      name: 'Tanvir Hossain',
    },
    create: {
      name: 'Tanvir Hossain',
      email: (process.env.ADMIN_EMAIL || 'admin@webdevsoftware.com').toLowerCase(),
      passwordHash: adminPasswordHash,
      role: 'admin',
      country: 'Germany',
      company: 'WebDev Software Solutions',
      phone: '+880 1700-928374',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    },
  });
  console.log(`✅ Master Admin seeded: ${admin.email}`);

  // 2. Seed Client User
  const clientPasswordHash = await bcrypt.hash('client123', 10);
  const client = await prisma.user.upsert({
    where: { email: 'client@enterprise.com' },
    update: {},
    create: {
      name: 'Lukas Schneider (Enterprise Partner)',
      email: 'client@enterprise.com',
      passwordHash: clientPasswordHash,
      role: 'client',
      country: 'Germany',
      company: 'Bavarian Tech Logistics GmbH',
      phone: '+49 171 000000',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
  });
  console.log(`✅ Sample Client seeded: ${client.email}`);

  // 3. Seed Projects
  for (const p of initialProjects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        category: p.category,
        status: p.status,
        description: p.description,
        clientName: p.clientName,
        clientCountry: p.clientCountry,
        image: p.image,
        completionDate: p.completionDate,
        techStack: p.techStack,
        liveUrl: p.liveUrl,
        features: p.features,
        metrics: p.metrics,
      },
    });
  }
  console.log(`✅ Seeded ${initialProjects.length} Projects`);

  // 4. Seed Team Members
  for (const m of initialTeamMembers) {
    await prisma.teamMember.upsert({
      where: { email: m.email },
      update: {},
      create: {
        id: m.id,
        name: m.name,
        role: m.role,
        headline: m.headline,
        branch: m.branch,
        location: m.location,
        image: m.image,
        bio: m.bio,
        skills: m.skills,
        email: m.email,
        phone: m.phone,
        linkedin: m.linkedin,
        github: m.github,
        experienceYears: m.experienceYears,
        highlightedProjects: m.highlightedProjects || [],
        education: m.education || [],
        certifications: m.certifications || [],
        languages: m.languages || [],
      },
    });
  }
  console.log(`✅ Seeded ${initialTeamMembers.length} Team Members`);

  // 5. Seed Blogs
  for (const b of initialBlogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        id: b.id,
        title: b.title,
        slug: b.slug,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        authorRole: b.authorRole,
        authorImage: b.authorImage,
        date: b.date,
        readTime: b.readTime,
        category: b.category,
        tags: b.tags,
        image: b.image,
        likes: b.likes,
      },
    });
  }
  console.log(`✅ Seeded ${initialBlogPosts.length} Blog Posts`);

  // 6. Seed Services
  for (const s of initialServices) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        title: s.title,
        shortDesc: s.shortDesc,
        fullDesc: s.fullDesc,
        iconName: s.iconName,
        image: s.image,
        techs: s.techs,
        features: s.features,
        deliverables: s.deliverables,
      },
    });
  }
  console.log(`✅ Seeded ${initialServices.length} Services`);

  // 7. Seed Testimonials
  for (const t of initialTestimonialsData) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        role: t.role,
        company: t.company,
        avatar: t.avatar,
        country: t.country,
        flag: t.flag,
        quote: t.quote,
        rating: t.rating,
        verified: t.verified,
      },
    });
  }
  console.log(`✅ Seeded ${initialTestimonialsData.length} Testimonials`);

  // 8. Seed Site Settings
  await prisma.siteSetting.upsert({
    where: { id: 'singleton' },
    update: {},
    create: {
      id: 'singleton',
      companyName: initialSiteSettings.companyName,
      tagline: initialSiteSettings.tagline,
      logoUrl: initialSiteSettings.logoUrl,
      email: initialSiteSettings.email,
      phone_bd: initialSiteSettings.phone_bd,
      phone_de: initialSiteSettings.phone_de,
      address_bd: initialSiteSettings.address_bd,
      address_de: initialSiteSettings.address_de,
      socialLinks: initialSiteSettings.socialLinks as any,
      heroSlides: (initialSiteSettings.heroSlides || []) as any,
      privacyPolicy: initialSiteSettings.privacyPolicy,
      termsOfService: initialSiteSettings.termsOfService,
      footerAboutText: initialSiteSettings.footerAboutText,
      gdprBadgeText: initialSiteSettings.gdprBadgeText,
    },
  });
  console.log('✅ Seeded Site Settings');

  console.log('🎉 Seeding successfully completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
