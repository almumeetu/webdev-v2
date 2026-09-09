import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialProjects, initialTeam, initialBlogs } from './src/data/initialData.ts';
import { Project, TeamMember, BlogPost, Inquiry } from './src/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent data store with initial seed
let projects: Project[] = [...initialProjects];
let teamMembers: TeamMember[] = [...initialTeam];
let blogPosts: BlogPost[] = [...initialBlogs];
let inquiries: Inquiry[] = [
  {
    id: 'inq-1',
    firstName: 'Maximilian',
    lastName: 'Müller',
    email: 'm.mueller@bavaria-logistics.de',
    phoneNumber: '+49 171 4920194',
    company: 'Bavaria Logistics GmbH',
    projectType: 'Full Stack & MERN',
    budget: '€15,000 - €25,000',
    targetMarket: 'Germany',
    message: 'We require a customized real-time fleet dispatch dashboard with high security and integration with our SAP warehouse backend.',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'in_progress'
  },
  {
    id: 'inq-2',
    firstName: 'Ariful',
    lastName: 'Islam',
    email: 'ariful.trade@dhaka-export.com',
    phoneNumber: '+880 1819-482910',
    company: 'Bengal Trade Global',
    projectType: 'E-Commerce',
    budget: '$5,000 - $10,000',
    targetMarket: 'International',
    message: 'Need a multi-currency export marketplace built on Shopify Plus or custom MERN with bKash and Stripe payments.',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'new'
  }
];

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Projects API
app.get('/api/projects', (req: Request, res: Response) => {
  const { category, status } = req.query;
  let filtered = [...projects];
  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }
  if (status && (status === 'completed' || status === 'ongoing')) {
    filtered = filtered.filter(p => p.status === status);
  }
  res.json(filtered);
});

app.get('/api/projects/:id', (req: Request, res: Response) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

app.post('/api/projects', (req: Request, res: Response) => {
  const newProject: Project = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    category: req.body.category || 'Web Application',
    status: req.body.status || 'ongoing',
    description: req.body.description || '',
    clientName: req.body.clientName || 'Private Client',
    clientCountry: req.body.clientCountry || 'International',
    image: req.body.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    completionDate: req.body.completionDate || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    techStack: Array.isArray(req.body.techStack) ? req.body.techStack : ['React', 'Node.js'],
    liveUrl: req.body.liveUrl || '',
    features: Array.isArray(req.body.features) ? req.body.features : ['Responsive architecture', 'Secure API'],
    metrics: req.body.metrics || ''
  };
  projects.unshift(newProject);
  res.status(201).json(newProject);
});

app.put('/api/projects/:id', (req: Request, res: Response) => {
  const index = projects.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Project not found' });
  projects[index] = { ...projects[index], ...req.body };
  res.json(projects[index]);
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  projects = projects.filter(p => p.id !== req.params.id);
  res.json({ success: true, message: 'Project deleted' });
});

// Team API
app.get('/api/team', (req: Request, res: Response) => {
  res.json(teamMembers);
});

app.post('/api/team', (req: Request, res: Response) => {
  const newMember: TeamMember = {
    id: `team-${Date.now()}`,
    name: req.body.name || 'New Specialist',
    role: req.body.role || 'Full-Stack Engineer',
    branch: req.body.branch || 'Joypurhat, Bangladesh',
    image: req.body.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    bio: req.body.bio || '',
    skills: Array.isArray(req.body.skills) ? req.body.skills : ['TypeScript', 'React'],
    email: req.body.email || 'team@webdevsoftware.com',
    phone: req.body.phone || '',
    experienceYears: Number(req.body.experienceYears) || 3
  };
  teamMembers.push(newMember);
  res.status(201).json(newMember);
});

app.delete('/api/team/:id', (req: Request, res: Response) => {
  teamMembers = teamMembers.filter(m => m.id !== req.params.id);
  res.json({ success: true });
});

// Blogs API
app.get('/api/blogs', (req: Request, res: Response) => {
  res.json(blogPosts);
});

