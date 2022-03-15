import '../Style/divEditorToolSelector.css';
function SelectorButton({selected, selectFunc, toSelect, smallDescrip, path}){
    console.log(selected)
    return <div className="selectorBot">
        <div className={selected ? 'it' : "notit"} onClick={()=>(selectFunc(toSelect))}>
            <svg viewBox='0, 0, 50, 50'><path d={path}></path></svg>
        </div>
        <div className="text">
            {` ${smallDescrip}`}
        </div>
    </div>
}
export default SelectorButton;