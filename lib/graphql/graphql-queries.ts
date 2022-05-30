import { gql } from "@urql/core"

export const WP_MEDIA_FIELDS = gql`
  fragment WPMediaFields on MediaItem {
    mediaItemUrl
    altText
    mediaDetails {
      width
      height
    }
  }
`

export const GET_GLOBAL_FIELDS = gql`
  ${WP_MEDIA_FIELDS}
  query GetGlobalFields {
    generalSettings {
      title
      description
    }
    acfGlobalFields {
      acfGlobal {
        menu {
          menuLinks {
            text
            pagelink {
              ... on Page {
                id
                slug
                uri
                title
                featuredImage {
                  node {
                    ...WPMediaFields
                  }
                }
              }
            }
          }
        }
        newsletter {
          title
          description
          emailPlaceholder
          privacyPolicy
        }
        footer {
          contactInfo {
            icon {
              altText
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
            text
            link
          }
          links {
            text
            linkType
            internalLink {
              ... on Page {
                id
                slug
                uri
                title
              }
            }
            externalLink
          }
          association {
            title
            partners {
              link
              logo {
                altText
                mediaItemUrl
                mediaDetails {
                  height
                  width
                }
              }
            }
          }

          copyRightLabel
        }
      }
    }
  }
`

export const WP_BLOCKS = gql`
  fragment WPBlocks on Block {
    ... on AcfHeroBlock {
      attributesJSON
    }
    ... on AcfStatsBlock {
      attributesJSON
    }
    ... on AcfDescImageBlock {
      attributesJSON
    }
  }
`

export const GET_PAGE_BLOCKS_BY_ID = gql`
  ${WP_BLOCKS}
  query GetPageBlocksById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      blocks {
        ...WPBlocks
      }
    }
  }
`

export const GET_PAGE_DATA_BY_ID = gql`
  ${WP_MEDIA_FIELDS}
  query GetPageBlocksById($id: ID!) {
    page(id: $id, idType: DATABASE_ID) {
      id
      pageId
      uri
      slug
      featuredImage {
        node {
          ...WPMediaFields
        }
      }
    }
  }
`
