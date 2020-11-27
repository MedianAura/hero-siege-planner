import { classToPlain, Expose, plainToClass } from 'class-transformer';

export class Relic {
  @Expose()
  public name: string = '';

  @Expose()
  public image: string = '';

  @Expose()
  public stats: string = '';

  public toJSON(): any {
    return classToPlain(this);
  }

  public static fromJSON(payload: unknown): Relic {
    return plainToClass(Relic, payload);
  }
}
