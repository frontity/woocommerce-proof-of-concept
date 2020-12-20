import React, { useEffect } from "react";
import { connect, styled, useConnect } from "frontity";
import Link from "../link";
import { Packages } from "../../../types";
import { isArchive } from "@frontity/source";

/**
 * Pagination Component
 *
 * It's used to allow the user to paginate between a list of posts.
 *
 * The `state`, `actions`, `libraries` props are provided by the global context,
 * when we wrap this component in `connect(...)`
 */
const Pagination = () => {
  const { state, actions } = useConnect<Packages>();
  // Get the total posts to be displayed based for the current link
  const data = state.source.get(state.router.link);
  // Make sure data is an archive.
  if (!isArchive(data)) return null;

  // Pre-fetch the the next page if it hasn't been fetched yet.
  useEffect(() => {
    if (data.next) actions.source.fetch(data.next);
  }, []);

  return (
    <div>
      {/* If there's a next page, render this link */}
      {data.next && (
        <Link link={data.next}>
          <Text>← Older posts</Text>
        </Link>
      )}

      {data.previous && data.next && " - "}

      {/* If there's a previous page, render this link */}
      {data.previous && (
        <Link link={data.previous}>
          <Text>Newer posts →</Text>
        </Link>
      )}
    </div>
  );
};

/**
 * Connect Pagination to global context to give it access to
 * `state`, `actions`, `libraries` via props
 */
export default connect(Pagination);

const Text = styled.em`
  display: inline-block;
  margin-top: 16px;
`;
