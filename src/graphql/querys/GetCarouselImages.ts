import {gql} from "@apollo/client";

const QUERY = gql`
  query GetCarouselImages{
    allCarouselImages{
      id
      name
      url
      available
      image {
          id
          file
          available
        }
    }
  }
`;

export default QUERY;