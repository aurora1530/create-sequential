export default function Header() {
  return (
    <div className="bg-blue-500 flex justify-between items-center p-4">
      <h1 className="text-white font-bold">連番作成くん</h1>
      <a
        href="https://github.com/aurora1530/create-sequential"
        className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </div>
  );
}