app.get('/api/blogs/:id', (req: Request, res: Response) => {
  const blog = blogPosts.find(b => b.id === req.params.id || b.slug === req.params.id);
  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  res.json(blog);
});

app.post('/api/blogs', (req: Request, res: Response) => {
  const newBlog: BlogPost = {
    id: `blog-${Date.now()}`,
    title: req.body.title || 'New Technology Insight',
    slug: (req.body.title || 'tech-insight').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    excerpt: req.body.excerpt || '',
    content: req.body.content || '',
    author: req.body.author || 'WebDev Engineering Team',
    authorRole: req.body.authorRole || 'Senior Engineer',
    authorImage: req.body.authorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: `${Math.max(3, Math.ceil((req.body.content?.length || 500) / 400))} min read`,
    category: req.body.category || 'Web Application',
    tags: Array.isArray(req.body.tags) ? req.body.tags : ['Software', 'Full Stack'],
    image: req.body.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80',
    likes: 12
  };
  blogPosts.unshift(newBlog);
  res.status(201).json(newBlog);
});

app.delete('/api/blogs/:id', (req: Request, res: Response) => {
  blogPosts = blogPosts.filter(b => b.id !== req.params.id);
  res.json({ success: true });
});

// Inquiries / Project Leads (Submitted from "Got an App in Mind?" or contact form)
app.get('/api/inquiries', (req: Request, res: Response) => {
  res.json(inquiries);
});

app.post('/api/inquiries', (req: Request, res: Response) => {
  const newInquiry: Inquiry = {
    id: `inq-${Date.now()}`,
    firstName: req.body.firstName || 'Anonymous',
    lastName: req.body.lastName || '',
    email: req.body.email || '',
    phoneNumber: req.body.phoneNumber || '',
    company: req.body.company || '',
    projectType: req.body.projectType || 'Full Stack & MERN',
    budget: req.body.budget || 'Flexible',
    targetMarket: req.body.targetMarket || 'International',
    message: req.body.message || '',
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  inquiries.unshift(newInquiry);
  res.status(201).json({ success: true, inquiry: newInquiry });
});

app.patch('/api/inquiries/:id', (req: Request, res: Response) => {
  const inq = inquiries.find(i => i.id === req.params.id);
  if (!inq) return res.status(404).json({ error: 'Inquiry not found' });
  if (req.body.status) inq.status = req.body.status;
  res.json(inq);
});

// Dashboard Stats API
app.get('/api/stats', (req: Request, res: Response) => {
  res.json({
    totalProjects: projects.length,
    completedProjects: projects.filter(p => p.status === 'completed').length,
    ongoingProjects: projects.filter(p => p.status === 'ongoing').length,
    teamSize: teamMembers.length,
    germanProjects: projects.filter(p => p.clientCountry === 'Germany').length,
    bangladeshProjects: projects.filter(p => p.clientCountry === 'Bangladesh').length,
    internationalProjects: projects.filter(p => p.clientCountry === 'International' || p.clientCountry === 'USA' || p.clientCountry === 'Europe').length,
    inquiriesCount: inquiries.length,
    newInquiriesCount: inquiries.filter(i => i.status === 'new').length
  });
});

// Google Authentication Endpoint (Simulated & Token Bridge)
app.post('/api/auth/google', (req: Request, res: Response) => {
  const { credential, email, name, picture } = req.body;
  // Support both direct client token or simulate authenticated Google user
  const user = {
    id: `user-${Date.now()}`,
    name: name || 'Google Enterprise User',
    email: email || 'enterprise.client@example.com',
    avatar: picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    role: email?.includes('admin') || email === 'tanvir@webdevsoftware.com' || email === 'almumeetu@gmail.com' ? 'admin' : 'client',
    company: 'International Tech Partner',
    country: 'Germany',
    authProvider: 'google',
    signedInAt: new Date().toISOString()
  };
  res.json({ success: true, user, token: `g-jwt-${Date.now()}` });
});

// ==================== SERVER START & VITE MIDDLEWARE ====================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WebDev Software Solutions Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
