import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/lib/parseMarkdown';
import * as cheerio from 'cheerio';

import Image from 'next/image';
import Footer from '@/components/Footer';

interface BlogPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

// ! Review all the code below; it is temporary.

export default async function BlogPage({ params }: BlogPageProps) {
  const { id } = await params; // unwrap the Promise

  const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');
  const folder = path.join(blogsDirectory, id);

  console.log('blogsDirectory:', blogsDirectory);
  console.log('folder path:', folder);

  if (!fs.existsSync(folder)) return <p>Blog not found.</p>;

  const markdownPath = path.join(folder, 'blog.md');
  const jsonPath = path.join(folder, 'data.json');

  console.log('markdownPath:', markdownPath);
  console.log('jsonPath:', jsonPath);

  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  const html = parseMarkdown(markdown);
  const $ = cheerio.load(html);
  const title = $('h1').first().text().trim() || 'Untitled Post';

  let authors: string[] = [];
  let date: string = '';
  try {
    const jsonData = fs.readFileSync(jsonPath, 'utf-8');
    const parsed = JSON.parse(jsonData);
    authors = parsed.authors || [];
    date = parsed.date || '';
  } catch (error) {
    console.warn(`Failed to read data.json for ${id}:`, error); // ✅ use id
  }

  return (
    <div>
      <main>
        <h1>{title}</h1>
      </main>
      <Footer />
    </div>
  );
}
