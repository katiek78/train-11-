const TrafficLights = ({ recentAttempts = [] }) => {   
    return <div className='traffic-lights'>
        {recentAttempts.map(attempt => attempt ? "🟢" : "🔴")}
    </div>;
  }

export default TrafficLights