'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/hooks/useRegisterModal';
import Modal from './Modal';
import Button from '../Button';
import Heading from '../Heading';
import Input from '../inputs/Input';
import useLoginModal from '@/hooks/useLoginModal';
import { useRouter } from 'next/navigation';
import { authClient } from '@/libs/auth-client';

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { email, password } = values;
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          setIsLoading(false);
          toast.success('登入成功');
          router.refresh();
          loginModal.onClose();
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      }
    );
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="歡迎來到 Havenly" subtitle="登入您的帳戶！" />
      <Input id="email" label="電子郵件" disabled={isLoading} register={register} errors={errors} required />

      <Input
        id="password"
        label="密碼"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="使用 Google 繼續" icon={FcGoogle} onClick={() => {}} />
      <Button outline label="使用 Github 繼續" icon={AiFillGithub} onClick={() => {}} />
      <div
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>
          第一次使用 Havenly？
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            創建帳戶
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="登入"
      actionLabel="繼續"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
