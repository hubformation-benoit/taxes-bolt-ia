import React, { useState, useEffect } from 'react';
import { Calculator, Percent, DollarSign, Receipt } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { Language, translations } from '../types/language';

interface TaxBreakdown {
  subtotal: number;
  gst: number;
  qst: number;
  totalTax: number;
  tip: number;
  grandTotal: number;
  totalWithTaxes: number;
}

const TaxCalculator: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [tipType, setTipType] = useState<'percentage' | 'fixed'>('percentage');
  const [tipValue, setTipValue] = useState<string>('15');
  const [includeTip, setIncludeTip] = useState<boolean>(true);
  const [inverseTax, setInverseTax] = useState<boolean>(false);
  const [breakdown, setBreakdown] = useState<TaxBreakdown | null>(null);
  const [language, setLanguage] = useState<Language>('fr');

  const t = translations[language];

  // Quebec tax rates
  const GST_RATE = 0.05; // 5%
  const QST_RATE = 0.09975; // 9.975%

  const calculateTax = (subtotal: number): TaxBreakdown => {
    const gst = subtotal * GST_RATE;
    const qst = subtotal * QST_RATE;
    const totalTax = gst + qst;
    const totalWithTaxes = subtotal + totalTax;

    let tip = 0;
    if (includeTip && tipValue) {
      if (tipType === 'percentage') {
        tip = subtotal * (parseFloat(tipValue) / 100);
      } else {
        tip = parseFloat(tipValue);
      }
    }

    const grandTotal = totalWithTaxes + tip;

    return {
      subtotal,
      gst,
      qst,
      totalTax,
      tip,
      grandTotal,
      totalWithTaxes
    };
  };

  const calculateInverseTax = (totalWithTaxes: number): TaxBreakdown => {
    const subtotal = totalWithTaxes / (1 + GST_RATE + QST_RATE);
    return calculateTax(subtotal);
  }

  useEffect(() => {
    const numericalAmount = parseFloat(amount);
    if (amount && !isNaN(numericalAmount)) {
      if (inverseTax) {
        setBreakdown(calculateInverseTax(numericalAmount));
      } else {
        setBreakdown(calculateTax(numericalAmount));
      }
    } else {
      setBreakdown(null);
    }
  }, [amount, tipType, tipValue, includeTip, inverseTax]);

  const formatCurrency = (value: number): string => {
    const locale = language === 'fr' ? 'fr-CA' : 'en-CA';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'CAD'
    }).format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleTipValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setTipValue(value);
    }
  };

  const quickTipOptions = [10, 15, 18, 20, 25];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Language Toggle */}
      <div className="flex justify-end mb-6">
        <LanguageToggle 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </div>


      <div className="text-center mb-8 p-6 bg-main-blue rounded-xl">
        <div className="flex items-center justify-center mb-4 header">
          <img src="icons/taxesqc-logo.svg" className="logo" />
          <div>
            <h1 className="text-3xl font-bold text-white">{t.title}</h1>
            <p className="text-white sub-header">{t.subtitle}</p>
          </div>
        </div>
        
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
            {t.amountAndOptions}
          </h2>
          
          <div className="space-y-6">
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {inverseTax ? t.totalLabel : t.subtotalLabel}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder={t.subtotalPlaceholder}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
                />
              </div>
            </div>
            {/* Inverse Tax Toggle */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">{t.inverseTaxLabel}</label>
              <button
                  onClick={() => setInverseTax(!inverseTax)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      inverseTax ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
              >
                  <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          inverseTax ? 'translate-x-6' : 'translate-x-1'
                      }`}
                  />
              </button>
            </div>
            {inverseTax && (
                <p className="text-sm text-gray-500 mt-2">
                  {t.inverseTaxMessage} {/* Use the translated label */}
                </p>
            )}

            {/* Tip Options */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-medium text-gray-700">{t.includeTip}</label>
                <button
                  onClick={() => setIncludeTip(!includeTip)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    includeTip ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      includeTip ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {includeTip && (
                <div className="space-y-4">
                  {/* Tip Type Selection */}
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setTipType('percentage')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 ${
                        tipType === 'percentage'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Percent className="w-4 h-4 inline mr-2" />
                      {t.percentage}
                    </button>
                    <button
                      onClick={() => setTipType('fixed')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-200 ${
                        tipType === 'fixed'
                          ? 'bg-blue-50 border-blue-200 text-blue-700'
                          : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <DollarSign className="w-4 h-4 inline mr-2" />
                      {t.fixedAmount}
                    </button>
                  </div>

                  {/* Quick Tip Buttons (for percentage) */}
                  {tipType === 'percentage' && (
                    <div className="flex flex-wrap gap-2">
                      {quickTipOptions.map((tip) => (
                        <button
                          key={tip}
                          onClick={() => setTipValue(tip.toString())}
                          className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                            tipValue === tip.toString()
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {tip}%
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Tip Value Input */}
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      {tipType === 'percentage' ? '%' : '$'}
                    </span>
                    <input
                      type="number"
                      value={tipValue}
                      onChange={handleTipValueChange}
                      placeholder={tipType === 'percentage' ? t.tipPlaceholder : t.subtotalPlaceholder}
                      className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-green-600" />
            {t.taxBreakdown}
          </h2>

          {breakdown ? (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{t.subtotal}</span>
                  <span className="font-medium">{formatCurrency(breakdown.subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{t.gst}</span>
                  <span className="font-medium">{formatCurrency(breakdown.gst)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">{t.qst}</span>
                  <span className="font-medium">{formatCurrency(breakdown.qst)}</span>
                </div>
                
                <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-200">
                  <span className="text-gray-600">{t.totalTax}</span>
                  <span className="font-medium">{formatCurrency(breakdown.totalTax)}</span>
                </div>
                
                {breakdown.tip > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">{t.tip}</span>
                    <span className="font-medium">{formatCurrency(breakdown.tip)}</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-800">{t.grandTotal}</span>
                  <span className="text-2xl font-bold text-blue-800">
                    {formatCurrency(breakdown.grandTotal)}
                  </span>
                </div>
              </div>

              <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                <p className="mb-1">
                  <strong>{t.effectiveRate}</strong> {(((breakdown.gst + breakdown.qst) / breakdown.subtotal) * 100).toFixed(3)}%
                </p>
                <p>
                  {t.taxExplanation}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">{t.enterAmount}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
