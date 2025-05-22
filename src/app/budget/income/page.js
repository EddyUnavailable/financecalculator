'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';
import styles from '@/styles/page.module.css'; // ✅ Use shared styles

export default function IncomePage() {
  const { incomeItems, updateIncome, saveIncomeTotals, loading } = useBills();
  const [localIncomes, setLocalIncomes] = useState([]);

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
  };

  if (loading) return <p className={styles.loading}>Loading incomes...</p>;

  return (
    <main className={styles.main}>
      <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className={styles.form}>
        <h1 className={styles.title}>Income Sources</h1>

        <ul className={styles.incomeList}>
          {localIncomes.map(({ id, label, amount }) => (
            <li key={id} className={styles.field}>
              <input
                className={styles.input}
                type="text"
                value={label}
                onChange={(e) => handleInputChange(id, 'label', e.target.value)}
                placeholder="Label"
              />
              <input
                className={styles.input}
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => handleInputChange(id, 'amount', e.target.value)}
                inputMode="decimal"
              />
            </li>
          ))}
        </ul>

        <button type="submit" className={styles.button}>
          Save Income Data
        </button>

        <h3 className={styles.total}>
          Total Income: £{totalIncome.toFixed(2)}
        </h3>
      </form>
    </main>
  );
}
