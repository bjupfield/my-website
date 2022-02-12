import Header from "./Header";
import SideBar from "./SideBar";
function CreatorHeaders({page}){
    return <div>
            <Header CurrentPlace={"Creator"}></Header>
            <SideBar sideBarList={[["Creator Tutorial", "/creator/tutorial"],["Svg Creation", "/creator"], ["My Account", "/creator/account"], ["Browse Creations", "/creator/browse"]]} page={page}></SideBar>
        </div>
}
export default CreatorHeaders;