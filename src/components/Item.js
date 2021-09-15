import PropTypes from 'prop-types'; 
import './Item.css'


const Item = (props) => {

    const formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    // const name = useContext(DataContext)

    const {title,amount} = props
    const status = amount<0 ? "expense" : "income" /* เป็นจริงรายจ่าย เท็จรายรับ */
    const symbol = amount<0 ? "-" : "+"
    return (
        <li className={status}>{title} <span>{symbol}{formatNumber(Math.abs(amount))}</span>
            {/* {name} */}
        </li>
    )
}

Item.propTypes = {
    title:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item