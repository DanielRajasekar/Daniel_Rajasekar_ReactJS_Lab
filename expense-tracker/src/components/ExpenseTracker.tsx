import { ChangeEvent,Component,FormEvent } from "react"; 
import { pushDataToServer } from "../service/menu";
type Props={
    onTrue: any;
    onClose: any;
}
type State={
    payeeName:string;
    product:string;
    price:number;
    setDate:string;
}
class ExpenseTracker extends Component<Props,State>{
     
    constructor(props:Props){
        super(props)
        this.state={
            payeeName:"",
            product:"",
            price:0,
            setDate:this.setDefaultDate(),

        }
        this.setPayee=this.setPayee.bind(this)
        this.setProduct=this.setProduct.bind(this)
        this.setPrice=this.setPrice.bind(this)
        this.loggedDate=this.loggedDate.bind(this)
    };
    setPayee= (event:ChangeEvent<HTMLSelectElement>)=>{
        this.setState({
            payeeName: event.target.value
        })
    }
    setProduct= (event:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            product: event.target.value
        })
    }
    setPrice= (event:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            price: parseInt(event.target.value)
        })
    }
    loggedDate= (event:ChangeEvent<HTMLInputElement>)=>{
        this.setState({
            setDate: event.target.value
        })
    }
    setDefaultDate= ()=>{
        const today= new Date();
        return(
            today.getFullYear()+
            "-" + ("0"+(today.getMonth() +1)).slice(-2)+
            "-" + ("0" +(today.getDate()))
        );
    }
    submitHandler=async(event:FormEvent<HTMLFormElement>)=>{
        event?.preventDefault();
        const finaldata={
            ...this.state
        }
         const data = await pushDataToServer(finaldata)
         this.props.onTrue();
    }
    render() {
        const element=(
         <>
         <section>
            <header>
                <h1>Add New Item</h1>
                <p>
                    Read the instructions below before proceeding:
                    <br/> Make sure you fill all the fields where * is provided.
                </p>
            </header>
            <form onSubmit={this.submitHandler}>
            <article>
              <p>Name</p>
              <select
                name="Name"
                id="district"
                required
                value={this.state.payeeName}
                onChange={this.setPayee}
              >
                <option value="" defaultChecked>
                  Choose
                </option>
                <option value="Rahul">Rahul</option>
                <option value="Ramesh">Ramesh</option>
              </select>
            </article>

            <article>
                    <p>Product Purchased</p>
                    <input type="text" value={this.state.product} onChange={this.setProduct}/>
                </article> 
                <article>
                    <p>Price</p>
                    <input type="number" value={this.state.price} onChange={this.setPrice}/>
                </article> 
                <article>
                    <p>Date</p>
                    <input type="date" value={this.state.setDate} onChange={this.loggedDate}/>
                </article> 
                 <button type="button" className="form-button" onClick={this.props.onClose}>
                   Close
                 </button>
                 <button type="submit" className="form-button">Submit</button>


            </form>
           
         </section>
         </>
        );
        return element
    }
}
export default ExpenseTracker;