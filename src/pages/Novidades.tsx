import React from "react";

type Post = {
  id: number;
  title: string;
  date: string;
  content: string;
};

const Novidades: React.FC = () => {
  // Array de posts com novidades (estáticos para exemplo)
  const novidadesList: Post[] = [];

  return (
    <main className="container mx-auto p-4 pt-22">
      <h1 className="text-3xl font-bold mb-6"></h1>
      {novidadesList.map((post) => (
        <article
          key={post.id}
          role="article"
          className="border-b border-gray-300 pb-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          tabIndex={0}
          aria-label={`Post: ${post.title}`}
        >
          <header>
            <h2 className="text-2xl font-semibold">{post.title}</h2>
            <time className="text-gray-500" dateTime={post.date}>
              {post.date}
            </time>
          </header>
          <p className="mt-2 text-gray-700">{post.content}</p>
        </article>
      ))}
    </main>
  );
};

export default Novidades;
