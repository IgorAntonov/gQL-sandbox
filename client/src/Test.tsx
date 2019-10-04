import React from "react";

import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

type Props = {};

const GET_BOOKS = gql`
  query getBooks {
    books {
      title
      author
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook($title: String!) {
    addBook(title: $title) {
      success
      books {
        title
        author
      }
    }
  }
`;

export const Test: React.FC<Props> = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [mutate, { data: mutateData }] = useMutation(ADD_BOOK, {
    variables: { title: "Frontend cukbuk" }
  });

  const realData = mutateData ? mutateData.addBook || data : data;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <button onClick={() => mutate()}>ADD book</button>
      {realData
        ? realData.books.map((book: any) => (
            <>
              <p>{book.title}</p>
              <p>{book.author}</p>
            </>
          ))
        : null}
    </>
  );
};
