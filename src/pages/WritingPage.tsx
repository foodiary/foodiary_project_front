import React, { FormEvent, useCallback, useEffect, useState } from "react";
import styles from "@styles/writingPage.module.scss";
import styled from "../components/common/AlertBox/alertBox.module.scss";
import { LoginButton } from "@components/common/LoginButton/Button";
import InputFile from "@components/common/InputFile/InputFile";
import { useImgFileStore } from "@store/fileStore";
import axiosConfig from "@utils/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginUserStore } from "@store/loginUserStore";
import camera_icon from "@img/camera_icon.svg";
import { AlertBox } from "@components/common/AlertBox/AlertBox";
import { MdCancel } from "react-icons/md";
import DecoTitle from "@components/common/DecoTitle/DecoTitle";
import { FiAlertTriangle } from "react-icons/fi";

interface WritingPageProps {
  edit: boolean;
}

interface ResType {
  dailyBody: string;
  dailyComment: number;
  dailyCreate: string;
  dailyLike: number;
  dailyImageList: string[];
  dailyTitle: string;
  dailyView: number;
  dailyWriter: string;
  memberId: number;
  userCheck: boolean; //본인이 쓴 글인지
}

const WritingPage = ({ edit }: WritingPageProps) => {
  const navigate = useNavigate();

  const fileURL = useImgFileStore((state) => state.fileURL);
  const setFileUrl = useImgFileStore<any>((state) => state.setFileURL);
  const img = useImgFileStore<any>((state) => state.img);
  const setImg = useImgFileStore<any>((state) => state.setImg);
  const memberLoginId = useLoginUserStore(
    (state) => state.userInfo.memberLoginId
  );
  const memberId = useLoginUserStore((state) => state.userInfo.memberId);

  const [title, setTitle] = useState<string | undefined>("");
  const [content, setContent] = useState<string | undefined>("");
  const [error, setError] = useState(false);
  const [contents, setContents] = useState<ResType>();
  const [success, setSuccess] = useState(false);
  const [deleteImages, setDeleteImages] = useState([]);
  const [isImgOver, setImgOver] = useState(false);
  const [isImg, setIsImg] = useState(false);

  const id = useParams().id;

  const getContents = useCallback(() => {
    axiosConfig
      .get(`/dailys/details`, {
        params: { dailyId: id, memberId: memberId },
      })
      .then((res) => {
        console.log(res);
        setContents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (edit) {
      getContents();
    } else {
      setFileUrl([]);
      setImg([]);
    }
  }, []);

  useEffect(() => {
    if (contents) {
      setFileUrl(contents?.dailyImageList);
    }
    setImg([]);
  }, [contents]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> &
      React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };
  const writeInfo = {
    title: title,
    content: content,
    write: memberLoginId,
    memberId: memberId,
  };

  let formData = new FormData();
  for (let i = 0; i < img.length; i++) {
    formData.append("dailyImage", img[i]);
  }
  formData.append(
    "dailyWrite",
    new Blob([JSON.stringify(writeInfo)], {
      type: "application/json",
    })
  );
  const cancelError = () => {
    setTimeout(() => {
      setError(false);
      setImgOver(false);
      setIsImg(false);
    }, 1000);
  };

  const onSubmit = (e: FormEvent) => {
    if (img.length > 0) {
      if (fileURL.length > 5) {
        e.preventDefault();
        setImgOver(true);
        setError(true);
        cancelError();
      } else {
        e.preventDefault();
        setSuccess(false);
        const headers = { "Content-Type": "multipart/form-data" };
        axiosConfig
          .post("/daily", formData, { headers })
          .then((res) => {
            console.log(res);
            setSuccess(true);
            setTimeout(() => {
              navigate("/explore");
            }, 1000);
            setImg([]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setImg([]);
      e.preventDefault();
      setIsImg(true);
      setError(true);
      cancelError();
    }
  };

  const editWriteInfo = {
    title: title || contents?.dailyTitle,
    content: content || contents?.dailyBody,
    deletePath: deleteImages.length > 0 ? deleteImages : null,
  };

  let editFormData = new FormData();
  editFormData.append(
    "dailyEdit",
    new Blob([JSON.stringify(editWriteInfo)], {
      type: "application/json",
    })
  );
  for (let i = 0; i < img.length; i++) {
    editFormData.append("dailyImage", img[i]);
  }

  const onEdit = (e: FormEvent) => {
    if (fileURL.length > 0) {
      if (fileURL.length > 5) {
        e.preventDefault();
        setImgOver(true);
        setError(true);
        cancelError();
        setDeleteImages([]);
      } else {
        e.preventDefault();
        setDeleteImages([]);
        setSuccess(true);
        const headers = { "Content-Type": "multipart/form-data" };
        axiosConfig
          .post(`/daily/${id}/${memberId}`, editFormData, { headers })
          .then((res) => {
            console.log(res);
            setTimeout(() => {
              navigate(`/detail/${id}`);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      e.preventDefault();
      setDeleteImages([]);
      setIsImg(true);
      setError(true);
      cancelError();
    }
  };

  const deleteImage = (url: string, index: number) => () => {
    setFileUrl(fileURL.filter((fileurl) => fileurl !== url));
    const delImg: any = [...deleteImages];
    delImg.push(url);
    setDeleteImages(delImg);
  };

  return (
    <div>
      <form onSubmit={edit ? onEdit : onSubmit} encType="multipart/form-data">
        <div className={styles.write_container}>
          <DecoTitle title={`하루 공유 글 ${edit ? "수정" : "작성"}`} />
          <input
            type="text"
            placeholder="제목"
            className={styles.title}
            name="title"
            onChange={onChange}
            value={title || contents?.dailyTitle}
          />
          <textarea
            placeholder="오늘 하루 먹은 음식을 기록해보세요!"
            name="content"
            onChange={onChange}
            value={content || contents?.dailyBody}
          />
          <div className={styles.file}>
            <label htmlFor="file">
              <img
                src={camera_icon}
                alt="카메라아이콘"
                className={styles.camera_icon}
              />
              사진 등록하기
            </label>
            <InputFile multiple={true} />
          </div>
          <div className={styles.imgBox}>
            {fileURL.length > 0
              ? fileURL.map((el, index) => {
                  console.log(el);
                  return (
                    <div className={styles.imageFileBox}>
                      <img
                        src={el}
                        alt="첨부파일"
                        className={styles.attach_img}
                      />
                      <button type="button" onClick={deleteImage(el, index)}>
                        <MdCancel />
                      </button>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        <LoginButton
          text="작성 완료"
          type="submit"
          active={edit || (title && content) ? true : false}
        />
      </form>
      {success && (
        <AlertBox
          text={`글이 ${edit ? "수정" : "등록"} 되었습니다.`}
          type={true}
        />
      )}
      {error && (
        <div className={styled.modal_back}>
          <div className={`${styled.alert_box}`}>
            <div className={styled.alert_icon}>
              <FiAlertTriangle />
            </div>
            {isImgOver && <p>이미지는 5장 이하로 첨부 가능합니다!</p>}
            {isImg && <p>한 장 이상의 이미지를 첨부해주세요!</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default WritingPage;
