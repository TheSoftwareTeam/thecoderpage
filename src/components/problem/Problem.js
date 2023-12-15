/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import Complaint from "../complaint/Complaint";
import { useNavigate, useParams } from "react-router-dom";
import "./scss/problem.scss";
import Comment from "./Comment";
import UserPicture from "./UserPicture";
import LikeCommend from "./LikeCommend";
const Problem = ({ problem }) => {
  const { id } = useParams();
  const {
    state,
    dispatch,
    writeProblemComment,
  } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: "newProblemComment", payload: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeProblemDetail]);

  useEffect(() => {
    state.isComplaintPage
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [state.isComplaintPage]);
  return (
    <div className="problem">
      {state.isComplaintPage && <Complaint key={problem.id} problemId={problem.id} userId={problem.userId}/>}

       

      
      <UserPicture key={problem.id} userId={problem.userId} createDate={problem.createDate}/>

      <div className={`problem-detail ${state.loadMoreButton ? "open" : ""}`}>
        <div className="problem-head-text"
        onClick={() => {
          dispatch({ type: "selectedCategory", payload: null });
          navigate(`/home/detailproblem/${problem.id}`);
        }}>
          <h4>{problem.isCompleted ? "✅ Çözüldü" : "❌ Çözüm aranıyor"}</h4>
          <h3> {problem.problemHead}</h3>
          <p >
            {id ? (
              problem.problemContent
            ) : (
              <>
                {problem.problemContent.length>250?problem.problemContent.slice(0, 250)+"...":problem.problemContent}
                <p className="click-to-detail">
                  Detayı görmek için tıklayınız.
                </p>
              </>
            )}
          </p>
        </div>

      <LikeCommend key={problem.id} problem={problem} />
        {id && (
          <div className="problem-write-comment">
            <textarea
              value={state.newProblemComment}
              onChange={(e) =>
                dispatch({
                  type: "newProblemComment",
                  payload: e.target.value,
                })
              }
              placeholder="Yorum yaz.."
            />
            <button
              disabled={state.newProblemComment.trim().length < 5}
              onClick={() => writeProblemComment(state.activeProblemDetail)}
            >
              Gönder
            </button>
          </div>
        )}

        {!id &&
          problem.comments
            .sort((a, b) => {
              const dateA = new Date(a.createDate);
              const dateB = new Date(b.createDate);
              return dateB - dateA;
            })
            .slice(0, 2)
            .map((comment) => <Comment key={comment.id} comment={comment} />)}

        {id &&
          problem.comments
            .sort((a, b) => {
              const dateA = new Date(a.createDate);
              const dateB = new Date(b.createDate);
              return dateB - dateA;
            })
            .map((comment) => <Comment key={comment.id} comment={comment} />)}

        {!id && problem.comments.length >= 3 ? (
          <p className="more-comments-p">
            +{problem.comments.length - 2} yorum daha{" "}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Problem;
