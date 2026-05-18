export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        surface: '#111827',
        panel: '#18203a',
        skyblue: '#7dd3fc',
        violetsoft: '#c084fc',
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 23, 42, 0.12)',
      },
      backgroundImage: {
        'gradient-radial-lg': 'radial-gradient(circle at top, rgba(59, 130, 246, 0.18), transparent 38%), radial-gradient(circle at 80% 20%, rgba(167, 139, 250, 0.15), transparent 25%)',
      },
    },
  },
  plugins: [],
}
