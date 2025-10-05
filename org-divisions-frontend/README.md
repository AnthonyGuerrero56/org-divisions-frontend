# 🏢 Organizational Divisions Frontend

A modern Angular application for managing organizational divisions with advanced table functionality, global search capabilities, and a custom Mandü-branded interface.

## ✨ Features

### 🎯 Core Functionality
- **Interactive Data Table**: Complete NG-ZORRO Ant Design table with sorting, filtering, and pagination
- **Global Search**: Real-time search across all table columns with immediate results
- **Checkbox Selection**: Multi-row selection with "select all" functionality
- **Dynamic Pagination**: Configurable page sizes with real-time collaborator count display
- **Responsive Design**: Mobile-friendly interface with horizontal scrolling for large datasets

### 🎨 UI/UX Design
- **Mandü Branding**: Custom header with brand colors and logo integration
- **Cuadriculado Table Design**: Grid-style table with borderless headers and consistent spacing
- **Segoe UI Typography**: Professional font family applied globally
- **Action Buttons**: Image-based controls for add, import, and export operations
- **Organization Tabs**: Toggle between divisions and collaborators views
- **View Controls**: Switch between list and tree view with visual indicators

### 🔧 Technical Features
- **Angular 18**: Latest Angular framework with standalone components
- **Signal-based State**: Reactive programming with Angular signals
- **TypeScript**: Full type safety and modern JavaScript features
- **RxJS Integration**: Reactive data handling and API communication
- **Custom Services**: Modular architecture with dedicated API and search services

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Angular CLI (v18+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnthonyGuerrero56/org-divisions-frontend.git
   cd org-divisions-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open in browser**
   Navigate to `http://localhost:4200/`

## 📁 Project Structure

```
src/
├── app/
│   ├── core/
│   │   ├── models/           # TypeScript interfaces and types
│   │   └── services/         # API and business logic services
│   ├── divisions/
│   │   ├── divisions-page/   # Main table component
│   │   └── fixed-page/       # Header and navigation component
│   └── environments/         # Environment configurations
├── public/
│   └── images/              # Static assets and brand images
└── styles.scss             # Global styles and Segoe UI font
```

## 🎛️ Key Components

### DivisionsPage
- **Purpose**: Main data table with advanced functionality
- **Features**: Sorting, filtering, pagination, checkbox selection
- **Styling**: Cuadriculado design with #fafafa background

### FixedPage
- **Purpose**: Header and navigation container
- **Features**: Mandü branding, search interface, organization tabs
- **Components**: Logo, navigation, action buttons, view controls

### Services
- **DivisionsApiService**: Data fetching and API communication
- **GlobalSearchService**: Shared search state management

## 🎨 Design System

### Colors
- **Primary Background**: `#fafafa` (Light gray)
- **Border Color**: `#e0e0e0` (Medium gray)
- **Text Primary**: `#262626` (Dark gray)
- **Text Secondary**: `#595959` (Medium gray)
- **Accent**: `#1890ff` (Blue)

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Header Weight**: 500 (Medium)
- **Body Weight**: 400 (Regular)

## 🔧 Available Scripts

### Development
```bash
# Start development server
ng serve

# Build for production
ng build

# Run tests
ng test

# Run linting
ng lint

# Generate new component
ng generate component component-name
```

### Production
```bash
# Build optimized production bundle
ng build --configuration production

# Preview production build locally
ng serve --configuration production
```

## 📊 Data Model

```typescript
interface DivisionRow {
  id: number;
  name: string;
  parentName?: string;
  collaboratorsCount: number;
  level: number;
  subdivisionCount: number;
  ambassadorFullName?: string;
}
```

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 18.x | Frontend framework |
| NG-ZORRO | Latest | UI component library |
| TypeScript | 5.x | Type-safe development |
| RxJS | 7.x | Reactive programming |
| SCSS | Latest | Styling and design system |

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anthony Guerrero** - *Initial work* - [@AnthonyGuerrero56](https://github.com/AnthonyGuerrero56)

## 🤝 Acknowledgments

- NG-ZORRO Ant Design team for the excellent component library
- Angular team for the robust framework
- Mandü brand team for design guidelines and assets

---

*Built with ❤️ using Angular 18 and NG-ZORRO Ant Design*
