'use client';
import { useState } from 'react';
import { createSequentialTexts } from '@/app/lib/createSequential';

export default function CreateSequential() {
  const [formatted, setFormatted] = useState<string>('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const serialNumbers = createSequentialTexts(value, { stop: 2 });
    console.log(serialNumbers);
    setFormatted(serialNumbers.join('\n'));
  };
  return (
    <>
      <input type="text" onChange={(e) => onChangeHandler(e)} />
      <textarea readOnly value={formatted} />
    </>
  );
}
