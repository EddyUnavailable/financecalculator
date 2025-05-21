'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';

export default function PhonePage() {
  const { addBill, bills } = useBills();

  const labels = ['mobile1', 'mobile2', 'internet'];

  // Map of existing bill amounts
  const billsMap = bills.phone.reduce((acc, bill) => {
    acc[bill.label] = bill.amount;
    return acc;
  }, {});

  const [form, setForm] = useState(() =>
    labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {})
  );

  useEffect(() => {
    const updatedForm = labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {});
    setForm(updatedForm);
  }, [bills.phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(form).forEach(([label, value]) => {
      const amount = parseFloat(value);
      addBill('phone', label, isNaN(amount) ? 0 : amount);
    });
  };

  const total = Object.values(form).reduce((sum, val) => {
    const amount = parseFloat(val);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const formatLabel = (label) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\d/, ' $&');

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Phone & Internet Expenses</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        {labels.map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label style={{ marginRight: '1rem' }}>{formatLabel(field)}:</label>
            <input
              type="number"
              step="0.01"
              min="0"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              inputMode="decimal"
            />
          </div>
        ))}
        <button type="submit">Update Phone Bills</button>
      </form>

      <h3>Total Phone Costs: £{total.toFixed(2)}</h3>
    </main>
  );
}
