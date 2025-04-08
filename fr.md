# Stdlib – Standard Library for JavaScript

## GSoC 2025 Proposal

### Project Title: Developer Dashboard for Tracking Ecosystem Build Failures

# Full name

Jaison Dsouza

# University status

Yes

# University name

St Joseph Engineering College

# University program

Bachelor of Engineering in Computer Science

# Expected graduation

2026

# Short biography

I am a 3rd Year CSE Engineering student from India. I started my coding journey with NodeJS for backend development in my freshman year through my friends' encouragement. I am a self taught developer and an enthusiastic individual. The thing I like to do most is problem solving and building applications around it. I have been working a lot on college projects and an innovation club. Won some competitions for innovation and regional hackathons. My general interest currently is GenAI.

# Timezone

IST(India)

# Contact details

email:jaisondz9360@gmail.com,github:jsndz

# Platform

Linux

# Editor

VS code because VS code is easy to use and comes with lot of extensions that are really useful

# Programming experience

I started learning programming when i was in freshmen year with Backend development with nodejs. Explored a lot of Backend concept and spent a year around it. The i started learning Frontend development with reactjs. Then developed some frontend applications. I was good at backend and could work around with frontend. With this i also built some projects for college events. Now i am learning GenAI.

Notable Projects:

Dashboard for College Event
Built a dashboard to manage a product-based competition and sales tracking.
Features included a live leaderboard using long polling and real-time management of products sold by participants.

WebSocket Chat Application
A real-time chat app supporting chat rooms and socket-based communication.
https://github.com/jsndz/mayaverse

E-commerce Website
Full-stack E-commerce platform developed using the MERN stack (MongoDB, Express, React, Node.js).
https://github.com/jsndz/Noatric

Vercel Clone
A simplified clone of the Vercel deployment platform.
https://github.com/jsndz/ercel

SQLite Clone
A basic clone of SQLite to understand database internals and how query execution works.
https://github.com/jsndz/dbaCe

# JavaScript experience

Javascript is first programming language I learned properly. It was a very easy language to learn and implement. My favorite feature of Javascript is its ability to run anything on the browser. You can make anything on the browser from games to apps. The least favorite feature will be Promise because i don't really like its writing style I always prefer async await.

# Node.js experience

i started Backend development with nodejs. And I am using this till this day. I built almost all my application in NodeJS.

# C/Fortran experience

I had C in my first year college curriculum and C taught a lot basic programming skills to me. It is one of my favorite programming language. For any low level development i always prefer C. I even built a SQLite clone with C.
Interest in stdlib

I first came to know about stdlib from a senior who was developing a Math based application. And I looked into that time but I was not skilled enough to contribute to it that time. I really love how many functionalities are available in stdlib.

# Contributions to stdlib

- merged https://github.com/stdlib-js/stdlib/pull/5955
- open https://github.com/stdlib-js/stdlib/pull/6328
- open https://github.com/stdlib-js/stdlib/pull/6067

# stdlib showcase

