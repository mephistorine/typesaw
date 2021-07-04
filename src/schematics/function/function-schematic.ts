import { Schematic } from '../schematic'

export class FunctionSchematic implements Schematic<any> {
  public generate(name: string, options?: object): Promise<any> {
    return Promise.resolve(undefined);
  }
}
