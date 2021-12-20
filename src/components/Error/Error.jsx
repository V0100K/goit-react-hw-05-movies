import errorPic from '../../img/error.gif';
import s from './Error.module.css';

const Error = () => {
    return (
        <div className={s.errorWrapper}>
            <img className={s.errorImg} src={errorPic} alt="" />
            <p className={s.errorDesc}>Извините, по Вашему запросу ничего не найдено!</p>
        </div>
    )
}

export default Error;