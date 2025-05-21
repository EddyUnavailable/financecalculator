'use client';

import { useState, useEffect } from 'react';
import { useBills } from '@/context/BillContext';
import styles from "@/styles/page.module.css";

export default function CarPage() {
  const { addBill, bills } = useBills();

  const labels = ['tax', 'insurance', 'diesel', 'maintenance', 'other'];

  // Convert current bills into a quick lookup
  const billsMap = bills.car.reduce((acc, bill) => {
    acc[bill.label] = bill.amount;
    return acc;
  }, {});

  const [form, setForm] = useState(() =>
    labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {})
  );

  // Sync form fields when bills are updated
  useEffect(() => {
    const updatedForm = labels.reduce((acc, label) => {
      acc[label] = billsMap[label]?.toFixed(2) || '0.00';
      return acc;
    }, {});
    setForm(updatedForm);
  }, [bills.car]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Allow only valid number format with max 2 decimal places
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Object.entries(form).forEach(([label, value]) => {
      const amount = parseFloat(value);
      addBill('car', label, isNaN(amount) ? 0 : amount);
    });
  };

  const total = Object.values(form).reduce((sum, value) => {
    const num = parseFloat(value);
    return sum + (isNaN(num) ? 0 : num);
  }, 0);

  const formatLabel = (label) => {
    const map = {
      tax: 'Tax',
      insurance: 'Insurance',
      diesel: 'Diesel',
      maintenance: 'Maintenance',
      other: 'Other'
    };
    return map[label] || label;
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Car Expenses</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
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
            />
          </div>
        ))}
        <button className={styles.button} type="submit">Update</button>
      </form>

      <h3 className={styles.total}>Total Car Costs: £{total.toFixed(2)}</h3>
    </main>
  );
}
