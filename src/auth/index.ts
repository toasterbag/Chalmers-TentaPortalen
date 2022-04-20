import argon2, { verify, argon2id } from "argon2";
import { PrismaClient, Token, Profile, Role } from "@prisma/client";
import { add, isAfter, isBefore } from "date-fns";
import { isSome, None, Option, Some } from "@app/std/option";
import { genToken } from "./utils";

const TOKEN_VALID_DAYS = 7;

const hashPassword = (password: string) =>
  argon2.hash(password, { type: argon2id });

export class UserProfile {
  username: string;

  email: string;

  cidIsVerified: boolean;

  isShadowed: boolean | null;

  roles: Array<Role>;

  constructor({ username, email, cidIsVerified, isShadowed, roles }: Profile) {
    this.username = username;
    this.email = email;
    this.cidIsVerified = cidIsVerified;
    this.isShadowed = isShadowed;
    this.roles = roles;
  }
}

export class AuthenticationProvider {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  private async getUser(email: string) {
    return this.prisma.profile.findUnique({
      where: {
        email,
      },
    });
  }

  async updatePassword(
    email: string,
    oldPass: string,
    newPass: string,
  ): Promise<boolean> {
    const user = await this.getUser(email);

    if (user === null) return false;

    if (!(await verify(user.hash, oldPass))) return false;

    await this.prisma.profile.update({
      where: { email },
      data: {
        hash: await hashPassword(newPass),
      },
    });

    return true;
  }

  async addRole(user: UserProfile, role: Role): Promise<void> {
    await this.prisma.profile.update({
      where: { email: user.email },
      data: {
        roles: {
          push: role,
        },
      },
    });
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<Option<UserProfile>> {
    const hash = await hashPassword(password);

    const user = await this.prisma.profile.create({
      data: {
        email,
        hash,
        username,
      },
    });

    if (user === null) return None;

    return Some(new UserProfile(user));
  }

  async authUserWithPassword(
    email: string,
    passphrase: string,
  ): Promise<Option<UserProfile>> {
    const user = await this.getUser(email);
    console.log(await this.prisma.profile.findMany());

    if (user !== null && (await verify(user.hash, passphrase))) {
      return Some(new UserProfile(user));
    }
    return None;
  }

  async issueToken(email: string, password: string): Promise<Option<Token>> {
    if (!(await this.authUserWithPassword(email, password))) {
      return None;
    }

    const token = await genToken();
    const tokenData = await this.prisma.token.create({
      data: {
        issuedAt: new Date(),
        validUntil: add(new Date(), { days: TOKEN_VALID_DAYS }),
        value: token,
        userEmail: email,
      },
    });

    return Some(tokenData);
  }

  async authUserWithToken(token: string): Promise<Option<UserProfile>> {
    const tokenData = await this.prisma.token.findUnique({
      where: {
        value: token,
      },
      include: {
        user: true,
      },
    });

    if (
      tokenData === null ||
      isAfter(new Date(), tokenData.validUntil) ||
      isBefore(new Date(), tokenData.issuedAt)
    ) {
      return None;
    }
    return Some(new UserProfile(tokenData.user));
  }

  async refreshToken(oldToken: string): Promise<Option<string>> {
    const option = await this.authUserWithToken(oldToken);
    if (isSome(option)) {
      const user = option.val;
      const newToken = await genToken();
      await this.prisma.token.delete({
        where: {
          value: newToken,
        },
      });

      await this.prisma.token.create({
        data: {
          issuedAt: new Date(),
          validUntil: add(new Date(), { days: TOKEN_VALID_DAYS }),
          value: newToken,
          userEmail: user.email,
        },
      });

      return Some(newToken);
    }

    return None;
  }
}
