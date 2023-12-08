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
    localStorage.setItem(TokensType.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(TokensType.REFRESH_TOKEN, tokens.accessToken);
  }

  getTokens() {
    const accessToken = localStorage.getItem(TokensType.ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(TokensType.REFRESH_TOKEN);

    if (!accessToken || !refreshToken) {
      return null;
    }

    const tokens: Tokens = { accessToken, refreshToken };
    return tokens;
  }
}
