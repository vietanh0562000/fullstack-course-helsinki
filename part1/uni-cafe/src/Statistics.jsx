import StatisticsLine from "./StatisticsLine"

export default function Statistics({good, neutral, bad}){
    if (good == 0 && neutral == 0 && bad == 0){
        return (
            <p>There is no statistcs</p>
        )
    }else{
        return (
            <>
                <StatisticsLine text='good' value={good} />
                <StatisticsLine text='neutralll' value={neutral} />
                <StatisticsLine text='bad' value={bad} />
            </>
        )
    }
}