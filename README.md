# RaiseUP - Professional Training Platform

A comprehensive full-stack training platform similar to Leoron and Koenig Solutions, built with React, TypeScript, and Supabase.

## 🚀 Features

### Frontend Features
- **Modern React Application** with TypeScript and Vite
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **User Authentication** - Sign up, login, password reset with role-based access
- **Course Catalog** - Browse, search, and filter courses
- **Shopping Cart** - Add courses to cart and checkout
- **Payment Integration** - Stripe payment processing
- **User Dashboard** - Track progress, view certificates
- **Admin Panel** - Manage users, courses, and enrollments
- **Blog System** - Articles with categories and tags
- **SEO Optimized** - Meta tags, structured data, sitemap
- **Accessibility** - WCAG 2.1 compliant with skip links and ARIA labels

### Backend Features
- **Supabase Backend** - PostgreSQL database with real-time subscriptions
- **Row Level Security** - Secure data access with RLS policies
- **File Storage** - Secure file uploads for course materials and certificates
- **Email Notifications** - Automated emails for registration and course updates
- **API Documentation** - Auto-generated API docs with TypeScript types

### Database Schema
- Users and Profiles management
- Courses with categories and instructors
- Enrollments and progress tracking
- Payments and order management
- Blog posts with tags
- Certificates generation

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Storage, Edge Functions)
- **State Management**: TanStack Query, React Context
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest, React Testing Library
- **Deployment**: Docker, Nginx

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account (for payments)

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd raiseup-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Fill in your Supabase and Stripe credentials in `.env`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Set up Supabase**
- Create a new Supabase project
- Run the migration files in `supabase/migrations/`
- Set up authentication providers
- Configure storage buckets for file uploads

5. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with UI:
```bash
npm run test:ui
```

## 🏗️ Building for Production

1. **Build the application**
```bash
npm run build
```

2. **Preview the build**
```bash
npm run preview
```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start services**
```bash
docker-compose up -d
```

This will start:
- The React application on port 3000
- PostgreSQL database on port 5432 (optional for local development)

### Using Docker only

1. **Build the image**
```bash
docker build -t raiseup-platform .
```

2. **Run the container**
```bash
docker run -p 3000:80 raiseup-platform
```

## ☁️ Cloud Deployment

### Vercel (Recommended for Frontend)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables in Netlify dashboard

### AWS/DigitalOcean

Use the Docker setup with your preferred cloud provider's container service.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | Yes |

### Supabase Setup

1. **Database Schema**: Run migrations in `supabase/migrations/`
2. **Authentication**: Enable email/password auth
3. **Storage**: Create buckets for course materials and certificates
4. **Edge Functions**: Deploy functions for payment processing

### Stripe Setup

1. Create a Stripe account
2. Get your publishable and secret keys
3. Set up webhooks for payment events
4. Configure products and pricing

## 📚 API Documentation

The application uses Supabase's auto-generated APIs. Key endpoints include:

- **Authentication**: `/auth/v1/`
- **Database**: `/rest/v1/`
- **Storage**: `/storage/v1/`
- **Edge Functions**: `/functions/v1/`

TypeScript types are automatically generated from the database schema.

## 🧪 Testing Strategy

- **Unit Tests**: Component and hook testing with Vitest
- **Integration Tests**: API and database testing
- **E2E Tests**: User flow testing (can be added with Playwright)

## 🔒 Security

- **Row Level Security**: Database-level access control
- **Authentication**: Secure JWT-based auth with Supabase
- **HTTPS**: SSL/TLS encryption in production
- **Input Validation**: Zod schema validation
- **XSS Protection**: Content Security Policy headers

## 🎯 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Responsive images with proper formats
- **Caching**: Browser and CDN caching strategies
- **Bundle Analysis**: Webpack bundle analyzer for optimization

## 🌐 SEO & Accessibility

- **Meta Tags**: Dynamic meta tags for each page
- **Structured Data**: JSON-LD for search engines
- **Accessibility**: WCAG 2.1 AA compliance
- **Semantic HTML**: Proper heading structure and landmarks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Email: support@raiseup.com
- Documentation: [docs.raiseup.com](https://docs.raiseup.com)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Video streaming integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] AI-powered course recommendations
- [ ] Live virtual classrooms
- [ ] Advanced reporting and analytics
- [ ] Integration with popular LMS platforms