import axios from 'axios';
import { Job, JobSearchResponse } from '../types/job';

const API_BASE_URL = 'https://jsearch.p.rapidapi.com';

// Note: In a real application, you would store API keys in environment variables
// For the demo, users will need to get their own API key from RapidAPI
const API_KEY = 'YOUR_RAPIDAPI_KEY'; // Replace with actual API key

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-RapidAPI-Key': API_KEY,
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
  },
});

export const jobApi = {
  async searchJobs(query: string, page = 1): Promise<JobSearchResponse> {
    try {
      const response = await apiClient.get('/search', {
        params: {
          query,
          page,
          num_pages: 1,
        },
      });
      return response.data;
    } catch (error) {
      // For demo purposes, return mock data if API is not available
      console.warn('API not available, using mock data');
      return getMockJobData(query, page);
    }
  },

  async getJobDetails(jobId: string): Promise<Job | null> {
    try {
      const response = await apiClient.get('/job-details', {
        params: {
          job_id: jobId,
        },
      });
      return response.data.data[0] || null;
    } catch (error) {
      console.warn('API not available, using mock data');
      return getMockJobDetails(jobId);
    }
  },
};

// Mock data for demo purposes
function getMockJobData(query: string, page: number): JobSearchResponse {
  const mockJobs: Job[] = [
    {
      job_id: '1',
      employer_name: 'TechCorp Inc.',
      employer_logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      job_title: `${query} Developer`,
      job_description: `We are looking for a talented ${query} developer to join our dynamic team. This role offers excellent growth opportunities and competitive compensation.`,
      job_city: 'San Francisco',
      job_state: 'CA',
      job_country: 'US',
      job_employment_type: 'FULLTIME',
      job_is_remote: true,
      job_posted_at_datetime_utc: new Date().toISOString(),
      job_apply_link: '#',
      job_publisher: 'TechJobs',
      job_min_salary: 80000,
      job_max_salary: 120000,
      job_salary_currency: 'USD',
      job_salary_period: 'YEAR',
      job_required_skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
      job_highlights: {
        Qualifications: ['Bachelor\'s degree in Computer Science', '3+ years experience'],
        Responsibilities: ['Develop web applications', 'Collaborate with team', 'Write clean code'],
        Benefits: ['Health insurance', 'Remote work', '401k matching'],
      },
    },
    {
      job_id: '2',
      employer_name: 'StartupXYZ',
      employer_logo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop&crop=center',
      job_title: `Senior ${query} Engineer`,
      job_description: `Join our innovative startup as a Senior ${query} Engineer. Help us build the future of technology with cutting-edge tools and methodologies.`,
      job_city: 'New York',
      job_state: 'NY',
      job_country: 'US',
      job_employment_type: 'FULLTIME',
      job_is_remote: false,
      job_posted_at_datetime_utc: new Date(Date.now() - 86400000).toISOString(),
      job_apply_link: '#',
      job_publisher: 'StartupJobs',
      job_min_salary: 100000,
      job_max_salary: 150000,
      job_salary_currency: 'USD',
      job_salary_period: 'YEAR',
      job_required_skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
      job_highlights: {
        Qualifications: ['5+ years experience', 'Strong problem-solving skills'],
        Responsibilities: ['Lead development projects', 'Mentor junior developers', 'Architect solutions'],
        Benefits: ['Equity package', 'Flexible hours', 'Learning budget'],
      },
    },
    {
      job_id: '3',
      employer_name: 'Global Solutions Ltd.',
      employer_logo: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=100&h=100&fit=crop&crop=center',
      job_title: `${query} Specialist`,
      job_description: `Seeking a dedicated ${query} specialist to work on enterprise-level projects. Great opportunity for career advancement in a stable company.`,
      job_city: 'Austin',
      job_state: 'TX',
      job_country: 'US',
      job_employment_type: 'FULLTIME',
      job_is_remote: true,
      job_posted_at_datetime_utc: new Date(Date.now() - 172800000).toISOString(),
      job_apply_link: '#',
      job_publisher: 'LinkedJobs',
      job_min_salary: 70000,
      job_max_salary: 95000,
      job_salary_currency: 'USD',
      job_salary_period: 'YEAR',
      job_required_skills: ['Java', 'Spring Boot', 'MySQL', 'Docker'],
      job_highlights: {
        Qualifications: ['Bachelor\'s degree preferred', '2+ years experience'],
        Responsibilities: ['Develop enterprise applications', 'Work with clients', 'Maintain code quality'],
        Benefits: ['Health & dental', 'Paid time off', 'Professional development'],
      },
    },
  ];

  return {
    status: 'OK',
    request_id: 'mock-request',
    parameters: {
      query,
      page,
      num_pages: 1,
    },
    data: mockJobs,
  };
}

function getMockJobDetails(jobId: string): Job | null {
  const mockData = getMockJobData('software', 1);
  return mockData.data.find(job => job.job_id === jobId) || null;
}