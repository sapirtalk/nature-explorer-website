// src/app/articles/page.js
import React from 'react';
import Articles from '../../components/Articles';

const ArticlesPage = () => {
  return (
    <div>
      <header className='text-center text-text text-2xl lg:text-[30px] font-bold'>כתבות</header>
      <br/>
      <Articles />
    </div>
  );
};

export default ArticlesPage;