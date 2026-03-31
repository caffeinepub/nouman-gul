# Personal Portfolio Website

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Personal portfolio/showcase website
- Hero section with uploaded profile photo of a young man in yellow kurta
- Embedded video section with uploaded MP4 video
- Navigation bar with sections: Home, About, Portfolio, Video, Contact
- About/bio section with placeholder text
- Footer with social links

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Copy uploaded image and video assets to frontend/public/assets/uploads/
2. Generate minimal Motoko backend (actor with basic info query)
3. Build React frontend with:
   - Sticky top navigation bar
   - Hero section: profile photo left, name/title/CTA right (2-column)
   - About section with stats
   - Video section with embedded MP4 player
   - Connect/footer section
4. Use dark charcoal + gold color scheme as shown in design preview
5. Uploaded assets:
   - Photo: /assets/uploads/profile.jpeg
   - Video: /assets/uploads/profile-video.mp4
