import styled from "./card.module.scss";
import sample_img from '@img/sample.png';

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
    <div className={styled.cardWrapper} style={{ padding: "8px" }}>
      <div className={styled.img}>
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
    </div>
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
    <div className={styled.cardWrapper} style={{ padding: "8px" }}>
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

            {like !== 0 && (
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
    </div>
  );
};
