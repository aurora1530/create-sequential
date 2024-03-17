import { useState } from 'react';

export default function CopyButton({ text }: { text: string }) {
  const [copyButtonText, setCopyButtonText] = useState('COPY');
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyButtonText('COPIED!');
      setTimeout(() => {
        setCopyButtonText('COPY');
      }, 1000);
    });
  };
  return (
    <button
      onClick={handleCopy}
      className="w-full text-center border-0 py-1 px-3 bg-blue-200 focus:outline-none hover:bg-blue-300 rounded text-base mt-4 mb-1"
    >
      {copyButtonText}
    </button>
  );
}
