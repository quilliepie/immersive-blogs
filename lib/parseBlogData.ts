import fs from 'fs';
import { BlogData } from '@/app/types';

/**
 * Interpret JSON data & return attributes.
 *
 * @param filePath: The path for the .json file to be parsed.
 * @returns "BlogData," though "any" is used in case of error.
 */
export function parseBlogData(filePath: string): any {
  fs.readFile(filePath, 'utf-8', (err, jsonString: string) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
    const data: BlogData = JSON.parse(jsonString);
    console.log('Parsed JSON Data:');
    console.log(data);

    return data;
  });
}
