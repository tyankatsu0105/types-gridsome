import { Configuration as WebpackConfiguration } from "webpack";
import * as ChainWebpackConfiguration from "webpack-chain";
import { Express as ExpressConfiguration } from "express-serve-static-core";
import { Schema } from "./schema";
import { LoadSourceActions } from "./dataStore";
interface CreatePagesActioons {
    /**
     * Use the `createPages` hook if you want to create pages.
     * Pages created in this hook will be re-created and garbage collected occasionally.
     * Use the `createManagedPages` below to have more control over when pages are updated or deleted manually.
     * @param options
     * @param options.path - Required.
     * @param options.component - Required.
     * @param options.context - Optional context for the page and `page-query`.
     * @param options.queryVariables - Optional context only for `page-query`.
     */
    createPage(options: {
        path: string;
        component: string;
        context: object;
        queryVariables: object;
    }): void;
}
interface createManagedPagesActioons extends CreatePagesActioons {
    /**
     * Removes a page created by `createPage`.
     * @param page
     */
    removePage(page: any): void;
    /**
     * Removes a page matching the provided path.
     * @param path
     */
    removePageByPath(path: any): void;
    /**
     * Removes all pages matching the provided component path.
     * @param path
     */
    removePagesByComponent(path: any): void;
    /**
     * Removes all pages matching the provided query.
     * @param query
     */
    findAndRemovePages(query: any): void;
    /**
     * Returns all pages matching the provided query.
     * @param query
     */
    findPages(query: any): void;
    /**
     * Returns first pages matching the provided query.
     * @param query
     */
    findPage(query: any): void;
}
interface ServerApi {
    /**
     * The Data Store API lets you insert your own data into the GraphQL data layer.
     * You will then be able to access it through GraphQL in your components.
     * Use this API if you want to build a custom data source connection or a plugin.
     * @param callback
     */
    loadSource(callback: (actions: LoadSourceActions) => void): void;
    /**
     * Create a custom GraphQL schema which will be merged with the Gridsome schema.
     * @param callback
     */
    createSchema(callback: (args: Schema) => void): void;
    /**
     * Modify or remove a node before its added to the collection.
     * @param callback
     */
    onCreateNode(callback: (options: any) => void): void;
    /**
     * Create pages programmatically from nodes or other data.
     * The handler for this hook will be re-executed when nodes are changed in store.
     * Pages that are not re-created will be garbage collected.
     * @param callback
     */
    createPages(callback: (options: CreatePagesActioons) => void): void;
    /**
     * Pages created in the `createPages` hook will be re-created and garbage collected occasionally.
     * That's why that hook is only able to create pages.
     * You can use a `createManagedPages` hook to create, update and remove pages yourself.
     * @param callback
     */
    createManagedPages(callback: (options: createManagedPagesActioons) => void): void;
    /**
     * Configure the internal webpack config.
     * The object will be merged with the internal config if it is an object.
     *
     * If the option is a function, it will get the internal config as its first argument.
     * You can either modify the argument or return a new config object that will override the internal webpack config.
     * @param callback
     *
     * @example
     * api.configureWebpack((config) => {
     *  config.debug = true
     * })
     *
     * @example
     * const merge = require('webpack-merge')
     * const baseConfig = require('./webpack.config.base.js')
     * api.configureWebpack(config => {
     *  return merge(baseConfig, config)
     * })
     */
    configureWebpack(callback: (config: WebpackConfiguration) => void): void;
    /**
     * A function that will receive an instance of ChainableConfig powered by [webpack-chain](https://github.com/neutrinojs/webpack-chain).
     * @param callback
     *
     * @example
     * chainWebpack((config) => {
     *  config.mode('development')
     * })
     */
    chainWebpack(callback: (config: ChainWebpackConfiguration) => void): void;
    /**
     * Gridsome runs an [Express](http://expressjs.com/) server during development.
     * Use this hook to add custom endpoints or configure the server.
     * @param callback
     */
    configureServer(callback: (app: ExpressConfiguration) => void): void;
    /**
     * Set custom options for the client. Will use options from the plugin entry if not used.
     * @param options - Any value which can be serialized by `JSON.stringify`.
     */
    setClientOptions(options: any): void;
}
export declare type Server = (api: ServerApi) => void;
export {};
