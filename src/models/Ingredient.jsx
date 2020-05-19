export class Ingredient 
{
    constructor(name, type, price, common = false) 
    {
      this.name = name;
      this.type = type;
      this.price = price;
      this.common = common;
    }
  }