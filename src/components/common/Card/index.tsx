import styled from "./card.module.scss";

type cardStyleProps = {
  img?: string; //수정예정
  tag?: string;
  info?: boolean;
  title?: string;
  userId?: string;
  scrap?: number;
  like?: string | number;
  comment?: string | number | undefined;
  none?: boolean;
};

export const SmallCard = ({
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
    <div className={styled.cardWrapper} style={{ padding: "8px" }}>
      <div className={styled.img}>
        <img src="/img/sample.png" alt="img" className={styled.smallSize} />
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
        <img src="/img/sample.png" alt="img" className={styled.mediumSize} />
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
  scrap,
  like,
  comment,
  none,
}: cardStyleProps) => {
  return (
    <div className={styled.cardWrapper} style={{ padding: "8px" }}>
      <div className={styled.img}>
        <img src="/img/sample.png" alt="img" className={styled.largeSize} />
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
