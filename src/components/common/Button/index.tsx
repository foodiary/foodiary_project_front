import {motion} from 'framer-motion';

interface IButtonProps {
  btnStyle: string;
  onClick: () => void;
  text: string;
}

const Button = ({ btnStyle, onClick, text }: IButtonProps) => {
  return (
    <motion.button 
      whileHover={{
        scale: 1.1,
        transition: {duration: 0.3}
      }}
      className={btnStyle} onClick={onClick}>
      <span>{text}</span>
    </motion.button>
  );
};

export default Button;
