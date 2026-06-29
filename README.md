# User Management Dashboard

A modern, high-performance, responsive single-page web application built with **React** and **Vite**. The application empowers administrators to seamlessly view, search, filter, sort, paginate, add, edit, and delete user profiles from a REST API endpoint (`https://jsonplaceholder.typicode.com/users`).

---

## 🚀 Key Features

- 📊 **Structured User Table**: Interactive table view displaying User ID, First Name, Last Name, Email Address, and Department with status badges.
- 📱 **Adaptive Card Grid**: Seamless fallback card layout on smaller screen viewports (tablets & mobile devices) ensuring 100% responsive design.
- 🔍 **Real-Time Search**: Instant multi-field searching checking input queries against First Name, Last Name, and Email fields simultaneously.
- 🎯 **Advanced Filter Modal**: Interactive popup modal allowing administrators to target specific cohorts by First Name, Last Name, Email, or Department.
- ↕️ **Multi-Column Bidirectional Sorting**: Clickable table header column sorting supporting both Ascending ($A \rightarrow Z$) and Descending ($Z \rightarrow A$) orders.
- 📄 **Dynamic Pagination**: Selectable page limit options (**10, 25, 50, 100** items per page) with state-aware navigation controls.
- ➕ **Add & Edit Form Modal**: Unified modal interface with client-side form validation (Email regex, required text checks) and error highlight indicators.
- 🗑️ **Safety Delete Confirmation**: Modal prompt intercepting delete triggers to prevent accidental record removal.
- 🔔 **Toast Notification Feedback**: Real-time feedback alerts informing users of successful actions or network errors.

---

## 🛠️ Tech Stack & Recommended Libraries

| Technology | Purpose |
| :--- | :--- |
| **React.js (v18+)** | Frontend UI Framework (Functional components & hooks) |
| **Vite** | Lightning-fast build tool and local development server |
| **Axios** | Promise-based HTTP client for API communication |
| **Lucide React** | Clean, modern vector icon set |
| **CSS3** | Vanilla CSS using custom HSL design system tokens, glassmorphism, & flexbox/grid layouts |

---

## 📁 Project Directory Structure

```
user-management-dashboard/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   └── userService.js        # Axios REST client logic
│   ├── components/
│   │   ├── Header.jsx            # Branding, stats counter, quick action buttons
│   │   ├── SearchBar.jsx         # Real-time search input & filter trigger
│   │   ├── FilterModal.jsx       # Dynamic field-specific popup filter modal
│   │   ├── UserTable.jsx         # Desktop user table with sortable headers
│   │   ├── UserCardGrid.jsx      # Mobile/Responsive card view component
│   │   ├── UserFormModal.jsx     # Dual-purpose Add/Edit modal with validation engine
│   │   ├── ConfirmDeleteModal.jsx# Safety confirmation modal before deletion
│   │   ├── Pagination.jsx        # Navigation controls & page limit selection
│   │   └── Toast.jsx             # Error and success feedback alerts
│   ├── hooks/
│   │   └── useUsers.js           # Custom hook encapsulating state & CRUD operations
│   ├── utils/
│   │   ├── constants.js          # Shared department lists & API endpoints
│   │   ├── helpers.js            # Name parsing & department fallback logic
│   │   └── validators.js         # Form validation rules & regex
│   ├── styles/
│   │   └── global.css            # Modern design system tokens & glassmorphism styling
│   ├── App.jsx                   # Main application layout orchestrator
│   └── main.jsx                  # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 💻 Setup & Installation Instructions

### Prerequisites

Ensure you have **Node.js (v18.0.0 or higher)** and **npm** installed on your machine.

### 1. Clone or Download Repository
```bash
git clone <your-repository-url>
cd Tacnique
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173` (or the URL printed in your terminal).

### 4. Build for Production Verification
```bash
npm run build
```
This command bundles the application into the `dist/` directory, ensuring zero compilation errors.

---

## 🧠 Engineering Assumptions & Data Transformation

1. **Name Field Parsing**:
   - The JSONPlaceholder `/users` API provides full names under a single `name` property (e.g. `"Leanne Graham"`).
   - The application programmatically splits this string by spaces. The first word is mapped to `firstName` and remaining words form `lastName`. Common honorifics (`Mr.`, `Mrs.`, `Dr.`) are sanitized for clean UI presentation.

2. **Department Field Assignment**:
   - The mock API does not contain a standard corporate `department` property.
   - To deliver a complete enterprise dashboard, departments (`Engineering`, `Sales`, `Marketing`, `HR`, `Finance`, `IT`, `Product`) are deterministically assigned based on company metadata and user ID modulo indexing, ensuring reliable consistency across re-renders.

3. **Mock API Read-Only Limitation & Local State Synchronization**:
   - JSONPlaceholder is a fake REST API. While `POST`, `PUT`, and `DELETE` HTTP requests return standard success responses (such as HTTP `201 Created` or `200 OK`), changes are not stored permanently on their backend servers.
   - To overcome this constraint, the application executes genuine network requests via `axios` and immediately synchronizes responses with local React state (`useUsers` custom hook). Newly added users, edits, and deletions reflect immediately in the UI without state loss during session navigation.
   - For newly created users, local IDs are dynamically calculated (`Math.max(...existingIds) + 1`) to prevent key collisions when adding multiple items against mock endpoints.

---

## 📝 Challenges Faced & Reflection

### 1. Handling Read-Only API Limits
- **Challenge**: Relying strictly on mock API state caused newly posted users to disappear on subsequent filtering or updating steps, because JSONPlaceholder does not actually store new entities.
- **Solution**: Designed an optimistic, state-aware custom hook (`useUsers`) that treats the initial API fetch as the baseline directory and maintains local additions, edits, and deletions gracefully while still firing real API requests to meet project requirements.

### 2. Maintaining Clean Responsive UX Across Viewports
- **Challenge**: Complex data tables with multiple action buttons tend to break or cause horizontal scrolling glitches on narrow smartphone screens.
- **Solution**: Developed a dual-view system (`UserTable` for desktop view containers and `UserCardGrid` for mobile viewports). Media queries seamlessly toggle views based on screen size (`768px` breakpoint) for an optimal user experience.

---

## 🔮 Future Improvements (Given More Time)

1. **Full Backend Integration**: Connect with a real persistent database (e.g. Node.js + Express + PostgreSQL / MongoDB) with authentication.
2. **Infinite Scrolling Toggle**: Provide a toggle switch allowing administrators to choose between traditional pagination and continuous infinite scrolling.
3. **Bulk Operations**: Allow multi-select checkboxes to delete or reassign departments for multiple users simultaneously.
4. **Export Capabilities**: Add CSV / Excel export options for filtered user reports.
