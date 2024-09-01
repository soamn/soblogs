import { Metadata } from "next";

async function getPosts(params: any) {
  try {
    const response = await fetch(`${process.env.GRAPHQL_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          post(where: { slug: "${params.slug}" }) {
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
              url
            }
          }
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post data: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data.post;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

async function getSlugs() {
  try {
    const response = await fetch(`${process.env.GRAPHQL_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          posts {
            slug
          }
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch slugs: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data.posts;
  } catch (error) {
    console.error("Error fetching slugs:", error);
    throw error;
  }
}

async function getLatestPost(name: string) {
  try {
    const response = await fetch(`${process.env.GRAPHQL_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `{
          author(where: { name: "${name}" }) {
            post(first: 3, orderBy: datePublished_DESC) {
              title
              slug
            }
          }
        }`,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch latest posts: ${response.statusText}`);
    }

    const json = await response.json();
    return json.data.author.post;
  } catch (error) {
    console.error("Error fetching latest posts:", error);
    throw error;
  }
}

// Generate static params for dynamic routing
export async function generateStaticParams() {
  const posts = await getSlugs();
  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const post = await getPosts(params);
  const latestPosts = await getLatestPost(post.author.name);

  return (
    <div className="p-1 bg-gray-100 ">
      <header className="bg-white shadow-md rounded-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className=" font-bold text-center md:text-2xl">{post.title}</h1>
        </div>
      </header>

      <main className="container mx-auto  py-8 shadow-sm">
        <article className="bg-white p-6 rounded-lg shadow-lg">
          <div className="text-gray-700 mb-4">
            Published on {post.datePublished} by{" "}
            <div className="flex gap-4 text-center text-teal-500">
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={post.author.avatar.url}
              />
              {post.author.name}
            </div>
          </div>

          <img
            src={post.coverPhoto.url}
            className="w-full h-auto mb-6 rounded-lg"
          />

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </article>
        <span className="text-gray-500 italic ">
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

export default Page;

// Optional: Generate metadata if you need it for SEO
export const metadata: Metadata = {
  title: "Blog Post",
  description: "A detailed blog post",
};
