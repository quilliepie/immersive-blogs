import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/lib/parseMarkdown';

import * as cheerio from 'cheerio';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainHeader from '@/components/MainHeader';

export default function Home() {
  const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');
  const folders = fs.readdirSync(blogsDirectory);
  const sortedFolders = folders.sort((a, b) => {
    return parseInt(b) - parseInt(a);
  });

  const posts = sortedFolders.map((folder) => {
    const markdownPath = path.join(blogsDirectory, folder, 'blog.md');
    const jsonPath = path.join(blogsDirectory, folder, 'data.json');
    const markdown = fs.readFileSync(markdownPath, 'utf-8');
    let html = parseMarkdown(markdown);
    const id = parseInt(folder);

    // Correct image paths from "../../../public" to "/" since the dir is changed.
    html = html.replace(/src=["'](?:\.\.\/)+public(.*?)["']/g, 'src="$1"');

    // * Load HTML into Cheerio & grab data!
    // Grab title, first image & initialize "previewText."
    const $ = cheerio.load(html);
    const title = $('h1').first().text().trim() || 'Untitled Post';
    const firstImageSource = $('img').first().attr('src') || '/default-thumbnail.jpg';
    $('img').first().remove();
    let previewText = '';

    // ? What is this?
    $('p').each((_, el) => {
      const text = ($(el).html() ?? '').trim();
      // Return found preview text & close the loop.
      if (text && !/^<img/i.test(text)) {
        previewText = text;
        return false;
      }
    });

    // Error handling in case text is not found.
    if (!previewText) previewText = 'No preview available.';

    // * Read JSON Data (Authors & date)
    // The "instructions" for animations and such are only used on the blog's unique page.
    let authors: string[] = [];
    let date: string = '';
    try {
      const jsonData = fs.readFileSync(jsonPath, 'utf-8');
      const parsed = JSON.parse(jsonData);
      authors = parsed.authors || [];
      date = parsed.date || '';
    } catch (error) {
      console.warn(`Failed to read or parse data.json for blog "${id}":`, error);
    }

    return { id, title, previewText, firstImageSource, html, authors, date };
  });

  // ! REVIEW all the code above and actually try to understand it!! //

  // * Render the page. *
  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <MainHeader />
      <main className='p-8 flex flex-col gap-8 top-border w-full mx-auto'>
        <section>
          <h2 className='text-center'>Blogs</h2>
          <p>Below is a list of my most recent blogs:</p>
        </section>
        <ul className='flex flex-col gap-4'>
          {posts.map((post) => (
            <li key={post.id} className='top-border py-4 flex flex-col gap-1'>
              <div className='text-center mb-2 '>
                <h3 className='text-2xl'>
                  <a href={`/blogs/${post.id}`}>{post.title}</a>
                </h3>
                <p className='mt-2'>
                  {post.authors.join(', ')} &#9642; {post.date}
                </p>
              </div>
              <Image
                src={post.firstImageSource}
                alt={'(Error: Image failed to load. Contact me if this keeps happening!)'}
                width={600}
                height={400}
                className='my-2'
              />
              <p dangerouslySetInnerHTML={{ __html: post.previewText }}></p>
              <div className='text-center mt-4'>
                <a href={`/blogs/${post.id}`}>Listen or read more.</a>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
