interface PostGridProps {
  children: React.ReactNode
}

const PostGrid = ({ children }: PostGridProps) => {
  return <div className="post__grid">{children}</div>
}

export default PostGrid
