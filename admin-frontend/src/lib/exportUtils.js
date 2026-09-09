import * as XLSX from "xlsx";

function toRows(enquiries) {
  return enquiries.map((e) => ({
    Name: e.name,
    Email: e.email,
    Phone: e.phone,
    Source: e.source,
    Service: e.service,
    "Preferred Time": e.preferredTime,
    Rating: e.rating,
    Message: e.message,
    Status: e.status,
    "Assigned To": e.assignedTo,
    Archived: e.archived ? "Yes" : "No",
    "Created At": e.createdAt ? new Date(e.createdAt).toLocaleString() : "",
  }));
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function exportCSV(enquiries, filename = "suits-enquiries.csv") {
  const ws = XLSX.utils.json_to_sheet(toRows(enquiries));
  const csv = XLSX.utils.sheet_to_csv(ws);
  download(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportExcel(enquiries, filename = "suits-enquiries.xlsx") {
  const ws = XLSX.utils.json_to_sheet(toRows(enquiries));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Enquiries");
  const buf = XLSX.write(wb, { type: "array", bookType: "xlsx" });
  download(new Blob([buf], { type: "application/octet-stream" }), filename);
}
