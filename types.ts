/* Allows for anything except for functions */
export type NotFunction<T> = T extends Function ? never : T;
export type GeneralStorageTypeObject<T> = { [key: string]: NotFunction<T> };
export type GeneralStorageType<T> = NotFunction<T> | GeneralStorageTypeObject<T>;

/** Type of function that serializes an object to a string */
export type SerializerFn<T> = (value: T) => string;

/** Type of function that unserializes a string to a given object */
export type UnserializerFn<T> = (value: string) => T;