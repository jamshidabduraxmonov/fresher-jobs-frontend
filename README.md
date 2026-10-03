# Fresher Jobs UAE — Frontend

A job discovery platform focused on helping people find **fresh, entry-level, and early-career opportunities across the UAE**.

Built with React and TypeScript, the frontend provides category-based job browsing, job detail pages, direct application links, responsive UI, and SEO-friendly job pages.

> Part of the Fresher Jobs UAE platform.  
> Backend API: [Fresher Jobs UAE Backend]()

## Live Website

[Visit Fresher Jobs UAE](https://fresherjobs.ae/)

---

## Features

- Browse active UAE job listings
- Dedicated fresher and entry-level job feed
- Category-based job discovery
- Individual job detail pages
- Direct links to original application sources
- Pagination-ready job feeds
- Responsive mobile-first interface
- Dynamic page metadata
- JobPosting structured data for search engines
- SEO-friendly routes
- Android-ready frontend through Capacitor

---

## Job Categories

Fresher Jobs UAE currently organizes listings into areas such as:

- Fresher / Entry-Level Jobs
- Food & Beverage
- Hospitality
- Retail
- Customer Service
- General Service

The platform is designed so additional categories can be added as the job database grows.

---

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Mobile

- Capacitor
- Android

### SEO

- Dynamic page titles and meta descriptions
- JobPosting JSON-LD structured data
- Search-engine-friendly job URLs
- robots.txt
- Sitemap integration with the backend

---

## Architecture

The project is split into two repositories:

### Frontend

This repository handles:

- User interface
- Routing
- Job browsing
- Category pages
- Job detail pages
- API communication
- SEO metadata
- Structured job data
- Android web application layer

### Backend

The backend is responsible for:

- Job ingestion
- PostgreSQL storage
- Job classification
- Fresher-friendly scoring
- Category filtering
- Active-job filtering
- REST API endpoints
- Sitemap generation

Backend repository:

[View Fresher Jobs UAE Backend](https://github.com/jamshidabduraxmonov/fresher-jobs-backend)

---

## Main Routes

`/`

Home page with job categories and platform introduction.

`/categories/:category`

Displays jobs belonging to a selected category.

Examples:

`/categories/freshers`

`/categories/food_beverage`

`/categories/hospitality`

`/categories/retail`

`/categories/customer_service`

`/categories/general_service`


`/jobs/:id`

Displays full details for an individual job listing.


`/privacy`

Privacy policy used by the website and Android application.

---

## API Integration

The frontend communicates with the Fresher Jobs UAE REST API.

Example endpoints:

`GET /api/jobs`

`GET /api/jobs/:id`

`GET /api/health`

Job feeds can be filtered using parameters such as:

- `category`
- `fresherFriendly`
- `page`
- `limit`

Example:

`GET /api/jobs?category=retail&page=1&limit=20`

Or:

`GET /api/jobs?fresherFriendly=true`

---

## Local Development

Clone the repository:

    git clone https://github.com/jamshidabduraxmonov/fresher-jobs-frontend

Install dependencies:

    npm install

Create a `.env.local` file and add the backend API URL:

    VITE_API_URL=http://localhost:5000

Start the development server:

    npm run dev

The app will normally be available at:

`http://localhost:5173`

---

## Production Build

Create a production build:

    npm run build

Preview it locally:

    npm run preview

---

## Android

The frontend can also be packaged as an Android application using Capacitor.

Typical workflow:

    npm run build
    npx cap sync android
    npx cap open android

The Android project can then be built and signed through Android Studio.

---

## SEO

Each major page updates its metadata dynamically.

Job detail pages also generate `JobPosting` structured data containing information such as:

- Job title
- Description
- Date posted
- Expiration date
- Hiring organization
- Job location
- Job identifier

This helps search engines understand individual job listings more effectively.

---

## Project Structure

A simplified structure:

    src/
    ├── components/
    │   ├── CategoryCard.tsx
    │   └── JobCard.tsx
    │
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── CategoryJobsPage.tsx
    │   ├── JobDetailsPage.tsx
    │   └── PrivacyPolicyPage.tsx
    │
    ├── api/
    │   └── jobs.ts
    │
    ├── data/
    │   └── categories.ts
    │
    ├── types/
    │   └── Job.ts
    │
    ├── utils/
    │   ├── updatePageMeta.ts
    │   └── updateJobStructuredData.ts
    │
    └── App.tsx

---

## Related Repository

The API, PostgreSQL database integration, automated job ingestion, and job classification system live in the backend repository:

**[Fresher Jobs UAE Backend](https://github.com/jamshidabduraxmonov/fresher-jobs-backend)**

---

## Status

Fresher Jobs UAE is actively being developed.

Current focus includes:

- Expanding the number of active UAE job listings
- Improving job classification
- Refining the Android release
- Improving search visibility
- Improving the job discovery experience

---

## Author

Built by **Jamshid Abdurakhmonov**

- GitHub: [Jamshid_Abduraxmonov](https://github.com/jamshidabduraxmonov)
- LinkedIn: [madebyjamshid](https://www.linkedin.com/in/madebyjamshid/)

---

## License

This project is currently maintained as part of Fresher Jobs UAE.