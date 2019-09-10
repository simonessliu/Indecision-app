
class IndecisionApp extends React.Component {

    constructor(props){
        super(props);
        this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
        this.handlePick = this.handlePick.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption=this.handleDeleteOption.bind(this);        
        this.state = {
            options: []
           
        };
    }
    
    componentDidMount(){

        try {

            const json = localStorage.getItem('options');
            //JSON.parse here is used to pull out the object or array from 
            //the string  (  "{object......}" ------> {object....}  )
            const options = JSON.parse(json);

            if(options) {
                this.setState(() => ({ options : options }));
            }
        
        }catch(e){
            //Do nothing at all
        }
        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            //JSON.stringify here is used to put an whole OBJECT or Array
            //into a String format. "{object....}"
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
        
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    handleDeleteOptions () {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption(optionToRemove) {
       this.setState((prevState) => ({
           options: prevState.options.filter((option) => {
               return optionToRemove !== option;
           })
       }));
    }

    handlePick () {           
       const randomNum = Math.floor(Math.random() * this.state.options.length);
       const randomOptions = this.state.options[randomNum];
       alert(randomOptions);            
    }

    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        }else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }

      this.setState((prevState) => ({options : prevState.options.concat(option)}));
      
    //    this.setState((preState) => {
    //         return{
    //             options : preState.options.concat(option)
    //         };
    //    });
    }



    render() {
        
        const subtitle = 'Put Your life in the hands of a computer';
        
        return (
            <div>
                <Header subtitle={subtitle}/>
                <Action hasOptions={this.state.options.length > 0}  handlePick = {this.handlePick}/>
                <Options 
                  options={this.state.options}
                  handleDeleteOptions = {this.handleDeleteOptions}
                  handleDeleteOption = {this.handleDeleteOption}
                />
                <AddOption
                    handleAddOption = {this.handleAddOption}
                />
            </div>
        );
    }
}



const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

// class Header extends React.Component{
//     render() {
        
//         return (
//             <div>
//                 <h1>{this.props.title}</h1>
//                 <h2>{this.props.subtitle}</h2>
//             </div>
//         );
//     }
// }

const Action = (props) =>{
    return (
        <div>
            <button 
                onClick = {props.handlePick}
                disabled={!props.hasOptions}
            >
            What should I do?
            </button>
        </div>
    );
};

// class Action extends React.Component {
//     render() {
//         return (
//             <div>
//                 <button 
//                     onClick = {this.props.handlePick}
//                     disabled={!this.props.hasOptions}
//                 >
//                 What should I do?
//                 </button>
//             </div>
//         );
//     }
// }

const Options = (props) => {
    return (
        <div>
            <button onClick = {props.handleDeleteOptions}>Remove all</button>
            {props.options.length === 0 && <p>Please add an option to get started!</p>}
           {
               props.options.map((option) => (
                <Option 
                    key={option} 
                    optionText={option}
                    handleDeleteOption = {props.handleDeleteOption}
                />
               ))             
            }
            
        </div>
    );
};

// class Options extends React.Component {

//     render(){
//         return (
//             <div>
//                 <button onClick = {this.props.handleDeleteOptions}>Remove all</button>
//                {
//                    this.props.options.map((option) => <Option key={option} optionText={option}/>)
//                 }
//             </div>
//         );
//     }
// }

const Option = (props) => {
    return (
        <div>
          Option: {props.optionText}
          <button onClick = {(e) => {
              props.handleDeleteOption(props.optionText)
          }}>
            remove
          </button>
        </div>
    );
}




// class Option extends React.Component {
//     render() {
//         return (
//             <div>
//               Option: {this.props.optionText}
//             </div>
//         );
//     }
// }



class AddOption extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        };
    }

    handleAddOption(e){

        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);
       
        this.setState(() => ({error : error}));
         // this.setState(() => {
        //     return{
        //         error: error
        //     };
        // });

        if(!error){
            e.target.elements.option.value = '';
        }
    }

    

    render() {
        return (
            <div> 
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit = {this.handleAddOption}>
                    <input type="text" name="option" />
                    <button>Add Option</button>
                </form>   
            </div>
            
        );
    }
}



ReactDOM.render(<IndecisionApp />, document.getElementById('app'));