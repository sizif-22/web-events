import * as XLSX from "xlsx";

function formatTimestamp({ seconds, nanoseconds }) {
  const date = new Date(seconds * 1000); // Convert seconds to milliseconds

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds_part = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds_part}`;
}

const exportToExcel = (form, data, fileName) => {
  // console.log(data);
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Extract field names from the form array
  const fields = [...form.map((field) => field.text), "joinedAt"];

  // Prepare the data for export
  const exportData = [fields]; // Add headers as the first row

  Object.values(data).forEach((item) => {
    const row = fields.map((field, index) => {
      if (field == "joinedAt") {
        return formatTimestamp(item["joinedAt"]);
      } else {
        return item[index];
      }
    });

    exportData.push(row);
  });

  // Convert the array to a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(exportData);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate a buffer to export the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;

  // Append the link to the document and trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link after download
  document.body.removeChild(link);
};
export { exportToExcel };
