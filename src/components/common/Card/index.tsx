import styled from "./card.module.scss";
import sample_img from '@img/sample.png';
import {MdOutlineRemoveRedEye} from 'react-icons/md';
import {IoMdHeartEmpty} from 'react-icons/io';
import tape from '@img/tape.png';
import {motion} from 'framer-motion';

type cardStyleProps = {
  img?: string; //수정예정
  tag?: string;
  info?: boolean;
  title?: string;
  content?: string;
  userId?: string;
  scrap?: number;
  like?: number;
  comment?: number;
  view?: number;
  none?: boolean;
};

export const SmallCard = ({
  img,
  tag,
  info,
  userId,
  title,
  content,
  scrap,
  like,
  comment,
  view,
  none,
}: cardStyleProps) => {
  return (
    <motion.div 
      initial={{y:100 ,opacity:0}}
      animate={{y:0 ,opacity:1}}
      exit={{y:-100 ,opacity:0}}
      transition={{
        duration: 0.5,
      }}
      whileHover={{
        scale: 1.07,
        transition: {duration: 0.3}
      }}
      className={styled.cardWrapper} 
      style={{ padding: "8px" }}>
      <div className={styled.img}>
        <img src={tape} alt="마스킹테이프" className={styled.tape}/>
        <img src={img} alt="img" className={styled.smallSize} />
      </div>
      {tag && (
        <div className={styled.tagContainer}>
          <p className={styled.tag}>{tag}</p>
        </div>
      )}
      {none && <div className={styled.margin} />}
      <p className={styled.title}>{title}</p>
      <p className={styled.title}>{content}</p>

      {info && (
        <div className={styled.userInfoContainer}>
          <div className={styled.user}>
            <p>{userId}</p>
          </div>

          <div className={styled.info}>
            {scrap && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{scrap}</p>
              </div>
            )}

            {like && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{like}</p>
              </div>
            )}
            {comment && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{comment}</p>
              </div>
            )}
            {view && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{view}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export const MediumCard = ({
  tag,
  info,
  userId,
  title,
  scrap,
  like,
  comment,
  none,
}: cardStyleProps) => {
  return (
    <div className={styled.cardWrapper} style={{ padding: "20px" }}>
      <div className={styled.img}>
        <img src={sample_img} alt="img" className={styled.mediumSize} />
      </div>
      {tag && (
        <div className={styled.tagContainer}>
          <p className={styled.tag}>{tag}</p>
        </div>
      )}
      {none && <div className={styled.margin} />}
      <p className={styled.title}>{title}</p>

      {info && (
        <div className={styled.userInfoContainer}>
          <div className={styled.user}>
            <p>{userId}</p>
          </div>
          <div className={styled.info}>
            {scrap && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{scrap}</p>
              </div>
            )}

            {like && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{like}</p>
              </div>
            )}
            {comment && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{comment}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const LargeCard = ({
  tag,
  info,
  userId,
  title,
  content,
  scrap,
  like,
  comment,
  view,
  none,
  img
}: cardStyleProps) => {
  return (
    <motion.div 
      initial={{y:100 ,opacity:0}}
      animate={{y:0 ,opacity:1}}
      exit={{y:-100 ,opacity:0}}
      transition={{
        duration: 0.5,
      }}
      className={styled.cardWrapper} 
      style={{ padding: "8px" }}>
      <div className={styled.img}>
        <img src={img || sample_img} alt="img" className={styled.largeSize} />
      </div>
      {tag && (
        <div className={styled.tagContainer}>
          <p className={styled.tag}>{tag}</p>
        </div>
      )}
      {none && <div className={styled.margin} />}
      <p className={styled.title}>{title}</p>
      <p className={styled.title}>{content}</p>

      {info && (
        <div className={styled.userInfoContainer}>
          <div className={styled.user}>
            <p>{userId}</p>
          </div>
          <div className={styled.info}>
            {scrap && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{scrap}</p>
              </div>
            )}

            {/* {like &&  */}
              <div className={styled.infoContents}>
                {/* <div className={styled.infoDeco} /> */}
                <IoMdHeartEmpty />
                <p>{like}</p>
              </div>
            {/* } */}
            {comment && (
              <div className={styled.infoContents}>
                <div className={styled.infoDeco} />
                <p>{comment}</p>
              </div>
            )}
            {/* {view && ( */}
              <div className={styled.infoContents}>
                {/* <div className={styled.infoDeco} /> */}
                <MdOutlineRemoveRedEye />
                <p>{view}</p>
              </div>
            {/* )} */}
          </div>
        </div>
      )}
    </motion.div>
  );
};
