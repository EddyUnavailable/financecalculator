'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './globals.css';
import { BillProvider } from '@/context/BillContext';
import styles from "@/styles/layout.module.css";

// export const metadata = {
//   title: 'Finance Calculator',
//   description: 'Tools to help you manage your money',
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const navItems = [
    { href: '/budget/income', icon: 'attach_money.png', alt: 'Income' },
    { href: '/budget/home', icon: 'home2.png', alt: 'Home' },
    { href: '/budget/car', icon: 'directions_car.png', alt: 'Car' },
    { href: '/budget/phone', icon: 'phone.png', alt: 'Phone' },
    { href: '/budget/debt', icon: 'credit_card.png', alt: 'Debt' },
    { href: '/budget/summary', icon: 'account_box.png', alt: 'Summary' },
  ];

  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.navBar}>
          <div className={styles.navContents}>
            {navItems.map(({ href, icon, alt }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.active : ''}`}
              >
                <img src={`/${icon}`} alt={alt} className={styles.icon} />
              </Link>
            ))}
          </div>
        </nav>

        <div className={styles.main}>
          <BillProvider>
            {children}
          </BillProvider>
        </div>
      </body>
    </html>
  );
}
