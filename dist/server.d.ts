interface Collection {
  /**
   * Add node to collection.
   * @param object - Custom fields.
   */
  addNode(object: { [k: string]: any }): void;
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
interface Actions {
  /**
   * Add a collection.
   * @param options - GraphQL schema type name.
   */
  addCollection(
    options:
      | {
          typeName: string;
        }
      | string
  ): Collection;
  /**
   * Get a collection previously created.
   * @param typeName The GraphQL schema type name.
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
}
export declare type Server = (api: ServerApi) => void;
export {};
