const CurrencyInput = ({name, input, onChangeInput}) => {
    return (
    <div>
        {`${name}:`}
        <input 
        name={name}
        value={input}
        placeholder={"환율"} 
        onChange={onChangeInput}/>
    </div>
    );
}

export default CurrencyInput;