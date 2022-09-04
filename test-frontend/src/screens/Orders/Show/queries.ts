import { gql } from "@apollo/client";

/*export const ORDER_QUERY = gql`
  query Order($number: String!) {
    order(number: $number) {
      number
      status
      id
      delivery {
        code
      }
      items {
        id
        status
        offer {
          displayName
          externalId
        }
      }
    }
  }
`;*/

export const ORDER_QUERY = (number: string) => {return(`
  query Order {
        order(number: "${number}") {
        number
            id
            site
            createdAt
            status
            delivery {
              code
            }
            items {
              id
              status
              #comment
              offer {
                externalId
                displayName
                article
              }
              quantity
            }
      }
  }
`
)};