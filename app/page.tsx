import fs from 'fs';
import path from 'path';
import { parseMarkdown } from '@/lib/parseMarkdown';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ImgSelfPortrait from '@/public/assets/images/DE-portrait.webp';

export default function Home() {
  // * Grab HTML data from markdown files *
  // Get the directory & folder names for each blog.
  const blogsDirectory = path.join(process.cwd(), 'content', 'blogs');
  const folders = fs.readdirSync(blogsDirectory);

  // Sort folders numerically by prefix before "_".
  const sortedFolders = folders.sort((a, b) => {
    const numA = parseInt(a.split('_')[0]);
    const numB = parseInt(b.split('_')[0]);
    return numA - numB;
  });

  // Get the blog attributes to be rendered to the page.
  const posts = sortedFolders.map((folder) => {
    const filePath = path.join(blogsDirectory, folder, 'blog.md');
    const markdown = fs.readFileSync(filePath, 'utf-8');
    const html = parseMarkdown(markdown); // async? then await it
    const slug = folder.replace(/^\d+_/, ''); // remove "1_" prefix for slug
    return { slug, html };
  });

  // ! REVIEW all the code above and actually try to understand it!! //

  // * Render the page *
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <header className='m-8 flex flex-col gap-1'>
        <h1 className='text-center'>Immersive Blogs</h1>
        <p className='text-center'>Hi, I'm Quilliepie!</p>
        <div className='w-full flex items-center justify-center'>
          <Image
            src={ImgSelfPortrait}
            alt='A self portrait depicting an anthropomorphic owl in a dress.'
            className='w-3/4'
          ></Image>
        </div>
        <p>
          <i>Immersive Blogs</i> is a way for me to share my personal experiences to help
          you and others find peace and direction in your lives, regardless of how dire
          the situation may be.
        </p>
        <p className='text-center'>Happy listening! 💚</p>
      </header>

      {/* Render Blog Previews (Title, author/date, image, first p.) */}
      <main>
        <ul>
          <li></li>
        </ul>
      </main>

      <Footer />
    </div>
  );
}
