import { useState } from "react"

const Tarea = (  {descripcion, onDelete}) =>{

    const [isHover, setIsHover] = useState(false)
    return (
				<p onMouseEnter={() => setIsHover(true)  } onMouseLeave={() => setIsHover(false)} >{descripcion}
				{isHover && <button className="btn btn-danger text-white" onClick={onDelete}  > X </button>}
				</p>
			)
}

export default Tarea