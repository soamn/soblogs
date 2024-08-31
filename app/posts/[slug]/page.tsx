async function getPosts(params: any) {
  const response = await fetch(`${process.env.GRAPHQL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
              post(where:{slug:"${params.slug}"}){
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
        }  `,
    }),
  });
  const json = await response.json();

  return json.data.post;
}
async function getslugs() {
  const response = await fetch(
    "https://ap-south-1.cdn.hygraph.com/content/clzs3b92m07b507v1aup72a29/master?timestamp=${Date.now()}",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
               posts{
               slug
               }
  
          }  `,
      }),
    }
  );

  const json = await response.json();
  return json.data.posts;
}
export async function getStaticPaths() {
  const posts = await getslugs();
  return {
    paths: posts.map((post: { slug: any }) => ({
      params: { slug: post.slug },
    })),
    fallback: false,
  };
}
async function getLatestPost(name: String) {
  const response = await fetch(`${process.env.GRAPHQL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
                author(where:{name:"${name}"}){
    
    post(first: 3, orderBy: datePublished_DESC){
      title
      slug
    }
  }
            }  `,
    }),
  });
  const json = await response.json();
  const post = json.data.author.post;
  return post;
}

const page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPosts(params);
  const latestPosts = await getLatestPost(post.author.name);

  return (
    <div className="  p-10 bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md rounded-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-center">{post.title}</h1>
        </div>
      </header>

      {/* <!-- Main Content --> */}
      <main className="container mx-auto px-4 py-8 shadow-sm">
        {/* <!-- Blog Post --> */}
        <article className="bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <div className="text-gray-700 mb-4 ">
            Published on {post.datePublished} by{" "}
            <div className="flex gap-4 text-center text-teal-500">
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={post.author.avatar.url}
              />{" "}
              {post.author.name}
            </div>
          </div>

          {/* <!-- Featured Image --> */}
          <img
            src={post.coverPhoto.url}
            className="w-full h-auto mb-6 rounded-lg"
          />

          {/* <!-- Blog Content --> */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </article>
        <span className="text-gray-500 italic  ml-[88%]">
          {" "}
          Posted on {post.datePublished}
        </span>
        <section className="mt-12">
          <h3 className="text-xl font-semibold mb-4">
            Other Posts by {post.author.name}
          </h3>
          <ul className="space-y-4">
            {latestPosts.map((latestPost: { title: string; slug: string }) => (
              <li key={latestPost.slug}>
                <a
                  href={`/posts/${latestPost.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {latestPost.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default page;
