import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const postStatuses = ['draft', 'published', 'pending_review'] as const

export interface Post {
  id: string
  title: string
  author: string
  content: string
  status: typeof postStatuses[number]
  created_at: string
  updated_at: string
}

interface ListResponse<T> {
  page: number
  per_page: number
  total: number
  total_pages: number
  data: T[]
}
export const postApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    listPosts: build.query<any, number | void>({
      query: (page = 1) => `posts?_page=${page}`,
      providesTags: (result) => {
        return result?.length
        ? [
            // Provides a tag for each post in the current page,
            // as well as the 'PARTIAL-LIST' tag.
            // @ts-ignore
            ...result.map((item) => ({ type: 'Posts' as const, id: item.id })),
          ]
        : [{ type: 'Posts', id: 'PARTIAL-LIST' }]
      }
,
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        }
      },
      // Invalidates the tag for this Post `id`, as well as the `PARTIAL-LIST` tag,
      // causing the `listPosts` query to re-fetch if a component is subscribed to the query.
      invalidatesTags: (result, error, id) => [
        { type: 'Posts', id },
      ],
    }),
  }),
})

export const { useListPostsQuery, useDeletePostMutation } = postApi
