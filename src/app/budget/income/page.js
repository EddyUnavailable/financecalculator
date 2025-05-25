'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';
import styles from '@/styles/page.module.css';

export default function IncomePage() {
  const { incomeItems, updateIncome, loading } = useBills();
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className={styles.form}
      >
        <h1 className={styles.title}>Income Sources</h1>

        {localIncomes.map(({ id, label, amount }) => (
          <div key={id} className={styles.field}>
            <input
              className={styles.label}
              type="text"
              value={label}
              onChange={(e) => handleInputChange(id, 'label', e.target.value)}
              placeholder="Label"
              disabled={loading}
            />
            <input
              className={styles.input}
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => handleInputChange(id, 'amount', e.target.value)}
              inputMode="decimal"
              disabled={loading}
            />
          </div>
        ))}

        <div className={styles.sticky}>
          <button
            type="submit"
            className={styles.button}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>

          <h3 className={styles.total}>
            Total: £{totalIncome.toFixed(2)}
          </h3>
        </div>
      </form>
    </main>
  );
}
