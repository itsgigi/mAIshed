interface BlinkinDotProps {
  color?: string
}

const BlinkinDot = ({color = '#19c37d'}: BlinkinDotProps) => {
  return (
    <span style={{
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: '50%',
      backgroundColor: color, // ChatGPT green
      animation: 'blinkinDot 1s infinite',
      margin: 2,
      verticalAlign: 'middle',
    }} />
  )
}

export default BlinkinDot

// Add the animation to the global stylesheet (index.css):
// @keyframes blinkinDot {
//   0%, 100% { opacity: 1; }
//   50% { opacity: 0.2; }
// }
