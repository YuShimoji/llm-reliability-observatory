function renderBlock(block: string, index: number) {
  const lines = block.split(/\r?\n/);
  const isList = lines.every((line) => line.startsWith("- "));

  if (isList) {
    return (
      <ul key={index} className="list-disc space-y-2 pl-5">
        {lines.map((line) => (
          <li key={line}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="whitespace-pre-line">
      {block}
    </p>
  );
}

export function MarkdownBody({ source }: { source: string }) {
  const blocks = source
    .trim()
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) {
    return <p>TODO</p>;
  }

  return <div className="space-y-4 text-base leading-8 text-smoke">{blocks.map(renderBlock)}</div>;
}
