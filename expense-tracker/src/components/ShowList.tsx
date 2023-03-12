import { useEffect,useState } from "react";
import IDataList from "../model/IDataList";
import { getDataFromServer } from "../service/menu";
import ExpenseTracker from "./ExpenseTracker";
 function ShowData(){
    const[items,setItems]= useState<IDataList[]>([]);
    const[error,seterror]= useState<Error | null>(null);
    const[sum,setSum]= useState<number | null>(0);
    const[rahulspent,setRahulspent]=useState<number>(0);
    const[rameshspent,setRameshspent]=useState<number>(0);
    const[showform,setshowform]=useState<boolean>(false);
      
    var rahulspent1 :number=0;
    var rameshspent1: number=0; 
    useEffect(()=>{
     const fetchMenu =async()=>{
           try{
            const data= await getDataFromServer();
            setItems(data);
            setSum(data.reduce((result,v) =>(result + v.price),0))
            shares(data)

           }catch(error:any){
               seterror(error)
           }
     }
     fetchMenu()
    },[])
    const shares=(data :IDataList[])=>{
        data.map((sams)=>
        sams.payeeName==="Rahul" ? (rahulspent1=rahulspent1+sams.price):
        (rameshspent1=rameshspent1+sams.price)
        );
         setRahulspent(rahulspent1);
         setRameshspent(rameshspent1);
    }
    return(
        <>
        <header id="page-header ">Expense Tracker</header>
        <button id="Add-button" onClick={()=>setshowform(true)}>Add</button>
        <>
        {
            showform && (<div>

                <ExpenseTracker onTrue={()=>setshowform(false)} onClose={()=>setshowform(false)}/>
            </div> )
        }
        <div className="use-inline date header-color">Date </div>
        <div className="use-inline product header-color">Product purchased </div>
        <div className="use-inline  price header-color">Price </div>
        <div className="use-inline  payName header-color" style={{width:112}}>Payee Name </div>
        </>
        {
         items && items.map((user,idx)=>(
           <div key={user.id}>
            <div className="use-inline date date1">{user.setDate} </div>
            <div className="use-inline ">{user.product} </div>
            <div className="use-inline price">{`Rs. ${user.price} /-`} </div>
            <div className="use-inline payeeName">{user.payeeName} </div>
             </div>
         ))
        }
        <hr/>
        <div className="use-inline Total">Total:</div>
        <span className="use-inline total">{`Rs. ${sum} /-`}</span><br/>

        <div className="use-inline Paid">Rahul Paid:</div>
        <span className="use-inline total Rahul">{`Rs. ${rahulspent /2} /-`}</span><br/>

        <div className="use-inline Paid">Ramesh Paid:</div>
        <span className="use-inline total Ramesh">{`Rs. ${rameshspent /2} /-`}</span><br/>

        <div className="use-inline payable">
        {rahulspent>rameshspent? "Pay Rahul":"Pay Ramesh"}
        </div>
        <span className="use-inline payable price">
         {`Rs. ${Math.abs((rahulspent-rameshspent)/2)} /-`}
        </span><br/>
       {error &&<> {error?.message}</>}
        </>
    )
 }
 export default ShowData;