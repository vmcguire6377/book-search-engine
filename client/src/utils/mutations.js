import gql from "graphql-tag";
export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
token
user {
    _id
    username
    bookCount
    email
    savedBooks {
        bookId
        title
        author
        description
        image
        link
    }
}
}
}`;

export const SAVE_BOOK = gql`
mutation saveBook($input: bookInput!) {
    saveBook(input: $input) {
        _id
        username
        bookCount
        email
        savedBooks {
            bookId
            title
            author
            description
            image
            link
        }
    }
}
}`;

export const REMOVE_BOOK = gql`
mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        bookCount
        email
        savedBooks {
            bookId
            title
            author
            description
            image
            link
        }
    }
}
}`;