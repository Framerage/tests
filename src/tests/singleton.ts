class Singleton {
  name = "single";
  private static instance: Singleton;
  constructor(name: string) {
    if (Singleton.instance as Singleton) {
      return Singleton.instance;
    }

    this.name = name;
    Singleton.instance = this;
  }
  getName() {
    return this.name;
  }
}
// первый способ с открытым конструктором, но с сохранением первоначальных данных

class SingletonTwo {
  private static instance: SingletonTwo;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new SingletonTwo();
    }
    return this.instance;
  }
}
// второй вариант закрывает конструктор (нельзя использовать как new ) и сохраняет
// только свой экземпляр, созданный единожды в начале определения класса
