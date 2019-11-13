export interface CreatePagesActioons {
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
export interface createManagedPagesActioons extends CreatePagesActioons {
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
