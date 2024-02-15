import React from 'react';
import './blog.css'

const Blog = ({ title, imageUrl, content }) => {
  return (
    <div className="blog">
        <img className="image_blog"src={imageUrl} alt={title} />
      
      <div className='childdiv'>
      <p className='title'>{title}</p>
    <p className='content'>{content}</p>
      </div>
      
    </div>
  );
};

export default Blog;
