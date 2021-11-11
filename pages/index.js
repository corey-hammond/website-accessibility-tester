import Head from 'next/head';
import React, { useState } from 'react';
import clsx from 'clsx';

export default function Home() {
  const [url, setUrl] = useState('');
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch accessibility issues
  const testAccessibility = async (e) => {
    e.preventDefault();

    if (url === '') {
      alert('Please add a url');
    } else {
      setIsLoading(true);

      const response = await fetch(`/api/test?url=${url}`);

      if (response.status !== 200) {
        setIsLoading(false);
        alert('Something went wrong');
      } else {
        const { issues } = await response.json();
        setIsLoading(false);
        setIssues(issues);
      }
    }
  };

  // Prepare issues to display in DOM

  return (
    <div className='container-sm'>
      <Head>
        <meta charset='UTF-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
          integrity='sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3'
          crossorigin='anonymous'
        />
        <title>Website Accessibility Tester</title>
      </Head>

      <div className='card my-5 p-3 bg-dark text-light'>
        <div className='card-body'>
          <h2 className='mb-3'>Website Accessibility Tester</h2>
          <form id='form' onSubmit={testAccessibility}>
            <div className='input-group mb-3'>
              <input
                type='url'
                id='url'
                className='form-control'
                placeholder='Enter a website...'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button type='submit' className='btn btn-primary'>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className={clsx('loader text-center mb-3', {
          hidden: isLoading === false,
        })}
      >
        <div className='spinner-border' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>

      {/* I put this here as an example of how to satisfy an accessibility issue that arises when you don't use text in your <a> tags,
      for example, if you used an image or an icon for you <a> tag link, you would raise an issue for no content being displayed between
      <a> tags, so you can put this span in between the <a> tags along with the icon and it will be display: none. */}
      <span className='sr-only'>Testing sr-only</span>

      <div id='issues'>
        {issues.map((issue, idx) => {
          return (
            <div key={idx} className='card mb-5'>
              <div className='card-body'>
                <h4>{issue.message}</h4>
                <p className='bg-light p-3 my-3'>{issue.context}</p>

                <p className='bg-secondary text-light p-2'>
                  CODE: {issue.code}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
