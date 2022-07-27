// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { GraphQLClient, gql } from 'graphql-request'


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const graphcmsToken = process.env.GRAPHCMS_TOKEN

export default async function comments(req: NextApiRequest , res: NextApiResponse) {
  console.log({ graphcmsToken })
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    Headers: {
      authorization: `Bearer ${graphcmsToken}`
    }
  })
  
  const query = gql`
  mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, profile: {connect: {slug: $slug}}}) { id }
  `
  // In case something goes wrong 
  try {
    const result = await graphQLClient.request(query, req.body)

  return res.status(200).send(result);
  } catch(error){
    console.log(error)
    return res.status(500).send(error);
  }
}