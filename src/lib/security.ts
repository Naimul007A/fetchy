import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import crypto from "crypto";

interface TokenPayload {
  ip: string;
  userAgent: string;
  hashedApiKey: string;
}

export class TokenManager {
  constructor(
    private key: string = process.env.NEXT_API_KEY,
    private ttl: SignOptions["expiresIn"] = 60
  ) {}

  private sortObject(obj: Record<string, unknown>): Record<string, unknown> {
    return Object.fromEntries(
      Object.entries(obj).sort((a, b) => a[0].localeCompare(b[0]))
    );
  }

  private hash({
    ip,
    userAgent,
    ...rest
  }: { ip: string; userAgent: string } & Record<string, unknown>): string {
    const sortedRest = this.sortObject(rest);
    const data = `${this.key}-${ip}-${userAgent}-${JSON.stringify(sortedRest)}`;
    return crypto.createHash("sha256").update(data).digest("hex");
  }

  createToken({
    ip,
    userAgent,
    ...rest
  }: { ip: string; userAgent: string } & Record<string, unknown>): string {
    const hashedApiKey = this.hash({ ip, userAgent, ...rest });
    const payload: TokenPayload = { ip, userAgent, hashedApiKey, ...rest };

    return jwt.sign(payload, this.key, {
      expiresIn: this.ttl,
    });
  }

  verifyToken({
    token,
    ip: currentIp,
    userAgent: currentUserAgent,
    ...rest
  }: {
    token: string;
    ip: string;
    userAgent: string;
    [key: string]: unknown;
  }): boolean {
    try {
      const payload = jwt.verify(token, this.key) as TokenPayload;

      const currentHash = this.hash({
        ip: currentIp,
        userAgent: currentUserAgent,
        ...rest,
      });

      return (
        payload.ip === currentIp &&
        payload.userAgent === currentUserAgent &&
        payload.hashedApiKey === currentHash
      );
    } catch (err) {
      console.error("Token verification failed:", err);
      return false;
    }
  }

  decodeToken(token: string): TokenPayload | null {
    try {
      return jwt.decode(token) as TokenPayload;
    } catch {
      return null;
    }
  }

  isTokenValid(token: string): boolean {
    const decoded = jwt.decode(token) as { exp?: number } | null;

    if (!decoded || !decoded.exp) {
      return false;
    }

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp >= now;
  }
}
