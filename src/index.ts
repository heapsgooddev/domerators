/**
 * library barrel file
 *
 * to add development specific pieces, use the following syntax;
 * export const sum = (a: number, b: number) => {
 *  if ('development' === process.env.NODE_ENV) {
 *    console.log('boop');
 *  }
 *  return a + b;
 * };
 */

/**
 * import polyfills if needed. recommended core-js (npm i -D core-js)
 */
import { Bind } from './decorators/bind.decorator';
import { ListenAll } from './decorators/listen-all.decorator';
import { Listen } from './decorators/listen.decorator';
import { QueryAll } from './decorators/query-all.decorator';
import { Query } from './decorators/query.decorator';
import { Watch } from './decorators/watch.decorator';
import { DataProxy } from './models/data-proxy.model';

/**
 *  library public available bits & bobs
 */
export { Bind, ListenAll, Listen, QueryAll, Query, Watch, DataProxy };
