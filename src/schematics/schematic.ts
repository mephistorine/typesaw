export interface Schematic<T> {
  generate(name: string, options?: object): Promise<T>
}
