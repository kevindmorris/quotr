import Quote from "./Quote";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 pt-10 font-sans">
      <div className="mx-auto w-full max-w-screen-lg px-4 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">🧠 Quotr</h1>
        <Quote />
      </div>
    </div>
  );
}
