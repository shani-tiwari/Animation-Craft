import '../styles/WavyUnderline.css'
import { cn } from '../lib/utils'

export default function WavyUnderline() {
  return (
    <div className={cn("wavy-underline-pulse text-2xl text-white/80 font-bold tracking-wider")}>Wavy Underline</div>
  )
}
