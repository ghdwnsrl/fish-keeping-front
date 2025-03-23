import Form from "../../components/Form.jsx";
import Input from "../../components/Input.jsx";
import {IoLockClosed, IoMail} from "react-icons/io5";
import {join} from "../../api/user.js";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import Button from "../../components/Button.jsx";
import {useMutation} from "@tanstack/react-query";
import LazyNavLink from "../../components/LazyNavLink.jsx";

const JoinPage = () => {
    const { register, watch, handleSubmit, getValues, setFocus, setError, reset, formState: { errors}} = useForm();
    const navigate = useNavigate();
    const isDisabled = watch(["ageAgree", "termsAgree", "privacyAgree"]).every(Boolean);
    const { mutate : joinUser } = useMutation({
        mutationFn: join,
        onSuccess: () => navigate('/login'),
        onError : (error) => {
            console.log(error)
            if (error.response && error.response.status === 400) {
                setError('root.serverError', {
                    type: error.response.status,
                    message: error.response.data.message
                })
            }
        }
    })

    const onSubmit = (data) => {
        joinUser(data);
    }

    useEffect(() => {
        setFocus('username')
    }, [setFocus]);

    return (
        <Form title='회 원 가 입'
              styleType='container flex flex-col h-56 items-center justify-center mt-36 gap-2'
              handleSubmit={handleSubmit(onSubmit)}
        >
            <div className="border rounded-xl p-4 flex flex-col items-start space-y-1 w-96">
                <div className='flex items-center space-x-1'>
                    <input
                        type="checkbox"
                        id="ageAgree"
                        {...register("ageAgree")}
                        className="w-4 h-4 bg-red-500"
                    />
                    <label htmlFor="ageAgree">만 14세 이상입니다. <span className='text-red-500'>(필수)</span></label>
                </div>
                <div className='flex items-center space-x-1'>
                    <input
                        type="checkbox"
                        id="termsAgree"
                        {...register("termsAgree")}
                        className="w-4 h-4"
                    />
                    <label htmlFor="termsAgree">
                        <LazyNavLink
                            key="terms"
                            to="/terms"
                            className='font-semibold hover:text-gray-500'
                            preloadModule={() => import('../../pages/TermPage/index.jsx')}
                            target="_blank"
                        >
                            서비스 이용약관
                        </LazyNavLink>
                        을 모두 읽었으며 동의합니다. <span className='text-red-500'>(필수)</span></label>
                </div>
                <div className='flex items-center space-x-1'>
                    <input
                        type="checkbox"
                        id="privacyAgree"
                        {...register("privacyAgree")}
                        className="w-4 h-4"
                    />
                    <label htmlFor="privacyAgree">
                        <LazyNavLink
                            key="privacy"
                            to="/privacy"
                            className='font-semibold hover:text-gray-500'
                            preloadModule={() => import('../PrivacyPage/index.jsx')}
                            target="_blank"
                        >
                            개인정보처리방침
                        </LazyNavLink>
                        에 모두 읽었으며 동의합니다. <br/><span className='text-red-500'>(필수)</span>
                    </label>
                </div>
            </div>
            <Input placeholder='아이디'
                   name='username'
                   register={register}
                   condition={{
                       required: true,
                       pattern: {
                           value: /^[a-zA-Z0-9]+$/,
                           message: '영문자와 숫자만 입력 가능합니다.'
                       }
            }}>
                <IoMail className="text-2xl mr-2"/>
            </Input>
            {errors.username && <p className='text-red-600 text-xs'>{errors.username.message}</p>}
            <Input placeholder='비밀번호'
                   name='password'
                   type='password'
                   register={register}
                   condition={{
                               required: '비밀번호를 입력해주세요.',
                               pattern: {
                                   value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,12}$/,
                                   message: '비밀번호는 8~12자 사이로, 영문자, 숫자, 특수문자가 모두 포함되어야 합니다.'
                               }
            }}>
                <IoLockClosed className="text-2xl mr-2"/>
            </Input>
            {errors.password && <p className='text-red-600 text-xs'>{errors.password.message}</p>}
            <Input placeholder='비밀번호 재확인'
                   name='confirmPassword'
                   type='password'
                   register={register}
                   condition={{required: '비밀번호를 다시 입력해주세요.',
                               validate: {
                                   matchesPassword: (value) => {
                                       const { password } = getValues();
                                       return value === password || '비밀번호와 일치하지 않습니다.'
                                   }
                               }}}
            >
                <IoLockClosed className="text-2xl mr-2"/>
            </Input>
            {errors.confirmPassword && <p className='text-red-600 text-xs'>{errors.confirmPassword.message}</p>}
            <Button type='submit' disabled={!isDisabled} styleType='w-96 w-max:32'>확 인</Button>
            {errors.root?.serverError && (
                <p className='text-red-600 text-xs'>{errors.root.serverError.message}</p>
            )}
        </Form>
    )
}

export default JoinPage;