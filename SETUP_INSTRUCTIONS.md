# ZUTO GeoTech Solutions - Setup Instructions

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account with database access
- Your Pest & Disease Classification API endpoint

## Step 1: Environment Configuration

Create a `.env` file in the root directory with your Supabase credentials:



## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in the root directory
   - Restart the development server after creating `.env`

2. **Database Connection Errors**
   - Verify Supabase URL and key in `.env`
   - Check if database schema was created successfully

3. **Image Upload Failures**
   - Ensure storage buckets are created
   - Check storage policies are in place

4. **Authentication Issues**
   - Verify Supabase authentication is enabled
   - Check if email confirmation is required

### Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all SQL commands executed successfully
3. Ensure environment variables are correctly set
4. Check Supabase dashboard for any policy errors

## Deployment

### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Add environment variables in Netlify dashboard
4. Deploy

## Security Notes

- Environment variables are prefixed with `VITE_` for client-side access
- Row Level Security (RLS) ensures users can only access their own data
- Supabase handles authentication securely
- Images are stored in Supabase Storage with proper access controls

## Next Steps

1. Customize the UI to match your brand
2. Add more services as needed
3. Implement additional features like export functionality
4. Set up monitoring and analytics
5. Configure backup and recovery procedures
