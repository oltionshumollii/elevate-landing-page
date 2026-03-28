# Elevate - Modern Corporate Landing Page


A fully responsive, modern corporate landing page built with pure HTML, CSS, and JavaScript. Features a professional design with dark/light mode, mobile-first approach, and smooth user interactions.



## ✨ Features

### 🎨 Design & UI
- **Modern Corporate Aesthetic** - Clean, professional design with soft shadows and balanced spacing
- **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- **Dark/Light Mode** - Toggle between themes with persistent user preference using localStorage
- **Smooth Animations** - Subtle hover effects, fade-ins, and transitions
- **Professional Typography** - Google Fonts Inter for optimal readability

### 🛠️ Functionality
- **Mobile Hamburger Menu** - Collapsible navigation for mobile devices
- **Smooth Scrolling** - Seamless navigation to different sections
- **Form Validation** - Client-side validation for contact form (name, email, message)
- **Active Navigation Highlighting** - Dynamically updates active menu item based on scroll position
- **Local Storage** - Saves theme preference across browser sessions

### 📱 Sections
1. **Header** - Logo, navigation, theme toggle, and mobile menu button
2. **Hero Section** - Engaging headline, description, and CTA buttons
3. **Services/Features** - Four core capabilities with icons and descriptions
4. **About Section** - Company story, mission, and key statistics
5. **Contact Form** - Functional form with validation and success message
6. **Footer** - Logo, dynamic note, navigation links, and copyright

## 📁 Project Structure
elevate-landing-page/
│
├── index.html # Main HTML structure
├── style.css # All styling and responsive design
├── script.js # JavaScript functionality
└── README.md # Project documentation

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties, flexbox, grid, animations
- **JavaScript (ES6+)** - DOM manipulation, event handling, local storage
- **Font Awesome 6** - Professional icons
- **Google Fonts** - Inter font family

## 📦 Installation & Setup

### Option 1: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/oltionshumollii/elevate-landing-page.git
   cd elevate-landing-page
   Option 2: Direct Download
Download the ZIP file from GitHub

Extract all files

Open index.html in your browser

🎯 Features in Detail
Dark/Light Mode
Toggle button in header switches between themes

Automatically detects system preference on first visit

Saves user preference in localStorage

Smooth transition between themes with CSS custom properties

Mobile Menu
Hamburger icon appears on mobile devices (<968px)

Full-screen overlay menu with smooth animation

Automatically closes after navigation

Touch-friendly tap targets

Form Validation
Name - Required, minimum 2 characters

Email - Required, valid email format validation

Message - Required, minimum 10 characters

Real-time error messages

Success message on valid submission

Smooth Scrolling
All anchor links scroll smoothly to target sections

Offset for fixed header

Updates URL without page jump

Mobile menu closes automatically

📱 Responsive Breakpoints
Device	Screen Width	Adjustments
Mobile	< 640px	Single column layout, stacked elements, smaller typography
Tablet	640px - 968px	Adjusted grid layouts, hamburger menu
Desktop	> 968px	Full layout, dual column sections
🎨 Color Palette
Light Mode
Primary Background: #ffffff

Secondary Background: #f8fafc

Primary Text: #0f172a

Secondary Text: #334155

Accent Color: #2563eb

Dark Mode
Primary Background: #0f172a

Secondary Background: #1e293b

Primary Text: #f1f5f9

Secondary Text: #cbd5e1

Accent Color: #3b82f6

🚀 Performance Optimizations
Minimal external dependencies (only Font Awesome and Google Fonts)

CSS custom properties for easy theme customization

Optimized animations using CSS transforms

Debounced scroll event listeners

Lazy loading of fonts

🔧 Customization
Changing Colors
Edit the CSS custom properties in the :root selector:

css
:root {
  --accent: #2563eb;      /* Primary brand color */
  --accent-light: #3b82f6; /* Lighter accent */
  --text-primary: #0f172a; /* Main text color */
}
Modifying Content
Update text content directly in index.html

Replace placeholder images with your own assets

Modify service cards, statistics, and contact information

Adding New Sections
Add new HTML section with appropriate ID

Add corresponding styles in CSS

Update navigation links if needed

📝 Browser Support
Chrome (latest)

Firefox (latest)

Safari (latest)

Edge (latest)

Opera (latest)

Mobile browsers (iOS Safari, Chrome for Android)

🤝 Contributing
Contributions are welcome! Here's how you can help:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
🙏 Acknowledgments
Font Awesome for the amazing icon library

Google Fonts for the Inter font family

Inspiration from modern corporate design trends

📧 Contact
Oltion Shumolli - @oltionshumollii - oltionshumolli.pc@gmail.com
GitHub: https://github.com/oltionshumollii
Project Link: https://oltionshumollii.github.io/elevate-landing-page/

⭐ Show Your Support
If you found this project helpful, please give it a ⭐ on GitHub!



This project is licensed under the  License - see the license on LICENSE.txt
   
