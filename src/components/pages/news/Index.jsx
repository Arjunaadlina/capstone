import React, { useEffect, useState } from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData } from '../../../redux/thunk';
import '../../../assets/css/skleton.css';

const News = () => {
    const dispatch = useDispatch();
    const articles = useSelector((state) => state.newsData);
    const loadingNews = useSelector((state) => state.loadingNews);

    useEffect(() => {
        if(articles.length === 0) {
            dispatch(fetchNewsData());
        }
    }, [dispatch]);

    if (loadingNews) {
        return (
            <div className='mt-20 sm:px-16 md:px-32 px-8'>
                <div className="skeleton skeleton-hero"></div>
                <div className="skeleton skeleton-content1"></div>
                <div className="skeleton skeleton-content2"></div>
                <div className="skeleton skeleton-content3"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-32 md:mt-8 mt-8">
            {articles.map((article, index) => (
                <Card
                    key={index}
                    image={article.multimedia[0]?.url ? `https://www.nytimes.com/${article.multimedia[0].url}` : null}
                    title={article.headline.main}
                    summary={article.abstract}
                    customStyle={
                        index === 0
                        ? 'md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2'
                        : index === 1
                        ? 'md:col-span-3 md:row-span-3 sm:col-span-2 sm:row-span-2 lg:col-span-1 lg:row-span-1' 
                        : index === 7 
                        ? 'md:col-span-2 md:row-span-1 sm:col-span-2 sm:row-span-2' 
                        : 'md:col-span-1 sm:col-span-1'
                    }
                    imageCustomStyle={
                        index === 0 ? 'h-96' :
                        index === 7 ? 'h-96' :
                        index === 6 ? 'h-96' :
                        'h-48'
                    }
                />
            ))}
        </div>
    );
};

export default News;
