import { VueConstructor } from "vue";
import VueRouter from "vue-router";
import { MetaInfo } from "vue-meta";

interface ClientOptions {
  /**
   * Options passed to the main Vue Instance like `new Vue(appOptions)`.
   * @example
   * import Vuex from 'vuex'
   *
   * export default function (Vue, { appOptions }) {
   *   Vue.use(Vuex)
   *
   *   appOptions.store = new Vuex.Store({
   *     state: {
   *       count: 0
   *     },
   *     mutations: {
   *       increment (state) {
   *         state.count++
   *       }
   *     }
   *   })
   * }
   */
  appOptions: any;

  /**
   * Interact with the router.
   * Read more about the [Vue router](https://router.vuejs.org/api/#router-instance-methods) methods.
   */
  router: VueRouter;

  /**
   * Allows you to manage your websites' metadata.
   * @example
   * module.exports = (Vue, options) => {
   *   options.head.meta.push({
   *     charset: 'utf-8'
   *   })
   * }
   */
  head: MetaInfo;

  /**
   * Value is `true` only when browser.
   */
  isClient: boolean;

  /**
   * Value is `true` only when server.
   */
  isServer: boolean;
}

/**
 * The function will receive the plugin options as second argument and the context as the third.
 * @example
 * export default function (Vue, options, context) {
 * // ...
 * }
 */
export type Client = (
  Vue: VueConstructor,
  options: ClientOptions,
  context: any
) => void;
