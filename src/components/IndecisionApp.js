import React from 'react';
import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';
import OptionModal from './OptionModal';


export default class IndecisionApp extends React.Component {

    state = {
        options : [],
        selectedOption: undefined
    }

    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
     }

     handlePick = () => {           
        const randomNum = Math.floor(Math.random() * this.state.options.length);
        const randomOptions = this.state.options[randomNum];            
        this.setState(() => ({selectedOption : randomOptions}));
     }

     handleAddOption = (option) => {
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

    handleClearSeletedOption = () => {
        this.setState(() => ({
            selectedOption : undefined
        }));
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

    render() {
        
        const subtitle = 'Put Your life in the hands of a computer';
        
        return (
            <div>
                <Header subtitle={subtitle}/>
                <div className="container">
                    <Action hasOptions={this.state.options.length > 0}  handlePick = {this.handlePick}/>
                    <div className = "widget">
                        <Options 
                        options={this.state.options}
                        handleDeleteOptions = {this.handleDeleteOptions}
                        handleDeleteOption = {this.handleDeleteOption}
                        />
                        <AddOption
                            handleAddOption = {this.handleAddOption}
                        />
                    </div>                 
                </div>
                <OptionModal 
                    selectedOption = {this.state.selectedOption}
                    handleClearSeletedOption = {this.handleClearSeletedOption}
                />
            </div>
        );
    }
}