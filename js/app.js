:root {
  --bg: #08111f;
  --bg-2: #0f1a2b;
  --panel: rgba(14, 24, 41, 0.96);
  --panel-2: #12213a;
  --line: rgba(255, 255, 255, 0.08);
  --line-strong: rgba(255, 255, 255, 0.14);
  --text: #e9eef8;
  --muted: #98a6bf;
  --primary: #4ea8ff;
  --primary-2: #1f6feb;
  --shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  --radius: 22px;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background:
    radial-gradient(circle at top right, rgba(78, 168, 255, 0.14), transparent 28%),
    linear-gradient(180deg, #07101d 0%, #0a1526 100%);
  color: var(--text);
  font-family: Inter, "Segoe UI", Arial, sans-serif;
}

button,
input,
select,
textarea {
  font: inherit;
}

.app-shell {
  width: min(1800px, calc(100% - 24px));
  margin: 16px auto 30px;
}

.hero,
.card {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
}

.hero {
  padding: 24px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--primary);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 12px;
  font-weight: 700;
}

.hero h1 {
  margin: 0;
  font-size: clamp(26px, 4vw, 40px);
}

.hero-text {
  max-width: 760px;
  color: var(--muted);
  margin: 12px 0 0;
  line-height: 1.6;
}

.hero-badge {
  min-width: 250px;
  padding: 20px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(78, 168, 255, 0.18), rgba(31, 111, 235, 0.08));
  border: 1px solid rgba(78, 168, 255, 0.22);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.hero-badge span,
.hero-badge small,
.section-header p,
.preview-box small,
label span,
.hint {
  color: var(--muted);
}

.hero-badge strong {
  font-size: 34px;
}

.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}

