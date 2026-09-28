import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEFAULT_PROJECT_CATEGORIES } from '@/types';

// GET all project categories
export async function GET() {
  try {
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      const distinctCats = await prisma.project.findMany({
        select: { category: true },
        distinct: ['category'],
      });
      const dbCategories = distinctCats.map((c) => c.category).filter(Boolean);
      const combined = Array.from(new Set([...DEFAULT_PROJECT_CATEGORIES, ...dbCategories]));
      return NextResponse.json({ success: true, data: combined });
    }
  } catch (error) {
    console.warn('Database not reachable for categories GET, returning defaults:', error);
  }

  return NextResponse.json({ success: true, data: DEFAULT_PROJECT_CATEGORIES });
}

// POST new project category
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Category registered', data: { name } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json({ success: false, message: 'Failed to create category' }, { status: 500 });
  }
}

// PUT rename project category
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const oldName = typeof body?.oldName === 'string' ? body.oldName.trim() : '';
    const newName = typeof body?.newName === 'string' ? body.newName.trim() : '';

    if (!oldName || !newName) {
      return NextResponse.json(
        { success: false, message: 'Old and new category names are required' },
        { status: 400 }
      );
    }

    let affectedCount = 0;
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      try {
        const updateResult = await prisma.project.updateMany({
          where: { category: oldName },
          data: { category: newName },
        });
        affectedCount = updateResult.count;
      } catch (err) {
        console.warn('Could not update category in PostgreSQL:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Category renamed from "${oldName}" to "${newName}".`,
      affectedProjects: affectedCount,
      data: { oldName, newName }
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ success: false, message: 'Failed to update category' }, { status: 500 });
  }
}

// DELETE project category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name')?.trim();
    const fallback = searchParams.get('fallback')?.trim() || 'Web Application';

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      );
    }

    let affectedCount = 0;
    if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_')) {
      try {
        const updateResult = await prisma.project.updateMany({
          where: { category: name },
          data: { category: fallback },
        });
        affectedCount = updateResult.count;
      } catch (err) {
        console.warn('Could not reassign projects in PostgreSQL upon category deletion:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Category "${name}" deleted. Reassigned ${affectedCount} projects to "${fallback}".`,
      affectedProjects: affectedCount,
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete category' }, { status: 500 });
  }
}
