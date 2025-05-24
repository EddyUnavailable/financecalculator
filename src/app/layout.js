import Link from 'next/link';
import './globals.css';
import { BillProvider } from '@/context/BillContext';
import styles from "@/styles/layout.module.css";

export const metadata = {
  title: 'Finance Calculator',
  description: 'Tools to help you manage your money',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <nav className={styles.navBar}>
          <div className={styles.navContents}>
            <Link href="/budget/income" className={styles.link}><img src="/attach_money.png" alt="Home" className={styles.icon} /></Link>
            <Link href="/budget/home" className={styles.link}><img src="/home2.png" alt="Home" className={styles.icon} /></Link>
            <Link href="/budget/car" className={styles.link}><img src="/directions_car.png" alt="Home" className={styles.icon} /></Link>
            <Link href="/budget/phone" className={styles.link}><img src="/phone.png" alt="Home" className={styles.icon} /></Link>
            <Link href="/budget/debt" className={styles.link}><img src="/credit_card.png" alt="Home" className={styles.icon} /></Link>
            <Link href="/budget/summary" className={styles.link}><img src="/account_box.png" alt="Home" className={styles.icon} /></Link>
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
