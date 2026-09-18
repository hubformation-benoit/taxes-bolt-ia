export const GST_RATE = 0.05;
export const QST_RATE = 0.09975;

export interface TaxBreakdown {
  subtotal: number;
  gst: number;
  qst: number;
  totalTax: number;
  tip: number;
  grandTotal: number;
  totalWithTaxes: number;
}

export interface TipOptions {
  tipType: 'percentage' | 'fixed';
  tipValue: string;
  includeTip: boolean;
}

export const roundToCent = (num: number): number => {
  return Math.round(num * 100) / 100;
};

export const toCents = (dollars: number): number => {
  return Math.round(dollars * 100);
};

export const toDollars = (cents: number): number => {
  return cents / 100;
};

export const calculateTax = (
  subtotalDollars: number,
  tipOptions: TipOptions = { tipType: 'percentage', tipValue: '0', includeTip: false }
): TaxBreakdown => {
  const subtotalCents = toCents(subtotalDollars);

  const gstCents = Math.round(subtotalCents * GST_RATE);
  const qstCents = Math.round(subtotalCents * QST_RATE);

  const totalTaxCents = gstCents + qstCents;
  const totalWithTaxesCents = subtotalCents + totalTaxCents;

  let tipCents = 0;
  const numericalTipValue = parseFloat(tipOptions.tipValue);

  if (tipOptions.includeTip && tipOptions.tipValue && !isNaN(numericalTipValue)) {
    if (tipOptions.tipType === 'percentage') {
      tipCents = Math.round(subtotalCents * (numericalTipValue / 100));
    } else {
      tipCents = toCents(numericalTipValue);
    }
  }

  const grandTotalCents = totalWithTaxesCents + tipCents;

  return {
    subtotal: subtotalDollars,
    gst: toDollars(gstCents),
    qst: toDollars(qstCents),
    totalTax: toDollars(totalTaxCents),
    tip: toDollars(tipCents),
    totalWithTaxes: toDollars(totalWithTaxesCents),
    grandTotal: toDollars(grandTotalCents),
  };
};

export const calculateInverseTax = (
  totalWithTaxesDollars: number,
  tipOptions: TipOptions = { tipType: 'percentage', tipValue: '0', includeTip: false }
): TaxBreakdown => {
  const effectiveRate = 1 + GST_RATE + QST_RATE;
  const subtotal = totalWithTaxesDollars / effectiveRate;
  const roundedSubtotal = roundToCent(subtotal);

  return calculateTax(roundedSubtotal, tipOptions);
};
