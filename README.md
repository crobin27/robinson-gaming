# Robinson Gaming Portfolio Website [![Visit Live Site](https://img.shields.io/badge/Visit-Live_Site-brightgreen)](https://robinsongaming.com)

![Social Media Image](./public/images/social-media-photo.png)

## Overview

This project is a personal portfolio website for Robinson Gaming, developed to showcase various projects, including mobile games, web applications, and IoT solutions. The website is built using **Astro.js** for a fast, static site, with components styled using **CSS**. It is hosted on **Cloudflare Pages** with CI/CD integration and includes media storage via **Cloudflare R2**. The project demonstrates modern web development practices, CI/CD workflows, and efficient asset management.

## Features

- **Astro.js Framework**: Static site generation using Astro.js for fast, performance-optimized delivery.
- **Cloudflare R2 Integration**: Utilizes Cloudflare R2 as a media storage solution for downloadable assets, allowing for efficient access to larger files.
- **Responsive Design**: Fully responsive layout built with custom CSS, ensuring a great user experience across devices.
- **CI/CD Pipeline**: Automated deployment through Cloudflare Pages, triggered on Git push for streamlined updates.
- **CORS Configuration**: Configured CORS policy on Cloudflare R2 to allow secure access to assets only from the portfolio domain.
- **SEO Optimized**: Meta tags, headers, and structured data optimized for search engines.

## Dependencies

This project uses a combination of front-end frameworks, storage solutions, and deployment services:

- **Astro.js**: For static site generation and component-based architecture.
- **CSS**: For styling and responsive layout adjustments.
- **Cloudflare Pages**: For hosting and CI/CD.
- **Cloudflare R2**: For scalable, affordable file storage, especially for downloadable assets.
- **Git**: Version control with GitHub as the remote repository.

## Key Features Implemented

- **Responsive Layouts**: CSS media queries and custom breakpoints ensure layouts adapt to different screen sizes.
- **CORS Policies for Secure Downloads**: Cloudflare R2 configured to allow downloads only from the portfolio domain, securing asset access.
- **SEO & Accessibility**: Meta tags, structured data, and alt text on images improve SEO ranking and accessibility for a diverse audience.
- **Modular Components in Astro.js**: Developed reusable components for headers, footers, and project grids to ensure consistency and modularity.
- **Custom Privacy Policy Page**: Dedicated page for the privacy policy, styled to comply with legal requirements and easy to navigate.

## Technologies and Skills Demonstrated

- **Static Site Generation (SSG)**: Leveraged Astro.js to create a fast, efficient, static site with minimal server requirements.
- **CSS**: Demonstrated strong front-end styling skills using custom CSS for layout and responsive design.
- **Cloudflare R2 and CORS Configuration**: Set up secure access to media assets using Cloudflare R2 storage and configured CORS policies to restrict asset access.
- **Continuous Integration/Continuous Deployment (CI/CD)**: Configured automated deployments on Cloudflare Pages to ensure continuous delivery of updates from Git pushes.
- **SEO Optimization**: Implemented SEO best practices, including meta tags, structured data, and image alt attributes, to improve discoverability and search engine ranking.
- **Version Control with Git**: Used Git for version control and GitHub as a remote repository, facilitating collaborative updates and tracking code history.

## Figma UI

The Figma file used to design this website is available for free use. You can download it from [/figma/robinsongaming.fig](./figma/robinsongaming.fig) and view or edit it in Figma.

## CI/CD Process

- **Continuous Deployment**: Configured GitHub to push changes automatically to Cloudflare Pages, which triggers a new build and deployment.
- **Automated Builds**: Cloudflare Pages automatically runs the Astro build process on every push to ensure the live site stays updated with the latest code.
- **Branch-Based Deployment Previews**: Deployments on separate branches for previewing changes before going live.

## Future Improvements

- **Dynamic Content Loading**: Implement client-side loading for certain assets to improve initial load time and provide a smoother user experience.
- **Expanded Project Showcase**: Consider adding interactive javascript elements like project carousels or filterable project grids to make navigation more engaging.
- **Enhanced Analytics Integration**: Plan to integrate tools like Google Analytics or Cloudflare Web Analytics for detailed user insights and performance tracking.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
