/** Renders `**bold**` spans in CV text (see data/cv.ts). */
export function RichText({ text, boldClassName }: { text: string; boldClassName?: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) =>
    i % 2 ? (
      <strong key={i} className={boldClassName}>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}
