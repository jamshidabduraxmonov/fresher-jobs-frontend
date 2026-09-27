import type { Job } from "../types/job";

export const updateJobStructuredData = (job: Job) => {
    const oldScript = document.querySelector(
        'script[data-job-structured-data="true"]'
    );

    if(oldScript){
        oldScript.remove();
    }

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "JobPosting",

        identifier: {
            "@type": "PropertyValue",
            name: job.company,
            value: job.id,
        },

        title: job.title,
        description: job.description,
        datePosted: job.postedAt,
        ...(job.expiresAt && {
            validThrough: job.expiresAt,
        }),
        

        hiringOrganization: {
            "@type": "Organization",
            name: job.company,
        },
        
        jobLocation: {
            "@type": "Place",
            address: {
                "@type": "PostalAddress",
                addressLocality: job.city,
                addressCountry: "AE",
            },
        },
    };


    const script = document.createElement("script");

    script.type = "application/ld+json";
    script.setAttribute("data-job-structured-data", "true");

    script.textContent = JSON.stringify(structuredData);

    document.head.appendChild(script);
}