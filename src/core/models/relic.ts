import { classToPlain, Expose, plainToClass, Transform } from 'class-transformer';

export class Relic {
  @Expose()
  public id: number = 0;

  @Expose()
  public name: string = '';

  @Expose()
  public image: string = '';

  @Expose()
  public stats: string = '';

  @Expose()
  public category: string = '';

  @Expose()
  @Transform((v) => (v ? v : false))
  public selected: boolean = false;

  public toJSON(): any {
    return classToPlain(this);
  }

  public static fromJSON(payload: unknown): Relic {
    return plainToClass(Relic, payload);
  }
}
