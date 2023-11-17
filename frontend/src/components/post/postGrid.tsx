interface PostGridProps {
  children: React.ReactNode;
}

const PostGrid = ({ children }: PostGridProps) => {
  return <div className="grid w-full grid-cols-4 gap-sm">{children}</div>;
};

export default PostGrid;
