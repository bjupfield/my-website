import '../Style/divEditorToolSelector.css';
function SelectorButton({selected, selectFunc, toSelect, smallDescrip, path}){
    return <div className={selected ? "selectorBot2" : "selectorBot"}>
        <div className='it' onClick={selectFunc(toSelect)}>
            <svg viewBox='0, 0, 50, 50'><path d={path}></path></svg>
        </div>
        : {smallDescrip}
    </div>
}
export default SelectorButton;