# Health Blueprint Form

A Next.js application for creating personalized 90-day health plans. Students complete a multi-step form to build their health blueprint with goal setting, tracking metrics, and community integration.

## Features

- **Multi-step form** with progress tracking and auto-save
- **Magic link authentication** - no passwords required
- **Database persistence** - users can return to edit their blueprint
- **Alumni community integration** with gro.witus.online
- **PDF download** of completed blueprints
- **Next course enrollment** funnel
- **Type-safe** implementation with TypeScript and Zod validation

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Database:** PostgreSQL with Prisma ORM
- **Styling:** Tailwind CSS
- **Authentication:** Magic link via email
- **Email:** Nodemailer with SMTP
- **Icons:** Heroicons
- **Validation:** Zod

## Installation

1. **Clone the repository**
```bash
git clone [https://github.com/dapperAuteur/my-health-blueprint/](https://github.com/dapperAuteur/my-health-blueprint/)
cd my-health-blueprint
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create `.env.local`:
```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/health_blueprint_db"

# Authentication
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email (Mailgun example)
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@your-domain.mailgun.org
SMTP_PASS=your-mailgun-password
FROM_EMAIL=noreply@your-domain.mailgun.org
```

4. **Set up database**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Start development server**
```bash
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/db` |
| `NEXTAUTH_SECRET` | Random secret for auth | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL | `http://localhost:3000` |
| `SMTP_HOST` | Email server host | `smtp.mailgun.org` |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email username | `postmaster@domain.mailgun.org` |
| `SMTP_PASS` | Email password/API key | Your email service password |
| `FROM_EMAIL` | Sender email address | `noreply@yourdomain.com` |

## Email Service Setup

### Mailgun (Recommended)
1. Sign up at [mailgun.com](https://mailgun.com)
2. Go to Sending → Domains → Your Domain → SMTP
3. Copy credentials to environment variables

### Gmail (Development)
1. Enable 2FA on Gmail account
2. Generate App Password in Google Account settings
3. Use app password as `SMTP_PASS`

### Other Services
- **Resend:** Professional, great deliverability
- **SendGrid:** Popular, scalable
- **AWS SES:** Enterprise-grade

## Database Schema

### Core Models
- **User:** Email-based user accounts
- **HealthBlueprint:** Complete form responses
- **MagicToken:** Email authentication tokens

### Key Features
- JSON fields for flexible form data storage
- Automatic timestamps and user relationships
- Cascade deletion for data consistency

## User Flow

1. **Landing Page:** User enters email
2. **Magic Link:** Secure link sent via email
3. **Verification:** Token validated, user logged in
4. **Form:** Multi-step blueprint creation with auto-save
5. **Completion:** PDF download, community invitation
6. **Next Course:** Enrollment funnel for advanced training

## Form Structure

The Health Blueprint form includes 9 steps:

1. **Health Goals** - Top 3 personal health objectives
2. **Key Metrics** - 3-5 numbers to track regularly
3. **90-Day Plan** - Progressive monthly action plans
4. **Why Statement** - Personal motivation and benefits
5. **Support System** - Health buddies and family support
6. **Obstacles** - Challenge planning and solutions
7. **Resources** - Apps, equipment, learning materials
8. **Celebration** - Reward system for milestones
9. **Commitment** - Final review and commitments

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/magic-link` | POST | Send magic link email |
| `/api/auth/verify` | POST | Verify magic link token |
| `/api/health-blueprint` | POST | Save/update blueprint |
| `/api/health-blueprint/[userId]` | GET | Load user's blueprint |
| `/api/users/[userId]` | GET | Verify user exists |

## Development

### Database Commands
```bash
# Create migration
npx prisma migrate dev --name migration_name

# Reset database
npx prisma migrate reset

# View database
npx prisma studio
```

### Code Quality
- TypeScript for type safety
- Zod for runtime validation
- Prisma for database operations
- ESLint and Prettier configured

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Add environment variables in dashboard
3. Deploy automatically on push

### Database Options
- **Vercel Postgres** - Integrated with Vercel
- **PlanetScale** - Serverless MySQL
- **Railway** - Simple PostgreSQL hosting
- **Supabase** - PostgreSQL with additional features

### Production Checklist
- [ ] Set up production database
- [ ] Configure email service with domain verification
- [ ] Set secure `NEXTAUTH_SECRET`
- [ ] Update `NEXTAUTH_URL` to production domain
- [ ] Set up DNS records for email deliverability
- [ ] Test magic link flow end-to-end

## Integration

### Alumni Community
- Form completion redirects to `gro.witus.online`
- Community setup included in success page
- Health buddy pairing system

### Course Progression
- Graduates get 25% discount on "Intervention Design" course
- Enrollment tracking for conversion analytics
- Seamless transition from foundational to advanced training

## Support

### Common Issues
- **Magic links not working:** Check SMTP credentials and spam folders
- **Database connection:** Verify `DATABASE_URL` format
- **Form not saving:** Check browser console for API errors

### Monitoring
- Track form completion rates
- Monitor email delivery success
- Measure course conversion rates
- Alumni community engagement metrics

## License

MIT License - See LICENSE file for details

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request