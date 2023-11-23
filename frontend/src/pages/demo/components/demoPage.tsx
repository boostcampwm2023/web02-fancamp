import { FormEvent, useEffect, useState } from 'react';
import SubmitButton from '../../../components/button/submitButton';
import Input from '../../../components/input/input';
import PasswordIcon from '../../../assets/icons/passwordIcon.svg?react';
import ContentMenu from '../../../components/menu/contentMenu';
import Fade from '../../../components/transition/fade';
import {
  bottomFadeinAnimation,
  bottomFadeoutAnimation,
  leftFadeinAnimation,
  leftFadeoutAnimation,
} from '../../../components/transition/animation';
import Switch from '../../../components/transition/switch';
import ImageSlider from '../../../components/slider/imageSlider';
import Text from '../../../components/text/text';
import Checkbox from '../../../components/checkbox/checkbox';
import Grid from '../../../components/grid/grid';
import Dropdown from '../../../components/dropdown/dropdown';
import DropdownItem from '../../../components/dropdown/dropdownItem';
import Modal from '../../../components/modal/modal';
import LikeButton from '../../../components/button/likeButton';
import Button from '../../../components/button/button';
import Section from '../../../components/section/section';

function DemoPage() {
  return (
    <div className=" flex flex-col gap-xl">
      <ModalDemo />
      <LikeButtonDemo />
      <DropdownDemo />
      <GridDemo />
      <CheckboxDemo />
      {/* <PostCardGridDemo /> */}
      <ImageSliderDemo />
      <SubmitButtonDemo />
      <InputDemo />
      <ContentMenuDemo />
      <FadeDemo />
      <SwitchDemo />
    </div>
  );
}

function ModalDemo() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <Section>
      <Text size={20}>Modal</Text>
      <Button text="열기" onClick={handleModalOpen} />
      <Modal isOpen={isModalOpen} handleCloseModal={handleModalClose}>
        <div className="flex h-[6rem] w-[10rem] flex-col items-center justify-evenly">
          <span>모달 테스트</span>
          <Button text="닫기" onClick={handleModalClose} />
        </div>
      </Modal>
    </Section>
  );
}

function SubmitButtonDemo() {
  return (
    <Section>
      <Text size={20}>Submit Button</Text>
      <SubmitButton text="클릭" onClick={() => alert('클릭')} />
    </Section>
  );
}

function InputDemo() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <Section>
      <Text size={20}>Input</Text>
      <Input
        label="이메일을 입력하세요"
        type="text"
        setValue={setEmail}
        placeholder="이메일"
      />
      <Input
        label="비밀번호를 입력하세요"
        type="password"
        setValue={setPassword}
        icon={<PasswordIcon />}
        placeholder="비밀번호"
      />
      <Text size={12}>{email}</Text>
      <Text size={12}>{password}</Text>
    </Section>
  );
}

function ContentMenuDemo() {
  const categorys = ['카테고리1', '카테고리2', '카테고리3'];
  const [index, setIndex] = useState(0);

  return (
    <Section>
      <Text size={20}>Menu</Text>
      <ContentMenu
        menuIndex={index}
        setMenuIndex={setIndex}
        categorys={categorys}
      />
      <Text size={12}>현재 인덱스: ${index}</Text>
    </Section>
  );
}

function FadeDemo() {
  const [showDemo1, setDemo1] = useState(false);
  const [showDemo2, setDemo2] = useState(false);

  return (
    <Section>
      <Text size={20}>Transition Fade</Text>
      <Button text="bottom up" onClick={() => setDemo1(!showDemo1)} />
      <div className="h-[2rem]">
        <Fade fadeIn={bottomFadeinAnimation} fadeOut={bottomFadeoutAnimation}>
          {showDemo1 && <Text size={12}>텍스트</Text>}
        </Fade>
      </div>
      <Button text="left to right" onClick={() => setDemo2(!showDemo2)} />
      <div className="h-[2rem]">
        <Fade fadeIn={leftFadeinAnimation} fadeOut={leftFadeoutAnimation}>
          {showDemo2 && <Text size={12}>텍스트</Text>}
        </Fade>
      </div>
    </Section>
  );
}

function SwitchDemo() {
  const categorys = ['카테고리1', '카테고리2', '카테고리3'];
  const [index, setIndex] = useState(0);
  const [oldIndex, setOldIndex] = useState(0);
  const [direction, setDirection] = useState<'right' | 'left'>('right');

  useEffect(() => {
    setDirection(index > oldIndex ? 'right' : 'left');
    setOldIndex(index);
  }, [index]);

  return (
    <Section>
      <Text size={20}>Transition Switch</Text>
      <ContentMenu
        menuIndex={index}
        setMenuIndex={setIndex}
        categorys={categorys}
      />
      <Switch direction={direction} dynamic={oldIndex}>
        <div className="flex flex-col items-center justify-center">
          <Text size={12}>현재 인덱스: ${index}</Text>
        </div>
      </Switch>
    </Section>
  );
}

// function PostCardGridDemo() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [post, setPost] = useState<Post | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     fetch(`/api/posts/camp/${test.userId}`).then((postsData) => {
//       setPosts(postsData);
//     });
//     setModalOpen(true);
//   }, []);

