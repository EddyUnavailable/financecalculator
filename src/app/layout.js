import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Finance Calculator',
  description: 'Tools to help you manage your money',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <nav className="bg-gray-100 p-4 mb-4">
          <Link href="/" className="mr-4">Home</Link>
          <Link href="/loan-calculator">Loan Calculator</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
