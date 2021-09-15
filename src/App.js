import Transaction from "./components/Transaction";
import './App.css'
import From from "./components/Form";
import {useState,useEffect} from 'react'
import DataContext from "./data/DataContext";
import Report from "./components/Report";
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";
 

function App() {

const design = {color:'green',textAlign:'center'}

/*สร้างstate ไว้เก็บค่าที่ได้จกการกรอกมาในฟอร์ม */
const [items,setItems] = useState([])


/*สร้าง state ไว้เอาค่ารายรับรายจ่ายไปคำนวณ */
const [reportIncome,setReportIncome] = useState(0)
const [reportExpense,setReportExpense] = useState(0)


/*ไว้รับข้อมูลจาก Form */
const onAddNewItem = (newItem) => {
    setItems((prevItem)=>{
      return [newItem,...prevItem]
    })
}

/*สร้าง effect ไว้้ดักจับ items เช็ครายรับรายจ่าย */
useEffect(()=>{
   const amount = items.map(items=>items.amount)
   const income = amount.filter(element=>element>0).reduce((total,element)=>total+=element,0)
   const expense = (amount.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1
   setReportIncome(income.toFixed(2))
   setReportExpense(expense.toFixed(2))
},[items,reportIncome,reportExpense])

return (
    <DataContext.Provider value={{income :reportIncome,expense : reportExpense } }>
      <div className="container">
        <h2 style={design}>แอพบัญชีรายรับ - รายจ่าย</h2>

      <Router>
       <div>
          <ul className="horizontal-menu">
              <li>
                  <Link to="/">ข้อมูลบัญชี</Link>
             </li>
             <li>
                  <Link to="/insert">บันทึกข้อมูล</Link>
              </li>
          </ul>

          <Switch>
             <Route path="/" exact>
                   <Report/>  {/*การเรียกใช้ ReportComponent showReport ต้องเป็น true*/}
             </Route>
              <Route path="/insert" >
                 <From onAddItem ={onAddNewItem}/>
                 <Transaction items = {items}/> {/*สร้าง props items ส่งไปที่ transaction */}
              </Route>
           </Switch>

         </div>
      </Router>

     </div>
    </DataContext.Provider>
  
  );
}

export default App;
