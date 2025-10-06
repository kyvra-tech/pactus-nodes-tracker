# Pactus Nodes Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

A comprehensive web interface for monitoring and visualizing Pactus network nodes health and distribution across the globe. This project is part of the FUSION program initiative within Pactus to support community-driven efforts.

## 🌟 Features

### Phase 1: Bootstrap Node Health Monitoring
- **Real-time Health Monitoring**: Daily monitoring of bootstrap nodes with connectivity scoring
- **Visual Health Indicators**: Color-coded daily bar indicators (red/gray for unhealthy, green for healthy)
- **Error Logging**: Comprehensive error tracking for investigation and debugging
- **Connection Testing**: Automated connection attempts with 5-attempt threshold

### Phase 2: Reachable Nodes Detection
- **Node Discovery**: Detection and display of reachable nodes using BitNodes-inspired methodology
- **Interactive World Map**: Geographic visualization of node distribution
- **Data Insights**: Charts and tables showing key network metrics
- **Public Node Registration**: Users can list their JSON-RPC or gRPC nodes
- **Multi-page Interface**:
  - Bootstrap Nodes Health
  - Public JSON-RPC Node Health  
  - Public gRPC Node Health

### Phase 3: Advanced Node Crawler (Planned)
- **Nebula Integration**: Node crawler using the Nebula project
- **Grafana Integration**: Advanced monitoring dashboards
- **Comprehensive Data Collection**: Enhanced network analysis

### Phase 4: Public APIs (Planned)
- **JSON-RPC APIs**: Publicly accessible APIs for node data
- **Documentation**: Comprehensive API documentation
- **Community Access**: Open access to network insights

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:kyvra-tech/pactus-nodes-tracker.git
   cd pactus-nodes-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure
```
pactus-nodes-tracker/
├── public/                     # Static assets
│   ├── favicon.ico
│   └── index.html
├── src/
│   ├── components/            # Reusable components
│   │   ├── common/           # Common UI components
│   │   │   ├── Footer.tsx
│   │   │   └── NavBar.tsx
│   │   ├── sections/         # Page sections
│   │   │   └── Stats.tsx
│   │   └── shared/           # Shared components
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       ├── FormInputField.tsx
│   │       ├── HorizontalRule.tsx
│   │       ├── Identicon.tsx
│   │       ├── NavbarButton.tsx
│   │       ├── NavItem.tsx
│   │       ├── NodeInputForm.tsx
│   │       ├── Pagination.tsx
│   │       ├── Paragraph.tsx
│   │       ├── ThemeToggle.tsx
│   │       └── Title.tsx
│   ├── data/                 # Static data files
│   │   ├── bootstrap_nodes.json
│   │   ├── countries.json
│   │   └── peer_nodes.json
│   ├── layouts/              # Layout components
│   │   └── Layout.tsx
│   ├── pages/                # Page components
│   │   ├── BootstrapNodeHealth.tsx
│   │   ├── GRPC.tsx
│   │   ├── JsonRPC.tsx
│   │   └── PeerNodes.tsx
│   ├── styles/               # Global styles
│   │   ├── global.css
│   │   └── theme.css
│   ├── utils/                # Utility functions
│   │   ├── theme.ts
│   │   └── toggleMenu.ts
│   ├── App.tsx               # Main application component
│   ├── main.tsx              # Application entry point
│   └── vite-env.d.ts         # Vite type definitions
├── docs/                     # Documentation
│   ├── API.md
│   ├── ARCHITECTURE.md
│   ├── CONTRIBUTING.md
│   ├── DEPLOYMENT.md
│   └── DEVELOPMENT.md
├── .github/                  # GitHub workflows
│   └── workflows/
│       └── ci.yml
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── README.md
├── CONTRIBUTING.md
└── LICENSE