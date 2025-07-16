export type Language = 'en' | 'fr';

export interface Translations {
  title: string;
  subtitle: string;
  amountAndOptions: string;
  subtotalLabel: string;
  subtotalPlaceholder: string;
  includeTip: string;
  percentage: string;
  fixedAmount: string;
  tipPlaceholder: string;
  taxBreakdown: string;
  subtotal: string;
  gst: string;
  qst: string;
  totalTax: string;
  tip: string;
  grandTotal: string;
  effectiveRate: string;
  taxExplanation: string;
  enterAmount: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'Quebec Tax Calculator',
    subtitle: 'Calculate Quebec taxes (GST + QST) with optional tip',
    amountAndOptions: 'Amount & Options',
    subtotalLabel: 'Subtotal (before tax)',
    subtotalPlaceholder: '0.00',
    includeTip: 'Include tip',
    percentage: 'Percentage',
    fixedAmount: 'Fixed Amount',
    tipPlaceholder: '15',
    taxBreakdown: 'Tax Breakdown',
    subtotal: 'Subtotal',
    gst: 'GST (5%)',
    qst: 'QST (9.975%)',
    totalTax: 'Total Tax',
    tip: 'Tip',
    grandTotal: 'Grand Total',
    effectiveRate: 'Effective tax rate:',
    taxExplanation: 'Quebec combines federal GST (5%) and provincial QST (9.975%) for a total tax rate of 14.975%.',
    enterAmount: 'Enter an amount to see the tax breakdown'
  },
  fr: {
    title: 'Calculateur de taxes du Québec',
    subtitle: 'Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel',
    amountAndOptions: 'Montant et options',
    subtotalLabel: 'Sous-total (avant taxes)',
    subtotalPlaceholder: '0,00',
    includeTip: 'Inclure le pourboire',
    percentage: 'Pourcentage',
    fixedAmount: 'Montant fixe',
    tipPlaceholder: '15',
    taxBreakdown: 'Détail des taxes',
    subtotal: 'Sous-total',
    gst: 'TPS (5%)',
    qst: 'TVQ (9,975%)',
    totalTax: 'Total des taxes',
    tip: 'Pourboire',
    grandTotal: 'Total général',
    effectiveRate: 'Taux de taxe effectif :',
    taxExplanation: 'Le Québec combine la TPS fédérale (5%) et la TVQ provinciale (9,975%) pour un taux total de 14,975%.',
    enterAmount: 'Entrez un montant pour voir le détail des taxes'
  }
};