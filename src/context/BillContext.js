'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BillContext = createContext();

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

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed) {
          // Load income items if present and valid
          if (Array.isArray(parsed.incomeItems) && parsed.incomeItems.length === 4) {
            setIncomeItems(parsed.incomeItems);
          }
          // Load bills if present, fallback to default structure for safety
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
      console.error('Failed to load data from localStorage:', err);
    }
    setLoading(false);
  }, []);

  // Save all data (income + bills) to localStorage
  const saveAll = (newIncomeItems = incomeItems, newBills = bills) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ incomeItems: newIncomeItems, bills: newBills })
    );
  };

  function updateIncome(id, label, amount) {
    setIncomeItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, label, amount: parseFloat(amount) || 0 } : item
      );
      saveAll(updated, bills);
      return updated;
    });
  }

  function addBill(category, label, amount) {
    if (!bills[category]) {
      console.warn(`Category "${category}" not found in bills`);
      return;
    }
    setBills((prev) => {
      const updatedCategory = [...prev[category], { label, amount: parseFloat(amount) || 0 }];
      const updatedBills = { ...prev, [category]: updatedCategory };
      saveAll(incomeItems, updatedBills);
      return updatedBills;
    });
  }

  function resetToDefault() {
    setIncomeItems(DEFAULT_INCOMES);
    setBills(DEFAULT_BILLS);
    saveAll(DEFAULT_INCOMES, DEFAULT_BILLS);
  }

  return (
    <BillContext.Provider
      value={{
        incomeItems,
        updateIncome,
        addBill,
        bills,
        resetToDefault,
        loading,
      }}
    >
      {children}
    </BillContext.Provider>
  );
}

export const useBills = () => useContext(BillContext);
