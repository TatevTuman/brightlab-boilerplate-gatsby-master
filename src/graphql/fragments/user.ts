// import { gql } from '@apollo/client'
//
// export const UserBasicInfoAttrs = gql`
//   fragment UserBasicInfoAttrs on BasicInfo {
//     gripSize
//     height
//     dexterity
//     flex
//   }
// `

// export const PlaginationBasicInfoAttrs = gql`
//  fragment PlaginationBasicInfoAttrs on BasicInfo {
//  //
//  //
//  //
//
//  }
//  `

//
// export const UserAttrs = gql`
//   fragment UserAttrs on User {
//     id
//     email
//     firstName
//     lastName
//     userName
//     avatar
//     basicInfo {
//       ...UserBasicInfoAttrs
//     }
//   }
//
//   ${UserBasicInfoAttrs}
// `

// export const FetchPlagination = gql`
//    fragment FetchPlagination on Plagination {
//      id
//      name
//     avatar
//     basicInfo {
//       ...PlaginationBasicInfoAttrs
//      }
//    }
//
//    ${PlaginationBasicInfoAttrs}
//  `
//
