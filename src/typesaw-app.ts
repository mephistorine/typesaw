import * as commander from 'commander'
import consola from 'consola'
import { ClassSchematic } from './schematics'
import { CaseStyle } from './schematics/case-style'
import { CliOptions } from './schematics/cli-options'

export class TypesawApp {
  private program: commander.Command = new commander.Command('typesaw')

  constructor() {
    this.setUpCli()
    this.program.parse()
  }

  private setUpCli(): void {
    const filenameCaseStyleOption: commander.Option = this.program
      .createOption(`-f, --filename-case-style <caseStyle>`, `Filename case style`)
      .choices(Object.keys(CaseStyle))
      .default(CaseStyle.kebab)

    // Add top level options
    this.program.addOption(filenameCaseStyleOption)

    // Configure generate command
    this.program
      .command(`generate <entityType> <entityName>`)
      .alias('g')
      .description(`Entity generator`, {
        entityType: `Entity type`,
        entityName: `Entity name or path with name`
      })
      .action((entityType: string, entityName: string) => {
        const options: CliOptions = this.program.opts() as CliOptions

        consola.log(options)

        switch (entityType) {
          case 'class': {
            return new ClassSchematic().generate(entityName, options)
          }
          default: {
            consola.error(`Unknown entity type="${ entityType }"`)
            process.exit(1)
          }
        }

      })
  }
}

new TypesawApp()
