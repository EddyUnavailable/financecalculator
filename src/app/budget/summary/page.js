'use client';

import { useBills } from '@/context/BillContext';

export default function SummaryPage() {
  const { bills, incomeItems } = useBills();

  // Calculate income total from incomeItems
  const incomeTotal = incomeItems.reduce((sum, item) => sum + item.amount, 0);

  // Compute totals for all categories except income
  const categoryTotals = Object.entries(bills).reduce((acc, [category, items]) => {
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    acc[category] = total;
    return acc;
  }, {});

  const totalExpenses = Object.values(categoryTotals).reduce((sum, val) => sum + val, 0);
  const remaining = incomeTotal - totalExpenses;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Budget Summary</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Monthly Income</h2>
        <p><strong>£{incomeTotal.toFixed(2)}</strong></p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Expenses by Category</h2>
        <ul>
          {Object.entries(categoryTotals).map(([category, total]) => (
            <li key={category}>
              <strong>{category.charAt(0).toUpperCase() + category.slice(1)}:</strong> £{total.toFixed(2)}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Total Expenses</h2>
        <p><strong>£{totalExpenses.toFixed(2)}</strong></p>
      </section>

      <section>
        <h2>Remaining Balance</h2>
        <p style={{ color: remaining >= 0 ? 'green' : 'red' }}>
          <strong>£{remaining.toFixed(2)}</strong>
        </p>
      </section>
    </main>
  );
}
