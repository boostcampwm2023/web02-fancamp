import ModalSipnner from '@components/loading/ModalSpinner';
import Modal from '@components/modal/Modal';
import { Suspense, useState } from 'react';
import Spinner from '@components/loading/Spinner';
import UploadModal from './UploadModal';
import PostPageGrid from './PostGrid';
import PostModalLogic from './PostModalLogic';

function PostPage() {
  const [showPostModal, setPostModal] = useState(false);
  const [showUploadModal, setUploadModal] = useState(false);
  const [showPostId, setPostId] = useState<number | null>(null);

  const handlePostModalOpen = (postId: number) => {
    setPostId(postId);
    setPostModal(true);
  };

  const handlePostModalClose = () => {
    setPostId(null);
    setPostModal(false);
  };

  const handleUploadModalOpen = () => {
    setUploadModal(true);
  };

  const handleUploadModalClose = () => {
    setUploadModal(false);
  };

  return (
    <section className="relative flex-1">
      {showPostModal && showPostId !== null && (
        <Suspense fallback={<ModalSipnner />}>
          <Modal isOpen={showPostModal} handleCloseModal={handlePostModalClose}>
            <PostModalLogic
              postId={showPostId}
              handlePostModalClose={handlePostModalClose}
            />
          </Modal>
        </Suspense>
      )}
      {showUploadModal && (
        <Modal
          handleCloseModal={handleUploadModalClose}
          isOpen={showUploadModal}
        >
          <UploadModal handleCloseModal={handleUploadModalClose} />
        </Modal>
      )}
      <Suspense
        fallback={
          <div className="h-[10rem] w-full">
            <Spinner className="center" />
          </div>
        }
      >
        <PostPageGrid
          handlePostModalOpen={handlePostModalOpen}
          handleUploadModalOpen={handleUploadModalOpen}
        />
      </Suspense>
    </section>
  );
}

export default PostPage;
