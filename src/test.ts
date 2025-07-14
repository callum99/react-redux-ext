interface Comparable<T> {
  compareTo(other: T): number
}

class Person implements Comparable<Person> {
  constructor(public name: string, public age: number) {}
  
  compareTo(other: Person): number
  {
    if (this.age < other.age) return -1;
    if (this.age > other.age) return 1;
    return 0;
  }
  
  toString(): string {
    return `${this.name} ${this.age}`;
  }
}

function compareThings<T extends Comparable<T>> (a: T, b: T): string {
  const result = a.compareTo(b);
  if (result < 0) return "first is smaller";
  if (result > 0) return "first is bigger";
  return "they are equal";
}

const Callum = new Person("Callum", 29);
const Jack = new Person("Jack", 31);

compareThings(Callum, Jack);


// type PartialExcept<T, K extends keyof T> = {
//   [P in keyof T]: P extends K ? T[P] : T[P] | undefined;
// };

// type RequiredExcept<Type, K extends keyof Type> = {
//   [P in keyof Type]: P extends K ? Type[P] | undefined : Type[P]
// };
//
//
// type Flatten<T> = T extends [infer U] ? U : T;
// type Flatten<T> = T extends (infer U)[] ? U : T;


type PromiseType<T> = T extends Promise<infer U> ? U : T;


type DeepReadOnly<T> = T extends object ? { readonly [K in keyof T]: DeepReadOnly<T[K]>} : T;


type PickOptional<T extends object> = {
  [Key in keyof T ]+?: T[Key]
}
