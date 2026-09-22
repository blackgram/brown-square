export function formatMoney(cents: number, currency: "NGN" | "GBP" = "NGN") {
  const locale = currency === "NGN" ? "en-NG" : "en-GB";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatMoneyExact(
  cents: number,
  currency: "NGN" | "GBP" = "NGN",
) {
  const locale = currency === "NGN" ? "en-NG" : "en-GB";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100);
}
