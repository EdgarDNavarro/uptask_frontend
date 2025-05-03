import { useGlobalLoader } from "@/store/useGlobalLoader";


export function GlobalLoader() {
  const loading = useGlobalLoader((state) => state.loading);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="spinner border-t-4 border-white w-12 h-12 rounded-full animate-spin" />
    </div>
  );
}