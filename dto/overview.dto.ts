export interface WalletDto {
  id: string;
  color: string;
  name: string;
  balance: {
    value: string;
  };
}
export interface BlockchainDto {
  slug: string;
  name: string;
  color: string;
}

export interface CurrencyDto {
  slug: string;
  name: string;
  symbol: string;
  decimals: number;
}

export interface TokenDetailDto {
  type: 'CRYPTO' | 'NFT';
  slug: string;
  name: string;
  symbol: string;
  ico: string;
  decimal?: number;
  identifier?: string;
  market: {
    rank: number;
    cap: {
      value: string;
      currency?: CurrencyDto;
    };
    volume: {
      value: string;
      currency?: CurrencyDto;
    };
    totalSupply: string;
  };
}

export interface TokenDto {
  token: TokenDetailDto;
  blockchain: BlockchainDto;
  quantity: string;
  values: {
    purchase: {
      value: string;
      currency?: CurrencyDto;
    }[];
    purchasePerToken?: {
      value: string;
      currency?: CurrencyDto;
    };
    current: {
      value: string;
      currency?: CurrencyDto;
    }[];
    currentPerToken?: {
      value: string;
      currency?: CurrencyDto;
    };
  };
}

export interface OverviewDto {
  defaultCurrency: CurrencyDto;
  wallets: WalletDto[];
  tokens: TokenDto[];
}
