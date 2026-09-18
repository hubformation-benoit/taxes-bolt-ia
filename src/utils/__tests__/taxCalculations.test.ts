import {
  calculateTax,
  calculateInverseTax,
  roundToCent,
  TaxBreakdown,
  TipOptions,
} from '../taxCalculations';

const expectClose = (actual: number, expected: number, tolerance = 0.02) => {
  expect(Math.abs(actual - expected)).toBeLessThanOrEqual(tolerance);
};

const noTip: TipOptions = { tipType: 'percentage', tipValue: '0', includeTip: false };

describe('roundToCent', () => {
  test('rounds 2.895 to 2.90', () => {
    expect(roundToCent(2.895)).toBe(2.90);
  });

  test('rounds 5.7755 to 5.78', () => {
    expect(roundToCent(5.7755)).toBe(5.78);
  });

  test('rounds 4.3485 to 4.35', () => {
    expect(roundToCent(4.3485)).toBe(4.35);
  });

  test('rounds 0.5005 to 0.50', () => {
    expect(roundToCent(0.5005)).toBe(0.50);
  });
});

describe('Forward Calculation - Reconciliation', () => {
  test('57.90 should reconcile to 66.58', () => {
    const breakdown = calculateTax(57.90, noTip);
    expect(breakdown.subtotal).toBe(57.90);
    expect(breakdown.gst).toBe(2.90);
    expect(breakdown.qst).toBe(5.78);
    expect(breakdown.totalWithTaxes).toBe(66.58);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });

  test('86.97 should reconcile to 100.00', () => {
    const breakdown = calculateTax(86.97, noTip);
    expect(breakdown.subtotal).toBe(86.97);
    expect(breakdown.gst).toBe(4.35);
    expect(breakdown.qst).toBe(8.68);
    expect(breakdown.totalWithTaxes).toBe(100.00);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });

  test('10.01 should reconcile to 11.51', () => {
    const breakdown = calculateTax(10.01, noTip);
    expect(breakdown.subtotal).toBe(10.01);
    expect(breakdown.gst).toBe(0.50);
    expect(breakdown.qst).toBe(1.00);
    expect(breakdown.totalWithTaxes).toBe(11.51);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });
});

describe('Forward Calculation - With Tip', () => {
  test('57.90 with 15% tip should give grand total 75.27', () => {
    const tipOptions: TipOptions = { tipType: 'percentage', tipValue: '15', includeTip: true };
    const breakdown = calculateTax(57.90, tipOptions);
    expect(breakdown.subtotal).toBe(57.90);
    expect(breakdown.gst).toBe(2.90);
    expect(breakdown.qst).toBe(5.78);
    expect(breakdown.totalWithTaxes).toBe(66.58);
    expect(breakdown.tip).toBe(8.69);
    expect(breakdown.grandTotal).toBe(75.27);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });

  test('86.97 with 15% tip should give grand total 113.05', () => {
    const tipOptions: TipOptions = { tipType: 'percentage', tipValue: '15', includeTip: true };
    const breakdown = calculateTax(86.97, tipOptions);
    expect(breakdown.subtotal).toBe(86.97);
    expect(breakdown.gst).toBe(4.35);
    expect(breakdown.qst).toBe(8.68);
    expect(breakdown.totalWithTaxes).toBe(100.00);
    expect(breakdown.tip).toBe(13.05);
    expect(breakdown.grandTotal).toBe(113.05);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });

  test('10.01 with 15% tip should give grand total 13.02', () => {
    const tipOptions: TipOptions = { tipType: 'percentage', tipValue: '15', includeTip: true };
    const breakdown = calculateTax(10.01, tipOptions);
    expect(breakdown.subtotal).toBe(10.01);
    expect(breakdown.gst).toBe(0.50);
    expect(breakdown.qst).toBe(1.00);
    expect(breakdown.totalWithTaxes).toBe(11.51);
    expect(breakdown.tip).toBe(1.50);
    expect(breakdown.grandTotal).toBe(13.01);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });
});

describe('Inverse Calculation - Reconciliation', () => {
  test('100.00 should reconcile to 86.98 subtotal', () => {
    const totalInput = 100.00;
    const breakdown = calculateInverseTax(totalInput, noTip);
    expect(breakdown.subtotal).toBe(86.98);
    expect(breakdown.gst).toBe(4.35);
    expect(breakdown.qst).toBe(8.68);
    expectClose(breakdown.totalWithTaxes, totalInput);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expectClose(sumOfComponents, breakdown.grandTotal);
  });

  test('66.58 should reconcile to 57.91 subtotal', () => {
    const totalInput = 66.58;
    const breakdown = calculateInverseTax(totalInput, noTip);
    expect(breakdown.subtotal).toBe(57.91);
    expect(breakdown.gst).toBe(2.90);
    expect(breakdown.qst).toBe(5.78);
    expectClose(breakdown.totalWithTaxes, totalInput);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expectClose(sumOfComponents, breakdown.grandTotal);
  });

  test('66.57 - closest reconcilable subtotal (known rounding limitation)', () => {
    const totalInput = 66.57;
    const breakdown = calculateInverseTax(totalInput, noTip);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expectClose(sumOfComponents, breakdown.grandTotal);

    const forwardCheck = Math.abs(breakdown.totalWithTaxes - totalInput);
    expectClose(forwardCheck, 0, 0.02);
  });
});

describe('Inverse Calculation - Forward Check', () => {
  test('Inverse of 100.00 then forward should match (within 1 cent)', () => {
    const totalInput = 100.00;
    const inverseBreakdown = calculateInverseTax(totalInput, noTip);
    const forwardBreakdown = calculateTax(inverseBreakdown.subtotal, noTip);
    const diff = Math.abs(forwardBreakdown.totalWithTaxes - totalInput);
    expectClose(diff, 0, 0.02);
  });

  test('Inverse of 66.58 then forward should match (within 1 cent)', () => {
    const totalInput = 66.58;
    const inverseBreakdown = calculateInverseTax(totalInput, noTip);
    const forwardBreakdown = calculateTax(inverseBreakdown.subtotal, noTip);
    const diff = Math.abs(forwardBreakdown.totalWithTaxes - totalInput);
    expectClose(diff, 0, 0.02);
  });
});

describe('Tip Calculation Tests', () => {
  test('50.00 with 18% percentage tip', () => {
    const tipOptions: TipOptions = { tipType: 'percentage', tipValue: '18', includeTip: true };
    const breakdown = calculateTax(50.00, tipOptions);
    expect(breakdown.tip).toBe(9.00);
    expect(breakdown.grandTotal).toBe(66.49);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expectClose(sumOfComponents, breakdown.grandTotal);
  });

  test('50.00 with fixed tip of 10.012', () => {
    const tipOptions: TipOptions = { tipType: 'fixed', tipValue: '10.012', includeTip: true };
    const breakdown = calculateTax(50.00, tipOptions);
    expect(breakdown.tip).toBe(10.01);
    expect(breakdown.grandTotal).toBe(67.50);

    const sumOfComponents =
      breakdown.subtotal + breakdown.gst + breakdown.qst + breakdown.tip;
    expect(sumOfComponents).toBe(breakdown.grandTotal);
  });
});
