import { camelCaseIt, kebabCaseIt, pascalCaseIt, snakeCaseIt } from 'case-it'
import { writeFile } from 'fs/promises'
import { parse, ParsedPath } from 'path'

import { CaseStyle } from '../case-style'
import { CliOptions } from '../cli-options'
import { Schematic } from '../schematic'

function applyCaseStyle(str: string, caseStyle: CaseStyle): string {
  switch (caseStyle) {
    case CaseStyle.kebab: return kebabCaseIt(str)
    case CaseStyle.camel: return camelCaseIt(str)
    case CaseStyle.snake: return snakeCaseIt(str)
    case CaseStyle.pascal: return pascalCaseIt(str)
    default:
      throw new Error(`Unknown caseStyle="${ caseStyle }"`)
  }
}

export function stripIndent(strings: TemplateStringsArray, ...values: any[]): string {
  const endResult: string = String.raw(strings, ...values);

  // remove the shortest leading indentation from each line
  const match: RegExpMatchArray | null = endResult.match(/^[ \t]*(?=\S)/gm);

  // return early if there's nothing to strip
  if (match === null) {
    return endResult;
  }

  const indent: number = Math.min(...match.map((el: string) => el.length));
  const regexp: RegExp = new RegExp('^[ \\t]{' + indent + '}', 'gm');

  return (indent > 0 ? endResult.replace(regexp, '') : endResult).trim();
}

export class ClassSchematic implements Schematic<void> {
  public async generate(name: string, options: CliOptions): Promise<void> {
    const path: ParsedPath = parse(name)
    const template: string = stripIndent`
    export class ${ pascalCaseIt(name) } {
      constructor() {
      }
    }`

    return writeFile(`${ applyCaseStyle(path.name, options.filenameCaseStyle) }.ts`, template)
  }
}
