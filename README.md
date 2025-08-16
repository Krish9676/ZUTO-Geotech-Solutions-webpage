# ZUTO GeoTech Solutions

AI-Powered AgriTech SaaS Platform

## Overview
ZUTO GeoTech Solutions offers a modern, modular, and cost-free AgriTech SaaS platform. It features five microservices—Pest & Disease ID, Anomaly Detection, Soil Mapping, Traceability, and Weather Risk—built on open-source technology. The platform is designed for scalability, API-first integration, and future-proof agriculture solutions.

## Features
- **Hero Section:** Stunning drone-shot farmland sunrise, bold headline, and CTAs
- **Key Benefits:** Cost-Free, Modular & API-First, Future-Proof & Scalable
- **Services Overview:** Five microservices with illustrations and details
- **Live Demo Widget:** Upload and analyze images for pest/disease detection
- **Architecture Diagram:** Visualizes cloud-native, modular architecture
- **API Docs Preview:** OpenAPI/Swagger UI screenshot and features
- **Pricing Table:** Free tier and upgrade options
- **Testimonials:** Carousel of customer quotes and pilot partner logos
- **Tech Grid:** Logos of core open-source technologies
- **Contact Section:** Email and LinkedIn for inquiries

## Tech Stack
- React + Vite
- Tailwind CSS
- SVG/PNG illustrations (unDraw, Heroicons, Unsplash)
- Framer Motion (for animations, optional)

## Getting Started
1. **Clone the repo:**
   ```sh
   git clone https://github.com/Krish9676/zuto-geotech-solutions.git
   cd zuto-geotech-solutions
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   ```sh
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your actual values
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_PEST_DISEASE_API_URL=your_pest_disease_api_url
   ```
4. **Run locally:**
   ```sh
   npm run dev
   ```
   Visit [http://localhost:5173](http://localhost:5173)

## Security & Environment Variables

### Required Environment Variables
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `VITE_PEST_DISEASE_API_URL`: Your pest disease detection API endpoint

### Security Best Practices
- ✅ **Never commit `.env` files** - They're already in `.gitignore`
- ✅ **Use environment variables** for all sensitive configuration
- ✅ **Rotate API keys regularly** for production deployments
- ✅ **Use Netlify's built-in environment variable management** for deployment

### Netlify Deployment
The project includes `netlify.toml` with proper secrets scanning configuration:
- Secrets scanning is enabled for security
- Specific environment variables are excluded from scanning
- Build output directory is excluded from scanning

## Deployment
- Deploy easily to [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
- Connect your GitHub repo and follow the platform instructions

## Contact
- **Email:** [gopik8023@gmail.com](mailto:gopik8023@gmail.com)
- **LinkedIn:** [Gopi Krishna N](https://www.linkedin.com/in/gopi-krishna-n-960117174/)

---

© 2025 ZUTO GeoTech Solutions. All rights reserved.