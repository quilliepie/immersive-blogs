import showdown from 'showdown';

export function parseMarkdown(markdown: string): string {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    emoji: true,
  });

  const html = converter.makeHtml(markdown);
  return html;
}
