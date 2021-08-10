import {NuxtConfig} from '@nuxt/types';
import {resolve} from 'path';

// console.log(LiveReloadPlugin)


const config: NuxtConfig = {
	telemetry: false,
	srcDir: 'client/',
	buildDir: './dist/client/',
	server: {
		port: 3000
	},
	ssr: true,
	/*
	** Headers of the page
	*/
	head: {
		title: process.env.npm_package_name || '',
		meta: [
			{charset: 'utf-8'},
			{name: 'viewport', content: 'width=device-width, initial-scale=1'},
			{hid: 'description', name: 'description', content: process.env.npm_package_description || ''}
		],
		link: [
			{rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
		],


	},
	/*
	** Customize the progress-bar color
	*/
	loading: {color: '#fff'},
	/*
	** Global CSS
	*/
	css: [
		'./assets/custom.scss'
	],
	/*
	** Plugins to load before mounting the App
	*/
	plugins: [],

	/*
	** Nuxt.js dev-modules
	*/
	buildModules: [
		'@nuxtjs/vuetify',
	],

	/*
	** Nuxt.js modules
	*/
	modules: [
		'@nuxtjs/i18n'
	],

	i18n: {
		locales: ['en', 'fr', 'es'],
		defaultLocale: 'en',
		vueI18n: {
			fallbackLocale: 'en',
			numberFormats: {
				'en-US': {
					currency: {
						style: 'currency',
						currency: 'USD',
						currencyDisplay: 'symbol'
					}
				},
				'ja-JP': {
					currency: {
						style: 'currency',
						currency: 'JPY',
						currencyDisplay: 'symbol'
					}
				}
			}
		},

	},

	/*
	** Build configuration
	*/
	build: {
		/*
		** You can extend webpack config here
		*/
		extend(config, ctx) {
			config.module.rules.push({
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader'
			});
			// // Sets webpack's mode to development if `isDev` is true.
			// if (ctx.isDev) {
			// 	config.plugins.push();
			// };
			config.resolve.alias['@root'] = resolve(__dirname, './');
		}
	}
};

export default config;
