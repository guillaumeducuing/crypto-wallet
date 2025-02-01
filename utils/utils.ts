import { ethers } from 'ethers';
import type { CurrencyDto } from '~/dto/overview.dto';
export function convertToCamelCase(str: string) {
  const hasHyphen = str.includes('-');
  const isUpperCase = /[A-Z]/.test(str);
  if (hasHyphen || !isUpperCase) {
    return (
      str[0].toUpperCase() +
      str.slice(1).replace(/[-][a-z]/g, function (match) {
        return match.substring(1).toUpperCase();
      })
    );
  } else {
    return str;
  }
}
export function currencyToFloat(value: string, currency: CurrencyDto) {
  return parseFloat(ethers.formatUnits(value, currency.decimals ?? 0));
}
export function floatToString(value: number) {
  return Math.round(value).toLocaleString();
}
export function currencyToString(value: string, currency: CurrencyDto) {
  return floatToString(parseFloat(ethers.formatUnits(value, currency.decimals ?? 0))) + ' ' + currency.symbol;
}
