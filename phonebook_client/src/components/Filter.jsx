export default function Filter({filterName, onChange}){
    return (
        <form>
            <p>Filter</p>
            <input value={filterName} onChange={(e) => onChange(e.target.value)}/>
        </form>
    )
}