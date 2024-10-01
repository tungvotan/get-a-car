# Driva Assignment - Loan Application Form

This project is a full-stack application for submitting personal and loan-related details via a multi-step form. The application retrieves loan offers from various lenders based on the submitted information.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Testing](#testing)
- [Folder Structure](#folder-structure)

## Overview

The tool allows users to enter their personal and loan-related details through a multi-step form. Upon submission, the backend processes the data and returns loan offers from multiple lenders. This solution is ideal for digital broker platforms.


https://github.com/user-attachments/assets/05d3fdca-9fee-4dbd-9b95-29ed4b1f9854


### Front-End
- Implemented with Mobile-first approach.

**Challenges & Decisions:**

   **Directory Structure**  
   **Challenge**: The directory structure is currently organized, but as the app grows, it might get cluttered.  
   **Decision**: Although the current directory structure works well, I plan to refactor it to a feature-based structure as the app expands to keep things modular and maintainable.

#### "Nice to Have" Features if Time Permitted:
- **TypeScript Types**: Fix all the missing types and ensure strict type checking (currently marked as TODO and many more).
- **Form Persistence**: Store form data in `localStorage` to allow users to resume where they left off if they leave the page.
- **Accessibility Improvements**: Ensure that all form inputs and elements are fully accessible to users using screen readers.
- **Localization**: Implement localization (i.e., multi-language support).
- **Polishing Input Details**: Add features like formatting the salary input with separators for a better user experience. 
- **Loading State during Submissions**: just more time...

### Back-End
- Temporary data is stored using in-memory storage (JSON format).

#### Challenges & Decisions:
1. **In-Memory Data Storage**  
   **Challenge**: The project didn't require permanent storage for form data, but I implemented it anyway using in-memory storage comes with limitations (such as memory overflow).  
   **Decision**: I implemented a basic in-memory store (`formRepo.ts`) to handle form submissions. To mitigate out-of-memory risks, I set a request body size limit.

2. **Choosing the Right Database**  
   **Challenge**: Deciding whether to use a relational database or a NoSQL solution for form data storage.  
   **Decision**: Given the nature of the data (append-only, mostly retrieving the latest entry), I opted for a **NoSQL** approach (e.g., MongoDB) for its simplicity and efficiency in handling unstructured data. If the application grows and more complex relations (e.g., users, loans, lenders) are required, migrating to a SQL database will be considered.

3. **Security Considerations**  
   **Challenge**: To be honest, I don't have much exp on security. And there is no auth requirements so I skipped that.

   **Decision**: I implemented a secure CORS policy to restrict access to the API to localhost only and plan to add rate limiting to prevent abuse and brute force attacks.

#### Future Enhancements:
- **Rate Limiting**: Add rate limiting to further secure the API and prevent abuse.
- **Persistence Layer**: Switch to a NoSQL database for more scalable data handling as the app grows.

### Testing:
- Cypress (Front-End)
- Jest (Back-End)

## Installation

1. Clone the repository, then in root folder
2. Install dependencies for both client and server:
```bash
npm run bootstrap
```
3. Start the application (runs both client and server using tmux - you may need to have tmux installed to run this):
```bash
npm run start 
```

## Testing
- Run API test:
```bash
npm run api-test
```
- Run Cypress E2E test (require to start both FE and BE)
```bash
npm run e2e-test
```

## Folder structure
```go
.
├── client/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Pages (multi-step forms)
│   │   ├── context/       # Context API for form state
│   │   ├── services/      # Services to interact with the backend
│   └── cypress/             # Cypress tests
├── server/
│   ├── src/
│   │   ├── controllers/   # Express controllers
│   │   ├── models/        # Data models
│   │   ├── repositories/  # Repository pattern for data handling
│   │   ├── routes/        # API routes
│   │   ├── services/      # Services for business logic
│   │   └── __test__/      # Jest API tests
└── package.json           # Root scripts
```
