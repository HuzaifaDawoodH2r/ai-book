import React from 'react';
import Layout from '@theme/Layout';

export default function NotFound() {
  return (
    <Layout title="Page Not Found">
      <main className="container margin-vert--xl">
        <div className="row">
          <div className="col col--6 col--offset-3">
            <h1 className="hero__title">Page Not Found</h1>
            <p>We couldn't find the page you were looking for.</p>
            <p>
              <a href="/" className="button button--primary">
                Back to Home
              </a>
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
}