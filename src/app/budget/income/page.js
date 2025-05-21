'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';

export default function IncomePage() {
  const { incomeItems, updateIncome, saveIncomeTotals, loading } = useBills();
  const [localIncomes, setLocalIncomes] = useState([]);

  // Sync local state with context
  useEffect(() => {
    setLocalIncomes(incomeItems);
  }, [incomeItems]);

  const totalIncome = localIncomes.reduce((sum, i) => sum + i.amount, 0);

  const handleInputChange = (id, key, value) => {
    setLocalIncomes((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [key]: key === 'amount' ? parseFloat(value) || 0 : value }
          : item
      )
    );
  };

  const handleSave = () => {
    localIncomes.forEach(({ id, label, amount }) => {
      updateIncome(id, label, amount);
    });
    // Removed alert confirmation
  };

  if (loading) return <p>Loading incomes...</p>;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Income Sources</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {localIncomes.map(({ id, label, amount }) => (
          <li key={id} style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              value={label}
              onChange={(e) => handleInputChange(id, 'label', e.target.value)}
              style={{ marginRight: '1rem', width: '150px' }}
            />
            <input
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => handleInputChange(id, 'amount', e.target.value)}
              style={{ width: '100px' }}
            />
          </li>
        ))}
      </ul>

      <p>
        <strong>Total Income: £{totalIncome.toFixed(2)}</strong>
      </p>

      <button onClick={handleSave}>Save Income Data</button>
    </main>
  );
}
