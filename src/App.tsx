import LibrosPage from "./pages/LibrosPage";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Biblioteca</h1>
        <LibrosPage />
      </div>
    </main>
  );
}
