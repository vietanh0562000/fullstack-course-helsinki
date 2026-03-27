export default function Content(props){
    return (
        <>
            {props.contents.map(content => (
                <p key={content.part}>{content.part} {content.exercise}</p>
            ))}
        </>
    )
}