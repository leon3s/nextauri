import React from 'react';

import HomeBlock from 'components/HomeBlock';

const homeBlocks = [
  {
    id: 0,
    title: "Nextjs Doc",
    url: "https://nextjs.org/docs",
    description: "Find in-depth information about Next.js Features and API.",
  },
  {
    id: 1,
    url: "https://tauri.app/v1/guides/",
    title: "Tauri Doc",
    description: "Find in-depth information about Tauri Features and API.",
  },
]

const Home = () => (
  <div className='home-container'>
    <div className='home-header'>
      <h1 className='home-title'>
        Welcome to <a className='anchor-nextauri' rel="noreferrer" target="_blank" href="https://github.com/leon3s/nextauri">Nextauri</a>
      </h1>
      <p className='get-started'>
        Get started by editing <span className='get-started-span'>src-next/pages/index.tsx</span>
      </p>
    </div>
    <div className='home-blocks'>
      {homeBlocks.map((homeBlock) => (
        <HomeBlock
          key={homeBlock.id}
          title={homeBlock.title}
          url={homeBlock.url}
          description={homeBlock.description}
        />
      ))}
    </div>
  </div>
)

export default Home;
