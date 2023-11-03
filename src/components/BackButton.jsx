import {Button} from "./Button.jsx";
import {useNavigate} from "react-router-dom";

export function BackButton() {
    const navigateFunc = useNavigate();
    return (
        <Button type={"back"} onClick={(e)=>{
            e.preventDefault();
            navigateFunc(-1)}}>&larr; Back</Button>
    )
}