//   const handleModalOpen = (postId: string) => {
//     fetch(`/api/posts/${postId}`).then((postData) => {
//       setPost(postData);
//     });
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setPostData(null);
//     setModalOpen(false);
//   };

//   return (
//     <Section>
//       <Text size={20}>Post Card</Text>
//       <Modal isOpen={isModalOpen} setOpen={handleModalClose}>
//         <div className="flex">
//           {postData ? (
//             <>
//               <div className="h-[31.25rem] w-[37.5rem]">
//                 <ImageSlider images={postData.images} />
//               </div>
//               <div className="flex flex-1 flex-col">
//                 <span>좋아요: {postData.likeCount}</span>
//                 <span>코멘트: {postData.likeCount}</span>
//                 <Button text="닫기" onClick={handleModalClose} />
//               </div>
//             </>
//           ) : (
//             <div>로딩중</div>
//           )}
//         </div>
//       </Modal>
//       <PostGrid>
//         {DummyData.posts.map((post) => {
//           const { postId, images, likeCount, commentCount } = post;
//           return (
//             <PostCard
//               imageSrc={images[0]}
//               likeCount={likeCount}
//               commentCount={commentCount}
//               postId={postId}
//               handleOnClick={handleModalOpen}
//               key={`post-card-${postId}`}
//               content=""
//             />
//           );
//         })}
//       </PostGrid>
//     </Section>
//   );
// }

function ImageSliderDemo() {
  const images = [
    'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/859DC9ADE28CE874677BAA0A7D897EB076E0A7BA38E9F460D03089E49EE8AF7F/scale?width=1200&aspectRatio=1.78&format=jpeg',
    'https://cdn.vox-cdn.com/thumbor/IQab79SuQ1PnrneGti_uy_pxTKo=/148x0:1768x1080/1280x854/cdn.vox-cdn.com/uploads/chorus_image/image/47413330/the-simpsons-tv-series-cast-wallpaper-109911.0.0.jpeg',
    'https://i0.wp.com/dmdave.com/wp-content/uploads/2019/08/ralph-3945887244-1566174955905.jpg?fit=1196%2C673&ssl=1',
  ];

  return (
    <Section>
      <Text size={20}>Image Slide</Text>
      <div className="h-[18.75rem] w-[25rem]">
        <ImageSlider images={images} />
      </div>
    </Section>
  );
}

function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(`체크 여부 : ${checked ? 'true' : 'false'}`);
  };

  return (
    <Section>
      <Text size={20}>Checkbox</Text>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-sm">
        <Checkbox checked={checked} onClick={handleCheckbox}>
          <Text size={12}>체크하기</Text>
        </Checkbox>
        <SubmitButton text="확인" />
      </form>
    </Section>
  );
}

function GridDemo() {
  const [items, setItems] = useState([
    'item-1',
    'item-2',
    'item-3',
    'item-4',
    'item-5',
    'item-6',
    'item-7',
  ]);
  const [count, setCount] = useState(items.length);

  const randomShuffleArray = (array: any[]): any[] => {
    return array.sort(() => Math.random() - 0.5);
  };

  return (
    <Section>
      <Text size={20}>Grid</Text>
      <div className="flex gap-md">
        <Button
          text="섞기"
          onClick={() => {
            setItems(randomShuffleArray([...items]));
          }}
        />
        <Button
          text="처음에 추가"
          onClick={() => {
            const newItemId = `item-${count + 1}`;
            setItems([newItemId, ...items]);
            setCount(count + 1);
          }}
        />
        <Button
          text="마지막에 추가"
          onClick={() => {
            const newItemId = `item-${count + 1}`;
            setItems([...items, newItemId]);
            setCount(count + 1);
          }}
        />
        <Button
          text="처음 요소 삭제"
          onClick={() => {
            const newItems = items.slice(1);
            setItems(newItems);
          }}
        />
      </div>
      <Grid items={items} />
    </Section>
  );
}

function DropdownDemo() {
  const [value, setValue] = useState<string | null>(null);

  const handleSelectDropdown = (text: string) => {
    setValue(text);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert(value);
  };

  return (
    <Section>
      <Text size={20}>Dropdown</Text>
      <form onSubmit={handleSubmit}>
        <div className="h-[3rem] w-[12rem]">
          <Dropdown placeholder="옵션을 선택하세요." value={value}>
            <DropdownItem
              text="옵션1"
              handleOnClick={handleSelectDropdown}
              icon={<PasswordIcon />}
            />
            <DropdownItem text="옵션2" handleOnClick={handleSelectDropdown} />
            <DropdownItem text="옵션3" handleOnClick={handleSelectDropdown} />
          </Dropdown>
        </div>
        <SubmitButton text="확인" />
      </form>
    </Section>
  );
}

function LikeButtonDemo() {
  const [like, setLike] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(12);

  const handleLike = () => {
    setLike(!like);
    setLikeCount(likeCount + (like ? -1 : +1));
  };

  return (
    <Section>
      <Text size={20}>Like Button</Text>
      <LikeButton liked={like} onClick={handleLike}>
        <Text size={12} className="select-none">
          좋아요 {likeCount}
        </Text>
      </LikeButton>
    </Section>
  );
}

export default DemoPage;
