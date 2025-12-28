import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt);
export class CryptoUtil {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${salt}:${derivedKey.toString("hex")}`;
  }

  static async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    if (!storedHash || !storedHash.includes(":")) {
      return false;
    }
    console.log(password, storedHash);

    const [salt, key] = storedHash.split(":");
    const keyBuffer = Buffer.from(key, "hex");

    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    console.log(keyBuffer);
    console.log(derivedKey);
    return timingSafeEqual(keyBuffer, derivedKey);
  }
}
