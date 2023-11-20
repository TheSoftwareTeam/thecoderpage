import React from 'react';
import Banner from './Banner';
import Menu from '.menu/Menu';
import PopularProblems from './PopularProblems';
import LoadMoreButton from './LoadMoreButton';
import "./main.scss"
import ListProblem from '../problem/ListProblem';

const Main = () => {
  return (
    <div>
      <Banner />
      <Menu/>
      <PopularProblems />
      <ListProblem />
      <LoadMoreButton />
    </div>
  );
};

export default Main;