import { useCallback, useEffect, useState } from "react";
import { api } from "../lib/api";
import { exportCSV, exportExcel } from "../lib/exportUtils";
import EnquiryFilters from "../components/enquiries/EnquiryFilters";
import EnquiryTable from "../components/enquiries/EnquiryTable";
import Pagination from "../components/enquiries/Pagination";
import EnquiryDetailModal from "../components/enquiries/EnquiryDetailModal";
import EnquiryMessageModal from "../components/enquiries/EnquiryMessageModal";

const DEFAULT_FILTERS = { search: "", status: "", source: "", archived: "false", page: 1, limit: 20 };

export default function Enquiries() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [data, setData] = useState({ items: [], total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [messageEnquiry, setMessageEnquiry] = useState(null);
  const [exporting, setExporting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = useCallback(() => {
    setLoading(true);
    api
      .listEnquiries(filters)
      .then((res) => {
        setData(res);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    // Debounce search typing slightly; other filter changes apply immediately.
    const t = setTimeout(load, filters.search ? 350 : 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  function refreshSelected(updated) {
    setSelected(updated);
    setData((d) => ({ ...d, items: d.items.map((it) => (it._id === updated._id ? updated : it)) }));
  }

  function handleView(enquiry) {
    setSelected(enquiry);
  }

  function handleViewMessage(enquiry) {
    setMessageEnquiry(enquiry);
  }

  async function handleStatusChange(enquiry, status) {
    const { enquiry: updated } = await api.updateEnquiry(enquiry._id, { status });
    setData((d) => ({ ...d, items: d.items.map((it) => (it._id === updated._id ? updated : it)) }));
  }

  async function handleUpdate(enquiry, patch) {
    const { enquiry: updated } = await api.updateEnquiry(enquiry._id, patch);
    refreshSelected(updated);
  }

  async function handleAddNote(enquiry, text) {
    const { enquiry: updated } = await api.addNote(enquiry._id, text);
    refreshSelected(updated);
  }

  async function handleArchiveToggle(enquiry) {
    const { enquiry: updated } = await api.updateEnquiry(enquiry._id, { archived: !enquiry.archived });
    if (selected?._id === updated._id) setSelected(updated);
    load();
  }

  function handleDelete(enquiry) {
    setDeleteTarget(enquiry);
  }
  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      await api.deleteEnquiry(deleteTarget._id);

      if (selected?._id === deleteTarget._id) {
        setSelected(null);
      }

      setDeleteTarget(null);
      load();
    } catch (err) {
      setError(err.message || "Failed to delete enquiry.");
    } finally {
      setDeleting(false);
    }
  }

  async function fetchAllMatching() {
    setExporting(true);
    try {
      const res = await api.listEnquiries({ ...filters, page: 1, limit: 1000 });
      return res.items;
    } finally {
      setExporting(false);
    }
  }

  return (
    <>
      <EnquiryFilters
        filters={filters}
        onChange={setFilters}
        exporting={exporting}
        onExportCSV={async () => exportCSV(await fetchAllMatching())}
        onExportExcel={async () => exportExcel(await fetchAllMatching())}
      />

      {error && <div className="login-error">{error}</div>}

      <EnquiryTable
        items={data.items}
        loading={loading}
        onStatusChange={handleStatusChange}
        onView={handleView}
        onViewMessage={handleViewMessage}
        onArchiveToggle={handleArchiveToggle}
        onDelete={handleDelete}
      />

      {!loading && data.items.length > 0 && (
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          total={data.total}
          onChange={(page) => setFilters((f) => ({ ...f, page }))}
        />
      )}

      {selected && (
        <EnquiryDetailModal
          enquiry={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleUpdate}
          onAddNote={handleAddNote}
          onArchiveToggle={handleArchiveToggle}
          onDelete={handleDelete}
        />
      )}

      {messageEnquiry && (
        <EnquiryMessageModal
          enquiry={messageEnquiry}
          onClose={() => setMessageEnquiry(null)}
        />
      )}

      {deleteTarget && (
        <div
          className="delete-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !deleting) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            className="delete-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-enquiry-title"
          >
            <div className="delete-modal__icon">
              !
            </div>

            <h2 id="delete-enquiry-title">
              Delete enquiry?
            </h2>

            <p>
              Are you sure you want to delete the enquiry from{" "}
              <strong>{deleteTarget.name}</strong>?
              <br />
              This action cannot be undone.
            </p>

            <div className="delete-modal__actions">
              <button
                type="button"
                className="btn btn--ghost"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
              >
                Discard
              </button>

              <button
                type="button"
                className="btn btn--danger"
                disabled={deleting}
                onClick={confirmDelete}
              >
                {deleting ? "Deleting…" : "Confirm delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}