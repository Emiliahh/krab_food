const CurrencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
    return CurrencyFormatter.format(value);
}
