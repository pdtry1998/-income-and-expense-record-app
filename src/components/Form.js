import { useState } from 'react';
import './Form.css'
import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';

const From = (props)=>{
    console.log("Render Form Componenrt");
    
    /*สร้างstate */
    const [title,setTitle] = useState("")
    const[amount,setAmount] = useState(0)
    /*สร้างstate สถานะการกดเพิ่มข้อมูลในแบบฟอร์ม */
    const [formValid,setFormValid]= useState(false)
    /*สร้างevent */
    const inputTitle = (event) => {
        setTitle(event.target.value); /*กำหนดค่าให้ state title (ค่าที่กรอก) */
    }
    const inputAmount = (event) => {
        setAmount(event.target.value);/*กำหนดค่าให้ state amount (ค่าที่กรอก) */
    }
    const saveItem = (event) => {
        event.preventDefault()    /*เพื่อให้เวลากดซับมิดไม่รีเฟสใหม่ */
        const itemData = {   /*เมื่อกด เพิ่มข้อมูล จะดึงข้อมูลมาจาก state title,amount มาเก็บไว้ใน itemdata  */
            id:uuidv4(),
            title:title,
            amount:Number(amount)

        }
        props.onAddItem(itemData)
        setTitle('')   /* กำหนดเป็นค่าเริ่มต้นเพราะได้ค่าที่กรอกมาแล้ว */
        setAmount(0)   /* กำหนดเป็นค่าเริ่มต้นเพราะได้ค่าที่กรอกมาแล้ว */
    }

    useEffect(()=>{
        const checkData = title.trim().length>0 && amount!==0
       
        setFormValid(checkData)
        
    },[title,amount])

    return (
        <div>
            <form onSubmit={saveItem}>
                <div className="from-control">
                    <label>ชื่อรายการ</label>
                    <input type="text" placeholder="ระบุชื่อรายการของคุณ" onChange={inputTitle} value={title} />  {/*value ให้ค่าในแบบฟอมเปลี่ยนเป็นค่าเริ่มต้นด้วย */}
                </div>
                <div className="from-control">
                    <label>จำนวนเงิน</label>
                    <input type="number" placeholder="(+ รายรับ , - รายจ่าย)" onChange={inputAmount} value={amount} /> {/*value ให้ค่าในแบบฟอมเปลี่ยนเป็นค่าเริ่มต้นด้วย */}
                </div>
                <div>
                    <button type="submit" className="btn" disabled={!formValid} >เพิ่มข้อมูล</button>
                </div>

            </form>
        </div>
    )
}

export default From