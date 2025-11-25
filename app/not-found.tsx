import Link from 'next/link';
import { Button } from './components/button';
import { HiArrowNarrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold text-[#FF6B7A]">404</h1>
      <h2 className="text-3xl font-medium text-gray-400 mb-4">
        Página não encontrada
      </h2>
      <Link href="/">
        <Button className="bg-transparent border border-[#aeaeae] text-[#ffffff] hover:bg-[#FF4858] hover:text-white">
          <HiArrowNarrowLeft size={20} />
          Voltar para Home
        </Button>
      </Link>
    </div>
  );
}
