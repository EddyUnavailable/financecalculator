'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';
import styles from '@/styles/page.module.css';

export default function PhonePage() {
  const { setBill, bills, loading } = useBills();

  const labels = ['mobile1', 'mobile2', 'internet'];

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
      setBill('phone', label, isNaN(amount) ? 0 : amount);
    });
  };

  const total = Object.values(form).reduce((sum, val) => {
    const amount = parseFloat(val);
    return sum + (isNaN(amount) ? 0 : amount);
  }, 0);

  const formatLabel = (label) =>
    label.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\d/, ' $&');

  if (loading) return <p className={styles.loading}>Loading phone & internet data...</p>;

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Phone & Internet</h1>
        {labels.map((field) => (
          <div key={field} className={styles.field}>
            <label className={styles.label}>{formatLabel(field)}:</label>
            <input
              className={styles.input}
              type="number"
              step="0.01"
              min="0"
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              inputMode="decimal"
              disabled={loading}
            />
          </div>
        ))}
        <div className={styles.sticky}>
          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
          <h3 className={styles.total}>Total: £{total.toFixed(2)}</h3>
        </div>
      </form>
    </main>
  );
}
