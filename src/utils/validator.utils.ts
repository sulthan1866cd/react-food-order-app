export class Validator {
  static isNumber(input: number): boolean {
    return typeof input === "number" || !isNaN(+input);
  }

  static isNotEmpty(input: string): boolean {
    return input.trim() !== "";
  }

  static isLink(input: string): boolean {
    return input.startsWith("https://") || input.startsWith("http://");
  }

  static isValidForm(...inputs: unknown[]): boolean {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (typeof input === "string") {
        if (!this.isNotEmpty(input)) return false;
      } else if (typeof input === "number") {
        if (!this.isNumber(input)) return false;
      } else return false;
    }
    return true;
  }
}
