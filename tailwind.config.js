module.exports = {
	mode: "jit",
	purge: ["./src/**/*.js", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ["Roboto", "sans-serif"],
			serif: ['"Roboto Slab"', "serif"],
			body: ["Roboto", "sans-serif"],
		},
		extend: {
			backgroundImage: () => ({
				"login-background":
					"linear-gradient(rgba(0,0,0, 0.4), rgba(0,0,0, 0.60)), url('/src/assets/img/background-1920x1280.jpg')",
			}),
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
