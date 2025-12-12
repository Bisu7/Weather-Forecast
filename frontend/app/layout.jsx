import './../styles/globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Weather Platform',
  description: 'Full-stack weather application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}

