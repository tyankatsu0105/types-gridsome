// @see https://gridsome.org/docs/server-api/
// @see https://gridsome.org/docs/data-store-api/

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
  addSchema(schema: any): void;

  schema: FactoryMethods;
}

interface Actions extends Schema {
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

interface ServerApi {
  /**
   * The Data Store API lets you insert your own data into the GraphQL data layer.
   * You will then be able to access it through GraphQL in your components.
   * Use this API if you want to build a custom data source connection or a plugin.
   * @param callback
   */
  loadSource(callback: (actions: Actions) => void): void;

  createSchema(callback: (args: Schema) => void): void;
}

// ========================================
// Export
// ========================================
export type Server = (api: ServerApi) => void;
