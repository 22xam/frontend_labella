export default function PaginationControls({ page, totalPages, onPageChange }) {
  return (
    <div className="mt-4 flex items-center justify-end gap-2">
      <button
        type="button"
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Anterior
      </button>
      <span className="text-sm text-neutral-300">
        Página {page} de {totalPages}
      </span>
      <button
        type="button"
        className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente
      </button>
    </div>
  );
}
