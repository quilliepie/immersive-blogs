import fs from 'fs';
import { BlogData } from '@/app/types';

/**
 * Interpret JSON data & return attributes.
 *
 * @param filePath: The path for the .json file to be parsed.
 * @returns "BlogData," though "any" is used in case of error.
 */
export function parseBlogData(filePath: string): any {
  try {
    const jsonString = fs.readFileSync(filePath, 'utf-8');
    const data: BlogData = JSON.parse(jsonString);
    return data;
  } catch (err) {
    console.error('Error reading file:', err);
    return null;
  }
}
