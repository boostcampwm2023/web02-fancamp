// interface PostModalProps {}

// const PostModal = ({}: PostModalProps) => {
//   return (
//     <div className="w-[51.25rem] h-[31.25rem] flex">
//       {post.images.length && (
//         <div className="w-[37.5rem]">
//           <ImageSlider images={post.images} />
//         </div>
//       )}
//       <div className="w-[17.5rem] flex flex-col justify-between">
//         <div className="flex flex-1  flex-col gap-xl overflow-y-scroll">
//           <Text size={14}>{post.content}</Text>
//           {comments &&
//             comments.map((comment, index) => {
//               return (
//                 <Text size={12} color="point-blue" key={`post-comment-${index}`}>
//                   {comment.comment}
//                   {comment.comment}
//                   {comment.comment}
//                 </Text>
//               )
//             })}
//         </div>
//         <div className="flex flex-col">
//           <div className="flex">
//             <Text size={12}>좋아요: {post.likeCount}</Text>
//             <Text size={12}>코멘트: {post.commentCount}</Text>
//           </div>
//           <Button text="닫기" handleOnClick={handleModalClose} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default PostModal