A Node.js application that demonstrates the usage of the @stdlib/stdlib package for statistical analysis of retail store data.
(https://github.com/jsndz/StdlibShowcase)

# Goals

## Abstract

The idea is to build a developer dashboard that will track the stdlib ecosystem. Since the database already exists, the goal is to implement a backend and frontend application that can show a real-time interface. Since the database needs to be less loaded, we will go with static snapshots which will be stored in JSON format. Subsequent rollups will be applied.

![Image](https://github.com/user-attachments/assets/d545d568-7363-4885-911d-042575335dbf)

## Basic Features

- Backend for handling database query
- Frontend Dashboard interface
- Quick Navigation
- Filtering and pagination
- Data analysis for historical overviews and drill down metrics

---

## Implementation

### 1. Backend for Handling Database Queries

**Tech Stack**

- Fastify → Optimized for performance and used in other stdlib projects.
- PostgreSQL → The existing database for storing repository and build data.
- NodeJS Cron (node-cron) → Used for generating static snapshots periodically.

#### These are the basic endpoints that will be provided by the server

| Method | Endpoint                  | Description                                           |
| ------ | ------------------------- | ----------------------------------------------------- |
| GET    | /api/dashboard            | Fetch main dashboard data (repository list & status). |
| GET    | /api/metrics              | Fetch overall metrics (downloads & coverage).         |
| GET    | /api/repository/{repo_id} | Fetch detailed data for a specific repository         |

#### Cron Job for Generating Snapshots

```js
// Function to generate static snapshot
async function generateSnapshot() {
  const snapshotData = [{ repository_id: 1, name: "repo1", status: "success" }];
  fs.writeFileSync("snapshot.json", JSON.stringify(snapshotData, null, 2));
  console.log(" Snapshot updated at", new Date().toISOString());
}

// Schedule cron job (Runs every midnight UTC)
cron.schedule("0 0 * * *", generateSnapshot);
```

```js
fastify.get("/", async (request, reply) => {
  return { message: "Welcome to the Ecosystem Build Tracker API!" };
});

fastify.get("/api/dashboard", async (request, reply) => {
  return [];
});

fastify.get("/api/metrics", async (request, reply) => {
  return {};
});

fastify.get("/api/metrics/:id", async (request, reply) => {
  return {};
});

fastify.get("/api/snapshot", async (req, reply) => {
  const data = fs.readFileSync("snapshot.json", "utf-8");
  return JSON.parse(data);
});
```

Rollups will be done in the backend so that the frontend does not have to do the aggregate.

The important Rollups that I can think of are:

- Metrics for single repository
- Metrics for overall repositories

---

### 2. Frontend Dashboard Interface

**Tech Stack:**

- React because familiarity and simplicity
- Tailwind CSS for styling
- ESBuild for bundling

Frontend will provide three views:

- **Dashboard:** Which consists of a list of repositories and their information
- **Metrics:** Overall metrics for all the repositories like overall build stats etc
- **Repository Metrics:** Metrics for specific Repository. Showing all the information on builds

**Here is the Figma wireframe:**
https://www.figma.com/design/BAi2bJqo1vT2oZciUaGtW5/gsoc?node-id=0-1&t=jytcAuJezuGFBHb5-1

This is my first time using Figma so there might be inconsistency

![Image](https://github.com/user-attachments/assets/9bcb8bb3-e83b-48b8-995a-74dc818928a6)

---

### 3. Quick Navigation

**Navigation Approaches:**

#### Frontend Search

The searching functionality will be fully done on the browser. Can use libraries like minisearch for this.

```js
import MiniSearch from "minisearch";

export function setupSearchIndex(data) {
  // Initialize and configure MiniSearch
  // Add data to the index
}

export function search(query) {
  // Run search against the index
}

async function init() {
  // Fetch snapshot or pre-indexed data
  // Call setupSearchIndex(data)
}

function handleSearchInput(event) {
  const query = event.target.value;
  // Call search(query) and render results
}
```

#### Backend Search

Backend search involves indexing the snapshot which is a better method considering the size of the database. This is done by creating a precomputed index file alongside the snapshot.

```js
function generateIndexFromSnapshot(snapshot) {
  // Logic to create an index file from the snapshot
}

function saveIndexToFile(index, filePath) {
  // Logic to write the index to a file
}

function loadIndex(filePath) {
  // Logic to load the index from disk
}

function searchIndex(index, query) {
  // Logic to search the precomputed index
}

app.get("/search", (req, res) => {
  // Handle query and return results
});
```

#### Hybrid Approach

Hybrid approach uses both of these. And I am not very sure about it because this might be considered as an overkill.

The specific usage may need to be discussed with the mentor.

**The approach I am suggesting will be indexing the database.**

---

### 4. Filtering

| Filter Category            | Filter Option            | Available Options                                          | Purpose                                                                       |
| -------------------------- | ------------------------ | ---------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Status Filters             | Build Status (Dropdown)  | All, Success, Failure, In Progress, Canceled               | Allows users to filter builds based on their current status.                  |
|                            | Conclusion (Dropdown)    | All, Passed, Failed, Canceled                              | Refines failure analysis by differentiating between different outcomes.       |
| Repository & Owner Filters | Repository Name (Search) | User-entered text                                          | Enables users to find builds related to a specific repository quickly.        |
| Time-Based Filters         | Time Range (Dropdown)    | Last 1 hour, Last 24 hours, Last 7 days, Custom date range | Allows users to filter builds within a specific timeframe.                    |
|                            | Build Duration (Slider)  | Min - Max duration (e.g., 0 min - 60 min)                  | Filters builds based on duration to identify short or long-running builds.    |
| Build & Workflow Filters   | Workflow Name (Dropdown) | User-entered text                                          | Helps users filter by specific CI/CD workflows executed in the build process. |
|                            | Triggered By (Dropdown)  | All, Push, Pull Request, Schedule                          | Allows filtering builds based on the event that triggered them.               |
|                            | Run Number / Attempt     | User-entered number                                        | Helps users locate a specific build run by its unique identifier.             |

**The filter implementation is given here:**

![Image](https://github.com/user-attachments/assets/a84ed87a-259d-4752-aa3a-adba637937eb)

#### How filtering will be done:

For filtering we are going with doing the filtering in the backend.
Since the database is large and the size will increase, the best approach would be filtering on the backend.

The frontend will send filters with pagination setup. The backend will handle filtering and will send the required data.

**Example API call:**

```
GET /api/dashboard?page=1&limit=100&status=failed&owner=stdlib
```

---

### 5. Data Analysis for Historical Overviews and Drill-Down Metrics

#### Stages:

**Data Querying & Aggregation**

- Querying data based on specific time intervals.
- Based on the time interval we will filter data then we will get analytics for them
- To get accurate data we need aggregate the data
- We can create rollups during the snapshot creation
- Specific rollups need to be decided after talking to the mentors

**The ones that I can think of are:**

- Metrics for individual repo
- Combined metrics for all repositories (e.g., failures to build graph)

**Visualization**

- Representing data in graphs and charts.

**Some visualization metrics that researched are given here:**

- Failure Rate of repositories (Line Chart): `repository_id`, `conclusion` from `workflow_run`
- Overall trend of build successes vs failures across all repos (Bar Chart): `status`, `conclusion` from `workflow_run`
- NPM download trend (Line Chart): `repository_id`, `count` from `npm_download_count`
- How long builds are taking on average (Histogram): `repository_id`, `created_at`, `updated_at` from `workflow_run`

**Drill-Down Metrics**

Drill down metrics can be implemented for failure in the repository

Drill-down options are:

- Specific repositories
- Branches
- Individual commits

# Why this project?

Participating in Gsoc is a dream come true. This project aligns with my tech stack and experience. And the project needs a lot of optimizations for the backend which I am really excited about.

# Qualifications

I have lot of experience building many NodeJS application and features in multiple projects i did overlap with the the requested features in this project.

Some projects that i build are:

Dashboard for College event:
Built a dashboard for product competition and sales management
The product had live leaderboard which was built on long polling and had to manage various products that people were selling

Chat application on Websocket:
A chat application that was built to handle room chat.
https://github.com/jsndz/mayaverse

Ecommerce website that has Pagination and filtering:
https://github.com/jsndz/Noatric

# Prior art

NPM statusboard has a similar dashboard they built it using NodeJs
AWS Repository Status Monitor shows metrics for GitHub and Docker repositories and backend is primarily python, and the data is stored and displayed using AWS cloud services.
Netdata uses lightweight agents to collect real-time system metrics and backend is primarily in C and Go.

# Commitment

I will be available throughout the gsoc period
In the coding period i will commit to work for 6 hours daily for the project
but during the period of 5th June to 10th June my coding time will decrease
I have no other commitments and will work full time on the GSOC project

# Schedule

Assuming a 12 week schedule,

---

### **Community Bonding Period**

- Familiarize with stdlib’s ecosystem and database schema.
- Discuss and finalize implementation details with mentors.
- Get feedback on wireframes and project scope.
- Set up local development environment and access credentials (DB, etc.).

---

### **Week 1**

- Implement project scaffolding for both frontend and backend.
- Set up Fastify server and basic endpoints (`/`, `/api/dashboard`).
- Connect to PostgreSQL and fetch raw data.

---

### **Week 2**

- Implement cron job to generate static snapshots and store as JSON.
- Write initial snapshot creation logic and test static file reading.
- Start basic frontend using React + Tailwind + ESBuild setup.

---

### **Week 3**

- Implement cron job to generate static snapshots and store as JSON.
- Write initial snapshot creation logic and test static file reading.
- Start basic frontend using React + Tailwind + ESBuild setup.

---

### **Week 4**

- Implement filtering (status, owner, time range) in backend.
- Design frontend dropdowns and controls for filters.
- Create API format like `/api/dashboard?page=1&status=failed`.

---

### **Week 5**

- Implement metrics endpoint `/api/metrics` and `/api/metrics/:id`.
- Start visualizing general build metrics (bar/line charts).
- Use libraries like Recharts or Chart.js on frontend.

---

### **Week 6 (Midterm)**

- Complete Dashboard and Metrics views.
- Finalize filtering and snapshot logic.
- Submit code for evaluation and fix any review comments.

---

### **Week 7**

- Begin implementation of Repository Metrics view.
- Add drill-down capability: view builds by repo, commit, branch.
- Start work on visualizations like failure trends, build durations.

---

### **Week 8**

- Create backend logic for historical rollups during snapshot generation.
- Store computed metrics alongside snapshot for fast access.
- Add graphs for NPM download trends and success/failure trends.

---

### **Week 9**

- Implement and test search (frontend + backend).
- Use `minisearch` for frontend, index snapshot for backend.
- Discuss with mentor if hybrid approach is worth implementing.

---

### **Week 10**

- Polish UI/UX: improve filtering interactions, mobile responsiveness.
- Add loading/error states and improve component structure.
- Write utility scripts to re-generate snapshot and index.

---

### **Week 11**

- Test performance on large snapshots.
- Add caching and optimization for repeated metric queries.
- Finalize documentation (API usage, local setup, dev guide).

---

### **Week 12**

- Mentor code review and address final issues.
- Polish and clean codebase.
- Prepare demo video or walkthrough if needed.

---

### **Final Week**

- Submit final work product.
- Write final report/blog post summarizing your GSoC journey.
- Help with any remaining deployment or integration with stdlib tooling.

---

I can assure you that if I get selected to work with stdlib this summer, I
definitely will try my level best to make this project successful and will love to continue
Working with stdlib.

Also for some reasons, if I am not selected this year even then I’ll try to contribute to this as much as possible and retry again next year.

Looking forward to working with you.

Thanks And Regards
Jaison Dsouza
