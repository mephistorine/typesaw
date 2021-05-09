import * as commander from 'commander'

export class TypesawApp {
  private program: commander.Command = new commander.Command('typesaw')

  constructor() {
    this.setUpCli()
    this.program.parse()
  }

  private setUpCli(): void {
    this.program
      .command(`generate <entityType> <entityName>`)
      .alias('g')
      .description(`Hello`)
      .action((entityType: string, entityName: string) => {
        console.log(entityType, entityName)
      })
  }
}

new TypesawApp()
