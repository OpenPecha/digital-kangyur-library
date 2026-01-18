# Database Seeders

This directory contains database seeders for populating the database with initial data.

## Timeline Seeder

The timeline seeder populates the database with historical periods and events related to the Kangyur translation and compilation history.

### Usage

To seed the timeline data:

```bash
npm run seed:timeline
```

Or directly:

```bash
node seeders/timelineSeeder.js
```

### What it does

- Clears existing timeline periods and events
- Creates 8 historical periods:
  - Early Translation Period (650-900 CE)
  - Dark Age and Revival (842-1040 CE)
  - Proto-Kangyur Formation (1040-1300 CE)
  - First Structured Kangyurs (1300-1400 CE)
  - Classic Manuscript Kangyurs (1380-1460 CE)
  - Block-Printed Editions (1410-1880 CE)
  - 20th Century Editions (1900-2000 CE)
  - 21st Century Digital Editions (2000-2024 CE)
- Creates associated events for each period (total of 23 events)

### Prerequisites

- Database must be set up and migrations must be run
- `DATABASE_URL` environment variable must be configured in `.env` file

### Notes

- The seeder will delete all existing timeline data before seeding
- Run migrations first: `npx prisma migrate dev` (if needed)
- Ensure your database connection is working before running the seeder
