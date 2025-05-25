'use client';

import { useBills } from '@/context/BillContext';
import styles from '@/styles/summary.module.css'; // ✅ Shared styling

export default function SummaryPage() {
  const { bills, incomeItems } = useBills();

  const incomeTotal = incomeItems.reduce((sum, item) => sum + item.amount, 0);

  const categoryTotals = Object.entries(bills).reduce((acc, [category, items]) => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    acc[category] = total;
    return acc;
  }, {});

  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  const remaining = incomeTotal - totalExpenses;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainScreen}>
        <main className={styles.mainScreenInside}>
          <h1 className={styles.title}>Budget Summary</h1>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>Monthly Income</h2>
            <p className={styles.total}>£{incomeTotal.toFixed(2)}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>Expenses by Category</h2>
            <ul className={styles.list}>
              {Object.entries(categoryTotals).map(([category, total]) => (
                <li key={category} className={styles.listItem}>
                  <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> £{total.toFixed(2)}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>Total Expenses</h2>
            <p className={styles.total}>£{totalExpenses.toFixed(2)}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.subtitle}>Remaining Balance</h2>
            <p
              className={styles.total1}
              style={{ color: remaining >= 0 ? 'var(--green-1)' : 'red' }}
            >
              £{remaining.toFixed(2)}
            </p>
          </section>
        </main>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
}
