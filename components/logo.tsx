import { LineChart } from 'lucide-react'

interface LogoProps {
  width?: string;   // Make them optional if you want default values
  height?: string;  // Make them optional if you want default values
}

const Logo = ({ width = 'w-15', height = 'h-15' }: LogoProps) => (
  <div className="flex items-center gap-2">
    <LineChart className={`${width} ${height} text-sky-500`} />
    <span className="text-2xl font-extrabold text-zinc-800"></span>
  </div>
)

export default Logo