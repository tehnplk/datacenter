
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Hospital
 * 
 */
export type Hospital = $Result.DefaultSelection<Prisma.$HospitalPayload>
/**
 * Model Drgs
 * 
 */
export type Drgs = $Result.DefaultSelection<Prisma.$DrgsPayload>
/**
 * Model RawData
 * 
 */
export type RawData = $Result.DefaultSelection<Prisma.$RawDataPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Hospitals
 * const hospitals = await prisma.hospital.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Hospitals
   * const hospitals = await prisma.hospital.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.hospital`: Exposes CRUD operations for the **Hospital** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hospitals
    * const hospitals = await prisma.hospital.findMany()
    * ```
    */
  get hospital(): Prisma.HospitalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.drgs`: Exposes CRUD operations for the **Drgs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Drgs
    * const drgs = await prisma.drgs.findMany()
    * ```
    */
  get drgs(): Prisma.DrgsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rawData`: Exposes CRUD operations for the **RawData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RawData
    * const rawData = await prisma.rawData.findMany()
    * ```
    */
  get rawData(): Prisma.RawDataDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.3.0
   * Query Engine version: 9d6ad21cbbceab97458517b147a6a09ff43aa735
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Hospital: 'Hospital',
    Drgs: 'Drgs',
    RawData: 'RawData'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "hospital" | "drgs" | "rawData"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Hospital: {
        payload: Prisma.$HospitalPayload<ExtArgs>
        fields: Prisma.HospitalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HospitalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HospitalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findFirst: {
            args: Prisma.HospitalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HospitalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          findMany: {
            args: Prisma.HospitalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          create: {
            args: Prisma.HospitalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          createMany: {
            args: Prisma.HospitalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HospitalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          delete: {
            args: Prisma.HospitalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          update: {
            args: Prisma.HospitalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          deleteMany: {
            args: Prisma.HospitalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HospitalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HospitalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>[]
          }
          upsert: {
            args: Prisma.HospitalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HospitalPayload>
          }
          aggregate: {
            args: Prisma.HospitalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHospital>
          }
          groupBy: {
            args: Prisma.HospitalGroupByArgs<ExtArgs>
            result: $Utils.Optional<HospitalGroupByOutputType>[]
          }
          count: {
            args: Prisma.HospitalCountArgs<ExtArgs>
            result: $Utils.Optional<HospitalCountAggregateOutputType> | number
          }
        }
      }
      Drgs: {
        payload: Prisma.$DrgsPayload<ExtArgs>
        fields: Prisma.DrgsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DrgsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DrgsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          findFirst: {
            args: Prisma.DrgsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DrgsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          findMany: {
            args: Prisma.DrgsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>[]
          }
          create: {
            args: Prisma.DrgsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          createMany: {
            args: Prisma.DrgsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DrgsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>[]
          }
          delete: {
            args: Prisma.DrgsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          update: {
            args: Prisma.DrgsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          deleteMany: {
            args: Prisma.DrgsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DrgsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DrgsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>[]
          }
          upsert: {
            args: Prisma.DrgsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DrgsPayload>
          }
          aggregate: {
            args: Prisma.DrgsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDrgs>
          }
          groupBy: {
            args: Prisma.DrgsGroupByArgs<ExtArgs>
            result: $Utils.Optional<DrgsGroupByOutputType>[]
          }
          count: {
            args: Prisma.DrgsCountArgs<ExtArgs>
            result: $Utils.Optional<DrgsCountAggregateOutputType> | number
          }
        }
      }
      RawData: {
        payload: Prisma.$RawDataPayload<ExtArgs>
        fields: Prisma.RawDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RawDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RawDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          findFirst: {
            args: Prisma.RawDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RawDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          findMany: {
            args: Prisma.RawDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>[]
          }
          create: {
            args: Prisma.RawDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          createMany: {
            args: Prisma.RawDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RawDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>[]
          }
          delete: {
            args: Prisma.RawDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          update: {
            args: Prisma.RawDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          deleteMany: {
            args: Prisma.RawDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RawDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RawDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>[]
          }
          upsert: {
            args: Prisma.RawDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RawDataPayload>
          }
          aggregate: {
            args: Prisma.RawDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRawData>
          }
          groupBy: {
            args: Prisma.RawDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<RawDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.RawDataCountArgs<ExtArgs>
            result: $Utils.Optional<RawDataCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    hospital?: HospitalOmit
    drgs?: DrgsOmit
    rawData?: RawDataOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Hospital
   */

  export type AggregateHospital = {
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  export type HospitalAvgAggregateOutputType = {
    id: number | null
  }

  export type HospitalSumAggregateOutputType = {
    id: number | null
  }

  export type HospitalMinAggregateOutputType = {
    id: number | null
    hoscode: string | null
    hosname: string | null
    hostype: string | null
    orgtype: string | null
    tmb: string | null
    amp: string | null
    prov: string | null
    activated: boolean | null
  }

  export type HospitalMaxAggregateOutputType = {
    id: number | null
    hoscode: string | null
    hosname: string | null
    hostype: string | null
    orgtype: string | null
    tmb: string | null
    amp: string | null
    prov: string | null
    activated: boolean | null
  }

  export type HospitalCountAggregateOutputType = {
    id: number
    hoscode: number
    hosname: number
    hostype: number
    orgtype: number
    tmb: number
    amp: number
    prov: number
    activated: number
    _all: number
  }


  export type HospitalAvgAggregateInputType = {
    id?: true
  }

  export type HospitalSumAggregateInputType = {
    id?: true
  }

  export type HospitalMinAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    hostype?: true
    orgtype?: true
    tmb?: true
    amp?: true
    prov?: true
    activated?: true
  }

  export type HospitalMaxAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    hostype?: true
    orgtype?: true
    tmb?: true
    amp?: true
    prov?: true
    activated?: true
  }

  export type HospitalCountAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    hostype?: true
    orgtype?: true
    tmb?: true
    amp?: true
    prov?: true
    activated?: true
    _all?: true
  }

  export type HospitalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospital to aggregate.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hospitals
    **/
    _count?: true | HospitalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HospitalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HospitalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HospitalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HospitalMaxAggregateInputType
  }

  export type GetHospitalAggregateType<T extends HospitalAggregateArgs> = {
        [P in keyof T & keyof AggregateHospital]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHospital[P]>
      : GetScalarType<T[P], AggregateHospital[P]>
  }




  export type HospitalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HospitalWhereInput
    orderBy?: HospitalOrderByWithAggregationInput | HospitalOrderByWithAggregationInput[]
    by: HospitalScalarFieldEnum[] | HospitalScalarFieldEnum
    having?: HospitalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HospitalCountAggregateInputType | true
    _avg?: HospitalAvgAggregateInputType
    _sum?: HospitalSumAggregateInputType
    _min?: HospitalMinAggregateInputType
    _max?: HospitalMaxAggregateInputType
  }

  export type HospitalGroupByOutputType = {
    id: number
    hoscode: string
    hosname: string
    hostype: string | null
    orgtype: string | null
    tmb: string | null
    amp: string | null
    prov: string | null
    activated: boolean
    _count: HospitalCountAggregateOutputType | null
    _avg: HospitalAvgAggregateOutputType | null
    _sum: HospitalSumAggregateOutputType | null
    _min: HospitalMinAggregateOutputType | null
    _max: HospitalMaxAggregateOutputType | null
  }

  type GetHospitalGroupByPayload<T extends HospitalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HospitalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HospitalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HospitalGroupByOutputType[P]>
            : GetScalarType<T[P], HospitalGroupByOutputType[P]>
        }
      >
    >


  export type HospitalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    hostype?: boolean
    orgtype?: boolean
    tmb?: boolean
    amp?: boolean
    prov?: boolean
    activated?: boolean
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    hostype?: boolean
    orgtype?: boolean
    tmb?: boolean
    amp?: boolean
    prov?: boolean
    activated?: boolean
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    hostype?: boolean
    orgtype?: boolean
    tmb?: boolean
    amp?: boolean
    prov?: boolean
    activated?: boolean
  }, ExtArgs["result"]["hospital"]>

  export type HospitalSelectScalar = {
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    hostype?: boolean
    orgtype?: boolean
    tmb?: boolean
    amp?: boolean
    prov?: boolean
    activated?: boolean
  }

  export type HospitalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hoscode" | "hosname" | "hostype" | "orgtype" | "tmb" | "amp" | "prov" | "activated", ExtArgs["result"]["hospital"]>

  export type $HospitalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hospital"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hoscode: string
      hosname: string
      hostype: string | null
      orgtype: string | null
      tmb: string | null
      amp: string | null
      prov: string | null
      activated: boolean
    }, ExtArgs["result"]["hospital"]>
    composites: {}
  }

  type HospitalGetPayload<S extends boolean | null | undefined | HospitalDefaultArgs> = $Result.GetResult<Prisma.$HospitalPayload, S>

  type HospitalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HospitalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HospitalCountAggregateInputType | true
    }

  export interface HospitalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hospital'], meta: { name: 'Hospital' } }
    /**
     * Find zero or one Hospital that matches the filter.
     * @param {HospitalFindUniqueArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HospitalFindUniqueArgs>(args: SelectSubset<T, HospitalFindUniqueArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hospital that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HospitalFindUniqueOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HospitalFindUniqueOrThrowArgs>(args: SelectSubset<T, HospitalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HospitalFindFirstArgs>(args?: SelectSubset<T, HospitalFindFirstArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hospital that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindFirstOrThrowArgs} args - Arguments to find a Hospital
     * @example
     * // Get one Hospital
     * const hospital = await prisma.hospital.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HospitalFindFirstOrThrowArgs>(args?: SelectSubset<T, HospitalFindFirstOrThrowArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hospitals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hospitals
     * const hospitals = await prisma.hospital.findMany()
     * 
     * // Get first 10 Hospitals
     * const hospitals = await prisma.hospital.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hospitalWithIdOnly = await prisma.hospital.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HospitalFindManyArgs>(args?: SelectSubset<T, HospitalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hospital.
     * @param {HospitalCreateArgs} args - Arguments to create a Hospital.
     * @example
     * // Create one Hospital
     * const Hospital = await prisma.hospital.create({
     *   data: {
     *     // ... data to create a Hospital
     *   }
     * })
     * 
     */
    create<T extends HospitalCreateArgs>(args: SelectSubset<T, HospitalCreateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hospitals.
     * @param {HospitalCreateManyArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HospitalCreateManyArgs>(args?: SelectSubset<T, HospitalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hospitals and returns the data saved in the database.
     * @param {HospitalCreateManyAndReturnArgs} args - Arguments to create many Hospitals.
     * @example
     * // Create many Hospitals
     * const hospital = await prisma.hospital.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hospitals and only return the `id`
     * const hospitalWithIdOnly = await prisma.hospital.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HospitalCreateManyAndReturnArgs>(args?: SelectSubset<T, HospitalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hospital.
     * @param {HospitalDeleteArgs} args - Arguments to delete one Hospital.
     * @example
     * // Delete one Hospital
     * const Hospital = await prisma.hospital.delete({
     *   where: {
     *     // ... filter to delete one Hospital
     *   }
     * })
     * 
     */
    delete<T extends HospitalDeleteArgs>(args: SelectSubset<T, HospitalDeleteArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hospital.
     * @param {HospitalUpdateArgs} args - Arguments to update one Hospital.
     * @example
     * // Update one Hospital
     * const hospital = await prisma.hospital.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HospitalUpdateArgs>(args: SelectSubset<T, HospitalUpdateArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hospitals.
     * @param {HospitalDeleteManyArgs} args - Arguments to filter Hospitals to delete.
     * @example
     * // Delete a few Hospitals
     * const { count } = await prisma.hospital.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HospitalDeleteManyArgs>(args?: SelectSubset<T, HospitalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HospitalUpdateManyArgs>(args: SelectSubset<T, HospitalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hospitals and returns the data updated in the database.
     * @param {HospitalUpdateManyAndReturnArgs} args - Arguments to update many Hospitals.
     * @example
     * // Update many Hospitals
     * const hospital = await prisma.hospital.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hospitals and only return the `id`
     * const hospitalWithIdOnly = await prisma.hospital.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HospitalUpdateManyAndReturnArgs>(args: SelectSubset<T, HospitalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hospital.
     * @param {HospitalUpsertArgs} args - Arguments to update or create a Hospital.
     * @example
     * // Update or create a Hospital
     * const hospital = await prisma.hospital.upsert({
     *   create: {
     *     // ... data to create a Hospital
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hospital we want to update
     *   }
     * })
     */
    upsert<T extends HospitalUpsertArgs>(args: SelectSubset<T, HospitalUpsertArgs<ExtArgs>>): Prisma__HospitalClient<$Result.GetResult<Prisma.$HospitalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hospitals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalCountArgs} args - Arguments to filter Hospitals to count.
     * @example
     * // Count the number of Hospitals
     * const count = await prisma.hospital.count({
     *   where: {
     *     // ... the filter for the Hospitals we want to count
     *   }
     * })
    **/
    count<T extends HospitalCountArgs>(
      args?: Subset<T, HospitalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HospitalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HospitalAggregateArgs>(args: Subset<T, HospitalAggregateArgs>): Prisma.PrismaPromise<GetHospitalAggregateType<T>>

    /**
     * Group by Hospital.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HospitalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HospitalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HospitalGroupByArgs['orderBy'] }
        : { orderBy?: HospitalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HospitalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHospitalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hospital model
   */
  readonly fields: HospitalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hospital.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HospitalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hospital model
   */
  interface HospitalFieldRefs {
    readonly id: FieldRef<"Hospital", 'Int'>
    readonly hoscode: FieldRef<"Hospital", 'String'>
    readonly hosname: FieldRef<"Hospital", 'String'>
    readonly hostype: FieldRef<"Hospital", 'String'>
    readonly orgtype: FieldRef<"Hospital", 'String'>
    readonly tmb: FieldRef<"Hospital", 'String'>
    readonly amp: FieldRef<"Hospital", 'String'>
    readonly prov: FieldRef<"Hospital", 'String'>
    readonly activated: FieldRef<"Hospital", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Hospital findUnique
   */
  export type HospitalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findUniqueOrThrow
   */
  export type HospitalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital findFirst
   */
  export type HospitalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findFirstOrThrow
   */
  export type HospitalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter, which Hospital to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hospitals.
     */
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital findMany
   */
  export type HospitalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter, which Hospitals to fetch.
     */
    where?: HospitalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hospitals to fetch.
     */
    orderBy?: HospitalOrderByWithRelationInput | HospitalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hospitals.
     */
    cursor?: HospitalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hospitals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hospitals.
     */
    skip?: number
    distinct?: HospitalScalarFieldEnum | HospitalScalarFieldEnum[]
  }

  /**
   * Hospital create
   */
  export type HospitalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data needed to create a Hospital.
     */
    data: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
  }

  /**
   * Hospital createMany
   */
  export type HospitalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hospitals.
     */
    data: HospitalCreateManyInput | HospitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hospital createManyAndReturn
   */
  export type HospitalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data used to create many Hospitals.
     */
    data: HospitalCreateManyInput | HospitalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hospital update
   */
  export type HospitalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data needed to update a Hospital.
     */
    data: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
    /**
     * Choose, which Hospital to update.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital updateMany
   */
  export type HospitalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hospitals.
     */
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyInput>
    /**
     * Filter which Hospitals to update
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number
  }

  /**
   * Hospital updateManyAndReturn
   */
  export type HospitalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The data used to update Hospitals.
     */
    data: XOR<HospitalUpdateManyMutationInput, HospitalUncheckedUpdateManyInput>
    /**
     * Filter which Hospitals to update
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to update.
     */
    limit?: number
  }

  /**
   * Hospital upsert
   */
  export type HospitalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * The filter to search for the Hospital to update in case it exists.
     */
    where: HospitalWhereUniqueInput
    /**
     * In case the Hospital found by the `where` argument doesn't exist, create a new Hospital with this data.
     */
    create: XOR<HospitalCreateInput, HospitalUncheckedCreateInput>
    /**
     * In case the Hospital was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HospitalUpdateInput, HospitalUncheckedUpdateInput>
  }

  /**
   * Hospital delete
   */
  export type HospitalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
    /**
     * Filter which Hospital to delete.
     */
    where: HospitalWhereUniqueInput
  }

  /**
   * Hospital deleteMany
   */
  export type HospitalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hospitals to delete
     */
    where?: HospitalWhereInput
    /**
     * Limit how many Hospitals to delete.
     */
    limit?: number
  }

  /**
   * Hospital without action
   */
  export type HospitalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hospital
     */
    select?: HospitalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hospital
     */
    omit?: HospitalOmit<ExtArgs> | null
  }


  /**
   * Model Drgs
   */

  export type AggregateDrgs = {
    _count: DrgsCountAggregateOutputType | null
    _avg: DrgsAvgAggregateOutputType | null
    _sum: DrgsSumAggregateOutputType | null
    _min: DrgsMinAggregateOutputType | null
    _max: DrgsMaxAggregateOutputType | null
  }

  export type DrgsAvgAggregateOutputType = {
    id: number | null
    year: number | null
    mon: number | null
    ipdCase: number | null
    sumAdjrw: number | null
    cmi: number | null
  }

  export type DrgsSumAggregateOutputType = {
    id: number | null
    year: number | null
    mon: number | null
    ipdCase: number | null
    sumAdjrw: number | null
    cmi: number | null
  }

  export type DrgsMinAggregateOutputType = {
    id: number | null
    hoscode: string | null
    hosname: string | null
    year: number | null
    mon: number | null
    ipdCase: number | null
    sumAdjrw: number | null
    cmi: number | null
    updatedAt: Date | null
  }

  export type DrgsMaxAggregateOutputType = {
    id: number | null
    hoscode: string | null
    hosname: string | null
    year: number | null
    mon: number | null
    ipdCase: number | null
    sumAdjrw: number | null
    cmi: number | null
    updatedAt: Date | null
  }

  export type DrgsCountAggregateOutputType = {
    id: number
    hoscode: number
    hosname: number
    year: number
    mon: number
    ipdCase: number
    sumAdjrw: number
    cmi: number
    updatedAt: number
    _all: number
  }


  export type DrgsAvgAggregateInputType = {
    id?: true
    year?: true
    mon?: true
    ipdCase?: true
    sumAdjrw?: true
    cmi?: true
  }

  export type DrgsSumAggregateInputType = {
    id?: true
    year?: true
    mon?: true
    ipdCase?: true
    sumAdjrw?: true
    cmi?: true
  }

  export type DrgsMinAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    year?: true
    mon?: true
    ipdCase?: true
    sumAdjrw?: true
    cmi?: true
    updatedAt?: true
  }

  export type DrgsMaxAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    year?: true
    mon?: true
    ipdCase?: true
    sumAdjrw?: true
    cmi?: true
    updatedAt?: true
  }

  export type DrgsCountAggregateInputType = {
    id?: true
    hoscode?: true
    hosname?: true
    year?: true
    mon?: true
    ipdCase?: true
    sumAdjrw?: true
    cmi?: true
    updatedAt?: true
    _all?: true
  }

  export type DrgsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drgs to aggregate.
     */
    where?: DrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drgs to fetch.
     */
    orderBy?: DrgsOrderByWithRelationInput | DrgsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drgs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drgs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Drgs
    **/
    _count?: true | DrgsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DrgsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DrgsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DrgsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DrgsMaxAggregateInputType
  }

  export type GetDrgsAggregateType<T extends DrgsAggregateArgs> = {
        [P in keyof T & keyof AggregateDrgs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDrgs[P]>
      : GetScalarType<T[P], AggregateDrgs[P]>
  }




  export type DrgsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DrgsWhereInput
    orderBy?: DrgsOrderByWithAggregationInput | DrgsOrderByWithAggregationInput[]
    by: DrgsScalarFieldEnum[] | DrgsScalarFieldEnum
    having?: DrgsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DrgsCountAggregateInputType | true
    _avg?: DrgsAvgAggregateInputType
    _sum?: DrgsSumAggregateInputType
    _min?: DrgsMinAggregateInputType
    _max?: DrgsMaxAggregateInputType
  }

  export type DrgsGroupByOutputType = {
    id: number
    hoscode: string
    hosname: string
    year: number
    mon: number
    ipdCase: number
    sumAdjrw: number
    cmi: number
    updatedAt: Date | null
    _count: DrgsCountAggregateOutputType | null
    _avg: DrgsAvgAggregateOutputType | null
    _sum: DrgsSumAggregateOutputType | null
    _min: DrgsMinAggregateOutputType | null
    _max: DrgsMaxAggregateOutputType | null
  }

  type GetDrgsGroupByPayload<T extends DrgsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DrgsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DrgsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DrgsGroupByOutputType[P]>
            : GetScalarType<T[P], DrgsGroupByOutputType[P]>
        }
      >
    >


  export type DrgsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    year?: boolean
    mon?: boolean
    ipdCase?: boolean
    sumAdjrw?: boolean
    cmi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drgs"]>

  export type DrgsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    year?: boolean
    mon?: boolean
    ipdCase?: boolean
    sumAdjrw?: boolean
    cmi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drgs"]>

  export type DrgsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    year?: boolean
    mon?: boolean
    ipdCase?: boolean
    sumAdjrw?: boolean
    cmi?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["drgs"]>

  export type DrgsSelectScalar = {
    id?: boolean
    hoscode?: boolean
    hosname?: boolean
    year?: boolean
    mon?: boolean
    ipdCase?: boolean
    sumAdjrw?: boolean
    cmi?: boolean
    updatedAt?: boolean
  }

  export type DrgsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "hoscode" | "hosname" | "year" | "mon" | "ipdCase" | "sumAdjrw" | "cmi" | "updatedAt", ExtArgs["result"]["drgs"]>

  export type $DrgsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Drgs"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hoscode: string
      hosname: string
      year: number
      mon: number
      ipdCase: number
      sumAdjrw: number
      cmi: number
      updatedAt: Date | null
    }, ExtArgs["result"]["drgs"]>
    composites: {}
  }

  type DrgsGetPayload<S extends boolean | null | undefined | DrgsDefaultArgs> = $Result.GetResult<Prisma.$DrgsPayload, S>

  type DrgsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DrgsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DrgsCountAggregateInputType | true
    }

  export interface DrgsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Drgs'], meta: { name: 'Drgs' } }
    /**
     * Find zero or one Drgs that matches the filter.
     * @param {DrgsFindUniqueArgs} args - Arguments to find a Drgs
     * @example
     * // Get one Drgs
     * const drgs = await prisma.drgs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DrgsFindUniqueArgs>(args: SelectSubset<T, DrgsFindUniqueArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Drgs that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DrgsFindUniqueOrThrowArgs} args - Arguments to find a Drgs
     * @example
     * // Get one Drgs
     * const drgs = await prisma.drgs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DrgsFindUniqueOrThrowArgs>(args: SelectSubset<T, DrgsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drgs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsFindFirstArgs} args - Arguments to find a Drgs
     * @example
     * // Get one Drgs
     * const drgs = await prisma.drgs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DrgsFindFirstArgs>(args?: SelectSubset<T, DrgsFindFirstArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Drgs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsFindFirstOrThrowArgs} args - Arguments to find a Drgs
     * @example
     * // Get one Drgs
     * const drgs = await prisma.drgs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DrgsFindFirstOrThrowArgs>(args?: SelectSubset<T, DrgsFindFirstOrThrowArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Drgs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Drgs
     * const drgs = await prisma.drgs.findMany()
     * 
     * // Get first 10 Drgs
     * const drgs = await prisma.drgs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const drgsWithIdOnly = await prisma.drgs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DrgsFindManyArgs>(args?: SelectSubset<T, DrgsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Drgs.
     * @param {DrgsCreateArgs} args - Arguments to create a Drgs.
     * @example
     * // Create one Drgs
     * const Drgs = await prisma.drgs.create({
     *   data: {
     *     // ... data to create a Drgs
     *   }
     * })
     * 
     */
    create<T extends DrgsCreateArgs>(args: SelectSubset<T, DrgsCreateArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Drgs.
     * @param {DrgsCreateManyArgs} args - Arguments to create many Drgs.
     * @example
     * // Create many Drgs
     * const drgs = await prisma.drgs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DrgsCreateManyArgs>(args?: SelectSubset<T, DrgsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Drgs and returns the data saved in the database.
     * @param {DrgsCreateManyAndReturnArgs} args - Arguments to create many Drgs.
     * @example
     * // Create many Drgs
     * const drgs = await prisma.drgs.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Drgs and only return the `id`
     * const drgsWithIdOnly = await prisma.drgs.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DrgsCreateManyAndReturnArgs>(args?: SelectSubset<T, DrgsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Drgs.
     * @param {DrgsDeleteArgs} args - Arguments to delete one Drgs.
     * @example
     * // Delete one Drgs
     * const Drgs = await prisma.drgs.delete({
     *   where: {
     *     // ... filter to delete one Drgs
     *   }
     * })
     * 
     */
    delete<T extends DrgsDeleteArgs>(args: SelectSubset<T, DrgsDeleteArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Drgs.
     * @param {DrgsUpdateArgs} args - Arguments to update one Drgs.
     * @example
     * // Update one Drgs
     * const drgs = await prisma.drgs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DrgsUpdateArgs>(args: SelectSubset<T, DrgsUpdateArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Drgs.
     * @param {DrgsDeleteManyArgs} args - Arguments to filter Drgs to delete.
     * @example
     * // Delete a few Drgs
     * const { count } = await prisma.drgs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DrgsDeleteManyArgs>(args?: SelectSubset<T, DrgsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Drgs
     * const drgs = await prisma.drgs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DrgsUpdateManyArgs>(args: SelectSubset<T, DrgsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Drgs and returns the data updated in the database.
     * @param {DrgsUpdateManyAndReturnArgs} args - Arguments to update many Drgs.
     * @example
     * // Update many Drgs
     * const drgs = await prisma.drgs.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Drgs and only return the `id`
     * const drgsWithIdOnly = await prisma.drgs.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DrgsUpdateManyAndReturnArgs>(args: SelectSubset<T, DrgsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Drgs.
     * @param {DrgsUpsertArgs} args - Arguments to update or create a Drgs.
     * @example
     * // Update or create a Drgs
     * const drgs = await prisma.drgs.upsert({
     *   create: {
     *     // ... data to create a Drgs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Drgs we want to update
     *   }
     * })
     */
    upsert<T extends DrgsUpsertArgs>(args: SelectSubset<T, DrgsUpsertArgs<ExtArgs>>): Prisma__DrgsClient<$Result.GetResult<Prisma.$DrgsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Drgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsCountArgs} args - Arguments to filter Drgs to count.
     * @example
     * // Count the number of Drgs
     * const count = await prisma.drgs.count({
     *   where: {
     *     // ... the filter for the Drgs we want to count
     *   }
     * })
    **/
    count<T extends DrgsCountArgs>(
      args?: Subset<T, DrgsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DrgsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Drgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DrgsAggregateArgs>(args: Subset<T, DrgsAggregateArgs>): Prisma.PrismaPromise<GetDrgsAggregateType<T>>

    /**
     * Group by Drgs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DrgsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DrgsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DrgsGroupByArgs['orderBy'] }
        : { orderBy?: DrgsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DrgsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDrgsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Drgs model
   */
  readonly fields: DrgsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Drgs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DrgsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Drgs model
   */
  interface DrgsFieldRefs {
    readonly id: FieldRef<"Drgs", 'Int'>
    readonly hoscode: FieldRef<"Drgs", 'String'>
    readonly hosname: FieldRef<"Drgs", 'String'>
    readonly year: FieldRef<"Drgs", 'Int'>
    readonly mon: FieldRef<"Drgs", 'Int'>
    readonly ipdCase: FieldRef<"Drgs", 'Int'>
    readonly sumAdjrw: FieldRef<"Drgs", 'Float'>
    readonly cmi: FieldRef<"Drgs", 'Float'>
    readonly updatedAt: FieldRef<"Drgs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Drgs findUnique
   */
  export type DrgsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter, which Drgs to fetch.
     */
    where: DrgsWhereUniqueInput
  }

  /**
   * Drgs findUniqueOrThrow
   */
  export type DrgsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter, which Drgs to fetch.
     */
    where: DrgsWhereUniqueInput
  }

  /**
   * Drgs findFirst
   */
  export type DrgsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter, which Drgs to fetch.
     */
    where?: DrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drgs to fetch.
     */
    orderBy?: DrgsOrderByWithRelationInput | DrgsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drgs.
     */
    cursor?: DrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drgs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drgs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drgs.
     */
    distinct?: DrgsScalarFieldEnum | DrgsScalarFieldEnum[]
  }

  /**
   * Drgs findFirstOrThrow
   */
  export type DrgsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter, which Drgs to fetch.
     */
    where?: DrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drgs to fetch.
     */
    orderBy?: DrgsOrderByWithRelationInput | DrgsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Drgs.
     */
    cursor?: DrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drgs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drgs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Drgs.
     */
    distinct?: DrgsScalarFieldEnum | DrgsScalarFieldEnum[]
  }

  /**
   * Drgs findMany
   */
  export type DrgsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter, which Drgs to fetch.
     */
    where?: DrgsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Drgs to fetch.
     */
    orderBy?: DrgsOrderByWithRelationInput | DrgsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Drgs.
     */
    cursor?: DrgsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Drgs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Drgs.
     */
    skip?: number
    distinct?: DrgsScalarFieldEnum | DrgsScalarFieldEnum[]
  }

  /**
   * Drgs create
   */
  export type DrgsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * The data needed to create a Drgs.
     */
    data: XOR<DrgsCreateInput, DrgsUncheckedCreateInput>
  }

  /**
   * Drgs createMany
   */
  export type DrgsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Drgs.
     */
    data: DrgsCreateManyInput | DrgsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Drgs createManyAndReturn
   */
  export type DrgsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * The data used to create many Drgs.
     */
    data: DrgsCreateManyInput | DrgsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Drgs update
   */
  export type DrgsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * The data needed to update a Drgs.
     */
    data: XOR<DrgsUpdateInput, DrgsUncheckedUpdateInput>
    /**
     * Choose, which Drgs to update.
     */
    where: DrgsWhereUniqueInput
  }

  /**
   * Drgs updateMany
   */
  export type DrgsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Drgs.
     */
    data: XOR<DrgsUpdateManyMutationInput, DrgsUncheckedUpdateManyInput>
    /**
     * Filter which Drgs to update
     */
    where?: DrgsWhereInput
    /**
     * Limit how many Drgs to update.
     */
    limit?: number
  }

  /**
   * Drgs updateManyAndReturn
   */
  export type DrgsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * The data used to update Drgs.
     */
    data: XOR<DrgsUpdateManyMutationInput, DrgsUncheckedUpdateManyInput>
    /**
     * Filter which Drgs to update
     */
    where?: DrgsWhereInput
    /**
     * Limit how many Drgs to update.
     */
    limit?: number
  }

  /**
   * Drgs upsert
   */
  export type DrgsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * The filter to search for the Drgs to update in case it exists.
     */
    where: DrgsWhereUniqueInput
    /**
     * In case the Drgs found by the `where` argument doesn't exist, create a new Drgs with this data.
     */
    create: XOR<DrgsCreateInput, DrgsUncheckedCreateInput>
    /**
     * In case the Drgs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DrgsUpdateInput, DrgsUncheckedUpdateInput>
  }

  /**
   * Drgs delete
   */
  export type DrgsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
    /**
     * Filter which Drgs to delete.
     */
    where: DrgsWhereUniqueInput
  }

  /**
   * Drgs deleteMany
   */
  export type DrgsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Drgs to delete
     */
    where?: DrgsWhereInput
    /**
     * Limit how many Drgs to delete.
     */
    limit?: number
  }

  /**
   * Drgs without action
   */
  export type DrgsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Drgs
     */
    select?: DrgsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Drgs
     */
    omit?: DrgsOmit<ExtArgs> | null
  }


  /**
   * Model RawData
   */

  export type AggregateRawData = {
    _count: RawDataCountAggregateOutputType | null
    _min: RawDataMinAggregateOutputType | null
    _max: RawDataMaxAggregateOutputType | null
  }

  export type RawDataMinAggregateOutputType = {
    id: string | null
    updatedAt: Date | null
    tranformDatetime: Date | null
  }

  export type RawDataMaxAggregateOutputType = {
    id: string | null
    updatedAt: Date | null
    tranformDatetime: Date | null
  }

  export type RawDataCountAggregateOutputType = {
    id: number
    payload: number
    updatedAt: number
    tranformDatetime: number
    _all: number
  }


  export type RawDataMinAggregateInputType = {
    id?: true
    updatedAt?: true
    tranformDatetime?: true
  }

  export type RawDataMaxAggregateInputType = {
    id?: true
    updatedAt?: true
    tranformDatetime?: true
  }

  export type RawDataCountAggregateInputType = {
    id?: true
    payload?: true
    updatedAt?: true
    tranformDatetime?: true
    _all?: true
  }

  export type RawDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawData to aggregate.
     */
    where?: RawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawData to fetch.
     */
    orderBy?: RawDataOrderByWithRelationInput | RawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RawData
    **/
    _count?: true | RawDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RawDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RawDataMaxAggregateInputType
  }

  export type GetRawDataAggregateType<T extends RawDataAggregateArgs> = {
        [P in keyof T & keyof AggregateRawData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRawData[P]>
      : GetScalarType<T[P], AggregateRawData[P]>
  }




  export type RawDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RawDataWhereInput
    orderBy?: RawDataOrderByWithAggregationInput | RawDataOrderByWithAggregationInput[]
    by: RawDataScalarFieldEnum[] | RawDataScalarFieldEnum
    having?: RawDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RawDataCountAggregateInputType | true
    _min?: RawDataMinAggregateInputType
    _max?: RawDataMaxAggregateInputType
  }

  export type RawDataGroupByOutputType = {
    id: string
    payload: JsonValue
    updatedAt: Date
    tranformDatetime: Date | null
    _count: RawDataCountAggregateOutputType | null
    _min: RawDataMinAggregateOutputType | null
    _max: RawDataMaxAggregateOutputType | null
  }

  type GetRawDataGroupByPayload<T extends RawDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RawDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RawDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RawDataGroupByOutputType[P]>
            : GetScalarType<T[P], RawDataGroupByOutputType[P]>
        }
      >
    >


  export type RawDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    updatedAt?: boolean
    tranformDatetime?: boolean
  }, ExtArgs["result"]["rawData"]>

  export type RawDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    updatedAt?: boolean
    tranformDatetime?: boolean
  }, ExtArgs["result"]["rawData"]>

  export type RawDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    payload?: boolean
    updatedAt?: boolean
    tranformDatetime?: boolean
  }, ExtArgs["result"]["rawData"]>

  export type RawDataSelectScalar = {
    id?: boolean
    payload?: boolean
    updatedAt?: boolean
    tranformDatetime?: boolean
  }

  export type RawDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "payload" | "updatedAt" | "tranformDatetime", ExtArgs["result"]["rawData"]>

  export type $RawDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RawData"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      payload: Prisma.JsonValue
      updatedAt: Date
      tranformDatetime: Date | null
    }, ExtArgs["result"]["rawData"]>
    composites: {}
  }

  type RawDataGetPayload<S extends boolean | null | undefined | RawDataDefaultArgs> = $Result.GetResult<Prisma.$RawDataPayload, S>

  type RawDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RawDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RawDataCountAggregateInputType | true
    }

  export interface RawDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RawData'], meta: { name: 'RawData' } }
    /**
     * Find zero or one RawData that matches the filter.
     * @param {RawDataFindUniqueArgs} args - Arguments to find a RawData
     * @example
     * // Get one RawData
     * const rawData = await prisma.rawData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RawDataFindUniqueArgs>(args: SelectSubset<T, RawDataFindUniqueArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RawData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RawDataFindUniqueOrThrowArgs} args - Arguments to find a RawData
     * @example
     * // Get one RawData
     * const rawData = await prisma.rawData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RawDataFindUniqueOrThrowArgs>(args: SelectSubset<T, RawDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RawData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataFindFirstArgs} args - Arguments to find a RawData
     * @example
     * // Get one RawData
     * const rawData = await prisma.rawData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RawDataFindFirstArgs>(args?: SelectSubset<T, RawDataFindFirstArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RawData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataFindFirstOrThrowArgs} args - Arguments to find a RawData
     * @example
     * // Get one RawData
     * const rawData = await prisma.rawData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RawDataFindFirstOrThrowArgs>(args?: SelectSubset<T, RawDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RawData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RawData
     * const rawData = await prisma.rawData.findMany()
     * 
     * // Get first 10 RawData
     * const rawData = await prisma.rawData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rawDataWithIdOnly = await prisma.rawData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RawDataFindManyArgs>(args?: SelectSubset<T, RawDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RawData.
     * @param {RawDataCreateArgs} args - Arguments to create a RawData.
     * @example
     * // Create one RawData
     * const RawData = await prisma.rawData.create({
     *   data: {
     *     // ... data to create a RawData
     *   }
     * })
     * 
     */
    create<T extends RawDataCreateArgs>(args: SelectSubset<T, RawDataCreateArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RawData.
     * @param {RawDataCreateManyArgs} args - Arguments to create many RawData.
     * @example
     * // Create many RawData
     * const rawData = await prisma.rawData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RawDataCreateManyArgs>(args?: SelectSubset<T, RawDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RawData and returns the data saved in the database.
     * @param {RawDataCreateManyAndReturnArgs} args - Arguments to create many RawData.
     * @example
     * // Create many RawData
     * const rawData = await prisma.rawData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RawData and only return the `id`
     * const rawDataWithIdOnly = await prisma.rawData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RawDataCreateManyAndReturnArgs>(args?: SelectSubset<T, RawDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RawData.
     * @param {RawDataDeleteArgs} args - Arguments to delete one RawData.
     * @example
     * // Delete one RawData
     * const RawData = await prisma.rawData.delete({
     *   where: {
     *     // ... filter to delete one RawData
     *   }
     * })
     * 
     */
    delete<T extends RawDataDeleteArgs>(args: SelectSubset<T, RawDataDeleteArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RawData.
     * @param {RawDataUpdateArgs} args - Arguments to update one RawData.
     * @example
     * // Update one RawData
     * const rawData = await prisma.rawData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RawDataUpdateArgs>(args: SelectSubset<T, RawDataUpdateArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RawData.
     * @param {RawDataDeleteManyArgs} args - Arguments to filter RawData to delete.
     * @example
     * // Delete a few RawData
     * const { count } = await prisma.rawData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RawDataDeleteManyArgs>(args?: SelectSubset<T, RawDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RawData
     * const rawData = await prisma.rawData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RawDataUpdateManyArgs>(args: SelectSubset<T, RawDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RawData and returns the data updated in the database.
     * @param {RawDataUpdateManyAndReturnArgs} args - Arguments to update many RawData.
     * @example
     * // Update many RawData
     * const rawData = await prisma.rawData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RawData and only return the `id`
     * const rawDataWithIdOnly = await prisma.rawData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RawDataUpdateManyAndReturnArgs>(args: SelectSubset<T, RawDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RawData.
     * @param {RawDataUpsertArgs} args - Arguments to update or create a RawData.
     * @example
     * // Update or create a RawData
     * const rawData = await prisma.rawData.upsert({
     *   create: {
     *     // ... data to create a RawData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RawData we want to update
     *   }
     * })
     */
    upsert<T extends RawDataUpsertArgs>(args: SelectSubset<T, RawDataUpsertArgs<ExtArgs>>): Prisma__RawDataClient<$Result.GetResult<Prisma.$RawDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataCountArgs} args - Arguments to filter RawData to count.
     * @example
     * // Count the number of RawData
     * const count = await prisma.rawData.count({
     *   where: {
     *     // ... the filter for the RawData we want to count
     *   }
     * })
    **/
    count<T extends RawDataCountArgs>(
      args?: Subset<T, RawDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RawDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RawDataAggregateArgs>(args: Subset<T, RawDataAggregateArgs>): Prisma.PrismaPromise<GetRawDataAggregateType<T>>

    /**
     * Group by RawData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RawDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RawDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RawDataGroupByArgs['orderBy'] }
        : { orderBy?: RawDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RawDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRawDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RawData model
   */
  readonly fields: RawDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RawData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RawDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RawData model
   */
  interface RawDataFieldRefs {
    readonly id: FieldRef<"RawData", 'String'>
    readonly payload: FieldRef<"RawData", 'Json'>
    readonly updatedAt: FieldRef<"RawData", 'DateTime'>
    readonly tranformDatetime: FieldRef<"RawData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RawData findUnique
   */
  export type RawDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter, which RawData to fetch.
     */
    where: RawDataWhereUniqueInput
  }

  /**
   * RawData findUniqueOrThrow
   */
  export type RawDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter, which RawData to fetch.
     */
    where: RawDataWhereUniqueInput
  }

  /**
   * RawData findFirst
   */
  export type RawDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter, which RawData to fetch.
     */
    where?: RawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawData to fetch.
     */
    orderBy?: RawDataOrderByWithRelationInput | RawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawData.
     */
    cursor?: RawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawData.
     */
    distinct?: RawDataScalarFieldEnum | RawDataScalarFieldEnum[]
  }

  /**
   * RawData findFirstOrThrow
   */
  export type RawDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter, which RawData to fetch.
     */
    where?: RawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawData to fetch.
     */
    orderBy?: RawDataOrderByWithRelationInput | RawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RawData.
     */
    cursor?: RawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RawData.
     */
    distinct?: RawDataScalarFieldEnum | RawDataScalarFieldEnum[]
  }

  /**
   * RawData findMany
   */
  export type RawDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter, which RawData to fetch.
     */
    where?: RawDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RawData to fetch.
     */
    orderBy?: RawDataOrderByWithRelationInput | RawDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RawData.
     */
    cursor?: RawDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RawData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RawData.
     */
    skip?: number
    distinct?: RawDataScalarFieldEnum | RawDataScalarFieldEnum[]
  }

  /**
   * RawData create
   */
  export type RawDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * The data needed to create a RawData.
     */
    data: XOR<RawDataCreateInput, RawDataUncheckedCreateInput>
  }

  /**
   * RawData createMany
   */
  export type RawDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RawData.
     */
    data: RawDataCreateManyInput | RawDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RawData createManyAndReturn
   */
  export type RawDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * The data used to create many RawData.
     */
    data: RawDataCreateManyInput | RawDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RawData update
   */
  export type RawDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * The data needed to update a RawData.
     */
    data: XOR<RawDataUpdateInput, RawDataUncheckedUpdateInput>
    /**
     * Choose, which RawData to update.
     */
    where: RawDataWhereUniqueInput
  }

  /**
   * RawData updateMany
   */
  export type RawDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RawData.
     */
    data: XOR<RawDataUpdateManyMutationInput, RawDataUncheckedUpdateManyInput>
    /**
     * Filter which RawData to update
     */
    where?: RawDataWhereInput
    /**
     * Limit how many RawData to update.
     */
    limit?: number
  }

  /**
   * RawData updateManyAndReturn
   */
  export type RawDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * The data used to update RawData.
     */
    data: XOR<RawDataUpdateManyMutationInput, RawDataUncheckedUpdateManyInput>
    /**
     * Filter which RawData to update
     */
    where?: RawDataWhereInput
    /**
     * Limit how many RawData to update.
     */
    limit?: number
  }

  /**
   * RawData upsert
   */
  export type RawDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * The filter to search for the RawData to update in case it exists.
     */
    where: RawDataWhereUniqueInput
    /**
     * In case the RawData found by the `where` argument doesn't exist, create a new RawData with this data.
     */
    create: XOR<RawDataCreateInput, RawDataUncheckedCreateInput>
    /**
     * In case the RawData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RawDataUpdateInput, RawDataUncheckedUpdateInput>
  }

  /**
   * RawData delete
   */
  export type RawDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
    /**
     * Filter which RawData to delete.
     */
    where: RawDataWhereUniqueInput
  }

  /**
   * RawData deleteMany
   */
  export type RawDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RawData to delete
     */
    where?: RawDataWhereInput
    /**
     * Limit how many RawData to delete.
     */
    limit?: number
  }

  /**
   * RawData without action
   */
  export type RawDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RawData
     */
    select?: RawDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RawData
     */
    omit?: RawDataOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const HospitalScalarFieldEnum: {
    id: 'id',
    hoscode: 'hoscode',
    hosname: 'hosname',
    hostype: 'hostype',
    orgtype: 'orgtype',
    tmb: 'tmb',
    amp: 'amp',
    prov: 'prov',
    activated: 'activated'
  };

  export type HospitalScalarFieldEnum = (typeof HospitalScalarFieldEnum)[keyof typeof HospitalScalarFieldEnum]


  export const DrgsScalarFieldEnum: {
    id: 'id',
    hoscode: 'hoscode',
    hosname: 'hosname',
    year: 'year',
    mon: 'mon',
    ipdCase: 'ipdCase',
    sumAdjrw: 'sumAdjrw',
    cmi: 'cmi',
    updatedAt: 'updatedAt'
  };

  export type DrgsScalarFieldEnum = (typeof DrgsScalarFieldEnum)[keyof typeof DrgsScalarFieldEnum]


  export const RawDataScalarFieldEnum: {
    id: 'id',
    payload: 'payload',
    updatedAt: 'updatedAt',
    tranformDatetime: 'tranformDatetime'
  };

  export type RawDataScalarFieldEnum = (typeof RawDataScalarFieldEnum)[keyof typeof RawDataScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    
  /**
   * Deep Input Types
   */


  export type HospitalWhereInput = {
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    id?: IntFilter<"Hospital"> | number
    hoscode?: StringFilter<"Hospital"> | string
    hosname?: StringFilter<"Hospital"> | string
    hostype?: StringNullableFilter<"Hospital"> | string | null
    orgtype?: StringNullableFilter<"Hospital"> | string | null
    tmb?: StringNullableFilter<"Hospital"> | string | null
    amp?: StringNullableFilter<"Hospital"> | string | null
    prov?: StringNullableFilter<"Hospital"> | string | null
    activated?: BoolFilter<"Hospital"> | boolean
  }

  export type HospitalOrderByWithRelationInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    hostype?: SortOrderInput | SortOrder
    orgtype?: SortOrderInput | SortOrder
    tmb?: SortOrderInput | SortOrder
    amp?: SortOrderInput | SortOrder
    prov?: SortOrderInput | SortOrder
    activated?: SortOrder
  }

  export type HospitalWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    hoscode?: string
    AND?: HospitalWhereInput | HospitalWhereInput[]
    OR?: HospitalWhereInput[]
    NOT?: HospitalWhereInput | HospitalWhereInput[]
    hosname?: StringFilter<"Hospital"> | string
    hostype?: StringNullableFilter<"Hospital"> | string | null
    orgtype?: StringNullableFilter<"Hospital"> | string | null
    tmb?: StringNullableFilter<"Hospital"> | string | null
    amp?: StringNullableFilter<"Hospital"> | string | null
    prov?: StringNullableFilter<"Hospital"> | string | null
    activated?: BoolFilter<"Hospital"> | boolean
  }, "id" | "hoscode">

  export type HospitalOrderByWithAggregationInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    hostype?: SortOrderInput | SortOrder
    orgtype?: SortOrderInput | SortOrder
    tmb?: SortOrderInput | SortOrder
    amp?: SortOrderInput | SortOrder
    prov?: SortOrderInput | SortOrder
    activated?: SortOrder
    _count?: HospitalCountOrderByAggregateInput
    _avg?: HospitalAvgOrderByAggregateInput
    _max?: HospitalMaxOrderByAggregateInput
    _min?: HospitalMinOrderByAggregateInput
    _sum?: HospitalSumOrderByAggregateInput
  }

  export type HospitalScalarWhereWithAggregatesInput = {
    AND?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    OR?: HospitalScalarWhereWithAggregatesInput[]
    NOT?: HospitalScalarWhereWithAggregatesInput | HospitalScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Hospital"> | number
    hoscode?: StringWithAggregatesFilter<"Hospital"> | string
    hosname?: StringWithAggregatesFilter<"Hospital"> | string
    hostype?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    orgtype?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    tmb?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    amp?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    prov?: StringNullableWithAggregatesFilter<"Hospital"> | string | null
    activated?: BoolWithAggregatesFilter<"Hospital"> | boolean
  }

  export type DrgsWhereInput = {
    AND?: DrgsWhereInput | DrgsWhereInput[]
    OR?: DrgsWhereInput[]
    NOT?: DrgsWhereInput | DrgsWhereInput[]
    id?: IntFilter<"Drgs"> | number
    hoscode?: StringFilter<"Drgs"> | string
    hosname?: StringFilter<"Drgs"> | string
    year?: IntFilter<"Drgs"> | number
    mon?: IntFilter<"Drgs"> | number
    ipdCase?: IntFilter<"Drgs"> | number
    sumAdjrw?: FloatFilter<"Drgs"> | number
    cmi?: FloatFilter<"Drgs"> | number
    updatedAt?: DateTimeNullableFilter<"Drgs"> | Date | string | null
  }

  export type DrgsOrderByWithRelationInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
  }

  export type DrgsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: DrgsWhereInput | DrgsWhereInput[]
    OR?: DrgsWhereInput[]
    NOT?: DrgsWhereInput | DrgsWhereInput[]
    hoscode?: StringFilter<"Drgs"> | string
    hosname?: StringFilter<"Drgs"> | string
    year?: IntFilter<"Drgs"> | number
    mon?: IntFilter<"Drgs"> | number
    ipdCase?: IntFilter<"Drgs"> | number
    sumAdjrw?: FloatFilter<"Drgs"> | number
    cmi?: FloatFilter<"Drgs"> | number
    updatedAt?: DateTimeNullableFilter<"Drgs"> | Date | string | null
  }, "id">

  export type DrgsOrderByWithAggregationInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: DrgsCountOrderByAggregateInput
    _avg?: DrgsAvgOrderByAggregateInput
    _max?: DrgsMaxOrderByAggregateInput
    _min?: DrgsMinOrderByAggregateInput
    _sum?: DrgsSumOrderByAggregateInput
  }

  export type DrgsScalarWhereWithAggregatesInput = {
    AND?: DrgsScalarWhereWithAggregatesInput | DrgsScalarWhereWithAggregatesInput[]
    OR?: DrgsScalarWhereWithAggregatesInput[]
    NOT?: DrgsScalarWhereWithAggregatesInput | DrgsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Drgs"> | number
    hoscode?: StringWithAggregatesFilter<"Drgs"> | string
    hosname?: StringWithAggregatesFilter<"Drgs"> | string
    year?: IntWithAggregatesFilter<"Drgs"> | number
    mon?: IntWithAggregatesFilter<"Drgs"> | number
    ipdCase?: IntWithAggregatesFilter<"Drgs"> | number
    sumAdjrw?: FloatWithAggregatesFilter<"Drgs"> | number
    cmi?: FloatWithAggregatesFilter<"Drgs"> | number
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Drgs"> | Date | string | null
  }

  export type RawDataWhereInput = {
    AND?: RawDataWhereInput | RawDataWhereInput[]
    OR?: RawDataWhereInput[]
    NOT?: RawDataWhereInput | RawDataWhereInput[]
    id?: StringFilter<"RawData"> | string
    payload?: JsonFilter<"RawData">
    updatedAt?: DateTimeFilter<"RawData"> | Date | string
    tranformDatetime?: DateTimeNullableFilter<"RawData"> | Date | string | null
  }

  export type RawDataOrderByWithRelationInput = {
    id?: SortOrder
    payload?: SortOrder
    updatedAt?: SortOrder
    tranformDatetime?: SortOrderInput | SortOrder
  }

  export type RawDataWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RawDataWhereInput | RawDataWhereInput[]
    OR?: RawDataWhereInput[]
    NOT?: RawDataWhereInput | RawDataWhereInput[]
    payload?: JsonFilter<"RawData">
    updatedAt?: DateTimeFilter<"RawData"> | Date | string
    tranformDatetime?: DateTimeNullableFilter<"RawData"> | Date | string | null
  }, "id">

  export type RawDataOrderByWithAggregationInput = {
    id?: SortOrder
    payload?: SortOrder
    updatedAt?: SortOrder
    tranformDatetime?: SortOrderInput | SortOrder
    _count?: RawDataCountOrderByAggregateInput
    _max?: RawDataMaxOrderByAggregateInput
    _min?: RawDataMinOrderByAggregateInput
  }

  export type RawDataScalarWhereWithAggregatesInput = {
    AND?: RawDataScalarWhereWithAggregatesInput | RawDataScalarWhereWithAggregatesInput[]
    OR?: RawDataScalarWhereWithAggregatesInput[]
    NOT?: RawDataScalarWhereWithAggregatesInput | RawDataScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RawData"> | string
    payload?: JsonWithAggregatesFilter<"RawData">
    updatedAt?: DateTimeWithAggregatesFilter<"RawData"> | Date | string
    tranformDatetime?: DateTimeNullableWithAggregatesFilter<"RawData"> | Date | string | null
  }

  export type HospitalCreateInput = {
    hoscode: string
    hosname: string
    hostype?: string | null
    orgtype?: string | null
    tmb?: string | null
    amp?: string | null
    prov?: string | null
    activated?: boolean
  }

  export type HospitalUncheckedCreateInput = {
    id?: number
    hoscode: string
    hosname: string
    hostype?: string | null
    orgtype?: string | null
    tmb?: string | null
    amp?: string | null
    prov?: string | null
    activated?: boolean
  }

  export type HospitalUpdateInput = {
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    hostype?: NullableStringFieldUpdateOperationsInput | string | null
    orgtype?: NullableStringFieldUpdateOperationsInput | string | null
    tmb?: NullableStringFieldUpdateOperationsInput | string | null
    amp?: NullableStringFieldUpdateOperationsInput | string | null
    prov?: NullableStringFieldUpdateOperationsInput | string | null
    activated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HospitalUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    hostype?: NullableStringFieldUpdateOperationsInput | string | null
    orgtype?: NullableStringFieldUpdateOperationsInput | string | null
    tmb?: NullableStringFieldUpdateOperationsInput | string | null
    amp?: NullableStringFieldUpdateOperationsInput | string | null
    prov?: NullableStringFieldUpdateOperationsInput | string | null
    activated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HospitalCreateManyInput = {
    id?: number
    hoscode: string
    hosname: string
    hostype?: string | null
    orgtype?: string | null
    tmb?: string | null
    amp?: string | null
    prov?: string | null
    activated?: boolean
  }

  export type HospitalUpdateManyMutationInput = {
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    hostype?: NullableStringFieldUpdateOperationsInput | string | null
    orgtype?: NullableStringFieldUpdateOperationsInput | string | null
    tmb?: NullableStringFieldUpdateOperationsInput | string | null
    amp?: NullableStringFieldUpdateOperationsInput | string | null
    prov?: NullableStringFieldUpdateOperationsInput | string | null
    activated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type HospitalUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    hostype?: NullableStringFieldUpdateOperationsInput | string | null
    orgtype?: NullableStringFieldUpdateOperationsInput | string | null
    tmb?: NullableStringFieldUpdateOperationsInput | string | null
    amp?: NullableStringFieldUpdateOperationsInput | string | null
    prov?: NullableStringFieldUpdateOperationsInput | string | null
    activated?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DrgsCreateInput = {
    hoscode: string
    hosname: string
    year: number
    mon: number
    ipdCase?: number
    sumAdjrw: number
    cmi: number
    updatedAt?: Date | string | null
  }

  export type DrgsUncheckedCreateInput = {
    id?: number
    hoscode: string
    hosname: string
    year: number
    mon: number
    ipdCase?: number
    sumAdjrw: number
    cmi: number
    updatedAt?: Date | string | null
  }

  export type DrgsUpdateInput = {
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    mon?: IntFieldUpdateOperationsInput | number
    ipdCase?: IntFieldUpdateOperationsInput | number
    sumAdjrw?: FloatFieldUpdateOperationsInput | number
    cmi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DrgsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    mon?: IntFieldUpdateOperationsInput | number
    ipdCase?: IntFieldUpdateOperationsInput | number
    sumAdjrw?: FloatFieldUpdateOperationsInput | number
    cmi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DrgsCreateManyInput = {
    id?: number
    hoscode: string
    hosname: string
    year: number
    mon: number
    ipdCase?: number
    sumAdjrw: number
    cmi: number
    updatedAt?: Date | string | null
  }

  export type DrgsUpdateManyMutationInput = {
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    mon?: IntFieldUpdateOperationsInput | number
    ipdCase?: IntFieldUpdateOperationsInput | number
    sumAdjrw?: FloatFieldUpdateOperationsInput | number
    cmi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DrgsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hoscode?: StringFieldUpdateOperationsInput | string
    hosname?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    mon?: IntFieldUpdateOperationsInput | number
    ipdCase?: IntFieldUpdateOperationsInput | number
    sumAdjrw?: FloatFieldUpdateOperationsInput | number
    cmi?: FloatFieldUpdateOperationsInput | number
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RawDataCreateInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    tranformDatetime?: Date | string | null
  }

  export type RawDataUncheckedCreateInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    tranformDatetime?: Date | string | null
  }

  export type RawDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tranformDatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RawDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tranformDatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RawDataCreateManyInput = {
    id?: string
    payload: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    tranformDatetime?: Date | string | null
  }

  export type RawDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tranformDatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RawDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    payload?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tranformDatetime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type HospitalCountOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    hostype?: SortOrder
    orgtype?: SortOrder
    tmb?: SortOrder
    amp?: SortOrder
    prov?: SortOrder
    activated?: SortOrder
  }

  export type HospitalAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HospitalMaxOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    hostype?: SortOrder
    orgtype?: SortOrder
    tmb?: SortOrder
    amp?: SortOrder
    prov?: SortOrder
    activated?: SortOrder
  }

  export type HospitalMinOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    hostype?: SortOrder
    orgtype?: SortOrder
    tmb?: SortOrder
    amp?: SortOrder
    prov?: SortOrder
    activated?: SortOrder
  }

  export type HospitalSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DrgsCountOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrgsAvgOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
  }

  export type DrgsMaxOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrgsMinOrderByAggregateInput = {
    id?: SortOrder
    hoscode?: SortOrder
    hosname?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
    updatedAt?: SortOrder
  }

  export type DrgsSumOrderByAggregateInput = {
    id?: SortOrder
    year?: SortOrder
    mon?: SortOrder
    ipdCase?: SortOrder
    sumAdjrw?: SortOrder
    cmi?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type RawDataCountOrderByAggregateInput = {
    id?: SortOrder
    payload?: SortOrder
    updatedAt?: SortOrder
    tranformDatetime?: SortOrder
  }

  export type RawDataMaxOrderByAggregateInput = {
    id?: SortOrder
    updatedAt?: SortOrder
    tranformDatetime?: SortOrder
  }

  export type RawDataMinOrderByAggregateInput = {
    id?: SortOrder
    updatedAt?: SortOrder
    tranformDatetime?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}