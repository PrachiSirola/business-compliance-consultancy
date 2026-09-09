export default function Pagination({ page, totalPages, total, onChange }) {
  return (
    <div className="pagination">
      <span>{total} total</span>
      <button className="btn btn--ghost btn--sm" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button className="btn btn--ghost btn--sm" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
