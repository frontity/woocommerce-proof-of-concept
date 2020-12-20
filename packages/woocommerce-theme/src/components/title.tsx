import React from "react";
import { Head, connect, decode, useConnect } from "frontity";
import { Packages } from "../../types";
import { isTerm, isAuthor, isPostType, isError } from "@frontity/source";
import { PostTypeEntity, TermEntity } from "@frontity/source/types";

const Title = () => {
  const { state } = useConnect<Packages>();
  // Get data about the current URL.
  const data = state.source.get(state.router.link);
  // Set the default title.
  let title = state.frontity.title;

  if (isTerm(data)) {
    // Add titles to taxonomies, like "Category: Nature - Blog Name" or "Tag: Japan - Blog Name".
    // 1. Get the taxonomy entity from the state to get its taxonomy term and name.
    const term: TermEntity = state.source[data.taxonomy][data.id];
    // 2. Uppercase first letter of the taxonomy term (from "category" to "Category").
    const taxonomyCapitalized =
      term.taxonomy.charAt(0).toUpperCase() + term.taxonomy.slice(1);
    // 3. Render the proper title.
    title = `${taxonomyCapitalized}: ${decode(term.name)} - ${
      state.frontity.title
    }`;
  } else if (isAuthor(data)) {
    // Add titles to authors, like "Author: Jon Snow - Blog Name".
    // 1. Get the author entity from the state to get its name.
    const { name } = state.source.author[data.id];
    // 2. Render the proper title.
    title = `Author: ${decode(name)} - ${state.frontity.title}`;
  } else if (isPostType(data)) {
    // Add titles to posts and pages, using the title and ending with the Blog Name.
    // 1. Get the post entity from the state and get its title.
    const post: PostTypeEntity =
      state.source[data.type][data.id].title.rendered;
    // 2. Remove any HTML tags found in the title.
    const cleanTitle = decode(post.title.rendered);
    // 3. Render the proper title.
    title = `${cleanTitle} - ${state.frontity.title}`;
  } else if (isError(data) && data.is404) {
    // Add titles to 404's.
    title = `404 Not Found - ${state.frontity.title}`;
  }

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default connect(Title);
