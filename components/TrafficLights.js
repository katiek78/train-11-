const TrafficLights = ({ recentAttempts = [] }) => {   
    return <div>
        {recentAttempts.map(attempt => attempt ? "🟢" : "🔴")}
    </div>;
  }

export default TrafficLights