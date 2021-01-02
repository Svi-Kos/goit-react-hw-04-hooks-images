import s from '../Button/Button.module.css';
import PropTypes from 'prop-types';

const Button = props => (
  <div className={s.centered}>
    <button type="button" className={s.Button} onClick={props.onLoadMore}>
      Load More
    </button>
  </div>
);

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
