/* Allows for anything except for functions */
export type NotFunction<T> = T extends Function ? never : T;
export type GeneralStorageTypeObject<T>= { [key : string] : NotFunction<T> };
export type GeneralStorageType<T> = NotFunction<T> | GeneralStorageTypeObject<T>;