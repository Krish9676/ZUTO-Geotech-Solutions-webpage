# Setup Instructions for Tovi Geotech Solutions

## Prerequisites
- Node.js 16+ and npm
- Git
- Supabase account (for authentication and database)
- Pest Disease Detection API endpoint

## Quick Start

### 1. Clone and Install
```bash
git clone <your-repo-url>
cd tovi-geotech-solutions
npm install
```

### 2. Environment Configuration
Create a `.env` file in the root directory:

```bash
# Copy example file (if available)
cp .env.example .env

# Or create manually
touch .env
```

Add your environment variables to `.env`:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Pest Disease Detection API
VITE_PEST_DISEASE_API_URL=https://your-api-endpoint.com

# Optional: Database URL (if using external database)
DATABASE_URL=your-database-connection-string
```

### 3. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Security Configuration

### Environment Variables
- **Never commit `.env` files** - They're automatically ignored by `.gitignore`
- **Use Netlify's environment variable management** for production deployments
- **Rotate API keys regularly** for security

### Netlify Deployment
The project includes `netlify.toml` with proper secrets scanning:
- Secrets scanning is enabled for security
- Build output directory is excluded from scanning
- Specific environment variables are excluded from scanning

## Troubleshooting

### Build Failures
If you encounter build failures related to secrets scanning:

1. **Check for hardcoded URLs/keys** in your source code
2. **Ensure all sensitive data** is in environment variables
3. **Verify `.env` file** is not committed to version control
4. **Check Netlify configuration** in `netlify.toml`

### Common Issues
- **"API URL not configured"**: Set `VITE_PEST_DISEASE_API_URL` in your `.env`
- **"Supabase not configured"**: Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- **Build errors**: Ensure all environment variables are properly set

## Production Deployment

### Netlify
1. Connect your GitHub repository
2. Set environment variables in Netlify dashboard
3. Deploy automatically on push to main branch

### Vercel
1. Import your GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Support
For issues related to:
- **Environment setup**: Check this document
- **Build errors**: Check Netlify/Vercel logs
- **Security concerns**: Review environment variable configuration
