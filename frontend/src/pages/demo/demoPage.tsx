import { FormEvent, ReactNode, useEffect, useState } from 'react'
import SubmitButton from '../../components/button/submitButton'
import Input from '../../components/input/input'
import PasswordIcon from '../../assets/icons/passwordIcon.svg?react'
import ContentMenu from '../../components/menu/contentMenu'
import Fade from '../../components/transition/fade'
import { bottomFadeinAnimation, bottomFadeoutAnimation, leftFadeinAnimation, leftFadeoutAnimation } from '../../components/transition/animation'
import Switch from '../../components/transition/switch'
import ImageSlider from '../../components/slider/imageSlider'
import Text from '../../components/text/text'
import PostGrid from '../../components/post/postGrid'
import PostCard from '../../components/post/postCard'
import Checkbox from '../../components/checkbox/checkbox'
import DummyData from './dummyData.json'
import { getPostById } from './dummyApi'
import Grid from '../../components/grid/grid'
import Dropdown from '../../components/dropdown/dropdown'
import DropdownItem from '../../components/dropdown/dropdownItem'
import Modal from '../../components/modal/modal'
import LikeButton from '../../components/button/likeButton'

interface SectionTitleProps {
    text: string
}

interface SectionProps {
    children: ReactNode
}

interface ButtonProps {
    text: string
    handleOnClick: () => void
}

const DemoPage = () => {
    return (
        <div className='content flex flex-col gap-xl mt-xl mb-xl'>
            <LikeButtonDemo />
            <DropdownDemo />
            <GridDemo />
            <CheckboxDemo />
            <PostCardGridDemo />
            <ImageSliderDemo />
            <ModalDemo />
            <SubmitButtonDemo />
            <InputDemo />
            <ContentMenuDemo />
            <FadeDemo />
            <SwitchDemo />
            <GridDemo />
        </div>
    )
}

const ModalDemo = () => {
    const [isModalOpen, setModalOpen] = useState(false)

    const handleModalOpen = () => {
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setModalOpen(false)
    }

    return (
        <Section>
            <Text size={20}>Modal</Text>
            <Button text='열기' handleOnClick={handleModalOpen} />
            <Modal isOpen={isModalOpen} setOpen={handleModalClose}>
                <div className='flex flex-col items-center justify-evenly w-[10rem] h-[6rem]'>
                    <span>모달 테스트</span>
                    <Button text='닫기' handleOnClick={handleModalClose} />
                </div>
            </Modal>
        </Section>
    )
}

const SubmitButtonDemo = () => {
    return (
        <Section>
            <Text size={20}>Submit Button</Text>
            <SubmitButton text='클릭' handleOnClick={() => alert('클릭')} />
        </Section>
    )
}

const InputDemo = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <Section>
            <Text size={20}>Input</Text>
            <Input label='이메일을 입력하세요' type='text' setValue={setEmail} placeholder='이메일' />
            <Input label='비밀번호를 입력하세요' type='password' setValue={setPassword} icon={<PasswordIcon />} placeholder='비밀번호' />
            <SectionSpan text={email} />
            <SectionSpan text={password} />
        </Section>
    )
}

const ContentMenuDemo = () => {
    const categorys = ['카테고리1', '카테고리2', '카테고리3']
    const [index, setIndex] = useState(0)

    return (
        <Section>
            <Text size={20}>Menu</Text>
            <ContentMenu menuIndex={index} setMenuIndex={setIndex} categorys={categorys} />
            <SectionSpan text={`현재 인덱스: ${index}`} />
        </Section>
    )
}

const FadeDemo = () => {
    const [showDemo1, setDemo1] = useState(false)
    const [showDemo2, setDemo2] = useState(false)

    return (
        <Section>
            <Text size={20}>Transition Fade</Text>
            <Button text='bottom up' handleOnClick={() => setDemo1(!showDemo1)} />
            <div className='h-[2rem]'>
                <Fade fadeIn={bottomFadeinAnimation} fadeOut={bottomFadeoutAnimation}>
                    {showDemo1 && <SectionSpan text='텍스트' />}
                </Fade>
            </div>
            <Button text='left to right' handleOnClick={() => setDemo2(!showDemo2)} />
            <div className='h-[2rem]'>
                <Fade fadeIn={leftFadeinAnimation} fadeOut={leftFadeoutAnimation}>
                    {showDemo2 && <SectionSpan text='텍스트' />}
                </Fade>
            </div>
        </Section>
    )
}

const SwitchDemo = () => {
    const categorys = ['카테고리1', '카테고리2', '카테고리3']
    const [index, setIndex] = useState(0)
    const [oldIndex, setOldIndex] = useState(0)
    const [direction, setDirection] = useState<'right' | 'left'>('right')

    useEffect(() => {
        setDirection(index > oldIndex ? 'right' : 'left')
        setOldIndex(index)
    }, [index])

    return (
        <Section>
            <Text size={20}>Transition Switch</Text>
            <ContentMenu menuIndex={index} setMenuIndex={setIndex} categorys={categorys} />
            <Switch height={100} width={300} direction={direction} dynamic={oldIndex}>
                <div className='flex flex-col justify-center items-center'>
                    <SectionSpan text={`현재 인덱스: ${index}`} />
                </div>
            </Switch>
        </Section>
    )
}

