# TAC Wuse Media Webapp

**Professional Church Media Management System for TAC Wuse Media Ministry**

---

## Overview

TAC Wuse Media Webapp is a comprehensive management system designed for churches to organize, plan, and execute media-related activities for worship services and special events. It streamlines the workflow for media teams, allowing efficient media file management, service planning, team coordination, and communication.

This project is built with **Next.js** and leverages modern React features for a performant, user-friendly experience.

---

## Features

### 1. Media Management
- **Upload & Storage:** Easily upload and store various media files (images, videos, slides, audio).
- **Smart Categorization:** Organize files by type, event, or service.
- **Advanced Search:** Quickly find media assets with filters.
- **Preview & Download:** Preview files before downloading or sharing.

### 2. Service Planning (Run Sheets)
- **Drag-and-Drop Editor:** Create detailed run sheets for services with interactive editing.
- **Team Collaboration:** Assign tasks and roles to team members for each service item.
- **Media Integration:** Link media files directly to run sheet items.
- **Export & Share:** Share or export run sheets with team members.

### 3. Team Management
- **Role-based Access:** Manage team members with roles such as Video Operator, Audio Technician, Projection Specialist, and more.
- **Member Profiles:** Record member specialties, contact info, and join dates.
- **Task Assignment:** Assign responsibilities for each event or service.

### 4. Communication
- **Announcements:** Send important updates to the team.
- **Notifications:** Push notifications for assignments and service changes.
- **Messaging:** Integrated team messaging for effective communication.

### 5. Security & Reliability
- **User Authentication:** Secure login and role-based permissions.
- **Data Protection:** Media and service data are protected.
- **Backup & Recovery:** Reliable storage with backup features.

---

## Getting Started

### Prerequisites
- **Node.js** (latest LTS recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/aiyenigbacharles/TAC-Wuse-Media-Webapp.git
   cd TAC-Wuse-Media-Webapp
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file and set up required variables (authentication, storage, etc).

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Access the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
├── app/
│   ├── page.tsx           # Home page, feature highlights
│   ├── apply/             # Team application form
│   ├── team/              # Team management dashboard
│   └── ...                # Other Next.js routes
├── components/
│   ├── media-management.tsx
│   ├── run-sheet-management.tsx
│   ├── run-sheet-editor.tsx
│   ├── dashboard-overview.tsx
│   └── ...                # UI and feature components
├── hooks/
│   └── use-toast.ts       # Custom React hooks
└── ...
```

---

## Key Pages & Components

- **Home Page:** Overview, church gallery, feature highlights.
- **Media Management:** Organize, preview, upload, and manage media assets.
- **Run Sheet Management:** Plan services, drag-and-drop editor, assign tasks.
- **Team Page:** View and manage team members, roles, and profiles.
- **Apply Page:** Form for new volunteers to join the media team.

---

## Contribution

Contributions are welcome! Please fork this repo and submit a pull request.

**To contribute:**
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or support, contact the repository owner [@aiyenigbacharles](https://github.com/aiyenigbacharles).

---

## Credits

Built and maintained by the TAC Wuse Media Ministry Team.

---
