import { Injectable } from '@angular/core';
import { Tokens } from '../models/token.dto';

export enum TokensType {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}

@Injectable({
  providedIn: 'root',
})
export class TokensService {
  saveTokens(tokens: Tokens) {
    sessionStorage.setItem(TokensType.ACCESS_TOKEN, tokens.accessToken);
    sessionStorage.setItem(TokensType.REFRESH_TOKEN, tokens.accessToken);
  }

  getTokens(): Tokens | null {
    const accessToken = sessionStorage.getItem(TokensType.ACCESS_TOKEN);
    const refreshToken = sessionStorage.getItem(TokensType.REFRESH_TOKEN);

    if (!accessToken || !refreshToken) {
      return null;
    }

    const tokens: Tokens = { accessToken, refreshToken };
    return tokens;
  }
}
