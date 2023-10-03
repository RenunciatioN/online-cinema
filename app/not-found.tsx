import Layout from '@components/Layout/Layout';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
	title: `Page not found`,
};

const NotFound404:FC = () => {
  return (
   
      <div className='text-2xl font-bold p-6'>404 - Страница не найдена</div>
    
  )
}
export default NotFound404