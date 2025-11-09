import showdown from 'showdown';

/**
 *
 * @param markdown: The markdown file as a string to be parsed.
 * @returns "string" to be used for HTML.
 */
export function parseMarkdown(markdown: string): string {
  const converter = new showdown.Converter({
    tables: true,
    strikethrough: true,
    emoji: true,
  });

  const html = converter.makeHtml(markdown);
  return html;
}
