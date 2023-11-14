import { ReactNode, useEffect, useState } from 'react'
import Modal from '../../../components/modal/modal'
import SubmitButton from '../../../components/button/submitButton'
import Input from '../../../components/input/input'
import PasswordIcon from '../../../assets/icons/passwordIcon.svg?react'
import Menu from '../../../components/menu/menu'
import Fade from '../../../components/transition/fade'
import {
    bottomFadeinAnimation,
    bottomFadeoutAnimation,
    leftFadeinAnimation,
    leftFadeoutAnimation,
} from '../../../components/transition/animation'
import Switch from '../../../components/transition/switch'

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
        <div className="w-[30rem] flex flex-col h-center mt-10 gap-xl mt-xl mb-xl">
            <ModalDemo />
            <SubmitButtonDemo />
            <InputDemo />
            <MenuDemo />
            <FadeDemo />
            <SwitchDemo />
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
            <SectionTitle text="Modal" />
            <Button text="열기" handleOnClick={handleModalOpen} />
            <Modal isOpen={isModalOpen} setOpen={handleModalClose}>
                <div className="flex flex-col items-center justify-evenly w-[10rem] h-[6rem]">
                    <span>모달 테스트</span>
                    <Button text="닫기" handleOnClick={handleModalClose} />
                </div>
            </Modal>
        </Section>
    )
}

const SubmitButtonDemo = () => {
    return (
        <Section>
            <SectionTitle text="Submit Button" />
            <SubmitButton text="클릭" handleOnClick={() => alert('클릭')} />
        </Section>
    )
}

const InputDemo = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    return (
        <Section>
            <SectionTitle text="Input" />
            <Input type="text" setValue={setEmail} placeholder="이메일을 입력하세요" />
            <Input
                type="password"
                setValue={setPassword}
                icon={<PasswordIcon />}
                placeholder="비밀번호를 입력하세요"
            />
            <SectionSpan text={email} />
            <SectionSpan text={password} />
        </Section>
    )
}

const MenuDemo = () => {
    const categorys = ['카테고리1', '카테고리2', '카테고리3']
    const [index, setIndex] = useState(0)

    return (
        <Section>
            <SectionTitle text="Menu" />
            <Menu menuIndex={index} setMenuIndex={setIndex} categorys={categorys} />
            <SectionSpan text={`현재 인덱스: ${index}`} />
        </Section>
    )
}

const FadeDemo = () => {
    const [showDemo1, setDemo1] = useState(false)
    const [showDemo2, setDemo2] = useState(false)

    return (
        <Section>
            <SectionTitle text="Transition Fade" />
            <Button text="bottom up" handleOnClick={() => setDemo1(!showDemo1)} />
            <div className="h-[2rem]">
                <Fade fadeIn={bottomFadeinAnimation} fadeOut={bottomFadeoutAnimation}>
                    {showDemo1 && <SectionSpan text="텍스트" />}
                </Fade>
            </div>
            <Button text="left to right" handleOnClick={() => setDemo2(!showDemo2)} />
            <div className="h-[2rem]">
                <Fade fadeIn={leftFadeinAnimation} fadeOut={leftFadeoutAnimation}>
                    {showDemo2 && <SectionSpan text="텍스트" />}
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
            <SectionTitle text="Transition Switch" />
            <Menu menuIndex={index} setMenuIndex={setIndex} categorys={categorys} />
            <Switch height={100} width={300} direction={direction} dynamic={oldIndex}>
                <div className="flex flex-col justify-center items-center">
                    <SectionSpan text={`현재 인덱스: ${index}`} />
                </div>
            </Switch>
        </Section>
    )
}

const Section = ({ children }: SectionProps) => {
    return (
        <section className="p-[2rem] flex flex-col border border-text-secondary items-center gap-lg">
            {children}
        </section>
    )
}

const SectionTitle = ({ text }: SectionTitleProps) => {
    return <p className="display-regular-20">{text}</p>
}

const SectionSpan = ({ text }: SectionTitleProps) => {
    return <span className="display-regular-12">{text}</span>
}

const Button = ({ text, handleOnClick }: ButtonProps) => {
    return (
        <button
            className="display-regular-14 border-sm p-[0.25rem] bg-point-yellow"
            onClick={handleOnClick}
        >
            {text}
        </button>
    )
}

export default DemoPage