const PostCardGridDemo = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [postData, setPostData] = useState<any>(null)

    const handleModalOpen = (postId: string) => {
        getPostById(postId).then((post) => {
            setPostData(post)
        })
        setModalOpen(true)
    }

    const handleModalClose = () => {
        setPostData(null)
        setModalOpen(false)
    }

    return (
        <Section>
            <Text size={20}>Post Card</Text>
            <Modal isOpen={isModalOpen} setOpen={handleModalClose}>
                <div className='flex'>
                    {postData ? (
                        <>
                            <div className='w-[37.5rem] h-[31.25rem]'>
                                <ImageSlider images={postData.images} />
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <span>좋아요: {postData.likeCount}</span>
                                <span>코멘트: {postData.likeCount}</span>
                                <Button text='닫기' handleOnClick={handleModalClose} />
                            </div>
                        </>
                    ) : (
                        <div>로딩중</div>
                    )}
                </div>
            </Modal>
            <PostGrid>
                {DummyData.posts.map((post, index) => {
                    const { postId, username, images, likeCount, commentCount } = post
                    return (
                        <PostCard
                            imageSrc={images[0]}
                            likeCount={likeCount}
                            commentCount={commentCount}
                            postId={postId}
                            username={username}
                            handleOnClick={handleModalOpen}
                            key={`post-card-${index}`}
                        />
                    )
                })}
            </PostGrid>
        </Section>
    )
}

const ImageSliderDemo = () => {
    const images = [
        'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/859DC9ADE28CE874677BAA0A7D897EB076E0A7BA38E9F460D03089E49EE8AF7F/scale?width=1200&aspectRatio=1.78&format=jpeg',
        'https://cdn.vox-cdn.com/thumbor/IQab79SuQ1PnrneGti_uy_pxTKo=/148x0:1768x1080/1280x854/cdn.vox-cdn.com/uploads/chorus_image/image/47413330/the-simpsons-tv-series-cast-wallpaper-109911.0.0.jpeg',
        'https://i0.wp.com/dmdave.com/wp-content/uploads/2019/08/ralph-3945887244-1566174955905.jpg?fit=1196%2C673&ssl=1',
    ]

    return (
        <Section>
            <Text size={20}>Image Slide</Text>
            <div className='w-[25rem] h-[18.75rem]'>
                <ImageSlider images={images} />
            </div>
        </Section>
    )
}

const CheckboxDemo = () => {
    const [checked, setChecked] = useState(false)

    const handleCheckbox = () => {
        setChecked(!checked)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        alert(`체크 여부 : ${checked ? 'true' : 'false'}`)
    }

    return (
        <Section>
            <Text size={20}>Checkbox</Text>
            <form action='' onSubmit={handleSubmit} className='flex flex-col gap-sm'>
                <Checkbox checked={checked} onChange={handleCheckbox}>
                    <Text size={12}>체크하기</Text>
                </Checkbox>
                <SubmitButton text='확인' />
            </form>
        </Section>
    )
}

const GridDemo = () => {
    const [items, setItems] = useState(['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7'])
    const [count, setCount] = useState(items.length)

    const randomShuffleArray = (array: any[]): any[] => {
        return array.sort(() => Math.random() - 0.5)
    }

    return (
        <Section>
            <Text size={20}>Grid</Text>
            <div className='flex gap-md'>
                <Button
                    text='섞기'
                    handleOnClick={() => {
                        setItems(randomShuffleArray([...items]))
                    }}
                />
                <Button
                    text='처음에 추가'
                    handleOnClick={() => {
                        const newItemId = `item-${count + 1}`
                        setItems([newItemId, ...items])
                        setCount(count + 1)
                    }}
                />
                <Button
                    text='마지막에 추가'
                    handleOnClick={() => {
                        const newItemId = `item-${count + 1}`
                        setItems([...items, newItemId])
                        setCount(count + 1)
                    }}
                />
                <Button
                    text='처음 요소 삭제'
                    handleOnClick={() => {
                        const newItems = items.slice(1)
                        setItems(newItems)
                    }}
                />
            </div>
            <Grid items={items} />
        </Section>
    )
}

const DropdownDemo = () => {
    const [value, setValue] = useState<string | null>(null)

    const handleSelectDropdown = (text: string) => {
        setValue(text)
    }

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        alert(value)
    }

    return (
        <Section>
            <Text size={20}>Dropdown</Text>
            <form onSubmit={handleSubmit}>
                <div className='w-[12rem] h-[3rem]'>
                    <Dropdown placeholder='옵션을 선택하세요.' value={value}>
                        <DropdownItem text={'옵션1'} handleOnClick={handleSelectDropdown} icon={<PasswordIcon />} />
                        <DropdownItem text={'옵션2'} handleOnClick={handleSelectDropdown} />
                        <DropdownItem text={'옵션3'} handleOnClick={handleSelectDropdown} />
                    </Dropdown>
                </div>
                <SubmitButton text='확인' />
            </form>
        </Section>
    )
}

const LikeButtonDemo = () => {
    const [like, setLike] = useState<boolean>(false)
    const [likeCount, setLikeCount] = useState<number>(12)

    const handleLike = () => {
        setLike(!like)
        setLikeCount(likeCount + (like ? -1 : +1))
    }

    return (
        <Section>
            <Text size={20}>Like Button</Text>
            <LikeButton liked={like} onChange={handleLike}>
                <Text size={12} classList='select-none'>
                    좋아요 {likeCount}
                </Text>
            </LikeButton>
        </Section>
    )
}

const Section = ({ children }: SectionProps) => {
    return <section className='p-[2rem] flex flex-col border border-text-secondary items-center gap-lg'>{children}</section>
}

const SectionSpan = ({ text }: SectionTitleProps) => {
    return <span className='display-regular-12'>{text}</span>
}

const Button = ({ text, handleOnClick }: ButtonProps) => {
    return (
        <button className='display-regular-14 border-sm p-[0.25rem] bg-point-yellow' onClick={handleOnClick}>
            {text}
        </button>
    )
}

export default DemoPage
