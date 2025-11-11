import { HtmlPreviewData } from '@/app/types';
import * as cheerio from 'cheerio';

/**
 *
 * @param html: The HTML data as a string to search through.
 */
export function getHtmlPreview(html: string): HtmlPreviewData {
  const $ = cheerio.load(html);
  const title = $('h1').first().text() || 'Untitled Title (^:';
  const previewText =
    $('p')
      .filter((index, element) => $(element).text().trim().length > 0)
      .first()
      .text()
      .trim() || 'No preview text.';

  let firstImageSource = $('img').first().attr('src') || 'default-thumbnail.jpg';
  while (firstImageSource.startsWith('../'))
    firstImageSource = firstImageSource.slice('../'.length);
  if (firstImageSource.startsWith('public'))
    firstImageSource = firstImageSource.slice('public/'.length);
  if (!firstImageSource.startsWith('/')) firstImageSource = '/' + firstImageSource;

  return {
    title: title,
    previewText: previewText,
    firstImageSource: firstImageSource,
  };
}
