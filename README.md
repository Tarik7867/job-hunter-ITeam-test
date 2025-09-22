# JobHunt - Modern Job Search Application

A beautiful, professional job search platform built with React, TypeScript, and Tailwind CSS. This application provides an intuitive interface for job seekers to discover, save, and apply for their dream positions.

## 🚀 Features

### Core Functionality
- **Job Search**: Search for jobs by title, keywords, or company name
- **Job Details**: Comprehensive job detail pages with full descriptions, requirements, and company information
- **Favorites System**: Save jobs to a personalized favorites list (stored in localStorage)
- **User Profiles**: Create and manage user profiles with desired position and personal information
- **Smart Recommendations**: Get personalized job recommendations based on user profile data

### User Experience
- **Professional Design**: Clean, modern interface with professional blue and accent color palette
- **Responsive Layout**: Fully responsive design that works on all device sizes
- **Hero Section**: Engaging landing page with statistics and call-to-action
- **Loading States**: Smooth loading indicators and error handling
- **Toast Notifications**: User feedback for actions like saving profile or favoriting jobs

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Query**: Efficient data fetching and caching
- **Local Storage**: Persistent storage for favorites and user profile
- **Modern Routing**: React Router for seamless navigation
- **Design System**: Comprehensive design system with semantic tokens
- **Component Architecture**: Well-organized, reusable components

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + CSS Custom Properties
- **UI Components**: Shadcn/ui components
- **State Management**: React Query for server state, localStorage for client state
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📱 Pages & Routes

- `/` - Home page with hero section and job search
- `/job-details/:id` - Individual job detail pages
- `/liked` - User's saved/favorite jobs
- `/profile` - User profile creation and management
- `*` - 404 error page

## 🎨 Design System

The application uses a professional design system with:

- **Primary Colors**: Professional blue palette for trust and credibility
- **Accent Colors**: Orange accents for call-to-action elements
- **Typography**: Clean, readable fonts with proper hierarchy
- **Gradients**: Subtle gradients for visual appeal
- **Shadows**: Layered shadows for depth and modern feel
- **Animations**: Smooth transitions and hover effects

## 🔧 Key Components

### Layout Components
- `Navbar` - Main navigation with active route highlighting
- `HeroSection` - Landing page hero with statistics and CTA

### Job Components
- `JobCard` - Individual job listing card with all essential information
- `JobDetails` - Comprehensive job detail view

### UI Components
- Enhanced `Button` component with gradient variants
- Professional card layouts
- Form components with validation feedback

## 📊 Data Structure

The application handles comprehensive job data including:
- Job details (title, description, requirements)
- Company information (name, logo, website)
- Salary and location information
- Required skills and qualifications
- Job highlights (responsibilities, benefits, qualifications)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd jobhunt-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔌 API Integration

The application is designed to work with the JSSearch API from RapidAPI:
- Base URL: `https://jsearch.p.rapidapi.com`
- Endpoints: `/search`, `/job-details`
- Includes fallback mock data for development/demo purposes

To use the real API:
1. Sign up for RapidAPI
2. Subscribe to JSSearch API
3. Replace `YOUR_RAPIDAPI_KEY` in `src/services/jobApi.ts`

## 📁 Project Structure

```
src/
├── components/
│   ├── hero/           # Hero section components
│   ├── job/            # Job-related components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API services
├── types/              # TypeScript type definitions
├── assets/             # Images and static assets
└── lib/                # Utility functions
```

## 🎯 Future Enhancements

- **Backend Integration**: User authentication and profile storage
- **Advanced Filters**: Location, salary range, job type filters
- **Job Alerts**: Email notifications for new matching jobs
- **Application Tracking**: Track application status and history
- **Company Pages**: Dedicated company profile pages
- **Social Features**: Job sharing and recommendations

## 📝 Notes

This application follows modern React development practices with:
- Proper TypeScript typing throughout
- Component composition patterns
- Custom hooks for reusable logic
- Semantic HTML and accessibility considerations
- Performance optimizations with React Query

The design system is built to be easily extendable and maintainable, with all colors, spacing, and styling tokens defined in a centralized system.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
