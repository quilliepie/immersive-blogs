import Image from 'next/image';
import ImgSelfPortrait from '@/public/assets/images/owl-DE.png';

export default function MainHeader() {
  return (
    <header className='m-8 flex flex-col gap-1'>
      <h1 className='text-center text-2xl'>Immersive Blogs</h1>
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
        you and others find peace and direction in your lives, regardless of how dire your
        situation may be.
      </p>
      <p>
        If you'd like, you can{' '}
        <a
          href='https://github.com/quilliepie/immersive-blogs'
          rel='noreferrer'
          target='_blank'
        >
          learn more about this project on GitHub
        </a>
        , which provides in-depth answers for "how" and "why" this project was made.
      </p>
      <p className='text-center'>Take care, and happy listening! 💚</p>
    </header>
  );
}
