'use client';

import { useState } from 'react';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [years, setYears] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculate = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(interest) / 100;
    const n = parseFloat(years) * 12;
    const monthlyRate = annualRate / 12;

    const payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setMonthlyPayment(payment.toFixed(2));
  };

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">Loan Calculator</h1>

      <div className="flex flex-col gap-2 max-w-sm">
        <input
          type="number"
          placeholder="Loan amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Annual interest rate (%)"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border p-2"
        />
        <input
          type="number"
          placeholder="Loan term (years)"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="border p-2"
        />
        <button onClick={calculate} className="bg-blue-600 text-white p-2 rounded">
          Calculate
        </button>
      </div>

      {monthlyPayment && (
        <p className="mt-4 text-lg">
          Monthly Payment: <strong>£{monthlyPayment}</strong>
        </p>
      )}
    </main>
  );
}
