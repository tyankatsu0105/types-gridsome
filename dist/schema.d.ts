import { GraphQLSchema } from "graphql";
declare type Resolver = string | number | boolean | ResolverArray | ResolverObject | ResolverMethod;
interface ResolverArray extends Array<Resolver> {
}
interface ResolverObject {
    [key: string]: Resolver;
}
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
export interface FactoryMethods {
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
    createUnionType(options: {
        name: string;
        types: string[];
    }): void;
    /**
     * @param options - Required
     */
    createEnumType(options: {
        name: string;
        values: object;
    }): void;
    /**
     * @param options - Required
     */
    createInterfaceType(options: {
        name: string;
        fields: object;
    }): void;
    /**
     * @param options - Required
     */
    createInputType(options: {
        name: string;
        fields: object;
    }): void;
}
export interface Schema {
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
    addSchemaResolvers(resolves: {
        [key: string]: Resolver;
    }): void;
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
export {};
