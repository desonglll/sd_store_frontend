import {gql} from "@apollo/client";

const QUERY = gql`
  query GetTeeth($limit: Int!, $offset: Int!) {
    allTeeth(limit: $limit, offset: $offset) {
      id
      name
      model
      brand
      color
      material
      length
      width
      weight
      height
      salePrice
      stockQuantity
      available
      createdAt
      updatedAt
      category {
        code
        name
        available
        user {
            id
            username
        }
      }
      user {
        id
        username
      }
    }
    count
  }
`;

export default QUERY;