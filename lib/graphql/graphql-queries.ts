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
    ... on AcfLogoWallBlock {
      attributesJSON
    }
    ... on AcfReviewsSliderBlock {
      attributesJSON
    }
    ... on AcfRelatedArticlesBlock {
      attributesJSON
    }
    ... on AcfShortDescBlock {
      attributesJSON
    }
    ... on AcfContactBlock {
      attributesJSON
    }
    ... on AcfDataPointsBlock {
      attributesJSON
    }
    ... on AcfTabsBlock {
      attributesJSON
    }
    ... on AcfAssignmentsBlock {
      attributesJSON
    }
    ... on AcfBigPageLinksBlock {
      attributesJSON
    }
    ... on AcfInfoIconBlock {
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

export const GET_PAGE_BLOCKS_BY_URI = gql`
  ${WP_MEDIA_FIELDS}
  ${WP_BLOCKS}
  query GetPageBlocksById($id: ID!) {
    page(id: $id, idType: URI) {
      id
      pageId
      slug
      uri
      title
      featuredImage {
        node {
          ...WPMediaFields
        }
      }
      blocks {
        ...WPBlocks
      }
    }
  }
`

export const GET_PAGE_DATA_BY_ID = gql`
  ${WP_MEDIA_FIELDS}
  query GetPageDataById($id: ID!) {
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

export const GET_POST_DATA_BY_ID = gql`
  ${WP_MEDIA_FIELDS}
  query GetPostDataById($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
      id
      postId
      title
      uri
      slug
      excerpt
      featuredImage {
        node {
          ...WPMediaFields
        }
      }
    }
  }
`

export const GET_MEDARBETARE_DATA_BY_ID = gql`
  ${WP_MEDIA_FIELDS}
  query GetMedarbetarePostById($id: ID!) {
    medarbetare(id: $id, idType: DATABASE_ID) {
      id
      medarbetareId
      title
      uri
      slug
      featuredImage {
        node {
          ...WPMediaFields
        }
      }
      acfMedarbetare {
        position
        email
        phone
        linkedin
        bio
      }
    }
  }
`



export const GET_COURSE_DATA_BY_ID = gql`
  ${WP_MEDIA_FIELDS}
  query GetCoursePostById($id: ID!) {
    course(id: $id, idType: DATABASE_ID) {
      id
      databaseId
      courseId
      excerpt
      title
      uri
      slug
      featuredImage {
        node {
          ...WPMediaFields
        }
      }
      acfCourse {
        duration
        fieldGroupName
        isCourseFull
        language
        startDate
      }
    }
  }
`

