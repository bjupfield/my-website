import CreatorHeaders from "./CreatorHeaders";

function CreatorTutorial({}){
    console.log(window.location.origin)
    return <div>
        <CreatorHeaders page={"/creator/tutorial"}></CreatorHeaders>
    </div>
}
export default CreatorTutorial;