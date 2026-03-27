export default function MostVoteAnecdote({anecdotes, votes}){
    const mostVote = Math.max(...votes);
    if (mostVote <= 0){
        return null;
    }
    const mostVoteIndex = votes.indexOf(mostVote);
    return <p>{anecdotes[mostVoteIndex]}</p>
}