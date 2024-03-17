import Image from 'next/image';
import CreateSequential from './components/Sequential';
import Header from './components/Header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <CreateSequential />
      </main>
    </>
  );
}