.card {
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.section-header.compact {
  margin-bottom: 16px;
}

.section-header h2 {
  margin: 0 0 6px;
  font-size: 22px;
}

.section-header p {
  margin: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

input {
  width: 100%;
  padding: 13px 14px;
  border-radius: 14px;
  border: 1px solid var(--line-strong);
  background: #0b1729;
  color: var(--text);
  outline: none;
  transition: 0.2s ease;
}

input:focus {
  border-color: rgba(78, 168, 255, 0.8);
  box-shadow: 0 0 0 4px rgba(78, 168, 255, 0.14);
}

.full-width {
  grid-column: 1 / -1;
}

.preview-box {
  background: linear-gradient(180deg, rgba(78, 168, 255, 0.08), rgba(255, 255, 255, 0.02));
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.preview-box strong {
  display: block;
  margin-top: 6px;
  font-size: 24px;
}

.form-actions,
.toolbar {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: end;
}

button {
  border: 0;
  cursor: pointer;
  border-radius: 14px;
  padding: 12px 16px;
  font-weight: 700;
  transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
}

button:hover {
  transform: translateY(-1px);
}

.primary-btn {
  background: linear-gradient(180deg, var(--primary), var(--primary-2));
  color: white;
  box-shadow: 0 12px 24px rgba(31, 111, 235, 0.28);
}

.secondary-btn,
.ghost-btn {
  background: #16243d;
  color: var(--text);
  border: 1px solid var(--line);
}

.ghost-btn {
  background: transparent;
}

.danger-btn {
  background: rgba(255, 107, 107, 0.12);
  color: #ffc9c9;
  border: 1px solid rgba(255, 107, 107, 0.22);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.stat-box {
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
}

.stat-box span {
  color: var(--muted);
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
}

.stat-box strong {
  font-size: 28px;
}

.stat-box.positive {
  border-color: rgba(57, 217, 138, 0.22);
}

.stat-box.negative {
  border-color: rgba(255, 107, 107, 0.22);
}

.stat-box.highlight {
  background: linear-gradient(180deg, rgba(78, 168, 255, 0.16), rgba(31, 111, 235, 0.06));
  border-color: rgba(78, 168, 255, 0.24);
}

.table-wrapper {
  overflow: auto;
  border: 1px solid var(--line);
  border-radius: 18px;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1850px;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
  white-space: nowrap;
}

th {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.02);
}

tbody tr:hover {
  background: rgba(255, 255, 255, 0.02);
}

.status-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 88px;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 800;
}

.status-badge.credito {
  background: rgba(57, 217, 138, 0.14);
  color: #8af0b9;
}

.status-badge.debito {
  background: rgba(255, 107, 107, 0.14);
  color: #ffc0c0;
}

.status-badge.zerado {
  background: rgba(255, 207, 90, 0.12);
  color: #ffe08a;
}

.row-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.row-actions button {
  padding: 9px 12px;
  border-radius: 12px;
  font-size: 13px;
}

.empty-state {
  text-align: center;
  color: var(--muted);
  padding: 26px 12px;
}

.text-positive {
  color: #8af0b9;
}

.text-negative {
  color: #ffb1b1;
}

.text-warning {
  color: #ffe08a;
}

.print-area {
  display: none;
}

@media (max-width: 1200px) {
  .form-grid,
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .hero {
    flex-direction: column;
  }

  .form-grid,
  .preview-box,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .toolbar,
  .section-header {
    flex-direction: column;
    align-items: stretch;
  }

  .app-shell {
    width: min(100% - 12px, 1800px);
    margin-top: 10px;
  }

  .card,
  .hero {
    padding: 16px;
    border-radius: 18px;
  }
}

@media print {
  @page {
    size: A4 landscape;
    margin: 10mm;
  }

  html,
  body {
    background: #ffffff !important;
    color: #111827 !important;
    font-family: Arial, Helvetica, sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .no-print {
    display: none !important;
  }

  .print-area {
    display: block !important;
    width: 100%;
    color: #111827;
  }

  .print-document {
    width: 100%;
  }

  .print-header,
  .print-summary-section,
  .print-info-grid-wrap,
  .print-footer {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .print-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 18px;
    padding: 0 0 12px;
    border-bottom: 2px solid #1d4ed8;
    margin-bottom: 14px;
  }

  .print-brand {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }

  .print-brand-mark {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: #1d4ed8;
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex: 0 0 44px;
  }

  .print-header h1 {
    margin: 0;
    font-size: 20px;
    line-height: 1.2;
    color: #0f172a;
  }

  .print-header p {
    margin: 4px 0 0;
    font-size: 11px;
    color: #475569;
  }

  .print-subtitle {
    font-weight: 700;
    color: #1e293b;
  }

  .print-header-meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: 8px;
    min-width: 220px;
  }

  .print-meta-box {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px 10px;
    background: #f8fafc;
  }

  .print-meta-box span {
    display: block;
    font-size: 10px;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 3px;
    letter-spacing: 0.05em;
  }

  .print-meta-box strong {
    font-size: 12px;
    color: #0f172a;
  }

  .print-section-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    font-weight: 700;
    color: #1e3a8a;
    margin-bottom: 8px;
  }

  .print-summary-section,
  .print-info-grid-wrap,
  .print-table-section {
    margin-bottom: 12px;
  }

  .print-resumo {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .print-kpi {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px 10px;
    background: #f8fafc;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .print-kpi span {
    display: block;
    font-size: 10px;
    color: #64748b;
    margin-bottom: 3px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .print-kpi strong {
    display: block;
    font-size: 13px;
    color: #0f172a;
    line-height: 1.25;
  }

  .print-info-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .print-info-item {
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 8px 10px;
    background: #ffffff;
  }

  .print-info-item span {
    display: block;
    font-size: 10px;
    color: #64748b;
    text-transform: uppercase;
    margin-bottom: 3px;
  }

  .print-info-item strong {
    display: block;
    font-size: 12px;
    color: #111827;
    line-height: 1.25;
  }

  .print-table-section {
    break-inside: auto;
    page-break-inside: auto;
  }

  .print-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 9.5px;
  }

  .print-table thead {
    display: table-header-group;
  }

  .print-table tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .print-table th,
  .print-table td {
    border: 1px solid #cbd5e1;
    padding: 6px 7px;
    vertical-align: top;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  .print-table th {
    background: #e2e8f0 !important;
    color: #0f172a !important;
    font-weight: 700;
    text-align: left;
  }

  .print-table tbody tr:nth-child(even) td {
    background: #f8fafc;
  }

  .print-footer {
    margin-top: 14px;
    break-inside: avoid;
    page-break-inside: avoid;
  }

  .print-signatures {
    display: flex;
    justify-content: space-between;
    gap: 24px;
    margin-top: 18px;
  }

  .signature-box {
    width: 48%;
    text-align: center;
  }

  .signature-line {
    border-top: 1px solid #334155;
    height: 24px;
    margin-bottom: 6px;
  }

  .signature-box p {
    margin: 0;
    font-size: 11px;
    color: #334155;
  }

  .print-footer-note {
    margin-top: 10px;
    font-size: 10px;
    color: #64748b;
    text-align: center;
  }
}
