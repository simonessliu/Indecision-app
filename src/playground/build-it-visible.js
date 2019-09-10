

class VisibilityToggle extends React.Component {

    handleToggleVisibility(){
        this.setState((preState) =>{
            return {
                visibility : !preState.visibility
            };
        });

    }
    
    
    
    constructor(props) {
        super(props);
        this.handleToggleVisibility = this.handleToggleVisibility.bind(this);
        this.state = {
            visibility : false
        }

    }
    
    
    
    render() {
       
        return (
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick = {this.handleToggleVisibility}>
                    {this.state.visibility ? 'Hide details' : 'Show details'}             
                </button>
                {this.state.visibility && (
                    <div>
                        <p>Hey, these are some details you can now see!</p>
                    </div>
                )}
             </div>

        );

    }
}


ReactDOM.render(<VisibilityToggle />, document.getElementById('app'));


//visibilityToggle -- render constructor handleToggleVisibility
//visibility -- false


// let visibility = false;

// const showDetail = () => { 
//     visibility = !visibility;
//     render();  
// };

// const appRoot = document.getElementById('app');


// const render = () => {

//     const template = (
//         <div>
//             <h1>Visibility Toggle</h1>
//             <button onClick = {showDetail}>
//             {visibility ? 'Hide details' : 'Show details'}             
//             </button>
//             {visibility && (
//                 <div>
//                     <p>Hey, these are some details you can now see!</p>
//                 </div>
//             )}
//         </div>
//     );
    
//     ReactDOM.render(template,appRoot);
// };

// render();