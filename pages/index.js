import Head from 'next/head';
import { Inter, Ubuntu_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import Image from 'next/image';
import linkedinIcon from '../public/linkedin.svg';
import githubIcon from '../public/github.svg';
import twitterIcon from '../public/twitter.svg';
import ScaleLoader from 'react-spinners/ScaleLoader';

const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });
const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  const [query, setQuery] = useState('');
  const [translation, setTranslation] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  async function runQuery() {
    if (!query) return;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query),
    };

    setTranslation('');
    setLoading(true);
    const res = await fetch('/api/translate', options);
    const data = await res.json();

    setTranslation(data.sql);
    setLoading(false);
  }

  function copy() {
    if (!translation) return;
    setCopied(true);
    navigator.clipboard.writeText(translation);
    setTimeout(() => setCopied(false), 3000);
  }

  function clear() {
    setQuery('');
    setTranslation('');
  }

  return (
    <>
      <Head>
        <title>SQL Translator</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <main className={styles.main} style={inter.style}>
        <h1>Translate Human Language Into SQL</h1>

        <textarea
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.input}
          style={inter.style}
          placeholder='e.g - Find out the third last character of the name of the student with the 5th highest marks.'
          spellCheck='false'
        />

        <button
          onClick={runQuery}
          className={styles.translateBtn}
          style={inter.style}
        >
          Translate
        </button>

        <div className={styles.translation} style={ubuntuMono.style}>
          {loading && (
            <ScaleLoader
              color='#66347f'
              loading={loading}
              aria-label='Loading Spinner'
              size={120}
            />
          )}
          <p>{translation}</p>

          <button className={styles.copyBtn} onClick={copy}>
            {copied ? 'Copied' : 'Copy'}
          </button>

          <button className={styles.clearBtn} onClick={clear}>
            Clear
          </button>
        </div>

        <p className={styles.instructions}>
          Table schema can also be provided in the description for an even
          accurate query. <br />
          e.g. The table is Employee ( <br />
          id NUMBER(5), <br />
          name VARCHAR2(20), <br />
          desg VARCHAR2(20), <br />
          salary NUMBER(8), <br />
          doj DATE ); <br />
          Find out all the employees who joined before this year.
        </p>

        <a
          className={styles.star}
          href='https://github.com/heyyayesh/english-to-sql'
          target='_blank'
        >
          Star this project on Github
          <Image src={githubIcon} width={32} alt='github' />
        </a>

        <footer>
          <a href='https://www.linkedin.com/in/heyyayesh' target='_blank'>
            <Image
              className={styles.footerIcon}
              src={linkedinIcon}
              alt='linked in'
              width={25}
            />
          </a>

          <a href='https://www.github.com/heyyayesh' target='_blank'>
            <Image
              className={styles.footerIcon}
              src={githubIcon}
              alt='github'
              width={25}
            />
          </a>

          <a href='https://www.twitter.com/heyyayesh' target='_blank'>
            <Image
              className={styles.footerIcon}
              src={twitterIcon}
              alt='twitter'
              width={25}
            />
          </a>
        </footer>
      </main>
    </>
  );
}
