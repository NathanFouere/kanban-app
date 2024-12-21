export class CardModel {
  public id: number;

  constructor(
    public title: string,
    public content: string,
    public cardContainerId: number,
  ) {
    this.id = Math.floor(Math.random() * 100);
  }
}
