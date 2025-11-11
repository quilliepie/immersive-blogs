import fs from 'fs';
import path from 'path';
import { parseBlogData } from '@/lib/parseBlogData';
import { parseMarkdown } from '@/lib/parseMarkdown';
import * as cheerio from 'cheerio';

import Image from 'next/image';
import Footer from '@/components/Footer';

interface BlogPageProps {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  return (
    <div className='flex flex-col min-h-screen items-center'>
      <header className='p-8 flex flex-col gap-2'>
        <h1>Hi! Great things are coming to this page!</h1>
        <p>
          And it's gonna be very, very complex! I'm not sure how I'll do it yet, but I
          will! 'Cause I really really wanna~
        </p>
      </header>
      <main className='p-8 flex flex-col gap-8 top-border w-full mx-auto'>
        <p>Main content stuff?</p>
      </main>
      <Footer />
    </div>
  );
}
