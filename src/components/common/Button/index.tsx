interface IButtonProps {
  btnStyle: string;
  onClick: () => void;
  text: string;
}

const Button = ({ btnStyle, onClick, text }: IButtonProps) => {
  return (
    <button className={btnStyle} onClick={onClick}>
      <span>{text}</span>
    </button>
  );
};

export default Button;
