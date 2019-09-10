class Counter extends React.Component{
    handleAddOne() {
        this.setState((preState) => {
            return {
                count : preState.count + 1
            };
        });
    }
    handleMinusOne(){
       this.setState((Prestate) => {
            return {
                count: Prestate.count -1
            }
       });
    }
    handleReset() {
        this.setState(() =>{
            return {
                count: 0
            }
        });
    }

    componentDidMount(){
        const counter = localStorage.getItem('count');
        const num = parseInt(counter, 10);
        
        if(!isNaN(num)) {
            this.setState(() => ({
                count: num
            }))
        }
    }

    componentDidUpdate(prevProps, prevState){

        if(prevState.count !== this.state.count){
            localStorage.setItem('count',this.state.count);
        }
    }

    constructor(props) {

        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: 0
        }
        
    }
       
    

    render(){
        return(
            <div>
                <h1>Count: {this.state.count}</h1>
              
                <button onClick = {this.handleAddOne}>+1</button>
                <button onClick = {this.handleMinusOne}>-1</button>
                <button onClick = {this.handleReset}>Reset</button>
            </div>
        );

    }
}

// Counter.defaultProps = {
//     count : 0
// }
ReactDOM.render(<Counter />, document.getElementById('app'));
