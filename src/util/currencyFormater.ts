const CurrencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) => {
    return CurrencyFormatter.format(value);
}
