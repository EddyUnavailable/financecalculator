'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';

export default function HomePage() {
  const { bills, addBill } = useBills();

  const labels = ['rent', 'water', 'cTax', 'gas', 'other1', 'other2', 'other3'];

  // Convert current bills into a quick lookup map
  const billsMap = bills.home.reduce((acc, bill) => {
    acc[bill.label] = bill.amount;
    return acc;
  }, {});

  const [form, setForm] = useState(() =>
    labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {})
  );

  // Keep form state in sync with latest bills
  useEffect(() => {
    const updatedForm = labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {});
    setForm(updatedForm);
  }, [bills.home]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(form).forEach(([label, value]) => {
      const amount = parseFloat(value);
      addBill('home', label, isNaN(amount) ? 0 : amount);
    });
  };

  // Total based on current form values to reflect edits
  const total = Object.values(form).reduce((sum, value) => {
    const num = parseFloat(value);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const formatLabel = (label) => {
    const labelsMap = {
      rent: 'Rent',
      water: 'Water',
      cTax: 'Council Tax',
      gas: 'Gas',
      other1: 'Other 1',
      other2: 'Other 2',
      other3: 'Other 3',
    };
    return labelsMap[label] || label;
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Home Expenses</h1>

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
        <button type="submit">Update Home Bills</button>
      </form>

      <h3>Total Home Costs: £{total.toFixed(2)}</h3>
    </main>
  );
}
