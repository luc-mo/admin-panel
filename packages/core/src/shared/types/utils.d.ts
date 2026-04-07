export type StrictOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type ParameterCommand<T extends (...args: any) => any> = Parameters<T>[0]
