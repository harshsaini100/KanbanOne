import { Link } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
export default function BreadCrumb({items}: any) {
    return (
        <div className='flex gap-2 items-center mb-2  w-full h-10 border-b-indigo-600 border-b-2 rounded px-2'>
            <span className="cursor-pointer"><Link to={'/'}><i className="fa fa-home"></i></Link></span>
            {items.map((item, i)=>{
                return(
                    <Fragment key={i}>
                    <span className=""><i className="fa fa-chevron-right"></i></span>
                    <span key={i}><Link to={item.link}>{item.name}</Link></span>
                    </Fragment>
                )
            })}
        </div>
    )
}