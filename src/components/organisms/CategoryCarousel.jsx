import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from '@trendyol-js/react-carousel';

import { Grid, Text, CategoryTile } from 'components';
import { useNavigate } from 'react-router-dom';

const CategoryCarousel = (props) => {
  const { label, categories } = props;
  const navigate = useNavigate();

  return (
    <Grid padding="0px 5px 0px 5px">
      <Grid padding="0px 19px 0px 19px" margin="0px 0px 16px 0px">
        <Text bold size="20px">
          {label}
        </Text>
      </Grid>
      <Carousel
        show={2.15}
        slide={2}
        swiping={true}
        leftArrow={false}
        rightArrow={false}
        // showIndicators={false}
        // emulateTouch
        // showArrows={false}
        // showStatus={false}
        // preventMovementUntilSwipeScrollTolerance
        // centerMode
        // showThumbs={false}
        // transitionTime={300}
        // centerSlidePercentage={45}
      >
        {categories.map((cat, index) => {
          return (
            <CategoryTile
              key={index}
              category={cat.category}
              categoryImageUrl={cat.categoryImageUrl}
              onClick={() => {
                if (cat.category.indexOf('/') === -1) {
                  navigate('/list/' + cat.category);
                } else {
                  const uriParam = cat.category.replace('/', '');
                  navigate('/list/' + uriParam);
                }
              }}
            />
          );
        })}
      </Carousel>
    </Grid>
  );
};

CategoryCarousel.propTypes = {
  label: PropTypes.string,
  categories: PropTypes.array,
};

CategoryCarousel.defaultProps = {
  label: '제목',
  categories: [
    {
      category: '직장생활',
      categoryImageUrl: '/asset/image/category/office.png',
    },
    {
      category: '학교생활',
      categoryImageUrl: '/asset/image/category/school.png',
    },
    {
      category: '관계/심리',
      categoryImageUrl: '/asset/image/category/relation.png',
    },
    {
      category: '일상생활',
      categoryImageUrl: '/asset/image/category/office.png',
    },
    {
      category: '시사/이슈',
      categoryImageUrl: '/asset/image/category/trends.png',
    },
    {
      category: '기타',
      categoryImageUrl: '/asset/image/category/etc.png',
    },
  ],
};

export default CategoryCarousel;
