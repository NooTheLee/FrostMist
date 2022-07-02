import "./Menu.css";

const Menu = ({onClick}) => (
    <div className='Menu'>
        <button className='Button' onClick={onClick}>
            Play Tetris
        </button>
    </div>
);

export default Menu;
