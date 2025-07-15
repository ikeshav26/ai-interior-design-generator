# 🏠 AI Interior Designer

A modern, full-stack web application that uses artificial intelligence to generate stunning interior design concepts. Users can input room descriptions and receive AI-generated design visualizations, create profiles, and explore a community gallery of designs.

![Interior Designer Preview](https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🎨 **AI-Powered Design Generation**
- Generate interior designs using natural language prompts
- Multiple room type support (Living Room, Bedroom, Kitchen, Bathroom, Office, Dining Room)
- Style presets for quick inspiration
- Multiple AI service fallbacks (Pollinations AI, Hugging Face, Stability AI)
- High-quality image generation with download capability

### 👤 **User Management**
- Secure user authentication with HTTP-only cookies
- Profile management with avatar and username editing
- Personal design gallery with Pinterest-style masonry layout
- Design deletion and download functionality

### 🌐 **Community Features**
- Explore page showcasing all community designs
- Pinterest-style responsive grid layout
- Room type filtering and search functionality
- Beautiful glassmorphism UI design

### 🎭 **Modern UI/UX**
- Dark/Light theme switching
- Responsive design for all devices
- Smooth animations and transitions
- Toast notifications for user feedback
- Loading states and error handling

## 🛠️ Technology Stack

### **Frontend**
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hot Toast** - Elegant notifications
- **Lucide React** - Beautiful icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - HTTP cookie parsing

### **Cloud Services**
- **Cloudinary** - Image storage and optimization
- **Multiple AI APIs** - Fallback system for reliability
  - Pollinations AI (Primary)
  - Hugging Face API
  - Stability AI

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Cloudinary account
- AI API keys (optional for AI services)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ikeshav26/ai-interior-design-generator.git
   cd ai-interior-design-generator
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create `.env` files in both directories:

   **Backend `.env`:**
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   HUGGING_FACE_API_KEY=your_hugging_face_key
   STABILITY_AI_KEY=your_stability_ai_key
   ```

   **Frontend `.env`:**
   ```env
   VITE_BACKEND_URI=http://localhost:5000
   ```

5. **Start the Application**
   
   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Open in Browser**
   ```
   http://localhost:5173
   ```

## 📁 Project Structure

```
ai-interior-design-generator/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── connectDb.js
│   │   │   └── cloudinary.js
│   │   ├── controller/
│   │   │   ├── User.controller.js
│   │   │   └── Design.controller.js
│   │   ├── middleware/
│   │   │   └── user.auth.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   └── design.model.js
│   │   └── routes/
│   │       ├── user.routes.js
│   │       └── Design.routes.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── Provider.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── CreateDesign.jsx
│   │   │   ├── Explore.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🎯 Key Features Implementation

### **AI Integration**
- **Prompt Processing**: Natural language processing for design descriptions
- **Multiple AI Services**: Fallback system ensures 99% uptime
- **Image Generation**: High-quality interior design visualizations
- **Style Presets**: Pre-defined styles for quick generation

### **Authentication System**
- **Secure Login**: HTTP-only cookies prevent XSS attacks
- **Password Security**: bcrypt hashing with salt rounds
- **Session Management**: JWT tokens with expiration
- **Profile Management**: Avatar and username updates

### **Database Design**
- **User Schema**: Secure user data storage
- **Design Schema**: Efficient design metadata storage
- **Relationships**: User-design associations
- **Indexing**: Optimized queries for performance

### **UI/UX Features**
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Theme System**: Dark/light mode with persistent storage
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages

## 🔧 API Endpoints

### **Authentication**
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/logout` - User logout
- `POST /api/user/forgot-password` - Password reset
- `POST /api/user/verify-otp` - OTP verification

### **User Management**
- `POST /api/user/update/username` - Update username
- `POST /api/user/update/avatar` - Update avatar

### **Design Management**
- `POST /api/design/generate-design/prompt` - Generate new design
- `GET /api/design/my-designs` - Get user's designs
- `GET /api/design/explore` - Get all public designs
- `DELETE /api/design/delete/:designId` - Delete specific design

## 🎨 Design System

### **Color Palette**
- **Primary**: Modern blue gradients
- **Secondary**: Complementary purple tones
- **Accent**: Vibrant highlighting colors
- **Neutral**: Professional grays and whites

### **Typography**
- **Headings**: Bold, modern font weights
- **Body**: Readable, accessible font sizes
- **UI Elements**: Clear, consistent labeling

### **Layout**
- **Grid System**: CSS Grid and Flexbox
- **Spacing**: Consistent margin/padding scale
- **Breakpoints**: Mobile-first responsive design

## 🤝 Contributing

This project was primarily developed by **Keshav** with assistance from AI tools for:
- Code suggestions and optimization
- Documentation improvements
- Best practices recommendations
- Bug fixing assistance

### **Development Approach**
- **Core Architecture**: Designed and implemented by developer
- **Feature Development**: Hand-coded with AI assistance for optimization
- **UI/UX Design**: Original concepts enhanced with AI suggestions
- **Problem Solving**: Independent debugging with AI consultation

### **How to Contribute**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Primary Developer**: [Keshav](https://github.com/ikeshav26)
- **AI Assistance**: Used for code optimization, documentation, and best practices
- **Design Inspiration**: Modern web design trends and user experience patterns
- **AI Services**: Pollinations AI, Hugging Face, Stability AI for image generation
- **Cloud Services**: Cloudinary for image storage and optimization

## 📞 Contact

**Developer**: Keshav  
**GitHub**: [@ikeshav26](https://github.com/ikeshav26)  
**Project Link**: [https://github.com/ikeshav26/ai-interior-design-generator](https://github.com/ikeshav26/ai-interior-design-generator)

---

### 🤖 AI Assistance Disclosure

This project was developed primarily by the human developer with AI assistance used for:
- Code suggestions and improvements
- Documentation writing and formatting
- Best practices recommendations
- Debugging support and optimization tips

The core architecture, design decisions, feature implementation, and creative direction were driven by human expertise and creativity. AI tools served as helpful assistants in the development process, similar to how a developer might use Stack Overflow, documentation, or pair programming sessions.

**Total Human Contribution**: ~85%  
**AI Assistance**: ~15%

---

*Made with ❤️ by Keshav with AI assistance*
