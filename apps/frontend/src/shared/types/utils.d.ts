/** biome-ignore-all lint/correctness/noUnusedVariables: This is a global utility types file */
type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
