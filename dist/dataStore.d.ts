import { Schema } from "./schema";
interface Collection {
    /**
     * Add node to collection.
     * @param object - Custom fields.
     */
    addNode(object: {
        [key: string]: any;
    }): void;
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
export interface LoadSourceActions extends Schema {
    /**
     * Add a collection.
     * @param options - GraphQL schema type name.
     */
    addCollection(options: {
        typeName: string;
    } | string): Collection;
    /**
     * Get a collection previously created.
     * @param typeName - The GraphQL schema type name.
     */
    getCollection(typeName: string): void;
    store: Store;
}
export {};
