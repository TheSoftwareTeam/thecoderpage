import "./main.scss";
import Menu from "../menu/Menu";
import PopularProblems from "../problem/PopularProblems";
import Banner from "../banner/Banner";
import ListProblem from "../problem/ListProblem";
import { IoIosArrowUp } from "react-icons/io";
import { useEffect, useState } from "react";
const Main = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);
  return (
    <div id="main">
      <Banner />
      <Menu />
      <PopularProblems />
      <div className="main-line">
        <ListProblem />
      </div>
      {isVisible && (
        <button  onClick={scrollToTop}className="scrollToTop">
          <IoIosArrowUp />
        </button>
      )}
    </div>
  );
};

export default Main;
