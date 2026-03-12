/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Branding
        'brand-teal': '#0d9488',   // Main brand color (Teal 600)
        'brand-purple': '#7e22ce', // Primary accent (Purple 700)
        
        // Backgrounds & Surface Colors
        'clinical-bg': '#F8FAFC',  // Light Slate/Gray for headers
        'clinical-dark': '#0f172a', // Slate 900 for dark sections
        
        // Extended Palette for UI elements
        'teal-soft': '#f0fdfa',    // Teal 50 for light tints
        'purple-soft': '#faf5ff',  // Purple 50 for light tints
      },
      // Optional: Adding custom animations for the "reveal" effect
      animation: {
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}