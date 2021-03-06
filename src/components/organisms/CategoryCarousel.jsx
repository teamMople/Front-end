import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Text, CategoryTile } from 'components';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
      <HorizontalScrollWrapper>
        <div>
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
        </div>
      </HorizontalScrollWrapper>
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

const HorizontalScrollWrapper = styled.div`
  overflow-x: auto;
  > div {
    display: flex;
    column-gap: 8px;
    > div {
      min-width: 160px;
      max-width: 160px;
    }
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export default CategoryCarousel;
