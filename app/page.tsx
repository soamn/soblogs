import BlogCard from "./BlogCard";

async function getPosts() {
  const response = await fetch(`${process.env.GRAPHQL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      query: `{
  posts {
    id
    title
    datePublished
    slug
    content {
      html
    }
    author {
      name
      avatar {
        url
      }
    }
    coverPhoto {
      createdBy {
        id
      }
      url
    }
  }
}`,
    }),
  });
  const json = await response.json();
  console.log(process.env.GRAPHQL_API);
  return json.data.posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <div className=" h-screen w-screen p-4">
        <a href="/about">
          <section className="mb-12 bg-slate-100 shadow-lg rounded-lg w-fit p-5">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed font-medium line-clamp-1 lg:line-clamp-none">
              <span className="text-3xl font-bold">"</span> Welcome to soBlogs,
              a place where we explore "technology trends, personal growth, and
              creative writing". Our mission is to deliver high-quality,
              insightful, and engaging content that inspires and informs our
              readers. <span className="text-3xl font-bold">"</span>
            </p>
          </section>
        </a>
        <h1 className="font-bold text-center p-4">All Blogs</h1>
        <div className="h-full w-full flex flex-wrap gap-10  justify-center sm:gap-5 ">
          {posts.map((post: any) => (
            <BlogCard
              title={post.title}
              author={post.author}
              coverPhoto={post.coverPhoto.url}
              key={post.id}
              datePublished={post.datePublished}
              slug={post.slug}
              content={post.content}
            />
          ))}
        </div>
      </div>
    </>
  );
}
