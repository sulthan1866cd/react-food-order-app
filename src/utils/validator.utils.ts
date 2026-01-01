export class Validator {
  static isNumber(input: unknown): boolean {
    if (!(typeof input === "string" || typeof input === "number")) return false;
    return Number.isFinite(+input);
  }

  static isPositive(input: unknown): boolean {
    if (!(typeof input === "string" || typeof input === "number")) return false;
    return this.isNumber(input) && +input > 0;
  }

  static isEmpty(input: unknown): boolean {
    if (typeof input !== "string") return false;
    return input.trim() === "";
  }

  static isEmail(input: unknown): boolean {
    //to be implemented // bad
    return !this.isEmpty(input);
  }

  static isLink(input: unknown): boolean {
    if (typeof input !== "string") return false;
    return input.startsWith("https://") || input.startsWith("http://");
  }

  static isImageFile(input: unknown): boolean {
    // bad code
    if (typeof input !== "object") return false;
    // if (!Object.keys(input as object).includes("name")) return false;
    const imageName = (input as File).name;
    return [".png", ".jpg", ".jpeg"].some((exe) => imageName.endsWith(exe));
  }

  static isValidForm(...inputs: unknown[]): boolean {
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
      if (typeof input === "string") {
        if (this.isEmpty(input)) return false;
      } else if (typeof input === "number") {
        if (!this.isNumber(input)) return false;
      } else return false;
    }
    return true;
  }
}
