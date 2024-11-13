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
import { authClient } from '@/libs/auth-client';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: 'misaki',
      email: 'misaki@mail.com',
      password: '123456',
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { name, email, password } = values;

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {},
        onSuccess: () => {
          toast.success('Registered!');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="歡迎來到 Havenly" subtitle="創建帳戶！" />
      <Input id="email" label="電子郵件" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="姓名" disabled={isLoading} register={register} errors={errors} required />
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
          已經有帳戶了嗎？
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {' '}
            登入
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="註冊"
      actionLabel="繼續"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
