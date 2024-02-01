export const currencyFormater = (
    number = 0,
    language = "en-US",
    style = 'currency',
    currency = "USD",
    minimumFractionDigits = 2
) => new Intl.NumberFormat(language, { style, currency, minimumFractionDigits }).format(number);
