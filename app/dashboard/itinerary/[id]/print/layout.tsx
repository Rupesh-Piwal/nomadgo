/**
 * Print Layout — Strips ALL dashboard chrome (sidebar, navbar, etc.)
 * This layout renders ONLY the editorial PDF content.
 * Puppeteer navigates to this route, so it must be completely standalone.
 */
export default function PrintLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="print-layout">
      {children}
    </div>
  );
}
