import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import Image from 'next/image';
import ImgSelfPortrait from '@/public/assets/images/DE-portrait.webp';

export default function Home() {
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
