import { useRef } from "react";
import Button from "../../components/Button"

const Useref = () => {
    let btnRef = useRef();
    const changeColor = () => {
        btnRef.current.style.backgroundColor = "gray";
     }
    return(
        <>
        <h1 className="mr-6" ref={btnRef}>Userref Example</h1>
            <Button onClick={changeColor}>Color</Button>
        </>
    )

} 
export default Useref