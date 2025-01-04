'use client';
import React from 'react';
import { Dialog } from '@headlessui/react';
import { useForm, FieldError } from 'react-hook-form';
import { AiOutlineUser, AiOutlinePhone } from 'react-icons/ai';
import toast from 'react-hot-toast';

interface RequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

// Define the form data structure
interface FormData {
  name: string;
  phone: string;
}

const RequestDialog: React.FC<RequestDialogProps> = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Запрос успешно отправлен!');
        onClose();
      } else {
        toast.error('Ошибка при отправке запроса.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      toast.error('Ошибка при отправке запроса.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 flex items-center justify-center overflow-y-auto"
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" aria-hidden="true" />
      <div className="relative max-w-[90vw] bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full  mx-auto p-6">
        <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100 text-center">
          Отправить запрос
        </Dialog.Title>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Имя
            </label>
            <div className="relative mt-1">
              <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                {...register('name', { required: 'Имя обязательно' })}
                className="w-full pl-10 px-4 py-2 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Номер телефона
            </label>
            <div className="relative mt-1">
              <AiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                {...register('phone', {
                  required: 'Номер телефона обязателен',
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: 'Введите корректный номер телефона',
                  },
                })}
                className="w-full pl-10 px-4 py-2 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone.message as string}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            >
              Отправить запрос
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default RequestDialog;