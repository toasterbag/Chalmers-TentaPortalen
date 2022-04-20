import { getMonth, getYear } from "date-fns";

export class AcademicYear {
  readonly start: number;

  readonly end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  static from_date(date: Date): AcademicYear {
    return getMonth(date) > 7
      ? new AcademicYear(getYear(date), getYear(date) + 1)
      : new AcademicYear(getYear(date) - 1, getYear(date));
  }

  toString(): string {
    return `${this.start}/${this.end}`;
  }

  is_same(other: AcademicYear) {
    return this.start === other.start && this.end === other.end;
  }
}