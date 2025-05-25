'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BillContext = createContext(null);
const STORAGE_KEY = 'budget-data';

const DEFAULT_INCOMES = [
  { id: 1, label: 'Income 1', amount: 0 },
  { id: 2, label: 'Income 2', amount: 0 },
  { id: 3, label: 'Income 3', amount: 0 },
  { id: 4, label: 'Income 4', amount: 0 },
];

const DEFAULT_BILLS = {
  home: [],
  car: [],
  phone: [],
  debt: [],
};

export function BillProvider({ children }) {
  const [incomeItems, setIncomeItems] = useState(DEFAULT_INCOMES);
  const [bills, setBills] = useState(DEFAULT_BILLS);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          if (Array.isArray(parsed.incomeItems)) {
            setIncomeItems(parsed.incomeItems);
          }
          if (parsed.bills && typeof parsed.bills === 'object') {
            setBills({
              home: Array.isArray(parsed.bills.home) ? parsed.bills.home : [],
              car: Array.isArray(parsed.bills.car) ? parsed.bills.car : [],
              phone: Array.isArray(parsed.bills.phone) ? parsed.bills.phone : [],
              debt: Array.isArray(parsed.bills.debt) ? parsed.bills.debt : [],
            });
          }
        }
      }
    } catch (err) {
      console.error('Failed to load from localStorage:', err);
    }
    setLoading(false);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!loading) {
      const dataToStore = JSON.stringify({ incomeItems, bills });
      localStorage.setItem(STORAGE_KEY, dataToStore);
      console.log('✅ Saved to localStorage:', dataToStore);
    }
  }, [incomeItems, bills, loading]);

  // Update an income item
  function updateIncome(id, label, amount) {
    setIncomeItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, label, amount: parseFloat(amount) || 0 }
          : item
      )
    );
  }

  // Add or update a single bill entry
  function setBill(category, label, amount) {
    setBills((prev) => {
      const items = prev[category] || [];
      const index = items.findIndex((item) => item.label === label);
      let updated;

      if (index >= 0) {
        updated = items.map((item) =>
          item.label === label ? { ...item, amount: parseFloat(amount) || 0 } : item
        );
      } else {
        updated = [...items, { label, amount: parseFloat(amount) || 0 }];
      }

      return { ...prev, [category]: updated };
    });
  }

  // Set initial default bills ONCE for a page
  function setInitialBills(category, items) {
    setBills((prev) => {
      const existingLabels = new Set((prev[category] || []).map((item) => item.label));
      const isSameLength = (prev[category] || []).length === items.length;
      const hasSameLabels = items.every((item) => existingLabels.has(item.label));

      if (isSameLength && hasSameLabels) return prev; // Prevent overwriting duplicates

      return { ...prev, [category]: items };
    });
  }

  // Reset everything
  function resetToDefault() {
    setIncomeItems(DEFAULT_INCOMES);
    setBills(DEFAULT_BILLS);
  }

  return (
    <BillContext.Provider
      value={{
        incomeItems,
        updateIncome,
        bills,
        setBill,
        setInitialBills,
        resetToDefault,
        loading,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

export const useBills = () => {
  const context = useContext(BillContext);
  if (!context) {
    throw new Error('useBills must be used within a BillProvider');
  }
  return context;
};
