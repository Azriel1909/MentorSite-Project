import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getProfile = async () => {
  const query = gql`
  query MyQuery {
    profilesConnection {
      edges {
        node {
          mentor {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          extract
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
  `
  const result = await request(graphqlAPI, query);
  
  return result.profilesConnection.edges;
}

export const getProfileDetails = async (slug) => {
  const query = gql`
  query GetProfileDetails($slug: String!) {
    profile(where: { slug: $slug })
    {
      mentor {
        bio
        name
        id
        photo {
          url
        }
      }
      createdAt
      slug
      title
      extract
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      content {
        raw
      }
    }
  }
  `
  const result = await request(graphqlAPI, query, { slug });
  
  return result.profile;
}

export const getRecentProfiles = async () => {
  const query = gql`
  query GetProfileDetails() {
    profiles(
      orderBy: createdAt_ASC
      last: 3
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `

  const result = await request(graphqlAPI, query);
  
  return result.profiles;
}

export const getSimilarProfiles = async (categories, slug) => {
  const query = gql`
  query GetProfileDetails($slug: String!, $categories: [String!]) {
    profiles(
      where: {slug_not: $slug, AND: { categories_some: { slug_in: $categories}}}
      last: 4
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
  `

  const result = await request(graphqlAPI, query, { categories, slug});
  
  return result.profiles;
}

export const getCategories = async () => {
  const query = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
  `
  const result = await request(graphqlAPI, query);
  
  return result.categories;
}

export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj),
  })
  return result.json();
}

export const getComments = async () => {
  const query = gql`
  query GetComments($slug: String!) {
    comments(where: { profile: { slug: $slug } } ) {
      name
      createdAt
      comment
    }
  }
  `
  const result = await request(graphqlAPI, query, { slug });
  
  return result.comments;
}