import * as React from 'react'
import { Post, useDeletePostMutation, useListPostsQuery } from '../../app/services/posts'

const getColorForStatus = (status: Post['status']) => {
  return status === 'draft'
    ? 'gray'
    : status === 'pending_review'
    ? 'orange'
    : 'green'
}

const PostList = () => {
  const [page, setPage] = React.useState(1)
  const { data: posts, isLoading, isFetching } = useListPostsQuery(page)
  const [deletePost] = useDeletePostMutation();


  if (isLoading) {
    return <div>Loading</div>
  }

  return (
    <div>
      <div>
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Back
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === posts.total_pages}
        >
          вперед
        </button>
      </div>
        {posts?.map((data) => (
          <div>
            {data.data[0].title + ' ' + data.data[0].id}
            <button onClick={() => deletePost(data.data[0].id)}>Delte</button>
          </div>
        ))}
    </div>
  )
}

export const PostsManager = () => {
  return (
        <PostList />)
  }

export default PostsManager
