import { Configuration as WebpackConfiguration } from "webpack";
import * as ChainWebpackConfiguration from "webpack-chain";
import { Express as ExpressConfiguration } from "express-serve-static-core";
import { GraphQLSchema } from "graphql";

interface Collection {
  /**
   * Add node to collection.
   * @param object - Custom fields.
   */
  addNode(object: { [key: string]: any }): void;

  /**
   * Make a root field for all nodes in collection referencing to another node.
   * @param fieldName - The field name.
   * @param typeName - GraphQL schema type to reference.
   */
  addReference(fieldName: string, typeName: string): void;
}

interface Store {
  /**
   * A helper function for creating references to other nodes when the schema types are inferred.
   * @param typeName - The node typeName to reference or the node instance.
   * @param id - The node id to reference (or ids if multiple nodes).
   */
  createReference(typeName: string | object, id: string | string[]): void;
}

type Resolver =
  | string
  | number
  | boolean
  | ResolverArray
  | ResolverObject
  | ResolverMethod;

interface ResolverArray extends Array<Resolver> {}

interface ResolverObject {
  [key: string]: Resolver;
}

// @FIXME I don't know method type with index signature.
interface ResolverMethod {
  /**
   * The resolver method can add new fields or override existing fields.
   * @param obj any
   * @param args object
   * @param context object
   * @param info any
   */
  [key: string]: (obj: any, args: object, context: object, info: any) => void;
}

interface FactoryMethods {
  /**
   * @param options - Required
   */
  createObjectType(options: {
    name: string;
    fields: object;
    extensions: object;
    interfaces: string[];
  }): void;

  /**
   * @param options - Required
   */
  createUnionType(options: { name: string; types: string[] }): void;

  /**
   * @param options - Required
   */
  createEnumType(options: { name: string; values: object }): void;

  /**
   * @param options - Required
   */
  createInterfaceType(options: { name: string; fields: object }): void;

  /**
   * @param options - Required
   */
  createInputType(options: { name: string; fields: object }): void;
}

interface Schema {
  /**
   * Schema types can be added as an [SDL](https://graphql.org/learn/schema/) string or by using the [factory methods](https://gridsome.org/docs/schema-api/#factory-methods).
   * Types for collections must implement the `Node` interface.
   * And Gridsome will not infer field types for custom fields unless the `@infer` directive is used.
   * @param types
   */
  addSchemaTypes(types: string | any[]): void;

  /**
   * Resolvers are methods that are executed on each field in the query.
   * The default resolvers for types like `String` or `Int` simply return the value without any modifications.
   * Resolvers for fields that are referencing another node are interacting with the internal store to return data from the requested node.
   * @param resolves - Required
   */
  addSchemaResolvers(resolves: { [key: string]: Resolver }): void;

  // @FIXME Add types `GraphQLSchema`
  /**
   * Add a custom GraphQL schema that will be merged with the internal schema.
   * @example
   * const { GraphQLSchema } = require('gridsome/graphql')
   * addSchema(new GraphQLSchema({
   * // ...
   * }))
   * @param schema - Required
   */
  addSchema(schema: GraphQLSchema): void;

  schema: FactoryMethods;
}

interface LoadSourceActions extends Schema {
  /**
   * Add a collection.
   * @param options - GraphQL schema type name.
   */
  addCollection(options: { typeName: string } | string): Collection;

  /**
   * Get a collection previously created.
   * @param typeName - The GraphQL schema type name.
   */
  getCollection(typeName: string): void;

  store: Store;
}

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

  // @todo Refactor callback's argument type.
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
  createManagedPages(
    callback: (options: createManagedPagesActioons) => void
  ): void;

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

// ========================================
// Export
// ========================================
export type Server = (api: ServerApi) => void;
