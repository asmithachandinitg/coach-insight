
export function exportToCSV<T extends Record<string, unknown>>(
    data: T[],
    filename: string,
    columns?: { key: keyof T; label: string }[]
) {
    if (data.length === 0) return;

    const cols = columns ?? Object.keys(data[0]).map((key) => ({ key: key as keyof T, label: key }));

    const header = cols.map((c) => `"${c.label}"`).join(",");

    const rows = data.map((row) =>
        cols
            .map((c) => {
                const value = row[c.key];
                const stringValue = value === null || value === undefined ? "" : String(value);
                // escape embedded quotes
                return `"${stringValue.replace(/"/g, '""')}"`;
            })
            .join(",")
    );

    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
