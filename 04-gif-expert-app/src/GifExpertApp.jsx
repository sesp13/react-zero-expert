import { useState } from 'react';
import { AddCategory } from './components/AddCategory';
import { GifGrid } from './components/GifGrid';

export const GifExpertApp = () => {
  const [categories, setCategories] = useState(['One Punch', 'Shrek']);

  const onAddCategory = (newCategory) => {
    if (categories.includes(newCategory)) return;
    const newCategories = [newCategory, ...categories];
    setCategories(newCategories);
  };

  return (
    <>
      <h1>GifExpertApp</h1>
      <AddCategory onNewCategory={onAddCategory} />
      {categories.map((category) => (
        <GifGrid category={category} key={category} />
      ))}
    </>
  );
};
