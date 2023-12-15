import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';
import PostImage from './PostImage';

const PostWrite = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    const navigate = useNavigate();
    const user = useSelector((state) => state.user)

    useEffect(() => {
        if (!user.accessToken) {
            alert("로그인한 회원만 글을 작성할 수 있습니다.");
            navigate("/login");
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if (title === "" || content === "") {
            return alert("전부 작성해주세요.")
        }

        let body = {
            title: title,
            content: content,
            image: image,
            uid: user.uid
        }

        axios
            .post("/api/post/write", body)
            .then((response) => {
                if (response.data.success) {
                    alert("글 작성이 완료되었습니다.")
                    navigate("/list")
                } else {
                    alert("글 작성에 실패하셨습니다.")
                }
            })
    }

    return (
        <div>
            <div className='write__wrap'>
                <div className='write__header'>
                    <h2> 게시글 작성 </h2>
                </div>
                <form>
                    <fieldset>
                        <legend className="blind">게시글 작성 영역</legend>
                        <div>
                            <label htmlFor="title" className="required blind">제목</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="제목을 작성해 주세요"
                                autoComplete="off"
                                className="input__style"
                                required
                                onChange={(e) => {
                                    setTitle(e.currentTarget.value)
                                }}
                            />
                        </div>
                        <div>
                            <label htmlFor="content" className="required blind">내용</label>
                            <textarea
                                id="content"
                                placeholder="게시글을 작성해 주세요"
                                className="input__style"
                                required
                                onChange={(e) => {
                                    setContent(e.currentTarget.value)
                                }}
                            />
                        </div>

                        <PostImage setImage={setImage} />

                        <button
                            type="submit"
                            className="write__btn mt30"
                            onClick={(e) => {
                                onSubmit(e);
                            }}
                        >작성하기</button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PostWrite
