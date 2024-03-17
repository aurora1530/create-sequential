'use client';
import { useState, useEffect, useRef } from 'react';
import { createSequentialTexts } from '@/app/lib/createSequential';
import CopyButton from './CopyButton';

export default function CreateSequential() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>('');
  const [start, setStart] = useState<number>(1);
  const [stop, setStop] = useState<number>(5);
  const [step, setStep] = useState<number>(1);
  const [lineBreak, setLineBreak] = useState<string>('\n');
  const [formatted, setFormatted] = useState<string>('');

  const handleLineBreakChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLineBreak(
      e.target.value === 'LF' ? '\n' : e.target.value === 'CR' ? '\r' : '\r\n'
    );
  };

  useEffect(() => {
    const serialNumbers = createSequentialTexts(text, { start, stop, step });
    setFormatted(serialNumbers.join('\n'));
  }, [text, start, stop, step, lineBreak]);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [formatted]);

  return (
    <>
      <label htmlFor="text" className="block">
        Text(%dが数字に置き換わります。複数含めることもできます。)
      </label>
      <div>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
            e.target.style.height = 'auto';
            e.target.style.height = e.target.scrollHeight + 'px';
          }}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="start" className="block mt-4">
          Start
        </label>
        <input
          type="number"
          name="start"
          id="start"
          value={start}
          onChange={(e) => setStart(Number(e.target.value))}
          className="flex-shrink p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="stop" className="block mt-4">
          Stop
        </label>
        <input
          type="number"
          name="stop"
          id="stop"
          value={stop}
          onChange={(e) => setStop(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="step" className="block mt-4">
          Step
        </label>
        <input
          type="number"
          name="step"
          id="step"
          step={1}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
          className="p-2 border border-gray-300 rounded-md"
        />
        <label htmlFor="lineBreak" className="block mt-4">
          改行コード
        </label>
        <select
          onChange={handleLineBreakChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="LF">LF</option>
          <option value="CR">CR</option>
          <option value="CRLF">CRLF</option>
        </select>
      </div>
      <CopyButton text={formatted} />
      <textarea
        ref={textAreaRef}
        readOnly
        value={formatted}
        onChange={(e) => {
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }}
        className="mt-4 p-2 border border-gray-300 rounded-md w-full"
      />
    </>
  );
}
