export default function Total(props){
    var contents = props.contents;
    var sum = contents.reduce((total, content) => total + content.exercise, 0); 
    return (
        <p>Number of exercises {sum}</p>
    )
}