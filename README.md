# 📧 Reactive Web Mail Client

A modern **web mail client** built using **Angular** and **RxJS**, developed as part of a coursework project.  
The application demonstrates the use of **reactive programming** paradigms for building dynamic, efficient, and responsive user interfaces while simulating a simplified email communication system.

---

## 📘 Overview

This project is a **single-page web application (SPA)** designed to replicate basic email system functionality such as:
- Sending and receiving messages.
- Managing inbox, sent messages, drafts, and contacts.
- Creating and reading emails through a reactive data flow.

The core idea is to **demonstrate the advantages of reactive programming** with Angular — particularly using **RxJS** to handle asynchronous streams and UI reactivity.

---

## 🎯 Objectives

The main goals of this project:
- To explore the **paradigm of reactive web programming**.
- To study and apply **RxJS library** in real-world UI interaction patterns.
- To develop a **convenient and reliable email service** using modern web technologies.
- To showcase front-end development skills as part of a professional portfolio.

---

## 🧱 Technologies Used

### 🌐 Frontend
- **Angular** — core framework for building the SPA.
- **RxJS** — reactive extensions for handling asynchronous streams and event-based programming.
- **TypeScript** — for type-safe and scalable JavaScript development.
- **HTML5 & CSS3** — structure and styling of UI components.
- **SCSS (Sass)** — modular, reusable styles with variables and nesting.
- **Figma** — for UI/UX prototyping and collaborative design.

### ⚙️ Backend (Prototype)
- **JSON Server** — mock REST API used for testing and simulating backend functionality.
  - Supports CRUD operations.
  - Filtering, sorting, and pagination.
  - Real-time updates and mock data persistence.

---

## 🧰 Development Environment

- **Visual Studio Code** — main IDE with extensions for Angular, TypeScript, and Git integration.
- **Node.js + npm** — for package management and local development server.
- **Browser Developer Tools** — for debugging, inspecting data streams, and profiling performance.

---

## 🧩 Architecture Overview

```
web-mail/
├── src/
│   ├── app/
│   │   ├── components/      # UI components (Inbox, Sent, Drafts, etc.)
│   │   ├── services/        # RxJS observables, subjects, API services
│   │   ├── models/          # Interfaces for email, user, and message data
│   │   ├── pages/           # Route-based views (Home, Compose, Contact)
│   │   ├── app.module.ts    # Root module configuration
│   │   └── app-routing.ts   # Application routing setup
│   ├── assets/
│   ├── environments/
│   └── styles/
│
├── db.json                  # Mock database for json-server
├── angular.json             # Angular configuration
├── package.json             # Dependencies and scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/reactive-mail.git
   cd reactive-mail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the mock API**
   ```bash
   npx json-server --watch db.json --port 3001
   ```

4. **Run the Angular app**
   ```bash
   ng serve
   ```

5. **Open the browser**
   ```
   http://localhost:4200
   ```

---

## 💡 Key Features

- **Reactive UI updates** using RxJS observables and operators.
- **Email simulation system**: send, receive, delete, and draft messages.
- **Search and filtering** through RxJS stream transformations.
- **Mock backend** powered by JSON Server for easy prototyping.
- **Modern responsive interface** designed in Figma.
- **Component-based architecture** for scalability and clarity.

---

## 🧠 Learning Focus

This project demonstrates:
- How **Angular** implements reactive programming with **RxJS**.
- Efficient state management without third-party libraries.
- Creating reusable reactive services and subscriptions.
- Error handling, stream cancellation, and async data flow.
- Modular SCSS architecture for maintainable design.

---

## 🔬 Future Improvements

- Integrate a real backend (Node.js + Express or Firebase).
- Add user authentication and JWT session management.
- Implement email threads and attachments.
- Include WebSocket support for real-time messaging.
- Extend UI with Material Design components.

---

## 👨‍💻 Author

**Yevhen Nesterenko**  
Computer Science Student, Lviv National University  
GitHub: https://github.com/nesterenkoyevhen  
Technologies: Angular, RxJS, TypeScript, JSON Server, SCSS, Figma  
Year: 2022  

---

## 📚 References

Developed as part of a coursework project:  
> “Research of reactive programming principles using Angular and RxJS for developing a web-based email service” —  
> Lviv National University, Faculty of Electronics and Computer Technologies, 2022.
