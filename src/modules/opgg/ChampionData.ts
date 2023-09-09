export class ChampionData {
  // eslint-disable-next-line no-use-before-define
  private static instance: ChampionData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private championsData: any = null

  private roles: { [key: string]: string } = {
    support: 'support',
    supp: 'support',
    adc: 'adc',
    mid: 'mid',
    jgl: 'jungle',
    jg: 'jungle',
    jungle: 'jungle',
    top: 'top'
  }

  public constructor () {
    // Asegura que solo haya una instancia de DataManager
    if (ChampionData.instance) {
      return ChampionData.instance
    }

    // Inicializa la instancia y guarda la referencia
    ChampionData.instance = this

    // Inicializa los datos a null, indicando que aún no se han cargado
    this.championsData = null
  }

  public getChampionsData = async () => {
    if (this.championsData === null) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const lolChampionsData: any = await fetch(
          'https://ddragon.leagueoflegends.com/cdn/13.17.1/data/en_US/champion.json'
        )
        this.championsData = await lolChampionsData.json()
        return this.championsData
      } catch (error) {
        console.error('Unable to get Champions Data')
      }
    } else {
      return this.championsData
    }
  }

  public getRoles = () => {
    return this.roles
  }
}
