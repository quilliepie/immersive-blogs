import fs from 'fs';
import path from 'path';
import { BlogData, HtmlPreviewData } from './types';
import { parseBlogData } from '@/lib/parseBlogData';
import { parseMarkdown } from '@/lib/parseMarkdown';
import { getHtmlPreview } from '@/lib/getHtmlPreview';

import Image from 'next/image';
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
    const html = parseMarkdown(markdown);
    const id = parseInt(folder);
    getHtmlPreview(html);

    const previewData: HtmlPreviewData = getHtmlPreview(html);
    const title = previewData.title;
    const previewText = previewData.previewText;
    const firstImageSource = previewData.firstImageSource;

    const jsonData: BlogData = parseBlogData(jsonPath);
    const authors: string[] = jsonData.authors;
    const date: string = jsonData.date;

    return { id, title, previewText, firstImageSource, html, authors, date };
  });

  return (
    <div className='flex flex-col min-h-screen items-center justify-center'>
      <MainHeader />
      <main className='p-8 flex flex-col gap-8 top-border w-full mx-auto'>
        <section className='text-center'>
          <h2>Blogs</h2>
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
