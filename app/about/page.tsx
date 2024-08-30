import React from "react";

export default function About() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Welcome to , a place where we explore "technology trends, personal
          growth, and creative writing". Our mission is to deliver high-quality,
          insightful, and engaging content that inspires and informs our
          readers.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          On our blog, you'll find a diverse range of articles covering "
          programming tutorials, personal development tips, and inspiring
          stories". Whether you're looking to stay updated on the latest techs
          or seeking advice to improve your skills, we have something for
          everyone.
        </p>
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Join the Community</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We believe that the best conversations happen when people come
          together to share their perspectives. Join our community by
          subscribing to our newsletter, following us on social media, or
          leaving comments on our posts. We’re excited to hear from you!
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Have questions, suggestions, or just want to say hi? Feel free to
          reach out to us{" "}
          <a className="text-blue-500" href="mailto:negiaman604@gmail.com">
            here{" "}
          </a>
          . We’d love to hear from you!
        </p>
      </section>
    </div>
  );
}
