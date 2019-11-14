import { Configuration as WebpackConfiguration } from "webpack";
import * as ChainWebpackConfiguration from "webpack-chain";
import { Express as ExpressConfiguration } from "express-serve-static-core";
export declare type Config = {
    /**
     * Set a name for your project. The name is typically used in the title tag.
     * @default `<dirname>`
     */
    siteName: string;
    /**
     * The description is used as description on your frontpage.
     * @default ''
     */
    siteDescription: string;
    /**
     * @default ''
     */
    siteUrl: string;
    /**
     * Gridsome assumes your project is served from the root of your domain.
     * Change this option to `/my-app` if your project will be hosted in a subdirectory called `my-app`.
     * @default ''
     */
    pathPrefix: string;
    /**
     * Set a template for the title tag.
     * The `%s` placeholder is replaced with title from metaInfo that you set in your pages.
     * @default %s - `<siteName>`
     */
    titleTemplate: string;
    /**
     * Activate plugins by adding them to the `plugins` array.
     * @default []
     */
    plugins: {
        use: string;
        options: object;
    }[];
    /**
     * Define routes and templates for collections.
     * @default {}
     */
    templates: {
        [key: string]: {
            /**
             * Define a dynamic route and use any node field as parameters.
             */
            path: string;
            /**
             * Specify a component to use as template for each page.
             */
            component: string;
            /**
             * Specify a name for the template to get the path in GraphQL.
             */
            name: string;
        }[];
    };
    /**
     * Add global metadata to the GraphQL schema.
     * @default {}
     */
    metadata: object;
    /**
     * Gridsome will use any image located at `src/favicon.png` as favicon and touchicon by default, but you can define another path or sizes etc.
     * The icon should be a square and minimum 16 pixels.
     * The favicon will be resized to 16, 32, 96 pixels.
     * And the touchicon will be resized to 76, 152, 120, 167, 180 pixels by default.
     * @default './src/favicon.png'
     */
    icon: string | Favicon | TouchIcon;
    /**
     * The option will be merged with the internal config if it is an object.
     * If the option is a function, it will get the internal config as its first argument.
     * You can either modify the argument or return a new config object that will override the internal webpack config.
     */
    configureWebpack: configureWebpackObject | configureWebpackFunction;
    /**
     * A function that will receive an instance of ChainableConfig powered by [webpack-chain](https://github.com/neutrinojs/webpack-chain).
     * @param callback
     *
     * @example
     * chainWebpack((config) => {
      *  config.mode('development')
      * })
      */
    chainWebpack(config: ChainWebpackConfiguration): void;
    /**
     * Include the Vue template compiler at runtime.
     * @default false
     */
    runtimeCompiler: boolean;
    /**
     * Configure the development server.
     * @param app
     * @example
     * configureServer(app) {
     *   app.get('/my-endpoint', (req, res) => {
     *     res.send('Hello, world!')
     *   })
     * }
     */
    configureServer(app: ExpressConfiguration): void;
    permalinks: Permalinks;
    css: Css;
    /**
     * @default 'localhost'
     */
    host: string;
    /**
     * @default 8080
     */
    port: number;
    /**
     * Set custom folder for generated files on `gridsome build`.
     * @default 'dist'
     */
    outDir: string;
};
declare type configureWebpackFunction = (config: WebpackConfiguration) => void;
declare type configureWebpackObject = WebpackConfiguration;
declare type Favicon = {
    favicon: {
        src: string;
        touchicon: string;
        sizes: number[];
    };
};
declare type TouchIcon = {
    touchicon: {
        src: string;
        sizes: number[];
        precomposed: boolean;
    };
};
interface Permalinks {
    /**
     * Appends a trailing slash to pages and templates by default.
     * @default true
     */
    trailingSlash: boolean;
    /**
     * Use a custom slugify method. Default slugifyer is [@sindresorhus/slugify](https://github.com/sindresorhus/slugify).
     */
    slugify: Function | {
        use: string;
        options: object;
    };
}
interface Css {
    /**
     * Split CSS into multiple chunks.
     * Splitting is disabled by default.
     * Splitting CSS can result in weird behaviors.
     * @default false
     */
    split: boolean;
    /**
     * Pass options to CSS-related loaders.
     * Supported loaders are:
     * - [css-loader](https://github.com/webpack-contrib/css-loader)
     * - [postcss-loader](https://github.com/postcss/postcss-loader)
     * - [sass-loader](https://github.com/webpack-contrib/sass-loader)
     * - [less-loader](https://github.com/webpack-contrib/less-loader)
     * - [stylus-loader](https://github.com/shama/stylus-loader)
     * @default {}
     */
    loaderOptions: {
        css: object;
        postcss: object;
        sass: object;
        scss: object;
        less: object;
        stylus: object;
    };
}
export {};
