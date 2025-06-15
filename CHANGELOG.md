# Changelog

All notable changes to this project will be documented in this file.

## [Version 2.2.3] | 2025/06/15

### Changes

- Improved logger vault performance
- Fixed Facebook API compatibility issues
- Enhanced error handling

## [Version 2.2.2] | 2025/06/13

### Changes

**Architectural Improvements**

- Project Restructuring
  - Implemented Next.js advanced directory structure to enhance code organization and maintainability
  - Optimized project layout following modern React best practices

**Performance & Infrastructure**

- Rate Limiting

  - Removed custom rate limiting implementation in favor of Vercel's native rate limiting solution.

- Caching System
  - Migrated from traditional Redis to Upstash's HTTP-based Redis solution
  - Improved compatibility with serverless environments
  - Enhanced logging performance and reliability and latency.

## [Version 2.2.1] | 2025/06/12

### Added

- **Error Logger Vault**
  - Introduced a comprehensive admin dashboard for monitoring and managing system errors

### Fixed

- Enhanced Facebook API endpoint compatibility with live video URLs
- Improved Instagram API endpoint to support both `/reels/` and `/reel/` URL formats
- Improved error handling for malformed API requests

### Changed

- Optimized database queries in the error logging system for improved performance
- Updated project license from MIT to Business Source License 1.1

## [Version 2.2.0] | 2025/06/07

### Changes:

- Enhanced UI & UX.
- Refactored and optimized TikTok downloader for improved performance.
- Resolved bugs and improved overall stability.

## [Version 2.1.2] | 2025/05/30

### Changes:

- Optimized UI & UX.
- Added Minimal ads.
- Introduced new security layer on API.

## [Version 2.1.0] | 2025/05/27

### Changes:

- Changed the branding of the project from **Pownloader** to **Fetchy**.

## [Version 2.0.1] | 2024/12/24

### Initial Release

The first version of **Pownloader** is now live! Download videos and photos in high quality from your favorite platforms with ease.

#### Features:

- **Facebook Downloader**:

  - Download stories.
  - Download reels and videos.

- **Instagram Downloader**:

  - Download posts.
  - Download reels and videos.

- **TikTok Downloader**:
  - Download music.
  - Download videos.
  - Download slideshows.
